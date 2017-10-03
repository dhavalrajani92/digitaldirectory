var arrScreenshots = '';
Template.profileView.onCreated(function () {
    arrScreenshots = user.findOne().profile.profilePic;
});

Template.profileView.onRendered(function () {
  debugger;
 $('#frmProfileView').parsley({ trigger: 'blur' });
});


Template.profileView.events({
// Event handle for cancel

    'submit': function (e, t) {
        e.preventDefault();
        debugger;
        getValues($('#frmProfileView'), function (values) {
            delete values['undefined'];
            var valuesnamepic ={};
            valuesnamepic['profile.name'] = values.name;
            valuesnamepic['profile.profilePic'] = arrScreenshots;
            //call common function for insert
            commonEdit(Meteor.userId(), objModules.user.name, valuesnamepic, function (err, res) {
                if (err)
                    FlashMessages.sendError(err.reason);
                else {
                    FlashMessages.clear();
                    FlashMessages.sendSuccess('User Profile updated successfuly.');
                }
            },true);

        });
    },

    'change .imgInput': function (event, template) {
        event.preventDefault();
        var file = '';
        var photo = event.currentTarget;
        getBase64(photo, 'imgPreview');
        FS.Utility.eachFile(event, function (file) {
            var theFile = new FS.File(file);
            Images.insert(theFile, function (err, fileObj) {
                arrScreenshots = fileObj._id;
            });
        });
    }
})
