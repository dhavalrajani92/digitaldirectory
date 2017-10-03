
var arrScreenshots = '';
var bgImage = '';
var orientation = '';
var arrimageforslider = [];
var sessionImageSlider = [];
var imagecnt = 0;
var address = {};
Session.set('imageGalary', sessionImageSlider);
Template.directoryEdit.onCreated(function() {
    arrScreenshots = '';
    orientation = '';
    arrimageforslider = [];
    sessionImageSlider = [];
    address = this.data.DirectoryDetails.location;
    imagecnt = 0;
    Session.set('imageGalary', sessionImageSlider);
    arrScreenshots = this.data.DirectoryDetails.logo;
    orientation = '';
    var gallary = this.data.DirectoryDetails.gallary;
    gallary.forEach(function(d, i) {
        d['index'] = i + 1;
    });
    arrimageforslider = gallary;
    imagecnt = this.data.DirectoryDetails.gallary.length + 1;
    this.data.DirectoryDetails.gallary.forEach(function(v, i) {
        var className = '';
        if (i == 0) {
            className = 'active';
        }
        sessionImageSlider.push({
            index: i + 1,
            value: v['imageId'],
            class: className,
            caption: v.caption
        });
    })

    Session.set('imageGalary', sessionImageSlider);
});

Template.directoryEdit.onRendered(function() {
    $('#directoryEdit').parsley({
        trigger: 'blur'
    });
    // $(".clsOrientation").removeClass("bgm-blue");
    $(".clsOrientation").find('img').removeAttr("style");
    if ($("[name='orientationType']").val() == "Horizontal") {
        $('[data-layout="Horizontal"]').find('img').css({
            "border": "3px solid green"
        });
    } else {
        $('[data-layout="Vertical"]').find('img').css({
            "border": "3px solid green"
        });
    }

    $(".clstemplateType").find('img').removeAttr("style");
    // if ($("[name='templateType']").val() == "BlackTheme") {
    //     $('[data-layout="Horizontal"]').find('img').css({"border":"3px solid green"});
    // }
    $('.themeselect').hide();
    $('#' + this.data.DirectoryDetails.orientationType + 'Section').show();
    $('[data-layout=' + this.data.DirectoryDetails.templateType + ']').find('img').css({
        "border": "3px solid green"
    });
    if (this.data.DirectoryDetails.templateType == "BlackTheme") {
        $("#divSliderMsg").show();
        $("#divSlider").hide();

    } else {
        $("#divSliderMsg").hide();
        $("#divSlider").show();
    }
    initJS();

    var o = this;
    $('#rootwizard1').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            _handleTabShow(tab, navigation, index, $('#rootwizard1'));
        }
    });

    if ($('.color-picker')[0]) {
        $('.color-picker').each(function() {
            var colorOutput = $(this).closest('.cp-container').find('.cp-value');
            $(this).farbtastic(colorOutput);
        });
    }
    if ($('.chosen')[0]) {
        $('.chosen').chosen({
            width: '100%',
            allow_single_deselect: true
        });
    }
    if (address != undefined) {
        $("#location1").val(address.formattedAddress);
    }
    var input = document.getElementById('location1');

    google.maps.event.addDomListener(input, 'keydown', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function() {
        debugger;
        address = {};
        var place = autocomplete.getPlace();
        address.formattedAddress = place.formatted_address;
        address.geopoint = [place.geometry.location.lat(), place.geometry.location.lng()];
        address.city = place.address_components[0]['long_name']
        address.postalCode = place.address_components[3]['long_name']
        address.country = place.address_components[2]['short_name']
        address.countryName = place.address_components[2]['long_name']
        console.log(address);

    });
});


Template.directoryEdit.helpers({
    galaryIamage: function() {
        return Session.get('imageGalary');
    },
    isoLangs: function() {

        return isoLangs;
    },
    screenShot: function() {
        var screenShotData = sessionImageSlider;
        screenShotData.push({
            index: imagecnt,
            value: '',
            class: '',
            caption: ''
        });
        return screenShotData;
    },
    rssfeedlist: function() {
        return rssFeedDdl.find().fetch()[0].rssFeeds;
    }

});

