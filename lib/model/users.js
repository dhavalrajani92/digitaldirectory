//Declare Users collection
Schema = {};

Schema.UserProfile = new SimpleSchema({
    name: {
        type: String
    },
    role: {
        type: String
    },
    address: {
        type: String,
        optional: true
    },
    state: {
        type: String,
        optional: true
    },
    zipcode: {
        type: String,
        optional: true
    },
    contactNumber: {
        type: Number,
        optional: true
    },
    isActive: {
        type: Boolean,
        optional: true
    },
    createdAt: {
        type: Date
    },
    profilePic:{
      type:String,
        optional: true
    }
});

this.user = Meteor.users;

//Declared Schema of users
Schema.user = new SimpleSchema({

    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    profile: {
        type: Schema.UserProfile,
        blackbox: true
    }
});

//Attached Schema with users collection
user.attachSchema(Schema.user);
