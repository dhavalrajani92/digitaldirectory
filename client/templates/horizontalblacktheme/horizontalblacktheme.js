var slider = null;
var keyboardglobalval = '';
Template.horizontalblacktheme.created = function() {
  slider = null;
  keyboardglobalval = '';
    var Tempraturetype = this.data.DirectoryDetails.temprature;
    Meteor.call("getWeatherData", this.data.DirectoryDetails.location.geopoint[0] + ',' + this.data.DirectoryDetails.location.geopoint[1], function(err, response) {
        if (err) {
            console.log(err);
        } else {
            if (Tempraturetype == "C") {
                response.currently.temperature = ((response.currently.temperature - 32) * 5 / 9).toFixed(0);
            } else {
                response.currently.temperature = (response.currently.temperature).toFixed(0);
            }
            Session.set('WeatherData', response);
        }
    });

    console.log(this.data.getAllTennant_Directory);
    var tdata = this.data.getAllTennant_Directory;
    debugger;
    var slidercount = parseInt(tdata.length / 14);
    if (tdata.length % 14 != 0) {
        slidercount = slidercount + 1;
    }
    var formatteddata = [];
    var format = [];
    var j = 1;
    tdata.forEach(function(d, i) {

        if (j <= 14) {
            format.push(d);
            j++;
        } else {
            formatteddata.push(format);
            format = [];
            format.push(d);
            j = 2;

        }
    });
    formatteddata.push(format);

    Session.set("getAllTennat", formatteddata);

};


//UserRegister template rendered
Template.horizontalblacktheme.rendered = function() {
    debugger;
    $('body').removeClass('login-page sw-toggled');

    var rssFeedArray = this.data.rssFeeds.rssFeed;
    var arrayCount = 0;

    if (rssFeedArray.length) {
        $('.clsRssFeedTitle').text(rssFeedArray[arrayCount].title);
        $('.clsRssFeedDesc').html(rssFeedArray[arrayCount].description);
        if ($('.clsRssFeedDesc').find('img').attr('src')) {
            //  $('.clsimageappend').html('<img alt="" src="' + $('.clsRssFeedDesc').find('img').attr('src') + '" id="imagetagID" class="img-responsive">');

            $("#imagetagID").attr('src', $('.clsRssFeedDesc').find('img').attr('src'));
            var Description = $('.clsRssFeedDesc >p').text();
            if (Description.length > 270) {
                $('.clsRssFeedDesc >p').text(Description.substr(0, 270) + '...');
            }
            $('.clsRssFeedDesc').children().remove('img')
        } else {
            $("#imagetagID").attr('src', '/images/preview-new.jpg');
            var Description = $('.clsRssFeedDesc').text();
            if (Description.length > 270) {
                $('.clsRssFeedDesc').text(Description.substr(0, 270) + '...');
            }
            //  $('.clsimageappend').html('<img alt="" src="/images/preview-new.jpg" id="imagetagID" class="img-responsive">');
        }

    }

    setInterval(function() {
        if (rssFeedArray.length != arrayCount) {
            arrayCount = arrayCount + 1;
        } else {
            arrayCount = 0;
            arrayCount = arrayCount + 1;
        }

        $('.cls-newsFeed').removeClass('animated')
        $('.cls-newsFeed').removeClass('fadeIn')

        setTimeout(function() {
            $('.clsRssFeedTitle').text(rssFeedArray[arrayCount].title);
            $('.clsRssFeedDesc').html(rssFeedArray[arrayCount].description);
            if ($('.clsRssFeedDesc').find('img').attr('src')) {
                //  $('.clsimageappend').html('<img alt="" src="' + $('.clsRssFeedDesc').find('img').attr('src') + '" id="imagetagID" class="img-responsive">');
                if ($('.clsRssFeedTitle').text().length > 60) {
                    $('.clsRssFeedTitle').text($('.clsRssFeedTitle').text().substr(0, 60) + '...');
                }
                $("#imagetagID").attr('src', $('.clsRssFeedDesc').find('img').attr('src'));
                var Description = $('.clsRssFeedDesc >p').text();
                if (Description.length > 270) {
                    $('.clsRssFeedDesc >p').text(Description.substr(0, 270) + '...');
                }
                $('.clsRssFeedDesc').children().remove('img')
            } else {
                $("#imagetagID").attr('src', '/images/preview-new.jpg');
                var Description = $('.clsRssFeedDesc').text();
                if (Description.length > 270) {
                    $('.clsRssFeedDesc').text(Description.substr(0, 270) + '...');
                }
                //  $('.clsimageappend').html('<img alt="" src="/images/preview-new.jpg" id="imagetagID" class="img-responsive">');
            }
            $('.cls-newsFeed').addClass('animated fadeIn');

        }, 1000);
    }, 5000);

    //$(".tv-bg").css('background-image', 'url(/cfs/files/Images/' + this.data.DirectoryDetails.bgImage + ')');
    var themeColor = this.data.DirectoryDetails.themeColor;
    $('.clsbordercolor').css('border', themeColor + ' solid 4px');
    setTimeout(function() {
        //   $('i.wi.clsiconcolor').css('color', themeColor);
    }, 3000);


    slider = $('.bxslider').bxSlider({
        autoControls: true,
        infiniteLoop:false,
        hideControlOnEnd:true

    });
    // $('.bx-controls').hide();
    $('.bx-pager').hide();
    var cw = $('.time-cer').width();
    $('.time-cer').height(cw + "px");



    $('.clsiconcolor').css('color', themeColor);

    setInterval(function() {
        //console.log($("#write").val());
        if (keyboardglobalval != $("#write").val().toLowerCase()) {
            keyboardglobalval = $("#write").val().toLowerCase();
            var tenanatList = tenant.find().fetch();
            var filtertannant = tenanatList.filter(function(e) {
                return e.Name.toLowerCase().indexOf($("#write").val().toLowerCase()) >= 0;
            });

            var formatteddata = [];
            var format = [];
            var j = 1;
            filtertannant.forEach(function(d, i) {

                if (j <= 14) {
                    format.push(d);
                    j++;
                } else {
                    formatteddata.push(format);
                    format = [];
                    format.push(d);
                    j = 2;

                }
            });
            if (filtertannant.length != 0) {
                formatteddata.push(format);
            }
            Session.set("getAllTennat", formatteddata);
            Meteor.setTimeout(function() {
                slider.reloadSlider();
                $('.bx-controls').show();
                $('.bx-pager').hide();
            }, 200);
            console.log(formatteddata);
        }
    }, 1000)

    $('head').append('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script><script src="http://vkboard.com/wp-content/themes/vkBoard/js/vkBoard.js"></script>');

    var keyboard = null;

    var directoryLang = this.data.DirectoryDetails.language;
    setTimeout(function() {

        keyboard = new vkBoard.keyboard("keyboard", "write");
        keyboard.loadVirtualLayout(language[directoryLang]);
        $("#page").attr("lang", "en");
        console.log('dir', keyboard.attr("dir"));
        $("#write").attr("dir", keyboard.attr("dir"));
        $("#write").focus();
    }, 1000);

};


