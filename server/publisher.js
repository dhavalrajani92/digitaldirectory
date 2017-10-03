// Publish particular user data from user collection
Meteor.publish('list_Deails', function(userID) {
    return user.find({
        userID: userID
    }, {
        sort: {
            createdAt: 1
        }
    });
});

//publish all users
Meteor.publish('user_list', function(userID) {
    return user.find({}, {
        sort: {
            createdAt: 1
        }
    });
});

Meteor.publish('directory_details', function(directoryid) {
    return directory.find({
        _id: directoryid
    });
});
Meteor.publish('directory_details_user', function(userId) {
    if (this.userId != adminuserId) {
        return directory.find({
            userID: userId
        });
    } else {
        return directory.find();
    }

});
Meteor.publish('tenant_details', function(tenantid) {
    return tenant.find({
        _id: tenantid
    });
});
Meteor.publish('getAllTennant_Directory', function(directoryid) {
    return tenant.find({
        DirectoryID: directoryid
    });
});

Meteor.publishComposite("tabular_tenant", function(tableName, ids, fields) {
    check(tableName, String);
    check(ids, Array);
    check(fields, Match.Optional(Object));

    this.unblock(); // requires meteorhacks:unblock package

    return {
        find: function() {
            this.unblock(); // requires meteorhacks:unblock package

            return tenant.find({
                _id: {
                    $in: ids
                }
            }, {
                fields: fields
            });
        },
        children: [{
            find: function(tenant) {
                this.unblock(); // requires meteorhacks:unblock package
                // Publish the related user
                return directory.find({
                    _id: tenant.DirectoryID
                }, {
                    limit: 1,
                    fields: {
                        title: 1
                    },
                    sort: {
                        _id: 1
                    }
                });
            }
        }]
    };
});
Meteor.publish('rssFeeds', function(directoryid) {
    return rssFeed.find({
        directoryId: directoryid
    });
});

Meteor.publish("autocompleteTenant", function (selector, options) {
    //console.log(selector, options);
    Autocomplete.publishCursor(tenant.find(selector, options), this);
    this.ready();
});

Meteor.publish('settingsdata', function() {
    return rssFeedDdl.find();
});

Meteor.publish('dshBoard-count', function() {
    // [user.find({}).fetch().count(),directory.find({serviceType:'Premium'}).fetch().count(),directory.find({serviceType:'Free'}).fetch().count(),directory.find({}).fetch().count() ];
    Counts.publish(this, "userCount", user.find({}));
    Counts.publish(this, "premiumCount", directory.find({serviceType:'Premium'}));
    Counts.publish(this, "FreeCount", directory.find({serviceType:'Free'}));
    Counts.publish(this, "tenantCount", tenant.find({}));

});
