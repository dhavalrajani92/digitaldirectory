//UserLogin template created
Template.UserLogin.created = function() {

};
//UserLogin template rendered
Template.UserLogin.rendered = function() {
    $('body').addClass('login-content');
    $('#Loginform').parsley({
        trigger: 'blur'
    });
    //    $(function () {
    //     $('input').iCheck({
    //       checkboxClass: 'icheckbox_square-blue',
    //       radioClass: 'iradio_square-blue',
    //       increaseArea: '20%' // optional
    //     });
    //   });
};


//UserLogin template helpers
Template.UserLogin.helpers({

});

//UserLogin template's all events
Template.UserLogin.events({

    "submit #Loginform": function(event) {
        debugger;
        event.stopPropagation();
        event.preventDefault();

        loginUser($('[name=username]').val(), $('[name=password]').val());
    },

    'click .gotoforgotPassword': function(e, t) {
        Router.go('forgotpassword');

    }
});
