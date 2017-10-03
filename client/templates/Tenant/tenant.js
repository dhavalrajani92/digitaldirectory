
//Event handling for product
Template.tenant.events({

});

Template.tenant.created = function () {

};

Template.tenant.rendered = function () {
  Session.set("DirectoryIDtenantView", "-1");

};

Template.tenant.helpers({
  DirectoryList: function() {
    debugger;
      Meteor.subscribe("directory_details_user", "");
      return directory.find({}).fetch();
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
//Event handling for product
Template.tenant.events({
    "click #add-tenant": function (e, t) {
        e.preventDefault();
        commonAddClick(e, objModules.tenant.name);
    },
    "change #DirectoryID":function(e,t){
      var DirectoryID = $(e.currentTarget).val();
      Session.set("DirectoryIDtenantView", DirectoryID);

    }
});

Template.tenantViewTable.helpers({
    selector: function () {
        if(Meteor.user().profile.role != "admin")
        {
            return { "userID": Meteor.userId() }
        }
        else
        {
          if(Session.get("DirectoryIDtenantView") != "-1")
          {
            return {"DirectoryID":Session.get("DirectoryIDtenantView")}
          }
          else {
            return {};
          }
        }

    }
});

//Event handling for grid event edit and Delete
Template.tenantViewTable.events({
    "click #delete-button": function (e, t) {
        commonDelete(e, this._id, objModules.tenant.name, objModules.tenant.displayName);
    },
    //edit event for product
    "click #edit-button": function (e, t) {
        commonEditClick(e, this._id, objModules.tenant.name);
    }
});
