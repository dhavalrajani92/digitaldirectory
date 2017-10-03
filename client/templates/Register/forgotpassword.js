
Template.forgotpassword.onRendered(function(){
  $('body').addClass('login-content');
    $('#forgotPasswordForm').parsley({ trigger: 'blur' });
});
Template.forgotpassword.events({
  'submit #forgotPasswordForm': function(e, t) {
    e.preventDefault();

    var forgotPasswordForm = $(e.currentTarget),
        emailId = (forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase()).trim();

    // if (isNotEmpty(email) && isEmail(email)) {

      Accounts.forgotPassword({email: emailId}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
              FlashMessages.sendError('This email does not exist.');
          } else {

            console.log('We are sorry but something went wrong.');
            FlashMessages.sendError('We are sorry but something went wrong.');
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
          FlashMessages.sendSuccess('Email Sent. Check your mailbox.');
        }
      });

    // }
    return false;
  },
  'click .gotologin':function(e,t){
    Router.go('UserLogin');
  }
});