Template.directoryEdit.events({
    'click .clsOrientation': function(e, t) {
        debugger;
        e.preventDefault();
        orientation = $(e.currentTarget).attr("data-layout");
        $('.themeselect').hide();
        $('#' + orientation + 'Section').show();
        $("input[name='orientationType']").val(orientation);
        //  console.log($("[name='orientationType']").val(), orientation);
        // $(".clsOrientation").removeClass("bgm-blue");
        // $(e.currentTarget).addClass("bgm-blue");
        $(".clsOrientation").find('img').removeAttr("style");
        $(e.currentTarget).find('img').css({
            "border": "3px solid green"
        });

    },
    // Event handle for cancel
    "click #form-cancel-button": function(e, t) {
        commonCancelClick(e, objModules.directory.name);
    },
    "change #NewsFeed1": function(e, v) {

        Meteor.call('getRssContent', "rssFeed", $("#NewsFeed1").val(), "", "true", function(err, res) {
            if (err) {
                //  console.log(err);
                FlashMessages.sendError(infoMessages.RssFeedInCorrect);
            } else {
                FlashMessages.sendSuccess(infoMessages.RssFeedCorrect);
            }
        })

    },
    'submit #directoryEdit': function(e, t) {
        e.preventDefault();
        debugger;
        getValues($('#directoryEdit'), function(values) {
            delete values['undefined'];
            values.logo = arrScreenshots;
            values.location = address;
            values.bgImage = bgImage;
            var arrGalary = [];
            $('.multifile').each(function(i, v) {
                if (arrimageforslider[i] != undefined) {
                    arrGalary.push({
                        caption: $(this).find('input').val(),
                        imageId: arrimageforslider[i]['imageId']
                    });
                }
            });
            values.gallary = arrGalary;
            //call common function for insert
            commonEdit(t.data._id, objModules.directory.name, values, function(err, res) {
                if (err)
                    FlashMessages.sendError(err.reason);
                else {
                    FlashMessages.clear();
                    FlashMessages.sendSuccess('Directory updated successfuly.');
                }
            });

        });
    },

    'change .imgInput': function(event, template) {
        event.preventDefault();
        $('#imgPreview' + (imagecnt)).parent('div').append('<div class="preloader"><svg class="pl-circular" viewBox="25 25 50 50"><circle class="plc-path" cx="50" cy="50" r="20" /></svg></div>');
        var file = '';
        debugger;
        var photo = event.currentTarget;
        getBase64(photo, 'imgPreview');
        FS.Utility.eachFile(event, function(file) {
            var theFile = new FS.File(file);
            Images.insert(theFile, function(err, fileObj) {
                arrScreenshots = fileObj._id;
                $('.preloader').remove();
            });
        });
    },

    'change .imgbgImageInput': function(event, template) {
        event.preventDefault();
        $('#imgPreviewbgImage' + (imagecnt)).parent('div').append('<div class="preloader"><svg class="pl-circular" viewBox="25 25 50 50"><circle class="plc-path" cx="50" cy="50" r="20" /></svg></div>');
        var file = '';
        debugger;
        var photo = event.currentTarget;
        getBase64(photo, 'imgPreviewbgImage');
        FS.Utility.eachFile(event, function(file) {
            var theFile = new FS.File(file);
            Images.insert(theFile, function(err, fileObj) {
                bgImage = fileObj._id;
                $('.preloader').remove();
            });
        });
    },
    'change .imgInput1': function(event, template) {
        event.preventDefault();
        $('#imgPreview' + (imagecnt)).parent('div').append('<div class="preloader"><svg class="pl-circular" viewBox="25 25 50 50"><circle class="plc-path" cx="50" cy="50" r="20" /></svg></div>');
        var file = '';
        debugger;
        var photo = event.currentTarget;


        getBase64(photo, 'imgPreview' + (imagecnt));

        FS.Utility.eachFile(event, function(file) {
            var theFile = new FS.File(file);
            Images.insert(theFile, function(err, fileObj) {
                arrimageforslider.push({
                    index: imagecnt,
                    imageId: fileObj._id
                });

                imagecnt += 1;
                $('.multifile:last').after('<div class="col-md-3 multifile"><div class="fileinput-preview thumbnail" data-trigger="fileinput"><img id="imgPreview' + imagecnt + '"></div><div class="row"><div class="col-md-8"><input type="text"></div><div class="col-md-2 closed" data-name="close' + imagecnt + '" tooltip="f136"><p><i class="zmdi zmdi-close zmdi-hc-fw"></i> </p></div></div></div>');

                $('.clsPreview').parent('span').show();
                $('.preloader').remove();
                $('.imgInput1').val(null);
            });
        });

        console.log(imagecnt);
    },
    'click .clsPreview': function() {
        refreshPreview();
    },
    'click .closed': function(e) {
        if ($(e.currentTarget).parent().parent().find('img').attr('src') != undefined) {
            var index = $(e.currentTarget).attr('data-name').replace('close', "");
            arrimageforslider = arrimageforslider.filter(function(d) {
                return d.index != (+index);
            });
            console.log(arrimageforslider);
            refreshPreview();
            $('[data-name="close' + index + '"]').closest('.multifile').remove();
        }
    },
    'click .clstemplateType': function(e, t) {
        $(".clstemplateType").find('img').removeAttr("style");
        $("input[name='templateType']").val($(e.currentTarget).attr("data-layout"));
        $(e.currentTarget).find('img').css({
            "border": "3px solid green"
        });
        if ($(e.currentTarget).attr("data-layout") == "BlackTheme") {
            $("#divSliderMsg").show();
            $("#divSlider").hide();

        } else {
            $("#divSliderMsg").hide();
            $("#divSlider").show();
        }
    },

})