//UserRegister template helpers
Template.horizontalblacktheme.helpers({

    classForLocationWeather: function() {
        var themeColor = this.DirectoryDetails.themeColor;
        Meteor.defer(function() {
            $('i.wi.clsiconcolor').css('color', themeColor);
        })
        var weatherDataicon = Session.get('WeatherData').currently.icon;
        if (weatherDataicon == "clear-day") {
            return "wi-day-sunny";
        } else if (weatherDataicon == "clear-night") {
            return "wi-night-clear";
        } else if (weatherDataicon == "rain") {
            return "wi-day-rain";
        } else if (weatherDataicon == "snow") {
            return "wi-day-snow";
        } else if (weatherDataicon == "sleet") {
            return "wi-day-sleet";
        } else if (weatherDataicon == "wind") {
            return "wi-day-windy";
        } else if (weatherDataicon == "fog") {
            return "wi-day-fog";
        } else if (weatherDataicon == "cloudy") {
            return "wi-day-cloudy-gusts";
        } else if (weatherDataicon == "partly-cloudy-day") {
            return "wi-day-cloudy";
        } else if (weatherDataicon == "partly-cloudy-night") {
            return "wi-night-alt-cloudy-gusts";
        } else {
            return "wi-day-sunny";
        }
    },

    WeatherData: function() {
        return Session.get('WeatherData').currently;
    },
    otherWeatherData: function() {
        var temperatureType = this.DirectoryDetails.temprature;
        var allWeatherData = Session.get('WeatherData');
        var finalWeatherData = [];
        allWeatherData = allWeatherData.daily.data.slice(2, 5);
        allWeatherData.forEach(function(d) {
            d['date'] = moment(new Date(d.time * 1000)).format('D MMM')
            if (temperatureType == "C") {
                d['temperatureMin'] = ((d.temperatureMin - 32) * 5 / 9).toFixed(0);
            } else {
                d['temperatureMin'] = (d.temperatureMin).toFixed(0);
            }
            //moment(new Date(d.time * 1000)).format('dddd, Do MMMM YYYY')
            var weatherDataicon = d.icon;
            if (weatherDataicon == "clear-day") {
                d['iconName'] = "wi-day-sunny";
            } else if (weatherDataicon == "clear-night") {
                d['iconName'] = "wi-night-clear";
            } else if (weatherDataicon == "rain") {
                d['iconName'] = "wi-day-rain";
            } else if (weatherDataicon == "snow") {
                d['iconName'] = "wi-day-snow";
            } else if (weatherDataicon == "sleet") {
                d['iconName'] = "wi-day-sleet";
            } else if (weatherDataicon == "wind") {
                d['iconName'] = "wi-day-windy";
            } else if (weatherDataicon == "fog") {
                d['iconName'] = "wi-day-fog";
            } else if (weatherDataicon == "cloudy") {
                d['iconName'] = "wi-day-cloudy-gusts";
            } else if (weatherDataicon == "partly-cloudy-day") {
                d['iconName'] = "wi-day-cloudy";
            } else if (weatherDataicon == "partly-cloudy-night") {
                d['iconName'] = "wi-night-alt-cloudy-gusts";
            } else {
                d['iconName'] = "wi-day-sunny";
            }
        })
        console.log(allWeatherData);
        return allWeatherData;
    },
    currentDateTime: function() {

        var hour = Session.get("currentTime").split(" ")[4].split(":")[0];
        var minute = Session.get("currentTime").split(" ")[4].split(":")[1];
        return {
            hour: hour,
            minute: minute,
            date: moment(new Date()).format('dddd MMMM DD')
        };
    },

    getAllTennantDirectory: function() {
        var searchedTenant = Session.get("getAllTennat");
        console.log(searchedTenant.length);
        return searchedTenant;
    },


});

