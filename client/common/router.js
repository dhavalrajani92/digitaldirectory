Router.configure({
    layoutTemplate: "appLayout",
    loadingTemplate: 'loading',
    notFoundTemplate: "notFound",
    waitOn: function() {
        //return Meteor.subscribe("rssFeeds");
        return [Meteor.subscribe("settingsdata"), Meteor.subscribe("dshBoard-count")]
    }
});
var loginpath = "UserLogin";
var roleMap = [{
        route: "dashboard",
        roles: ["admin"]
    }, {
        route: "UserRegister",
        roles: ["admin"]
    }, {
        route: "UserList",
        roles: ["admin"]
    }, {
        route: "settings",
        roles: ["admin"]
    }, {
        route: "directory",
        roles: ["admin", "customer"]
    }, {
        route: "directory.insert",
        roles: ["admin", "customer"]
    }, {
        route: "directory.edit",
        roles: ["admin", "customer"]
    }, {
        route: "tenant",
        roles: ["admin", "customer"]
    }, {
        route: "tenant.insert",
        roles: ["admin", "customer"]
    }, {
        route: "tenant.edit",
        roles: ["admin", "customer"]
    }, {
        route: "horizontalview",
        roles: ["admin", "customer"]
    },

];
// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
    if (!routeName) {
        // route without name - enable access (?)
        return true;
    }

    if (!roleMap || roleMap.length === 0) {
        // this app don't have role map - enable access
        return true;
    }

    var roleMapItem = _.find(roleMap, function(roleItem) {
        return roleItem.route == routeName;
    });
    if (!roleMapItem) {
        // page is not restricted
        return true;
    }

    if (!Meteor.user() || !Meteor.user().profile.role) {
        // user is not logged in
        return false;
    }

    // this page is restricted to some role(s), check if user is in one of allowedRoles
    var allowedRoles = roleMapItem.roles;
    var granted = _.intersection(allowedRoles, [Meteor.user().profile.role]);
    if (!granted || granted.length === 0) {
        return false;
    }

    return true;
};
var loginrequired = function() {
    if (Meteor.userId()) {
        $('body').removeClass('login-content');
        $('html').removeClass('login-content');
        if (!routeGranted(this.route.getName())) {
            Router.go("directory");
        } else {
            this.next();
        }

    } else {
        Router.go(loginpath);

    }
};
var goToDashboard = function(pause) {
    if (Meteor.userId()) {
        if (Meteor.user() != undefined && Meteor.user().profile != undefined) {
            if (Meteor.user().profile.role == "admin") {
                Router.go("dashboard");
            } else {
                Router.go("directory");
            }
        } else {
            LaunchScreen.hold();
        }
    } else {
        this.next();
    }
};
var AddClasstoBody = function() {
    $('body').addClass('login-content');
    $('html').addClass('login-content');
};

if (Meteor.isClient) {
    dataReadyHold = LaunchScreen.hold();

    Router.onBeforeAction(loginrequired, {
        except: ['UserLogin', 'forgotpassword', 'resetpassword']
    });
    Router.onBeforeAction(goToDashboard, {
        only: ['UserLogin']
    });
    Router.onAfterAction(AddClasstoBody, {
        only: ['UserLogin', 'UserRegister']
    });
}

Router.map(function() {
    // this.route('home', {
    //     path: '/',
    //     fastRender: true
    // });
    this.route('UserLogin', {
        path: '/Login',
        fastRender: true,
        layoutTemplate: false
    });
    this.route('dashboard', {
        path: '/',
        fastRender: true
    });
    this.route('UserRegister', {
        path: '/UserRegister',
        fastRender: true,
        layoutTemplate: false
    });
    this.route('UserList', {
        path: '/UserList',
        fastRender: true

    });
    this.route('directory', {
        path: '/directory',
        fastRender: true

    });

    this.route('directory.insert', {
        path: '/directory-add',
        fastRender: true
    });

    this.route('directory.edit', {
        path: '/directory/:_id',
        controller: 'DirectoryControllerEdit',
        fastRender: true
    });

    this.route('tenant', {
        path: '/tenant',
        fastRender: true
    });

    this.route('tenant.insert', {
        path: '/tenant-add',
        controller: 'TenantControllerAdd',
        fastRender: true
    });

    this.route('tenant.edit', {
        path: '/tenant/:_id',
        controller: 'TenantControllerEdit',
        fastRender: true
    });
    this.route('directoryview', {
        path: '/directoryview/:_id',
        controller: 'DirectoryControllerView',
        fastRender: true,
        layoutTemplate: false
    });
    this.route('normalmode', {
        path: '/normalmode/:_id',
        controller:'DirectorynormaleView',
        fastRender: true,
        layoutTemplate: false
    });
    this.route('settings', {
        path: '/settings',
        fastRender: true
    });
    this.route('changePassword', {
        path: '/change-password',
        fastRender: true
    });
    this.route('profileView', {
        path: '/profileView',
        fastRender: true
    });
    this.route('forgotpassword', {
        path: '/forgot-password',
        fastRender: true,
        layoutTemplate: false

    });

    this.route('resetpassword', {
        path: '/reset-password/:token',
        fastRender: true,
        layoutTemplate: false,
        data: function() {
            Session.set('resetPassword', this.params.token);
        }
    });
    this.route('horizontalblacktheme', {
        path: '/horizontalblacktheme/:_id',
        controller: 'blackthemDirectoryControllerView',
        fastRender: true,
        layoutTemplate: false
    });
});
