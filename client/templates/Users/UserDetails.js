var userIdForDelete;
var userIdForUpdate;
//UserRegister template created
Template.userViewTable.created = function () {

};
//UserRegister template rendered
Template.userViewTable.rendered = function () {

};


//UserRegister template helpers
Template.userViewTable.helpers({
selector:function () {
  return {"profile.role":{$ne: "admin"}}
  
}
});

//UserRegister template's all events
Template.editUserButtons.events({
    
     
    "click #delete-user-button": function (e, t) {

        userIdForDelete = this._id;
        $('#userDeleteModal').modal('show');
    },
    //edit event for company
    "click #activate-user-button": function (e, t) {
        userIdForUpdate = this._id;
        commonEdit(userIdForUpdate, objModules.user.name, { 'profile.isActive': true }, function (err, res) {
            if (err) {
                console.log(err, res);
                //return pageSession.set(USER_DELTED_MSG, { 'alert-danger': err.reason });
                FlashMessages.sendError(err.reason);
            }
            else {
                //return pageSession.set(USER_DELTED_MSG, { 'alert-success': infoMessages.userDeleted });
                FlashMessages.sendSuccess(infoMessages.UserActivated);
            }
        },false);
    }
});

Template.userDeleteModal.events({
    "click #btnDeleteUserConfirmation": function (e) {
        commonDelete(e, userIdForDelete, objModules.user.name, objModules.user.displayName, function (err, res) {
            $('#userDeleteModal').modal('hide');
            if (err) {
                console.log(err, res);
                //return pageSession.set(USER_DELTED_MSG, { 'alert-danger': err.reason });
                FlashMessages.sendError(err.reason);
            }
            else {
                //return pageSession.set(USER_DELTED_MSG, { 'alert-success': infoMessages.userDeleted });
                FlashMessages.sendSuccess(infoMessages.userDeleted);
            }
        });

    }
});