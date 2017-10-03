var arrScreenshots = '';
//UserRegister template created
Template.UserRegister.created = function () {

};
//UserRegister template rendered
Template.UserRegister.rendered = function () {
  $('body').addClass('login-content');
    $('#Registerform').parsley({ trigger: 'blur' });
//    $(function () {
//     $('input').iCheck({
//       checkboxClass: 'icheckbox_square-blue',
//       radioClass: 'iradio_square-blue',
//       increaseArea: '20%' // optional
//     });
//   });
};


//UserRegister template helpers
Template.UserRegister.helpers({

});

//UserRegister template's all events
Template.UserRegister.events({

   "submit #Registerform": function (event) {

       event.preventDefault();
        var values = {};
        values.email = $('[name=registerEmail]').val();
        values.password = $('[name=registerPassword]').val();
        values.role = 'customer';
        values.state = 'Gujarat';
        values.zipcode = '395006';
        values.name =  $('[name=registerName]').val();
        values.address = ''
        values.profilePic = arrScreenshots;
        Meteor.call('createUserServer', values, function (err, res) {
            console.log(err, res);
            if(err){
                FlashMessages.sendError(err.reason);
            }
            else{
                Router.go("UserList");
            }
        })
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
