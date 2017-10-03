var ERRORS_KEY = 'productInsertError';
var arrScreenshots = '';
Template.tenantInsert.onCreated(function () {
arrScreenshots='';
});

Template.tenantInsert.onRendered(function () {
    $('#tenantadd').parsley({ trigger: 'blur' });
});


Template.tenantInsert.helpers({

});

Template.tenantInsert.events({
// Event handle for cancel
    "click #form-cancel-button": function (e, t) {
        commonCancelClick(e, objModules.tenant.name);
    },

    'submit': function (e) {
        // $('.loader').show();
        getValues($('#tenantadd'), function (values) {
            delete values['undefined'];
            values.userID = Meteor.userId();
            values.logo = arrScreenshots;
            //call common function for insert
            commonAdd(objModules.tenant.name, values, function (err, res) {
                if (err)
                    FlashMessages.sendError(err.reason);
                else {
                    FlashMessages.clear();
                    FlashMessages.sendSuccess('tenant added Successfully.');
                }
            });

        });
    },
    'change .imgInput': function (event, template) {
        event.preventDefault();
        var file = '';
        debugger;
        var photo = event.currentTarget;
        getBase64(photo, 'imgPreview');
        FS.Utility.eachFile(event, function (file) {
            var theFile = new FS.File(file);
            Images.insert(theFile, function (err, fileObj) {
                arrScreenshots = fileObj._id;
            });
        });
    }
});
