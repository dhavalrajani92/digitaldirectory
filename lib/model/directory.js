//Declare directory collection
directory = new Mongo.Collection("directory");

Schema = {};

//Declared Schema of directory
Schema.directory = new SimpleSchema({

    userID: {
        type: String
    },
    userName: {
        type: String,
        optional: true
    },
    title: {
        type: String
    },
    logo: {
        type: String,
        optional: true
    },
    location: {
        type: Object,
        blackbox:true
    },
    description: {
        type: String,
        optional: true
    },
    bgImage: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date()
            }
        }
    },
    createdBy: {
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    lastUpdateAt: {
        type: Date,
        autoValue: function() {
            return new Date()
        }
    },
    lastUpdatedBy: {
        type: String,
        autoValue: function() {
            return Meteor.userId();
        }
    },
    orientationType: {
        type: String,
        optional: true
    },
    newsFeed: {
        type: String,
        optional: true
    },
    themeColor: {
        type: String,
        optional: true
    },
    serviceType: {
        type: String,
        optional: true
    },
    gallary:{
      type:[Object],
      blackbox:true
    },
    templateType:{
      type:String,
      optional:true
    },
    language:
    {
      type:String,
      optional:true
    },
    temprature:
    {
      type:String,
      defaultValue:"F",
      optional:true
    }
});

//Attached Schema with directory collection
directory.attachSchema(Schema.directory);
