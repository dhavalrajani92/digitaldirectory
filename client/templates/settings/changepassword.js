Template.changePassword.onRendered(function(){

  $('#frmChangePassword').parsley({ trigger: 'blur' });

});


Template.changePassword.events({
  'submit #frmChangePassword': function(e) {
    e.preventDefault();
    $("#btnChangePassword").attr("disabled", true);

    getValues($('#frmChangePassword'), function(values) {
        Accounts.changePassword(values.oldPassword, values.newPassword, function(error) {
            if (error) {
                FlashMessages.sendError(error.reason);
            } else {
                FlashMessages.sendSuccess(infoMessages.passwordUpdated);
            }
        });
    });
},});