//UserRegister template's all events
Template.horizontalblacktheme.events({


    "click #keyboard li": function(e) {
            console.log($(e.currentTarget).html());
            var $this = $(e.currentTarget)
            character = $(e.currentTarget).html(); // If it's a lowercase letter, nothing happens to this variable

            // Shift keys
            if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
                $('.letter').toggleClass('uppercase');
                $('.symbol span').toggle();

                shift = (shift === true) ? false : true;
                capslock = false;
                $("#write").change();
                return false;
            }

            // Caps lock
            if ($this.hasClass('capslock')) {
                $('.letter').toggleClass('uppercase');
                capslock = true;
                $("#write").change();
                return false;
            }

            // Delete
            if ($this.hasClass('delete')) {
                var html = $("#write").val();

                $("#write").val(html.substr(0, html.length - 1));
                $("#write").change();
                return false;
            }

            // Special characters
            if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
            if ($this.hasClass('space')) character = ' ';
            if ($this.hasClass('tab')) character = "\t";
            if ($this.hasClass('return')) character = "\n";

            // Uppercase letter
            if ($this.hasClass('uppercase')) character = character.toUpperCase();

            // Remove shift once a key is clicked.
            if (shift === true) {
                $('.symbol span').toggle();
                if (capslock === false) $('.letter').toggleClass('uppercase');

                shift = false;
            }
            console.log("DO IT ", character);
            // Add the character
            $("#write").val($("#write").val() + character);
            $("#write").change();
        }
        //   ,
        //   "change .clswrite": function() {
        //       debugger;
        //       console.log($("#write").val() + 'palas');
        //       var tenanatList = tenant.find().fetch();
        //       var filtertannant = tenanatList.filter(function(e) {
        //           return e.Name.toLowerCase().indexOf($("#write").val().toLowerCase()) == 0;
        //       });
        //       // var slidercount = parseInt(tdata.length / 18);
        //       // if (tdata.length % 18 != 0) {
        //       //     slidercount = slidercount + 1;
        //       // }
        //       var formatteddata = [];
        //         var format = [];
        //       var j = 1;
        //       filtertannant.forEach(function(d, i) {
        // format.push(d);
        //           if (j <= 18) {
        //               j++;
        //           } else {
        //               formatteddata.push(format);
        //               format=[];
        //               j = 1;
        //
        //           }
        //       });
        //       formatteddata.push(format);
        //       Session.set("getAllTennat", formatteddata);
        //   }
});
