var Future = Npm.require('fibers/future');
var Fiber = Npm.require('fibers');

Meteor.methods({
    // insert method
    common_insert: function(key, values) {
        var insertSync = Meteor.wrapAsync(global[key].insert, global[key]);

        if (key == "directory") {
            var btcommon_insert = new Future();
            var DirectoryID = insertSync(values);
            debugger;
            console.log(DirectoryID,values.newsFeed);
            Meteor.call("getRssContent", "rssFeed", values.newsFeed, DirectoryID, false, function(error, result) {
                console.log(error);
                console.log(result);
                if (error) {
                    btcommon_insert.return(error);
                } else {
                    btcommon_insert.return(result);
                }
            });
            return btcommon_insert.wait();
        } else {
            return insertSync(values);

        }
    },
    // update method
    common_update: function(key, id, values) {

        Meteor.call('auditTrailLog', 'Update', key + " " + id + ' updated');

        var updateSync = Meteor.wrapAsync(global[key].update, global[key]);


        if (key == "directory") {
            var btcommon_update = new Future();
            console.log("values",values.newsFeed);
            // Meteor.call("getRssContent", "rssFeed", values.newsFeed, id, false, function(error, result) {
            //     console.log("error",error);
            //     console.log("result",result);
            //     if (error) {
            //         btcommon_update.return(error);
            //     } else {
            //         btcommon_update.return(updateSync({
            //             _id: id
            //         }, {
            //             $set: values
            //         }));
            //     }
            // });
            btcommon_update.return(updateSync({
                _id: id
            }, {
                $set: values
            }));
            return btcommon_update.wait();
        } else {
            return updateSync({
                _id: id
            }, {
                $set: values
            });
        }

    },

    // remove method
    common_remove: function(key, id) {
        Meteor.call('auditTrailLog', 'Delete', key + " " + id + ' deleted');
        console.log(id);
        return global[key].remove({
            _id: id
        });
    },

    updateUserProfile: function(key, id, values) {
        var updateSync = Meteor.wrapAsync(global[key].update, global[key]);
        updateSync({
            _id: id
        }, {
            $set: values
        });
        return Accounts.sendVerificationEmail(id);
    },
    createUserServer: function(values, cb) {
        console.log(values);
        var options = {
            email: values.email,
            password: values['password'],
            profile: {
                name: values.name,
                role: values.role,
                promotionalEmail: values.promotionalEmail,
                createdAt: new Date(),
                isActive: false
            }
        };
        // call from client side
        var result = Accounts.createUser(options);
        console.log(result);
        return result;
    },

    compileHtml: function(templateId, dynamicKeywords) {

        var html;
        SSR.compileTemplate(templateId, Assets.getText(templateIds[templateId]));
        html = SSR.render(templateId, dynamicKeywords);
        return html;
    },

    dataURItoBlob: function(data) {
        // write the bytes of the string to a typed array
        var fs = Npm.require("fs");
        var img = data;
        // strip off the data: url prefix to get just the base64-encoded bytes
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        fs.writeFile('C:/upload/image.png', buf);
    },

    sendEmail: function(data) {
        console.log('email called');

        var html;
        SSR.compileTemplate('email', Assets.getText('dummy.html'));
        html = SSR.render('email', {});

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: '',
            from: '',
            subject: "",
            html: html
        });

        Meteor.call('auditTrailLog', 'Email Sent', 'email sent to admin for order received');

    },

    auditTrailLog: function(actionType, actionMsg) {

        // var auditTrailLog = {};
        //
        // auditTrailLog.userInfo = {};
        // auditTrailLog.userInfo.userID = Meteor.user() != undefined ? Meteor.user()._id : "";
        // auditTrailLog.userInfo.userName = Meteor.user() != undefined ? Meteor.user().profile.name : 'Anonymous';
        // auditTrailLog.userInfo.userRole = Meteor.user() != undefined ? Meteor.user().profile.role : "";
        // auditTrailLog.userInfo.userIPaddress = this.connection.clientAddress;
        //
        // auditTrailLog.ActionType = actionType;
        // auditTrailLog.ActionMsg = actionMsg;
        // auditTrailLog.createdAt = new Date();
        //
        // var insertSync = Meteor.wrapAsync(global['auditTrail'].insert, global['auditTrail']);
        // var insertedId = insertSync(auditTrailLog);
    },
    getRssContent: function(key, url, directory, validateUrl) {
        var allFeeds = "";


        var response = HTTP.get("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&q=" + url);
        var rssContent = [];

        if (validateUrl) {
            if (response.data.responseStatus == 200) {
                return true;
            } else {
                throw new Meteor.Error(902, infoMessages.InvalidRSS);
            }
        } else {
            if (response.data.responseStatus == 200) {
                response.data.responseData.feed.entries.forEach(function(k, i) {
                    debugger;
                    rssContent.push({
                        title: k.title,
                        description: k.content,
                        link: k.link

                    });
                });
                global[key].remove({
                    directoryId: directory
                });
                return global[key].insert({
                    directoryId: directory,
                    rssFeed: rssContent
                });
            } else {
                throw new Meteor.Error(902, infoMessages.InvalidRSS);
            }
        }

    },

    getRssContentGlobal: function(key, url, directory) {
        var response = HTTP.get("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&q=" + url);
        var rssContent = [];

        if (response.data.responseStatus == 200) {
            response.data.responseData.feed.entries.forEach(function(k, i) {
                rssContent.push({
                    title: k.title,
                    description: k.content,
                    link: k.link,
                    pubDate: (k.publishedDate == '') ? new Date() : new Date(k.publishedDate),
                    updatedAt: (k.publishedDate == '') ? new Date() : new Date(k.publishedDate)
                });
            });
        }
        if (rssContent.length > 0) {
            var lastupdateddate = rssFeed.remove({
                directoryId: directory
            });
            return global[key].insert({
                directoryId: directory,
                rssFeed: rssContent
            });
        }
    },
    getWeatherData: function(location) {
        var btGetWeatherData = new Future();
        var reqURL = "https://api.forecast.io/forecast/3b12fcc53909b6cc2c91ae5395e893c5/" + location;
        Meteor.http.get(reqURL, function(error, result) {
            //console.log(error, result);
            if (error) {
                btGetWeatherData.return(error);
            } else {
                btGetWeatherData.return(result.data);
            }
        });
        return btGetWeatherData.wait();
    },
    insert_rss_feed: function(values,branding) {
        debugger;
        rssFeedDdl.remove({});

        return rssFeedDdl.insert({rssFeeds:values,branding:branding});
    }

});

Router.route('/downloadFile', function() {
    var self = this;

    var fs = Npm.require("fs");

    //prepare CSV Data in csvData variable

    fs.writeFile('/home/ubuntu/exportData/data.csv', csvData, function(err) {
        if (err)
            return console.log(err);

        var file = fs.readFileSync('/home/ubuntu/exportData/data.csv');
        var headers = {
            //'Content-type': 'image/png',
            'Content-Disposition': "attachment; filename=data.csv"
        };

        self.response.writeHead(200, headers);
        return self.response.end(file);
    });


}, {
    where: 'server'
});
