adminuserId="";
/* Accounts package config */
Meteor.startup(function () {
process.env["MAIL_URL"] = "smtp://mavani.nitesh@gmail.com:Nits7029@smtp.gmail.com:587/";
    if (Meteor.isCordova) {
        Meteor.defer(function () { Router.go('/'); });
    }
    if (Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
        for (var variableName in Meteor.settings.env) {
            process.env[variableName] = Meteor.settings.env[variableName];
        }
    }

    var adminUser = user.findOne({ "profile.role": 'admin' });

    if (adminUser == undefined) {
        /* Create Admin User */
        var values = {};
        values.email = 'admin@admin.com';
        values['password'] = 'admin_master_password';
        values.role = 'admin';
        values.name = 'Admin';

        Meteor.call('createUserServer', values, function (err, res) {
            console.log(err, res);
            adminuserId=res;
        });
    }
    else
    {
        adminuserId=adminUser._id;
    }
});
