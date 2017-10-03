switch (Meteor.absoluteUrl()) {
    case "http://localhost:3000/":
        fileUploadPath = 'E:/carwebapp/';
        break;
         case "http://signcast.meteor.com/":
        fileUploadPath = './signcastupload';
        break;
        case "http://104.131.3.228/":
       fileUploadPath = '/root/upload/';
       break;
    default:
        fileUploadPath = 'E:/carwebapp/';
}

Uploads = new FS.Collection("Uploads", {
    stores: [new FS.Store.FileSystem("Uploads", { path: fileUploadPath })]
});

Uploads.allow({
    insert: function () {
        return true
    },
    update: function () {
        return true
    },
    remove: function () {
        return true
    },
    download: function () {
        return true
    }
});

Images = new FS.Collection("Images", {
    stores: [
        new FS.Store.FileSystem("Images", { path: fileUploadPath })
    ]
});

Images.allow({
    insert: function (userId, fileObj) {
        return true;
    },
    update: function (userId, fileObj) {
        return true;
    },
    download: function (userId, fileObj /*, shareId*/) {
        return true;
    },
    fetch: []
});
