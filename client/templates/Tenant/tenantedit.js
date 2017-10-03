var arrScreenshots = '';
Template.tenantEdit.onCreated(function () {
    arrScreenshots = tenant.findOne().logo;
});

Template.tenantEdit.onRendered(function () {
 $('#tenantEdit').parsley({ trigger: 'blur' });
});


Template.tenantEdit.helpers({

});

Template.tenantEdit.events({
// Event handle for cancel
    "click #form-cancel-button": function (e, t) {
        commonCancelClick(e, objModules.tenant.name);
    },
    'submit': function (e, t) {
        e.preventDefault();
        getValues($('#tenantEdit'), function (values) {
            delete values['undefined'];
            values.logo = arrScreenshots;
            //call common function for insert
            commonEdit(t.data._id, objModules.tenant.name, values, function (err, res) {
                if (err)
                    FlashMessages.sendError(err.reason);
                else {
                    FlashMessages.clear();
                    FlashMessages.sendSuccess('tenant updated successfuly.');
                }
            });

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
