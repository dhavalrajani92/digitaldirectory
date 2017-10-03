Template.resetpassword.onCreated(function() {
    if (Accounts._resetPasswordToken) {
        Session.set('resetPassword', Accounts._resetPasswordToken);
    }
});

Template.resetpassword.onRendered(function() {
    $('body').addClass('login-content');
    $('#resetPasswordForm').parsley({
        trigger: 'blur'
    });
});

Template.resetpassword.helpers({
    resetPassword: function() {
        return Session.get('resetPassword');
    }
});

Template.resetpassword.events({
    'submit #resetPasswordForm': function(e, t) {
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

        // if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
        Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
            if (err) {
                FlashMessages.sendError('We are sorry but something went wrong.');
                console.log('We are sorry but something went wrong.');
            } else {
                FlashMessages.sendSuccess('Your password has been changed. Welcome back!');
                console.log('Your password has been changed. Welcome back!');
                Session.set('resetPassword', null);
            }
        });
        // }
        return false;
    },
    'click .gotologin':function(e,t){
      Router.go('UserLogin');
    }
});
