//Event handling for product


Template.directory.events({

});

Template.directory.created = function() {

};

Template.directory.rendered = function() {
Session.set("userIDDirectoryView", Meteor.userId());
};

//Event handling for product
Template.directory.events({
    "click #add-directory": function(e, t) {
        e.preventDefault();
        commonAddClick(e, objModules.directory.name);
    },
    "change #userIDList":function(e,t){
      var userid = $(e.currentTarget).val();
      Session.set("userIDDirectoryView", userid);

    }
});
Template.directory.helpers({
  userList: function() {
    debugger;
      Meteor.subscribe("user_list", "");
      return user.find({}).fetch();
  },
  isAdmin:function(){
    debugger;
    if (Meteor.user().profile.role != "admin") {
        return false;

    } else {
        return true;
    }
  }
});
Template.directoryViewTable.helpers({
    selector: function() {
        if (Meteor.user().profile.role != "admin") {
            return {
                "userID": Meteor.userId()
            }
        } else {
            return {
            "userID":  Session.get("userIDDirectoryView")
            };
        }

    },

});

//Event handling for grid event edit and Delete
Template.directoryViewTable.events({
    "click #delete-button": function(e, t) {
        commonDelete(e, this._id, objModules.directory.name, objModules.directory.displayName);
    },
    //edit event for product
    "click #edit-button": function(e, t) {
        commonEditClick(e, this._id, objModules.directory.name);
    }
});
