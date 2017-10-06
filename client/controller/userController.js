

//for buyer request listing
this.DirectoryControllerEdit = RouteController.extend({
    template: "directoryEdit",
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    waitOn: function () {
        return [
            Meteor.subscribe('directory_details', this.params._id)
        ];
    },
    onBeforeAction: function () {
        this.next();
    },
    data: function () {
        if (this.ready()) {
            return {
                _id: this.params._id,
                DirectoryDetails: directory.findOne({ _id: this.params._id })
            }
        }
    },
    fastRender: true
});
this.DirectoryControllerView = RouteController.extend({
    template: "directoryview",
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    waitOn: function () {
        return [
            Meteor.subscribe('directory_details', this.params._id),
            Meteor.subscribe('rssFeeds', this.params._id),
            Meteor.subscribe('getAllTennant_Directory', this.params._id),
            Meteor.subscribe("settingsdata")
        ];
    },
    onBeforeAction: function () {
        this.next();
    },
    data: function () {
        if (this.ready()) {
            var ressFeed = rssFeedDdl.find().fetch();
            return {
                _id: this.params._id,
                DirectoryDetails: directory.findOne({ _id: this.params._id }),
                rssFeeds: rssFeed.findOne({ directoryId: this.params._id }),
                getAllTennant_Directory: tenant.find().fetch(),
                brandingData:rssFeed && rssFeed.length > 0 ? rssFeed[0].branding : ""


            }
        }
    },
    fastRender: true
});

this.DirectorynormaleView = RouteController.extend({
    template: "normalmode",
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    waitOn: function () {
        return [
            Meteor.subscribe('directory_details', this.params._id),
            Meteor.subscribe('rssFeeds', this.params._id),
            Meteor.subscribe('getAllTennant_Directory', this.params._id),
            Meteor.subscribe("settingsdata")
        ];
    },
    onBeforeAction: function () {
        this.next();
    },
    data: function () {
        if (this.ready()) {
            return {
                _id: this.params._id,
                DirectoryDetails: directory.findOne({ _id: this.params._id }),
                rssFeeds: rssFeed.findOne({ directoryId: this.params._id }),
                getAllTennant_Directory: tenant.find().fetch(),
                brandingData:rssFeedDdl.find().fetch()[0].branding


            }
        }
    },
    fastRender: true
});


this.TenantControllerAdd = RouteController.extend({
    template: "tenantInsert",
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    waitOn: function () {
        return [
            Meteor.subscribe('directory_details_user', Meteor.userId())
        ];
    },
    onBeforeAction: function () {
        this.next();
    },
    data: function () {
        if (this.ready()) {
            return {
               // _id: this.params._id,
                DirectoryList: directory.find()
            }
        }
    },
    fastRender: true
});
this.TenantControllerEdit = RouteController.extend({
    template: "tenantEdit",
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    waitOn: function () {
        return [
            Meteor.subscribe('tenant_details', this.params._id),
            Meteor.subscribe('directory_details_user', Meteor.userId())
        ];
    },
    onBeforeAction: function () {
        this.next();
    },
    data: function () {
        if (this.ready()) {
            return {
                _id: this.params._id,
                TenantDetails: tenant.findOne({ _id: this.params._id }),
                DirectoryList: directory.find()
            }
        }
    },
    fastRender: true
});


this.blackthemDirectoryControllerView = RouteController.extend({
    template: "horizontalblacktheme",
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    waitOn: function () {
        return [
            Meteor.subscribe('directory_details', this.params._id),
            Meteor.subscribe('rssFeeds', this.params._id),
            Meteor.subscribe('getAllTennant_Directory', this.params._id),
            Meteor.subscribe("settingsdata")
        ];
    },
    onBeforeAction: function () {
        this.next();
    },
    data: function () {
        if (this.ready()) {
            var ressFeed = rssFeedDdl.find().fetch();
            return {
                _id: this.params._id,
                DirectoryDetails: directory.findOne({ _id: this.params._id }),
                rssFeeds: rssFeed.findOne({ directoryId: this.params._id }),
                getAllTennant_Directory: tenant.find().fetch(),
                brandingData:ressFeed && ressFeed.length ? ressFeed[0].branding : ""


            }
        }
    },
    fastRender: true
});
