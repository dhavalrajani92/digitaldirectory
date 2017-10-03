//Declare tenant collection
tenant = new Mongo.Collection("tenant");

Schema = {};

//Declared Schema of tenant
Schema.tenant = new SimpleSchema({
    DirectoryID: {
        type: String
    },
    userID: {
        type: String
    },
    userName: {
        type: String,
        optional: true
    },
    Name: {
        type: String
    },
    Floor: {
        type: String
    },
    Suite: {
        type: String
    },
    logo: {
        type: String,
        optional: true
    },
    IsVisible: {
        type: Boolean
    },

    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date()
            }
        }
    },
    createdBy: {
        type: String,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    lastUpdateAt: {
        type: Date,
        autoValue: function () {
            return new Date()
        }
    },
    lastUpdatedBy: {
        type: String,
        autoValue: function () {
            return Meteor.userId();
        }
    }
});

//Attached Schema with tenant collection
tenant.attachSchema(Schema.tenant);