function refreshPreview() {
    sessionImageSlider = [];
    debugger;
    $('.multifile').each(function(i, v) {
        if (arrimageforslider[i] != undefined) {
            var className = '';
            if (i == 0) {
                className = 'active';
            }
            sessionImageSlider.push({
                index: i + 1,
                value: arrimageforslider[i]['imageId'],
                class: className,
                caption: $(this).find('input').val()
            });
        }
    });
    console.log(sessionImageSlider);
    Session.set('imageGalary', sessionImageSlider);
}

function initJS() {
    /*!
     * jQuery twitter bootstrap wizard plugin
     * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
     * version 1.0
     * Requires jQuery v1.3.2 or later
     * Supports Bootstrap 2.2.x, 2.3.x, 3.0
     * Dual licensed under the MIT and GPL licenses:
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.gnu.org/licenses/gpl.html
     * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
     */
    (function(e) {
        var k = function(d, g) {
            d = e(d);
            var a = this,
                b = e.extend({}, e.fn.bootstrapWizard.defaults, g),
                f = null,
                c = null;
            this.rebindClick = function(b, a) {
                b.unbind("click", a).bind("click", a)
            };
            this.fixNavigationButtons = function() {
                f.length || (c.find("a:first").tab("show"), f = c.find('li:has([data-toggle="tab"]):first'));
                e(b.previousSelector, d).toggleClass("disabled", a.firstIndex() >= a.currentIndex());
                e(b.nextSelector, d).toggleClass("disabled", a.currentIndex() >= a.navigationLength());
                a.rebindClick(e(b.nextSelector, d),
                    a.next);
                a.rebindClick(e(b.previousSelector, d), a.previous);
                a.rebindClick(e(b.lastSelector, d), a.last);
                a.rebindClick(e(b.firstSelector, d), a.first);
                if (b.onTabShow && "function" === typeof b.onTabShow && !1 === b.onTabShow(f, c, a.currentIndex())) return !1
            };
            this.next = function(h) {
                if (d.hasClass("last") || b.onNext && "function" === typeof b.onNext && !1 === b.onNext(f, c, a.nextIndex())) return !1;
                $index = a.nextIndex();
                $index > a.navigationLength() || c.find('li:has([data-toggle="tab"]):eq(' + $index + ") a").tab("show")
            };
            this.previous =
                function(h) {
                    if (d.hasClass("first") || b.onPrevious && "function" === typeof b.onPrevious && !1 === b.onPrevious(f, c, a.previousIndex())) return !1;
                    $index = a.previousIndex();
                    0 > $index || c.find('li:has([data-toggle="tab"]):eq(' + $index + ") a").tab("show")
                };
            this.first = function(h) {
                if (b.onFirst && "function" === typeof b.onFirst && !1 === b.onFirst(f, c, a.firstIndex()) || d.hasClass("disabled")) return !1;
                c.find('li:has([data-toggle="tab"]):eq(0) a').tab("show")
            };
            this.last = function(h) {
                if (b.onLast && "function" === typeof b.onLast && !1 ===
                    b.onLast(f, c, a.lastIndex()) || d.hasClass("disabled")) return !1;
                c.find('li:has([data-toggle="tab"]):eq(' + a.navigationLength() + ") a").tab("show")
            };
            this.currentIndex = function() {
                return c.find('li:has([data-toggle="tab"])').index(f)
            };
            this.firstIndex = function() {
                return 0
            };
            this.lastIndex = function() {
                return a.navigationLength()
            };
            this.getIndex = function(a) {
                return c.find('li:has([data-toggle="tab"])').index(a)
            };
            this.nextIndex = function() {
                return c.find('li:has([data-toggle="tab"])').index(f) + 1
            };
            this.previousIndex =
                function() {
                    return c.find('li:has([data-toggle="tab"])').index(f) - 1
                };
            this.navigationLength = function() {
                return c.find('li:has([data-toggle="tab"])').length - 1
            };
            this.activeTab = function() {
                return f
            };
            this.nextTab = function() {
                return c.find('li:has([data-toggle="tab"]):eq(' + (a.currentIndex() + 1) + ")").length ? c.find('li:has([data-toggle="tab"]):eq(' + (a.currentIndex() + 1) + ")") : null
            };
            this.previousTab = function() {
                return 0 >= a.currentIndex() ? null : c.find('li:has([data-toggle="tab"]):eq(' + parseInt(a.currentIndex() - 1) + ")")
            };
            this.show = function(a) {
                return d.find('li:has([data-toggle="tab"]):eq(' + a + ") a").tab("show")
            };
            this.disable = function(a) {
                c.find('li:has([data-toggle="tab"]):eq(' + a + ")").addClass("disabled")
            };
            this.enable = function(a) {
                c.find('li:has([data-toggle="tab"]):eq(' + a + ")").removeClass("disabled")
            };
            this.hide = function(a) {
                c.find('li:has([data-toggle="tab"]):eq(' + a + ")").hide()
            };
            this.display = function(a) {
                c.find('li:has([data-toggle="tab"]):eq(' + a + ")").show()
            };
            this.remove = function(a) {
                var b = "undefined" != typeof a[1] ? a[1] :
                    !1;
                a = c.find('li:has([data-toggle="tab"]):eq(' + a[0] + ")");
                b && (b = a.find("a").attr("href"), e(b).remove());
                a.remove()
            };
            c = d.find("ul:first", d);
            f = c.find('li:has([data-toggle="tab"]).active', d);
            c.hasClass(b.tabClass) || c.addClass(b.tabClass);
            if (b.onInit && "function" === typeof b.onInit) b.onInit(f, c, 0);
            if (b.onShow && "function" === typeof b.onShow) b.onShow(f, c, a.nextIndex());
            a.fixNavigationButtons();
            e('a[data-toggle="tab"]', c).on("click", function(d) {
                d = c.find('li:has([data-toggle="tab"])').index(e(d.currentTarget).parent('li:has([data-toggle="tab"])'));
                if (b.onTabClick && "function" === typeof b.onTabClick && !1 === b.onTabClick(f, c, a.currentIndex(), d)) return !1
            });
            e('a[data-toggle="tab"]', c).on("shown shown.bs.tab", function(d) {
                $element = e(d.target).parent();
                d = c.find('li:has([data-toggle="tab"])').index($element);
                if ($element.hasClass("disabled") || b.onTabChange && "function" === typeof b.onTabChange && !1 === b.onTabChange(f, c, a.currentIndex(), d)) return !1;
                f = $element;
                a.fixNavigationButtons()
            })
        };
        e.fn.bootstrapWizard = function(d) {
            if ("string" == typeof d) {
                var g = Array.prototype.slice.call(arguments,
                    1);
                1 === g.length && g.toString();
                return this.data("bootstrapWizard")[d](g)
            }
            return this.each(function(a) {
                a = e(this);
                if (!a.data("bootstrapWizard")) {
                    var b = new k(a, d);
                    a.data("bootstrapWizard", b)
                }
            })
        };
        e.fn.bootstrapWizard.defaults = {
            tabClass: "nav nav-pills",
            nextSelector: ".wizard li.next",
            previousSelector: ".wizard li.previous",
            firstSelector: ".wizard li.first",
            lastSelector: ".wizard li.last",
            onShow: null,
            onInit: null,
            onNext: null,
            onPrevious: null,
            onLast: null,
            onFirst: null,
            onTabChange: null,
            onTabClick: null,
            onTabShow: null
        }
    })(jQuery);

}
