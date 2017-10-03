TabularTables = {};

//registerHelper
Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

//Attached Tabular grid with User Schema
TabularTables.userList = new Tabular.Table({

    name: "userList",
    collection: user,
    autoWidth: false,
    columns: [{
            data: "createdAt",
            title: "Created At",
            visible: false
        }, {
            data: "profile.name",
            title: "Name"
        }, {
            data: "profile.role",
            title: "Role"
        }, {
            data: "profile.isActive",
            title: "IsActive"
        },
        // { data: "profile.specialty", title: "Specialty" },
        // { data: "profile.status", title: "Status" },
        {
            tmpl: Meteor.isClient && Template.editUserButtons,
            className: 'custom-action',
            title: 'action'
        }
    ],
    "dom": '<"table-heading"fl>t<"table-footer"ip>',
    order: [
        [0, 'desc']
    ]

});

//Attached Tabular grid with User Schema
TabularTables.directoryList = new Tabular.Table({

    name: "directoryList",
    collection: directory,
    autoWidth: false,
    columns: [{
            data: "createdAt",
            title: "Created At",
            visible: false
        }, {
            data: "userID",
            title: "userID",
            visible: false
        }, {
            data: "title",
            title: "Title"
        }, {
            data: "location",
            title: "Location",
            render: function(data, type, row) {
                return data.formattedAddress;

            }
        }, {
            data: "description",
            title: "Description"
        }, {
            data: "UserName()",
            title: "User Name"
        }, {
            data: "templateType",
            title: "View",
            render: function(data, type, row) {
              if(data == "BlackTheme")
              {
                return "<a href=" + Meteor.absoluteUrl() + "horizontalblacktheme/" + row._id + " target='_blank'>View</a>";

              }
                else {
                  return "<a href=" + Meteor.absoluteUrl() + "directoryView/" + row._id + " target='_blank'>View</a>";

              }

            }
        },
        // { data: "profile.specialty", title: "Specialty" },
        // { data: "profile.status", title: "Status" },
        {
            tmpl: Meteor.isClient && Template.editdirectoryButtons,
            className: 'custom-action',
            title: 'Action'
        }
    ],
    "dom": '<"table-heading"fl>t<"table-footer"ip>',
    order: [
        [0, 'desc']
    ]

});

//Attached Tabular grid with User Schema
TabularTables.tenantList = new Tabular.Table({

    name: "tenantList",
    collection: tenant,
    pub: "tabular_tenant",
    autoWidth: false,

    columns: [{
            data: "createdAt",
            title: "Created At",
            visible: false
        }, {
            data: "DirectoryID",
            title: "DirectoryID",
            visible: false
        }, {
            data: "directory()",
            title: "Directory",
            searchable: true
        }, {
            data: "Name",
            title: "Name"
        }, {
            data: "Floor",
            title: "Floor"
        }, {
            data: "Suite",
            title: "Suite"
        },
        // { data: "profile.specialty", title: "Specialty" },
        // { data: "profile.status", title: "Status" },
        {
            tmpl: Meteor.isClient && Template.editdirectoryButtons,
            className: 'custom-action',
            title: 'Action'
        }
    ],
    "dom": '<"table-heading"fl>t<"table-footer"ip>',
    order: [
        [0, 'desc']
    ]

});
tenant.helpers({
    directory: function() {

        var directoryData = directory.findOne({
            _id: this.DirectoryID
        });
        return directoryData.title;
    }
});
directory.helpers({
    UserName: function() {
        debugger;
        var UserName = user.findOne({
            _id: this.userID
        });
        return UserName.profile.name;
    }
});
