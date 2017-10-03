
pageSession = new ReactiveDict();

window.ParsleyConfig = {
    errorTemplate: '<span></span>',
    errorsWrapper: '<span></span>',
    errorClass: 'has-error',
    successClass: '',
    trigger: 'blur',
    errorsContainer: function (pEle) {
        var $err = pEle.$element.siblings('.error-text');
        return $err;
    },
    classHandler: function (el) {
        return el.$element.parent();
    }
};

//Common method for add
this.commonAdd = function (objName, values, callBack, redirect) {

    Meteor.call("common_insert", objName, values, function (error, response) {
        if (error) {
            console.log(error);
            // set error message
            callBack(error, response);
        }
        else {
            // If success redirect to country
            if (redirect == undefined) {
                console.log(response);
                pageSessionSuccessMsgFlag = true;
                Router.go(objName, {});
            }
            else
                callBack(error, response);
        }
    });
}

//common method for edit
this.commonEdit = function (_id, objName, values, callBack, redirect) {
    Meteor.call("common_update", objName, _id, values, function (error, response) {
        if (error) {
            // set error message
            callBack(error.reason);
        }
        else {    // If success redirect
            if (redirect == undefined) {
                pageSessionUpdateMsgFlag = true;
                Router.go(objName, {});
            }
            else
                callBack(error, response);
        }
    });
    return false;
}

//common method for delete
this.commonDelete = function (ele, _id, objName, page, cb) {
    ele.preventDefault();

    Meteor.call('common_remove', objName, _id, function (error, response) {
        cb(error, response);
    });
}

//common click event for edit
this.commonEditClick = function (ele, _id, objName) {
    ele.preventDefault();
    Router.go(objName + ".edit", { _id: _id });
    return false;
}

//common click event for Add
this.commonAddClick = function (ele, objName) {
    ele.preventDefault();
    Router.go(objName + ".insert", {});
}

//common click event for cancel
this.commonCancelClick = function (ele, objName) {
    ele.preventDefault();
    Router.go(objName, {});
}

this.setMessages = function (key) {

    FlashMessages.clear();
    if (pageSessionSuccessMsgFlag == true && pageSessionSuccessMsgFlag != undefined) {
        FlashMessages.sendSuccess(key + " added successfully");
        pageSessionSuccessMsgFlag = false;
    }
    if (pageSessionUpdateMsgFlag == true && pageSessionUpdateMsgFlag != undefined) {
        FlashMessages.sendSuccess(key + " updated successfully");
        pageSessionUpdateMsgFlag = false;
    }
}

this.loginUser = function (email, password) {

    Meteor.loginWithPassword(email, password, function (error) {
        if (error) {
            FlashMessages.sendError(error.reason);
        }
        else {
            // Store email into localstorage for remember me
            if ($('#remember_me').is(':checked')) {
                localStorage.clientEmailBmw = email;
            } else {
                localStorage.clientEmailBmw = '';
            }
            $('#login-modal').modal('hide');
            console.log(error, 'logged in');
            Router.go('dashboard');
        }
    });
}

// Global helpers
Handlebars.registerHelper('menuAccess', function (routeName) {
  if (!routeGranted(routeName)) {
    return false;
  }
  return true;
});
Handlebars.registerHelper('menuItemClass', function (routeName) {
    if (!Router.current() || !Router.current().route) {
        return "";
    }

    if (!Router.routes[routeName]) {
        return "";
    }
    var currentPath = Router.routes[Router.current().route.getName()].handler.path;
    var routePath = Router.routes[routeName].handler.path;
    return currentPath == routePath ? "active" : "";


    //return currentPath.indexOf(routePath) === 0 ? "active" : "";
});

Handlebars.registerHelper('radioIsSelected', function (val) {
    if (val)
        return 'checked';
    else
        return '';
});
Handlebars.registerHelper("optionIsSelected", function (desiredValue, itemValue) {
  return desiredValue == itemValue ? "selected" : "";
});

Handlebars.registerHelper('getPasswordLength', function (lengthType) {
    if (lengthType == "min") {
        return 6;
    } else {
        return 100;
    }
});

Handlebars.registerHelper('designPostTrail', function () {

});

// load form validation message
Handlebars.registerHelper('loadFormValidationMessage', function () {
    Meteor.defer(function () {
        for (var i = 0; i < validationJSON.length; i++) {
            var items = $(validationJSON[i].selector);
            for (var j = 0; j < validationJSON[i].attributes.length; j++) {
                items.attr(validationJSON[i].attributes[j].name, validationJSON[i].attributes[j].value);
            }
        }
    });
    return "";
});

// get logged in user role
Handlebars.registerHelper('getUserRoles', function (routeName) {
    return userRoles;
});

// Common helpers for the pagesession messages
Handlebars.registerHelper('errorMessage', function (ERRORS_KEY) {
    return _.values(pageSession.get(ERRORS_KEY));
});

Handlebars.registerHelper('errorMessageType', function (ERRORS_KEY) {
    return _.keys(pageSession.get(ERRORS_KEY));
});


Handlebars.registerHelper('getPageObjName', function () {
    return pageObjName;
});

// get display name for particualr module
Handlebars.registerHelper('getDisplayName', function (objName) {
    return objModules[objName].displayName;
});

// format date
Template.registerHelper('formatDate', function (date, dateFormat) {
    return moment(date).format(dateFormat);
});

//get time from date
Template.registerHelper('getTime', function (datetime, timeFormat) {
    return moment(datetime).format(timeFormat);
});

// check is user logged in
Template.registerHelper('isLogin', function () {
    if (Meteor.userId())
        return true;
    else
        return false;
});

// get current User
Template.registerHelper('currentUser', function () {
    if (Meteor.userId())
        return Meteor.user();
    else
        return '';
});

// check logged in user is editor or not
Template.registerHelper('isEditor', function () {
    if (Meteor.userId()) {
        if (Meteor.user().profile.role == 'editor') {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }

});

// check logged in user is admin or not
Template.registerHelper('isAdmin', function () {
    if (Meteor.userId()) {
        if (Meteor.user().profile.role == 'admin') {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }

});

// check logged in user is admin or not
Template.registerHelper('getCurrentTime', function () {
  Meteor.setInterval(function(){
     Session.set("currentTime", moment().format('dddd, Do MMMM YYYY hh:mm:ss a'));
  }, 1000);
});

// check for trail's gallery img validation
Handlebars.registerHelper('checkGalleryImg', function (imgName) {
    if (imgName.indexOf('.') > -1) {
        return false;
    }
    else {
        return true;
    }
});

this.getDisplayName = function (objName) {
    var returnVal = '';
    $.each(displayName, function (key, value) {
        if (returnVal == "") {
            returnVal = value[objName];
        }
    })
    return returnVal;
}

this.getKeyByValue = function (obj, value) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (obj[prop] === value)
                return prop;
        }
    }
}

Handlebars.registerHelper('defaultStateMsg', function (msgType) {
    return defaultStateMessaged[msgType];
});

this.getBase64 = function (input, imgId) {
    if (input.files && input.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
            $('#' + imgId).attr("src", e.target.result);
        };
        FR.readAsDataURL(input.files[0]);
    }
}
