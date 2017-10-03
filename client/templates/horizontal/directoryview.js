 shift = false,
     capslock = false;
 var slider = null;
 Template.directoryview.created = function() {

   shift = false,
       capslock = false;
   slider = null;

     var Tempraturetype = this.data.DirectoryDetails.temprature;
     console.log(this.data.DirectoryDetails.location.geopoint[0]);
     Meteor.call("getWeatherData", this.data.DirectoryDetails.location.geopoint[0] + ',' + this.data.DirectoryDetails.location.geopoint[1], function(err, response) {
         if (err) {
             console.log(err);
         } else {
             if (Tempraturetype == "C") {
                 response.currently.temperature = ((response.currently.temperature - 32) * 5 / 9).toFixed(0);
             }
             else {
                 response.currently.temperature= (response.currently.temperature).toFixed(0);
             }

             Session.set('WeatherData', response);

         }


     });
     var tdata = this.data.getAllTennant_Directory;
     Session.set("getAllTennat", tdata);

 };
 //UserRegister template rendered
 Template.directoryview.rendered = function() {


     //  $('.start-button').on('click', function() {
     //      $(this).hide();
     //      $('.slider-card').hide();
     //      $('.search-list').show();
     //      $('.home-button').show();
     //  });
     //
     //  $('.home-button').on('click', function() {
     //      $(this).hide();
     //      $('.slider-card').show();
     //      $('.search-list').hide();
     //      $('.start-button').show();
     //  });


     // sliderGlobal= $('.bxslider').bxSlider({
     //      auto: true
     //  });
     //
     //
     //  var cw = $('.time-cer').width();
     // 	  $('.time-cer').height(cw + "px");
     //
     //  $(window).resize(function() {
     //      var cw = $('.time-cer').width();
     //      $('.time-cer').height(cw + "px");
     //  });
 };

 //UserRegister template helpers
 Template.directoryview.helpers({
     WeatherData: function() {
         return Session.get('WeatherData').currently;
     },
     classForLocationWeather: function() {

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
     otherWeatherData: function() {
         var temperatureType = this.DirectoryDetails.temprature;
         var allWeatherData = Session.get('WeatherData');
         var finalWeatherData = [];
         allWeatherData = allWeatherData.daily.data.slice(2, 4);
         allWeatherData.forEach(function(d) {

             d['date'] = moment(Date(d.time)).format('dddd, Do MMMM YYYY')
             if (temperatureType == "C") {
                 d['temperatureMin'] = ((d.temperatureMin - 32) * 5 / 9).toFixed(0);
             }
             else {
                 d['temperatureMin']= (d.temperatureMin).toFixed(0);
             }

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
         return allWeatherData;
     },

     currentDateTime: function() {
         return Session.get("currentTime");
     },

     galaryIamage: function() {

         var ImageSlider = [];
         var Sliderdata = this.DirectoryDetails.gallary;
         Sliderdata.forEach(function(v, i) {

             var className = '';
             if (i == 0) {
                 className = 'active';
             }
             ImageSlider.push({
                 index: i + 1,
                 value: v['imageId'],
                 class: className,
                 caption: v['caption']
             });
         });
         return ImageSlider;
     },


     getMobileOrWeb: function() {
         var templateType = this.DirectoryDetails.templateType;
         if (templateType == "Vertical") {
             return "NewVerticalViewTemplate";
         } else {
             return "HorizontalViewTemplate";
         }
     },
     getAllTennantDirectory: function() {
         return Session.get("getAllTennat");
     }

 });

Template.directoryview.events({
  "click #Handicap": function(e, t){
    debugger;
    location.href="../normalmode/"+t.data.DirectoryDetails._id;
  }
});

 Template.VerticalViewTemplate.created = function() {
     var Tempraturetype = this.data.DirectoryDetails.temprature;
     console.log(this.data.DirectoryDetails.location.geopoint[0]);
     Meteor.call("getWeatherData", this.data.DirectoryDetails.location.geopoint[0] + ',' + this.data.DirectoryDetails.location.geopoint[1], function(err, response) {
         if (err) {
             console.log(err);
         } else {
             if (Tempraturetype == "C") {
                 response.currently.temperature = ((response.currently.temperature - 32) * 5 / 9).toFixed(0);
             }
             else {
                response.currently.temperature= (response.currently.temperature).toFixed(0);
             }
             Session.set('WeatherData', response);

         }


     });

     var tdata = this.data.getAllTennant_Directory;
     Session.set("getAllTennat", tdata);

 };
 Template.VerticalViewTemplate.rendered = function() {
     setInterval(function() {
         console.log($("#write").val());
         var tenanatList = tenant.find().fetch();
         var filtertannant = tenanatList.filter(function(e) {
             return e.Name.toLowerCase().indexOf($("#write").val().toLowerCase()) >= 0;
         });
         Session.set("getAllTennat", filtertannant);
     }, 1000)


     $('#carousel-example-generic img').css('height', $('.slider').parent().height() - 20);
     $('#carousel-example-generic img').css('width', '100%');

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


 Template.VerticalViewTemplate.helpers({
     WeatherData: function() {
         return Session.get('WeatherData').curre;
     },
     otherWeatherData: function() {
         var temperatureType = this.DirectoryDetails.temprature;
         var allWeatherData = Session.get('WeatherData');
         var finalWeatherData = [];
         allWeatherData = allWeatherData.daily.data.slice(2, 5);
         allWeatherData.forEach(function(d) {
             d['date'] = moment(new Date(d.time * 1000)).format('dddd, Do MMMM YYYY')
             if (temperatureType == "C") {
                 d['temperatureMin'] = ((d.temperatureMin - 32) * 5 / 9).toFixed(0);
             }
             else {
                d['temperatureMin']= (d.temperatureMin).toFixed(0);
             }
         })
         console.log(allWeatherData);
         return allWeatherData;
     },
     currentDateTime: function() {
         return Session.get("currentTime");
     },

     galaryIamage: function() {

         var ImageSlider = [];
         var Sliderdata = this.DirectoryDetails.gallary;
         Sliderdata.forEach(function(v, i) {

             var className = '';
             if (i == 0) {
                 className = 'active';
             }
             ImageSlider.push({
                 index: i + 1,
                 value: v['imageId'],
                 class: className,
                 caption: v['caption']
             });
         });
         return ImageSlider;
     },

     settings: function() {
         return {
             position: "top",
             limit: 5,
             rules: [{
                 collection: 'tenant',
                 subscription: 'autocompleteTenant',
                 filter: {
                     DirectoryID: directory.findOne()._id
                 },
                 field: "Name",
                 template: Template.searchAutoSuggestion
             }]
         };
     },


     getMobileOrWeb: function() {
         var orientationType = this.DirectoryDetails.orientationType;
         if (orientationType == "Vertical") {
             return "VerticalViewTemplate";
         } else {
             return "HorizontalViewTemplate";
         }

     },
     getAllTennantDirectory: function() {
         return Session.get("getAllTennat");
     }

 });

 Template.VerticalViewTemplate.events({
     "click .startbuttonId": function(e) {
         $(".ImageSliderId").hide();
         $("#tennantSearch").show();
         $('.startbuttonId').addClass('stopbuttonId').removeClass('startbuttonId').html('<label style="margin-top:1%"><h3>Stop Searching</h3></label>');
     },

     "click .stopbuttonId": function(e) {
         $(".ImageSliderId").show();
         $("#tennantSearch").hide();
         $('.stopbuttonId').removeClass('stopbuttonId').addClass('startbuttonId').html('<label style="margin-top:1%"><h3>Start Searching</h3></label>');
     },

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
     },
     "change #write": function() {

         console.log($("#write").val());
         var tenanatList = tenant.find().fetch();
         var filtertannant = tenanatList.filter(function(e) {
             return e.Name.toLowerCase().indexOf($("#write").val().toLowerCase()) >= 0;
         });
         Session.set("getAllTennat", filtertannant);
     }
 });

 Template.HorizontalViewTemplate.created = function() {
   shift = false,
       capslock = false;
   slider = null
     var Tempraturetype = this.data.DirectoryDetails.temprature;
     Meteor.call("getWeatherData", this.data.DirectoryDetails.location.geopoint[0] + ',' + this.data.DirectoryDetails.location.geopoint[1], function(err, response) {
         if (err) {
             console.log(err);
         } else {
             if (Tempraturetype == "C") {
                 response.currently.temperature = ((response.currently.temperature - 32) * 5 / 9).toFixed(0);
             }
             else {
                 response.currently.temperature= ( response.currently.temperature).toFixed(0);
             }
             Session.set('WeatherData', response);

         }
     });

     console.log(this.data.getAllTennant_Directory);
     var tdata = this.data.getAllTennant_Directory;
     Session.set("getAllTennat", tdata);


 };
 //UserRegister template rendered
 Template.HorizontalViewTemplate.rendered = function() {
     debugger;
     $('body').removeClass('login-page sw-toggled');

     var rssFeedArray = this.data.rssFeeds.rssFeed;
     var arrayCount = 0;

     if (rssFeedArray.length) {
         $('.clsRssFeedTitle').text(rssFeedArray[0].title);
         $('.clsRssFeedDesc').html(rssFeedArray[0].description);
         if ($('.clsRssFeedDesc').find('img').attr('src')) {
             //  $('.clsimageappend').html('<img alt="" src="' + $('.clsRssFeedDesc').find('img').attr('src') + '" id="imagetagID" class="img-responsive">');

             $("#imagetagID").attr('src', $('.clsRssFeedDesc').find('img').attr('src'));
             var Description = $('.clsRssFeedDesc >p').text();
             if (Description.length > 350) {
                 $('.clsRssFeedDesc >p').text(Description.substr(0, 350) + '...');
             }
             $('.clsRssFeedDesc').children().remove('img')
         } else {
             $("#imagetagID").attr('src', '/images/preview-new.jpg');
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

                 $("#imagetagID").attr('src', $('.clsRssFeedDesc').find('img').attr('src'));
                 var Description = $('.clsRssFeedDesc >p').text();
                 if (Description.length > 350) {
                     $('.clsRssFeedDesc >p').text(Description.substr(0, 350) + '...');
                 }
                 $('.clsRssFeedDesc').children().remove('img')
             } else {
                 $("#imagetagID").attr('src', '/images/preview-new.jpg');
                 //  $('.clsimageappend').html('<img alt="" src="/images/preview-new.jpg" id="imagetagID" class="img-responsive">');
             }
             $('.cls-newsFeed').addClass('animated fadeIn');

         }, 1000);
     }, 5000);

     $(".tv-bg").css('background-image', 'url(/cfs/files/Images/' + this.data.DirectoryDetails.bgImage + ')');
     var themeColor = this.data.DirectoryDetails.themeColor;
     $('.clsbordercolor').css('border', themeColor + ' solid 4px');
     $('.btnbackcolor').css('background-color', themeColor);
     setTimeout(function() {
         //   $('i.wi.clsiconcolor').css('color', themeColor);
     }, 3000);

     $('.start-button').on('click', function() {
         $(this).hide();
         $('.slider-card').hide();
         $('.search-list').show();
         $('.home-button').show();
         slider.stopAuto();
     });

     $('.home-button').on('click', function() {
         $(this).hide();
         $('.slider-card').show();
         $('.search-list').hide();
         $('.start-button').show();
         slider.startAuto();
     });

     slider = $('.bxslider').bxSlider({
         auto: true,
         captions: true
     });

     var cw = $('.time-cer').width();
     $('.time-cer').height(cw + "px");

     $(window).resize(function() {
         var cw = $('.time-cer').width();
         $('.time-cer').height(cw + "px");
     });

     $('.clsiconcolor').css('color', themeColor);

     setInterval(function() {
        //  console.log($("#write").val());
         var tenanatList = tenant.find().fetch();
         var filtertannant = tenanatList.filter(function(e) {
             return e.Name.toLowerCase().indexOf($("#write").val().toLowerCase()) >= 0;
         });
         Session.set("getAllTennat", filtertannant);
     }, 1000)

     $('head').append('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script><script src="http://vkboard.com/wp-content/themes/vkBoard/js/vkBoard.js"></script>');

     var keyboard = null;

     var directoryLang = this.data.DirectoryDetails.language;
     setTimeout(function() {
         keyboard = new vkBoard.keyboard("keyboard", "write");
         keyboard.loadVirtualLayout(language[directoryLang]);
         $("#page").attr("lang", "en");
        //  console.log('dir', keyboard.attr("dir"));
         $("#write").attr("dir", keyboard.attr("dir"));
         $("#write").focus();
     }, 1000);

 };


 //UserRegister template helpers
 Template.HorizontalViewTemplate.helpers({

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
             d['date'] = moment(new Date(d.time * 1000)).format('D')
             if (temperatureType == "C") {
                 d['temperatureMin'] = ((d.temperatureMin - 32) * 5 / 9).toFixed(0);
             }
             else {
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
             date: moment(new Date()).format('dddd, Do MMMM YYYY')
         };
     },

     galaryIamage: function() {

         var ImageSlider = [];
         var Sliderdata = this.DirectoryDetails.gallary;
         Sliderdata.forEach(function(v, i) {

             var className = '';
             if (i == 0) {
                 className = 'active';
             }
             ImageSlider.push({
                 index: i + 1,
                 value: v['imageId'],
                 class: className,
                 caption: v['caption']
             });
         });
         return ImageSlider;
     },


     getMobileOrWeb: function() {
         var orientationType = this.DirectoryDetails.orientationType;
         if (orientationType == "Vertical") {
             return "VerticalViewTemplate";
         } else {
             return "HorizontalViewTemplate";
         }
     },
     getAllTennantDirectory: function() {
         return Session.get("getAllTennat");
     },
     isServiceTypeFree: function() {

         if (this.DirectoryDetails.serviceType == "Free") {
             return true;
         } else {
             return false;
         }

     }

 });

 //UserRegister template's all events
 Template.HorizontalViewTemplate.events({
     "click .startbuttonId": function(e) {
         $(".ImageSliderId").hide();
         $("#tennantSearch").show();
         $('.startbuttonId').addClass('stopbuttonId').removeClass('startbuttonId').html('<label style="margin-top:1%"><h3>Stop Searching</h3></label>');
     },

     "click .stopbuttonId": function(e) {
         $(".ImageSliderId").show();
         $("#tennantSearch").hide();
         $('.stopbuttonId').removeClass('stopbuttonId').addClass('startbuttonId').html('<label style="margin-top:1%"><h3>Start Searching</h3></label>');
     },

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
     },
     "change #write": function() {

         console.log($("#write").val());
         var tenanatList = tenant.find().fetch();
         var filtertannant = tenanatList.filter(function(e) {
             return e.Name.toLowerCase().indexOf($("#write").val().toLowerCase()) >= 0;
         });
         Session.set("getAllTennat", filtertannant);
     }
 });



 Template.NewVerticalViewTemplate.created = function() {

     var Tempraturetype = this.data.DirectoryDetails.temprature;
     Meteor.call("getWeatherData", this.data.DirectoryDetails.location.geopoint[0] + ',' + this.data.DirectoryDetails.location.geopoint[1], function(err, response) {
         if (err) {
             console.log(err);
         } else {
             if (Tempraturetype == "C") {
                 response.currently.temperature = ((response.currently.temperature - 32) * 5 / 9).toFixed(0);
             }
             else {
                response.currently.temperature = ( response.currently.temperature).toFixed(0);
             }
             Session.set('WeatherData', response);

         }
     });

     console.log(this.data.getAllTennant_Directory);
     var tdata = this.data.getAllTennant_Directory;
     Session.set("getAllTennat", tdata);


 };
 //UserRegister template rendered
 Template.NewVerticalViewTemplate.rendered = function() {
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
           if (Description.length > 60) {
               $('.clsRssFeedDesc >p').text(Description.substr(0, 60) + '...');
           }
           $('.clsRssFeedDesc').children().remove('img')
       } else {
           $("#imagetagID").attr('src', '/images/preview-new.jpg');
            var Description = $('.clsRssFeedDesc').text();
           if (Description.length > 60) {
               $('.clsRssFeedDesc').text(Description.substr(0, 60) + '...');
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

                 $("#imagetagID").attr('src', $('.clsRssFeedDesc').find('img').attr('src'));

                 var Description = $('.clsRssFeedDesc >p').text();
                 if (Description.length > 60) {
                     $('.clsRssFeedDesc >p').text(Description.substr(0, 60) + '...');
                 }
                 $('.clsRssFeedDesc').children().remove('img')
             } else {
                 $("#imagetagID").attr('src', '/images/preview-new.jpg');

                 var Description = $('.clsRssFeedDesc').text();
                 if (Description.length > 60) {
                     $('.clsRssFeedDesc').text(Description.substr(0, 60) + '...');
                 }
                 //  $('.clsimageappend').html('<img alt="" src="/images/preview-new.jpg" id="imagetagID" class="img-responsive">');
             }
             $('.cls-newsFeed').addClass('animated fadeIn');

         }, 1000);
     }, 5000);

     $(".tv-bg").css('background-image', 'url(/cfs/files/Images/' + this.data.DirectoryDetails.bgImage + ')');
     var themeColor = this.data.DirectoryDetails.themeColor;
     $('.clsbordercolor').css('border', themeColor + ' solid 4px');
     $('.btnbackcolor').css('background-color', themeColor);
     setTimeout(function() {
         //   $('i.wi.clsiconcolor').css('color', themeColor);
     }, 3000);

     $('.start-button').on('click', function() {
         $(this).hide();
         $('.slider-card').hide();
         $('.search-list').show();
         $('.home-button').show();
         slider.stopAuto();
     });

     $('.home-button').on('click', function() {
         $(this).hide();
         $('.slider-card').show();
         $('.search-list').hide();
         $('.start-button').show();
         slider.startAuto();
     });

     slider = $('.bxslider').bxSlider({
         auto: true,
         captions: true
     });

     var cw = $('.time-cer').width();
     $('.time-cer').height(cw + "px");

     $(window).resize(function() {
         var cw = $('.time-cer').width();
         $('.time-cer').height(cw + "px");
     });

     $('.clsiconcolor').css('color', themeColor);

     setInterval(function() {
         console.log($("#write").val());
         var tenanatList = tenant.find().fetch();
         var filtertannant = tenanatList.filter(function(e) {
             return e.Name.toLowerCase().indexOf($("#write").val().toLowerCase()) >= 0;
         });
         Session.set("getAllTennat", filtertannant);
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
 Template.NewVerticalViewTemplate.helpers({

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
             d['date'] = moment(new Date(d.time * 1000)).format('D')
             if (temperatureType == "C") {
                 d['temperatureMin'] = ((d.temperatureMin - 32) * 5 / 9).toFixed(0);
             }
             else {
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
             date: moment(new Date()).format('dddd, Do MMMM YYYY')
         };
     },

     galaryIamage: function() {

         var ImageSlider = [];
         var Sliderdata = this.DirectoryDetails.gallary;
         Sliderdata.forEach(function(v, i) {

             var className = '';
             if (i == 0) {
                 className = 'active';
             }
             ImageSlider.push({
                 index: i + 1,
                 value: v['imageId'],
                 class: className,
                 caption: v['caption']
             });
         });
         return ImageSlider;
     },


     getMobileOrWeb: function() {
         var orientationType = this.DirectoryDetails.orientationType;
         if (orientationType == "Vertical") {
             return "VerticalViewTemplate";
         } else {
             return "HorizontalViewTemplate";
         }
     },
     getAllTennantDirectory: function() {
         return Session.get("getAllTennat");
     },
     isServiceTypeFree: function() {

         if (this.DirectoryDetails.serviceType == "Free") {
             return true;
         } else {
             return false;
         }

     }

 });

 //UserRegister template's all events
 Template.NewVerticalViewTemplate.events({
     "click .startbuttonId": function(e) {
         $(".ImageSliderId").hide();
         $("#tennantSearch").show();
         $('.startbuttonId').addClass('stopbuttonId').removeClass('startbuttonId').html('<label style="margin-top:1%"><h3>Stop Searching</h3></label>');
     },

     "click .stopbuttonId": function(e) {
         $(".ImageSliderId").show();
         $("#tennantSearch").hide();
         $('.stopbuttonId').removeClass('stopbuttonId').addClass('startbuttonId').html('<label style="margin-top:1%"><h3>Start Searching</h3></label>');
     },

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
     },
     "change #write": function() {

         console.log($("#write").val());
         var tenanatList = tenant.find().fetch();
         var filtertannant = tenanatList.filter(function(e) {
             return e.Name.toLowerCase().indexOf($("#write").val().toLowerCase()) >= 0;
         });
         Session.set("getAllTennat", filtertannant);
     }
 });



 function defineKeyBoardJS() {
     var _0x1b73 = ["\x75\x74\x69\x6C", "\x65\x76\x65\x6E\x74", "\x6D\x6F\x7A\x69\x6C\x6C\x61", "\x62\x72\x6F\x77\x73\x65\x72", "\x6B\x65\x79\x43\x6F\x64\x65", "\x6F\x70\x65\x72\x61", "\x63\x74\x72\x6C\x4B\x65\x79", "\x61\x6C\x74\x4B\x65\x79", "\x73\x68\x69\x66\x74\x4B\x65\x79", "\x67\x65\x74\x53\x65\x6C\x65\x63\x74\x69\x6F\x6E\x53\x74\x61\x72\x74", "\x67\x65\x74\x53\x65\x6C\x65\x63\x74\x69\x6F\x6E\x45\x6E\x64", "\x6C\x65\x6E\x67\x74\x68", "\x76\x61\x6C\x75\x65", "\x73\x75\x62\x73\x74\x72\x69\x6E\x67", "\x73\x65\x74\x43\x61\x72\x65\x74\x50\x6F\x73\x69\x74\x69\x6F\x6E", "\x66\x6F\x63\x75\x73", "\x73\x65\x6C\x65\x63\x74\x69\x6F\x6E\x53\x74\x61\x72\x74", "\x73\x65\x6C\x65\x63\x74\x69\x6F\x6E", "\x63\x72\x65\x61\x74\x65\x52\x61\x6E\x67\x65", "\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x52\x61\x6E\x67\x65", "\x64\x75\x70\x6C\x69\x63\x61\x74\x65", "\x67\x65\x74\x42\x6F\x6F\x6B\x6D\x61\x72\x6B", "\x6D\x6F\x76\x65\x54\x6F\x42\x6F\x6F\x6B\x6D\x61\x72\x6B", "\x45\x6E\x64\x54\x6F\x53\x74\x61\x72\x74", "\x73\x65\x74\x45\x6E\x64\x50\x6F\x69\x6E\x74", "\x74\x65\x78\x74", "\x73\x65\x6C\x65\x63\x74\x69\x6F\x6E\x45\x6E\x64", "\x73\x65\x74\x53\x65\x6C\x65\x63\x74\x69\x6F\x6E\x52\x61\x6E\x67\x65", "\x63\x6F\x6C\x6C\x61\x70\x73\x65", "\x63\x68\x61\x72\x61\x63\x74\x65\x72", "\x6D\x6F\x76\x65\x45\x6E\x64", "\x6D\x6F\x76\x65\x53\x74\x61\x72\x74", "\x73\x65\x6C\x65\x63\x74", "\x6C\x61\x79\x6F\x75\x74", "\x6B\x65\x79\x73", "\x64\x65\x61\x64\x6B\x65\x79\x73", "\x64\x69\x72", "\x6C\x74\x72", "\x6E\x61\x6D\x65", "\x55\x53", "\x6C\x61\x6E\x67", "\x65\x6E", "\x6C\x6F\x61\x64\x44\x65\x66\x61\x75\x6C\x74", "\x70\x72\x6F\x74\x6F\x74\x79\x70\x65", "\x6B\x30", "\x30", "\x60", "\x7E", "\x6B\x31", "\x31", "\x21", "\x6B\x32", "\x32", "\x40", "\x6B\x33", "\x33", "\x23", "\x6B\x34", "\x34", "\x24", "\x6B\x35", "\x35", "\x25", "\x6B\x36", "\x36", "\x5E", "\x6B\x37", "\x37", "\x26", "\x6B\x38", "\x38", "\x2A", "\x6B\x39", "\x39", "\x28", "\x6B\x31\x30", "\x29", "\x6B\x31\x31", "\x2D", "\x5F", "\x6B\x31\x32", "\x3D", "\x2B", "\x6B\x31\x33", "\x71", "\x51", "\x6B\x31\x34", "\x77", "\x57", "\x6B\x31\x35", "\x65", "\x45", "\x6B\x31\x36", "\x72", "\x52", "\x6B\x31\x37", "\x74", "\x54", "\x6B\x31\x38", "\x79", "\x59", "\x6B\x31\x39", "\x75", "\x55", "\x6B\x32\x30", "\x69", "\x49", "\x6B\x32\x31", "\x6F", "\x4F", "\x6B\x32\x32", "\x70", "\x50", "\x6B\x32\x33", "\x5B", "\x7B", "\x6B\x32\x34", "\x5D", "\x7D", "\x6B\x32\x35", "\x5C", "\x7C", "\x6B\x32\x36", "\x61", "\x41", "\x6B\x32\x37", "\x73", "\x53", "\x6B\x32\x38", "\x64", "\x44", "\x6B\x32\x39", "\x66", "\x46", "\x6B\x33\x30", "\x67", "\x47", "\x6B\x33\x31", "\x68", "\x48", "\x6B\x33\x32", "\x6A", "\x4A", "\x6B\x33\x33", "\x6B", "\x4B", "\x6B\x33\x34", "\x6C", "\x4C", "\x6B\x33\x35", "\x3B", "\x3A", "\x6B\x33\x36", "\x27", "\x22", "\x6B\x33\x37", "\x7A", "\x5A", "\x6B\x33\x38", "\x78", "\x58", "\x6B\x33\x39", "\x63", "\x43", "\x6B\x34\x30", "\x76", "\x56", "\x6B\x34\x31", "\x62", "\x42", "\x6B\x34\x32", "\x6E", "\x4E", "\x6B\x34\x33", "\x6D", "\x4D", "\x6B\x34\x34", "\x2C", "\x3C", "\x6B\x34\x35", "\x2E", "\x3E", "\x6B\x34\x36", "\x2F", "\x3F", "\x6C\x6F\x61\x64", "\x70\x61\x72\x73\x65\x72", "", "\x6B\x65\x79\x43\x6F\x64\x65\x73", "\x53\x47\x43\x61\x70", "\x6B\x65\x79\x62\x6F\x61\x72\x64", "\x64\x65\x66\x61\x75\x6C\x74\x4C\x61\x79\x6F\x75\x74", "\x76\x69\x72\x74\x75\x61\x6C\x4C\x61\x79\x6F\x75\x74", "\x63\x75\x72\x72\x65\x6E\x74\x4C\x61\x79\x6F\x75\x74", "\x73\x68\x69\x66\x74", "\x63\x61\x70\x73", "\x61\x6C\x74", "\x63\x74\x72\x6C", "\x63\x6F\x75\x6E\x74\x65\x72", "\x69\x6E\x74\x65\x72\x76\x61\x6C", "\x70\x72\x65\x76", "\x63\x61\x6E\x63\x65\x6C\x6B\x65\x79\x70\x72\x65\x73\x73", "\x63\x75\x73\x74\x6F\x6D\x4F\x6E\x42\x61\x63\x6B\x73\x70\x61\x63\x65", "\x63\x75\x73\x74\x6F\x6D\x4F\x6E\x45\x6E\x74\x65\x72", "\x63\x75\x73\x74\x6F\x6D\x4F\x6E\x53\x70\x61\x63\x65", "\x63\x75\x73\x74\x6F\x6D\x4F\x6E\x4B\x65\x79", "\x63\x75\x73\x74\x6F\x6D\x4F\x6E\x45\x73\x63", "\x63\x75\x73\x74\x6F\x6D\x44\x72\x61\x77\x4B\x65\x79\x62\x6F\x61\x72\x64", "\x74\x65\x78\x74\x62\x6F\x78", "\x6E\x61\x74\x69\x76\x65\x54\x65\x78\x74\x62\x6F\x78", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", "\x3C\x64\x69\x76\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6D\x61\x69\x6E\x22\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x6B\x62\x6F\x61\x72\x64\x2D\x6B", "\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x6F\x6E\x6B\x65\x79\x20\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x70\x75\x73\x68", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x62\x61\x63\x6B\x73\x70\x61\x63\x65\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x42\x61\x63\x6B\x73\x70\x61\x63\x65\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x6F\x6E\x6B\x65\x79\x2D\x72\x65\x6D\x6F\x76\x65\x22\x3E\x3C\x2F\x64\x69\x76\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x74\x61\x62\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x54\x61\x62\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x6B\x62\x6F\x61\x72\x64\x2D\x6B\x32\x35\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x63\x61\x70\x73\x2D\x6C\x6F\x63\x6B\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x43\x61\x70\x73\x20\x4C\x6F\x63\x6B\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x65\x6E\x74\x65\x72\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x65\x6E\x74\x65\x72\x20\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x45\x6E\x74\x65\x72\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x65\x66\x74\x2D\x73\x68\x69\x66\x74\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x53\x68\x69\x66\x74\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x72\x69\x67\x68\x74\x2D\x73\x68\x69\x66\x74\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x53\x68\x69\x66\x74\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x65\x66\x74\x2D\x63\x74\x72\x6C\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x43\x74\x72\x6C\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x65\x66\x74\x2D\x61\x6C\x74\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x41\x6C\x74\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x73\x70\x61\x63\x65\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x53\x70\x61\x63\x65\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x72\x69\x67\x68\x74\x2D\x61\x6C\x74\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x41\x6C\x74\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x62\x75\x74\x74\x6F\x6E\x20\x69\x64\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x72\x69\x67\x68\x74\x2D\x63\x74\x72\x6C\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x62\x6F\x61\x72\x64\x2D\x61\x70\x70\x6C\x65\x22\x3E\x3C\x73\x70\x61\x6E\x3E\x43\x74\x72\x6C\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x62\x75\x74\x74\x6F\x6E\x3E", "\x3C\x64\x69\x76\x20\x69\x64\x3D\x22\x66\x6F\x6F\x74\x65\x72\x6B\x65\x79\x22\x3E\x43\x6F\x70\x79\x72\x69\x67\x68\x74\x20\xA9\x20\x3C\x61\x20\x74\x69\x74\x6C\x65\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x22\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x76\x6B\x42\x6F\x61\x72\x64\x2E\x63\x6F\x6D\x2F\x22\x3E\x76\x6B\x42\x6F\x61\x72\x64\x2E\x63\x6F\x6D\x3C\x2F\x61\x3E\x3C\x2F\x64\x69\x76\x3E", "\x3C\x2F\x64\x69\x76\x3E", "\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C", "\x6A\x6F\x69\x6E", "\x77\x69\x72\x65\x45\x76\x65\x6E\x74\x73", "\x64\x72\x61\x77\x4B\x65\x79\x62\x6F\x61\x72\x64", "\x6C\x6F\x61\x64\x44\x65\x66\x61\x75\x6C\x74\x4C\x61\x79\x6F\x75\x74", "\x6C\x6F\x61\x64\x56\x69\x72\x74\x75\x61\x6C\x4C\x61\x79\x6F\x75\x74", "\x61\x74\x74\x72", "\x73\x77\x69\x74\x63\x68\x4C\x61\x79\x6F\x75\x74", "\x72\x65\x73\x65\x74", "\x6F\x6E\x45\x73\x63", "\x6F\x6E\x53\x68\x69\x66\x74", "\x6F\x6E\x41\x6C\x74", "\x6F\x6E\x43\x74\x72\x6C", "\x6F\x6E\x43\x61\x70\x73\x4C\x6F\x63\x6B", "\x6F\x6E\x42\x61\x63\x6B\x73\x70\x61\x63\x65", "\x64\x65\x6C\x65\x74\x65\x41\x74\x43\x61\x72\x65\x74", "\x6F\x6E\x45\x6E\x74\x65\x72", "\x0A", "\x69\x6E\x73\x65\x72\x74\x41\x74\x43\x61\x72\x65\x74", "\x6F\x6E\x53\x70\x61\x63\x65", "\x20", "\x73\x74\x6F\x70\x52\x65\x70\x65\x61\x74", "\x6F\x6E\x4B\x65\x79", "\x67\x65\x74\x4B\x65\x79", "\x67\x65\x74\x53\x74\x61\x74\x65", "\x67\x65\x74\x4D\x61\x70\x70\x65\x64\x56\x61\x6C\x75\x65", "\x69\x73\x44\x65\x61\x64\x6B\x65\x79", "\x6B\x62\x6F\x61\x72\x64\x2D", "\x26\x6E\x62\x73\x70\x3B", "\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x61\x62\x65\x6C\x2D\x6F\x72\x69\x67\x69\x6E\x61\x6C\x22\x3E", "\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x61\x62\x65\x6C\x2D\x73\x68\x69\x66\x74\x22\x3E", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x70\x72\x65\x73\x73\x65\x64", "\x61\x64\x64\x43\x6C\x61\x73\x73", "\x23\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x65\x66\x74\x2D\x63\x74\x72\x6C", "\x23\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x72\x69\x67\x68\x74\x2D\x63\x74\x72\x6C", "\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73", "\x23\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x65\x66\x74\x2D\x61\x6C\x74", "\x23\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x72\x69\x67\x68\x74\x2D\x61\x6C\x74", "\x23\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x65\x66\x74\x2D\x73\x68\x69\x66\x74", "\x23\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x72\x69\x67\x68\x74\x2D\x73\x68\x69\x66\x74", "\x23\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x63\x61\x70\x73\x2D\x6C\x6F\x63\x6B", "\x62\x75\x74\x74\x6F\x6E", "\x6D\x6F\x75\x73\x65\x64\x6F\x77\x6E", "\x69\x64", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x62\x61\x63\x6B\x73\x70\x61\x63\x65", "\x6B\x62\x6F\x61\x72\x64\x2D\x6B\x28\x5B\x30\x2D\x39\x5D\x29\x7C\x28\x5B\x31\x2D\x33\x5D\x5B\x30\x2D\x39\x5D\x29\x7C\x28\x34\x5B\x30\x2D\x37\x5D\x29", "\x73\x65\x61\x72\x63\x68", "\x73\x75\x62\x73\x74\x72", "\x64\x65\x6C\x65\x67\x61\x74\x65", "\x23\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6D\x61\x69\x6E", "\x6D\x6F\x75\x73\x65\x75\x70", "\x6D\x6F\x75\x73\x65\x6F\x75\x74", "\x63\x6C\x69\x63\x6B", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x65\x66\x74\x2D\x73\x68\x69\x66\x74", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x72\x69\x67\x68\x74\x2D\x73\x68\x69\x66\x74", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x65\x66\x74\x2D\x61\x6C\x74", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x72\x69\x67\x68\x74\x2D\x61\x6C\x74", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x6C\x65\x66\x74\x2D\x63\x74\x72\x6C", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x72\x69\x67\x68\x74\x2D\x63\x74\x72\x6C", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x63\x61\x70\x73\x2D\x6C\x6F\x63\x6B", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x65\x6E\x74\x65\x72", "\x76\x6B\x42\x6F\x61\x72\x64\x2D\x6B\x65\x79\x2D\x73\x70\x61\x63\x65", "\x6B\x65\x79\x64\x6F\x77\x6E", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x67\x65\x74\x4B\x65\x79\x49\x64", "\x62\x69\x6E\x64", "\x6B\x65\x79\x70\x72\x65\x73\x73", "\x6B\x65\x79\x75\x70"];
     var vkBoard = {};
     vkBoard[_0x1b73[0]] = {
         keyCode: function(_0x21f6x2) {
             if (!_0x21f6x2) {
                 var _0x21f6x2 = window[_0x1b73[1]];
             };
             if ($[_0x1b73[3]][_0x1b73[2]]) {
                 var _0x21f6x3 = _0x21f6x2[_0x1b73[4]];
                 switch (_0x21f6x3) {
                     case 59:
                         _0x21f6x3 = 186;
                         break;;
                     case 107:
                         _0x21f6x3 = 187;
                         break;;
                     case 109:
                         _0x21f6x3 = 189;
                         break;;
                     case 61:
                         _0x21f6x3 = 187;
                         break;;
                     case 173:
                         _0x21f6x3 = 189;
                         break;;
                 };
                 return _0x21f6x3;
             };
             if ($[_0x1b73[3]][_0x1b73[5]]) {
                 var _0x21f6x3 = _0x21f6x2[_0x1b73[4]];
                 switch (_0x21f6x3) {
                     case 59:
                         _0x21f6x3 = 186;
                         break;;
                     case 61:
                         _0x21f6x3 = 187;
                         break;;
                     case 109:
                         _0x21f6x3 = 189;
                         break;;
                 };
                 return _0x21f6x3;
             };
             return _0x21f6x2[_0x1b73[4]];
         },
         isCtrl: function(_0x21f6x3) {
             if (!_0x21f6x3) {
                 var _0x21f6x3 = window[_0x1b73[1]];
             };
             return _0x21f6x3[_0x1b73[6]];
         },
         isAlt: function(_0x21f6x3) {
             if (!_0x21f6x3) {
                 var _0x21f6x3 = window[_0x1b73[1]];
             };
             return _0x21f6x3[_0x1b73[7]];
         },
         isShift: function(_0x21f6x3) {
             if (!_0x21f6x3) {
                 var _0x21f6x3 = window[_0x1b73[1]];
             };
             return _0x21f6x3[_0x1b73[8]];
         },
         insertAtCaret: function(_0x21f6x4, _0x21f6x5) {
             var _0x21f6x6 = this[_0x1b73[9]](_0x21f6x4);
             var _0x21f6x2 = this[_0x1b73[10]](_0x21f6x4);
             var _0x21f6x3 = _0x21f6x4[_0x1b73[12]][_0x1b73[11]];
             _0x21f6x4[_0x1b73[12]] = _0x21f6x4[_0x1b73[12]][_0x1b73[13]](0, _0x21f6x6) + _0x21f6x5 + _0x21f6x4[_0x1b73[12]][_0x1b73[13]](_0x21f6x2, _0x21f6x3);
             this[_0x1b73[14]](_0x21f6x4, _0x21f6x6 + _0x21f6x5[_0x1b73[11]], 0);
         },
         deleteAtCaret: function(_0x21f6x5, _0x21f6x4, _0x21f6x7) {
             var _0x21f6x8 = this[_0x1b73[9]](_0x21f6x5);
             var _0x21f6x2 = this[_0x1b73[10]](_0x21f6x5);
             var _0x21f6x3 = _0x21f6x5[_0x1b73[12]][_0x1b73[11]];
             if (_0x21f6x4 > _0x21f6x8) {
                 _0x21f6x4 = _0x21f6x8;
             };
             if (_0x21f6x2 + _0x21f6x7 > _0x21f6x3) {
                 _0x21f6x7 = _0x21f6x3 - _0x21f6x2;
             };
             var _0x21f6x6 = _0x21f6x5[_0x1b73[12]][_0x1b73[13]](_0x21f6x8 - _0x21f6x4, _0x21f6x2 + _0x21f6x7);
             _0x21f6x5[_0x1b73[12]] = _0x21f6x5[_0x1b73[12]][_0x1b73[13]](0, _0x21f6x8 - _0x21f6x4) + _0x21f6x5[_0x1b73[12]][_0x1b73[13]](_0x21f6x2 + _0x21f6x7);
             this[_0x1b73[14]](_0x21f6x5, _0x21f6x8 - _0x21f6x4, 0);
             return _0x21f6x6;
         },
         getSelectionStart: function(_0x21f6x5) {
             _0x21f6x5[_0x1b73[15]]();
             if (_0x21f6x5[_0x1b73[16]] !== undefined) {
                 return _0x21f6x5[_0x1b73[16]];
             } else {
                 if (document[_0x1b73[17]]) {
                     var _0x21f6x2 = document[_0x1b73[17]][_0x1b73[18]]();
                     if (_0x21f6x2 == null) {
                         return 0;
                     };
                     var _0x21f6x3 = _0x21f6x5[_0x1b73[19]]();
                     var _0x21f6x4 = _0x21f6x3[_0x1b73[20]]();
                     _0x21f6x3[_0x1b73[22]](_0x21f6x2[_0x1b73[21]]());
                     _0x21f6x4[_0x1b73[24]](_0x1b73[23], _0x21f6x3);
                     return _0x21f6x4[_0x1b73[25]][_0x1b73[11]];
                 };
             };
             return 0;
         },
         getSelectionEnd: function(_0x21f6x5) {
             _0x21f6x5[_0x1b73[15]]();
             if (_0x21f6x5[_0x1b73[26]] !== undefined) {
                 return _0x21f6x5[_0x1b73[26]];
             } else {
                 if (document[_0x1b73[17]]) {
                     var _0x21f6x2 = document[_0x1b73[17]][_0x1b73[18]]();
                     if (_0x21f6x2 == null) {
                         return 0;
                     };
                     var _0x21f6x3 = _0x21f6x5[_0x1b73[19]]();
                     var _0x21f6x4 = _0x21f6x3[_0x1b73[20]]();
                     _0x21f6x3[_0x1b73[22]](_0x21f6x2[_0x1b73[21]]());
                     _0x21f6x4[_0x1b73[24]](_0x1b73[23], _0x21f6x3);
                     return _0x21f6x4[_0x1b73[25]][_0x1b73[11]] + _0x21f6x2[_0x1b73[25]][_0x1b73[11]];
                 };
             };
             return _0x21f6x5[_0x1b73[12]][_0x1b73[11]];
         },
         setCaretPosition: function(_0x21f6x5, _0x21f6x6, _0x21f6x4) {
             var _0x21f6x3 = _0x21f6x5[_0x1b73[12]][_0x1b73[11]];
             if (_0x21f6x6 > _0x21f6x3) {
                 _0x21f6x6 = _0x21f6x3;
             };
             if (_0x21f6x6 + _0x21f6x4 > _0x21f6x3) {
                 _0x21f6x4 = _0x21f6x3 - _0x21f6x4;
             };
             _0x21f6x5[_0x1b73[15]]();
             if (_0x21f6x5[_0x1b73[27]]) {
                 _0x21f6x5[_0x1b73[27]](_0x21f6x6, _0x21f6x6 + _0x21f6x4);
             } else {
                 if (_0x21f6x5[_0x1b73[19]]) {
                     var _0x21f6x2 = _0x21f6x5[_0x1b73[19]]();
                     _0x21f6x2[_0x1b73[28]](true);
                     _0x21f6x2[_0x1b73[30]](_0x1b73[29], _0x21f6x6 + _0x21f6x4);
                     _0x21f6x2[_0x1b73[31]](_0x1b73[29], _0x21f6x6);
                     _0x21f6x2[_0x1b73[32]]();
                 };
             };
             _0x21f6x5[_0x1b73[15]]();
         },
         selectAll: function(_0x21f6x3) {
             this[_0x1b73[14]](_0x21f6x3, 0, _0x21f6x3[_0x1b73[12]][_0x1b73[11]]);
         }
     };
     vkBoard[_0x1b73[33]] = function() {
         this[_0x1b73[34]] = [];
         this[_0x1b73[35]] = [];
         this[_0x1b73[36]] = _0x1b73[37];
         this[_0x1b73[38]] = _0x1b73[39];
         this[_0x1b73[40]] = _0x1b73[41];
     };
     vkBoard[_0x1b73[33]][_0x1b73[43]][_0x1b73[42]] = function() {
         this[_0x1b73[34]] = [{
             i: _0x1b73[44],
             c: _0x1b73[45],
             n: _0x1b73[46],
             s: _0x1b73[47]
         }, {
             i: _0x1b73[48],
             c: _0x1b73[45],
             n: _0x1b73[49],
             s: _0x1b73[50]
         }, {
             i: _0x1b73[51],
             c: _0x1b73[45],
             n: _0x1b73[52],
             s: _0x1b73[53]
         }, {
             i: _0x1b73[54],
             c: _0x1b73[45],
             n: _0x1b73[55],
             s: _0x1b73[56]
         }, {
             i: _0x1b73[57],
             c: _0x1b73[45],
             n: _0x1b73[58],
             s: _0x1b73[59]
         }, {
             i: _0x1b73[60],
             c: _0x1b73[45],
             n: _0x1b73[61],
             s: _0x1b73[62]
         }, {
             i: _0x1b73[63],
             c: _0x1b73[45],
             n: _0x1b73[64],
             s: _0x1b73[65]
         }, {
             i: _0x1b73[66],
             c: _0x1b73[45],
             n: _0x1b73[67],
             s: _0x1b73[68]
         }, {
             i: _0x1b73[69],
             c: _0x1b73[45],
             n: _0x1b73[70],
             s: _0x1b73[71]
         }, {
             i: _0x1b73[72],
             c: _0x1b73[45],
             n: _0x1b73[73],
             s: _0x1b73[74]
         }, {
             i: _0x1b73[75],
             c: _0x1b73[45],
             n: _0x1b73[45],
             s: _0x1b73[76]
         }, {
             i: _0x1b73[77],
             c: _0x1b73[45],
             n: _0x1b73[78],
             s: _0x1b73[79]
         }, {
             i: _0x1b73[80],
             c: _0x1b73[45],
             n: _0x1b73[81],
             s: _0x1b73[82]
         }, {
             i: _0x1b73[83],
             c: _0x1b73[49],
             n: _0x1b73[84],
             s: _0x1b73[85]
         }, {
             i: _0x1b73[86],
             c: _0x1b73[49],
             n: _0x1b73[87],
             s: _0x1b73[88]
         }, {
             i: _0x1b73[89],
             c: _0x1b73[49],
             n: _0x1b73[90],
             s: _0x1b73[91]
         }, {
             i: _0x1b73[92],
             c: _0x1b73[49],
             n: _0x1b73[93],
             s: _0x1b73[94]
         }, {
             i: _0x1b73[95],
             c: _0x1b73[49],
             n: _0x1b73[96],
             s: _0x1b73[97]
         }, {
             i: _0x1b73[98],
             c: _0x1b73[49],
             n: _0x1b73[99],
             s: _0x1b73[100]
         }, {
             i: _0x1b73[101],
             c: _0x1b73[49],
             n: _0x1b73[102],
             s: _0x1b73[103]
         }, {
             i: _0x1b73[104],
             c: _0x1b73[49],
             n: _0x1b73[105],
             s: _0x1b73[106]
         }, {
             i: _0x1b73[107],
             c: _0x1b73[49],
             n: _0x1b73[108],
             s: _0x1b73[109]
         }, {
             i: _0x1b73[110],
             c: _0x1b73[49],
             n: _0x1b73[111],
             s: _0x1b73[112]
         }, {
             i: _0x1b73[113],
             c: _0x1b73[45],
             n: _0x1b73[114],
             s: _0x1b73[115]
         }, {
             i: _0x1b73[116],
             c: _0x1b73[45],
             n: _0x1b73[117],
             s: _0x1b73[118]
         }, {
             i: _0x1b73[119],
             c: _0x1b73[45],
             n: _0x1b73[120],
             s: _0x1b73[121]
         }, {
             i: _0x1b73[122],
             c: _0x1b73[49],
             n: _0x1b73[123],
             s: _0x1b73[124]
         }, {
             i: _0x1b73[125],
             c: _0x1b73[49],
             n: _0x1b73[126],
             s: _0x1b73[127]
         }, {
             i: _0x1b73[128],
             c: _0x1b73[49],
             n: _0x1b73[129],
             s: _0x1b73[130]
         }, {
             i: _0x1b73[131],
             c: _0x1b73[49],
             n: _0x1b73[132],
             s: _0x1b73[133]
         }, {
             i: _0x1b73[134],
             c: _0x1b73[49],
             n: _0x1b73[135],
             s: _0x1b73[136]
         }, {
             i: _0x1b73[137],
             c: _0x1b73[49],
             n: _0x1b73[138],
             s: _0x1b73[139]
         }, {
             i: _0x1b73[140],
             c: _0x1b73[49],
             n: _0x1b73[141],
             s: _0x1b73[142]
         }, {
             i: _0x1b73[143],
             c: _0x1b73[49],
             n: _0x1b73[144],
             s: _0x1b73[145]
         }, {
             i: _0x1b73[146],
             c: _0x1b73[49],
             n: _0x1b73[147],
             s: _0x1b73[148]
         }, {
             i: _0x1b73[149],
             c: _0x1b73[45],
             n: _0x1b73[150],
             s: _0x1b73[151]
         }, {
             i: _0x1b73[152],
             c: _0x1b73[45],
             n: _0x1b73[153],
             s: _0x1b73[154]
         }, {
             i: _0x1b73[155],
             c: _0x1b73[49],
             n: _0x1b73[156],
             s: _0x1b73[157]
         }, {
             i: _0x1b73[158],
             c: _0x1b73[49],
             n: _0x1b73[159],
             s: _0x1b73[160]
         }, {
             i: _0x1b73[161],
             c: _0x1b73[49],
             n: _0x1b73[162],
             s: _0x1b73[163]
         }, {
             i: _0x1b73[164],
             c: _0x1b73[49],
             n: _0x1b73[165],
             s: _0x1b73[166]
         }, {
             i: _0x1b73[167],
             c: _0x1b73[49],
             n: _0x1b73[168],
             s: _0x1b73[169]
         }, {
             i: _0x1b73[170],
             c: _0x1b73[49],
             n: _0x1b73[171],
             s: _0x1b73[172]
         }, {
             i: _0x1b73[173],
             c: _0x1b73[49],
             n: _0x1b73[174],
             s: _0x1b73[175]
         }, {
             i: _0x1b73[176],
             c: _0x1b73[45],
             n: _0x1b73[177],
             s: _0x1b73[178]
         }, {
             i: _0x1b73[179],
             c: _0x1b73[45],
             n: _0x1b73[180],
             s: _0x1b73[181]
         }, {
             i: _0x1b73[182],
             c: _0x1b73[45],
             n: _0x1b73[183],
             s: _0x1b73[184]
         }];
         this[_0x1b73[36]] = _0x1b73[37];
         this[_0x1b73[38]] = _0x1b73[39];
         this[_0x1b73[40]] = _0x1b73[41];
     };
     vkBoard[_0x1b73[33]][_0x1b73[43]][_0x1b73[185]] = function(_0x21f6x3) {
         this[_0x1b73[34]] = _0x21f6x3[_0x1b73[34]];
         this[_0x1b73[35]] = _0x21f6x3[_0x1b73[35]];
         this[_0x1b73[36]] = _0x21f6x3[_0x1b73[36]];
         this[_0x1b73[38]] = _0x21f6x3[_0x1b73[38]];
         this[_0x1b73[40]] = _0x21f6x3[_0x1b73[40]] ? _0x21f6x3[_0x1b73[40]] : _0x1b73[41];
     };
     vkBoard[_0x1b73[33]][_0x1b73[186]] = {
         keyCodes: [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 220],
         getKeyCode: function(_0x21f6x5, _0x21f6x2, _0x21f6x9) {
             var _0x21f6x3 = _0x21f6x5[_0x1b73[11]];
             for (var _0x21f6x4 = 0; _0x21f6x4 < _0x21f6x3; _0x21f6x4++) {
                 if (_0x21f6x5[_0x21f6x4][_0x1b73[105]] == _0x21f6x9) {
                     return _0x21f6x2 == 1 ? (_0x21f6x5[_0x21f6x4][_0x1b73[126]] ? _0x21f6x5[_0x21f6x4][_0x1b73[126]] : _0x1b73[187]) : (_0x21f6x5[_0x21f6x4][_0x1b73[171]] ? _0x21f6x5[_0x21f6x4][_0x1b73[171]] : _0x1b73[187]);
                 };
             };
             return 0;
         },
         getKey: function(_0x21f6x4, _0x21f6x5) {
             var _0x21f6x3 = _0x21f6x4[_0x1b73[11]];
             for (var _0x21f6x2 = 0; _0x21f6x2 < _0x21f6x3; _0x21f6x2++) {
                 if (_0x21f6x4[_0x21f6x2][_0x1b73[105]] == _0x21f6x5) {
                     return _0x21f6x4[_0x21f6x2];
                 };
             };
             return null;
         },
         isDeadkey: function(_0x21f6x2, _0x21f6x5) {
             if (!_0x21f6x2) {
                 return false;
             };
             var _0x21f6x3 = _0x21f6x2[_0x1b73[11]];
             for (var _0x21f6x4 = 0; _0x21f6x4 < _0x21f6x3; _0x21f6x4++) {
                 if (_0x21f6x2[_0x21f6x4][_0x1b73[144]] == _0x21f6x5) {
                     return true;
                 };
             };
             return false;
         },
         getMappedValue: function(_0x21f6x2, _0x21f6x9, _0x21f6x5) {
             if (!_0x21f6x2) {
                 return _0x1b73[187];
             };
             var _0x21f6x3 = _0x21f6x2[_0x1b73[11]];
             for (var _0x21f6x4 = 0; _0x21f6x4 < _0x21f6x3; _0x21f6x4++) {
                 if (_0x21f6x2[_0x21f6x4][_0x1b73[144]] == _0x21f6x5 && _0x21f6x2[_0x21f6x4][_0x1b73[168]] == _0x21f6x9) {
                     return _0x21f6x2[_0x21f6x4][_0x1b73[162]];
                 };
             };
             return _0x1b73[187];
         },
         getKeyId: function(_0x21f6x2) {
             for (var _0x21f6x3 = 0; _0x21f6x3 < 48; _0x21f6x3++) {
                 if (this[_0x1b73[188]][_0x21f6x3] == _0x21f6x2) {
                     return _0x21f6x3;
                 };
             };
             return -1;
         },
         getState: function(_0x21f6x5, _0x21f6x6, _0x21f6x3, _0x21f6x2, _0x21f6x9) {
             var _0x21f6x4 = _0x1b73[171];
             if (!_0x21f6x6 && !_0x21f6x3 && _0x21f6x5) {
                 _0x21f6x4 = _0x1b73[171];
             } else {
                 if (!_0x21f6x6 && _0x21f6x3 && !_0x21f6x5) {
                     _0x21f6x4 = _0x1b73[126];
                 } else {
                     if (!_0x21f6x6 && _0x21f6x3 && _0x21f6x5) {
                         _0x21f6x4 = _0x1b73[126];
                     } else {
                         if (_0x21f6x6 && !_0x21f6x3 && !_0x21f6x5) {
                             _0x21f6x4 = _0x1b73[171];
                         } else {
                             if (_0x21f6x6 && !_0x21f6x3 && _0x21f6x5) {
                                 _0x21f6x4 = _0x1b73[96];
                             } else {
                                 if (_0x21f6x6 && _0x21f6x3 && !_0x21f6x5) {
                                     _0x21f6x4 = _0x1b73[126];
                                 } else {
                                     if (_0x21f6x6 && _0x21f6x3 && _0x21f6x5) {
                                         _0x21f6x4 = _0x1b73[132];
                                     };
                                 };
                             };
                         };
                     };
                 };
             };
             if ((_0x21f6x4 == _0x1b73[171] || _0x21f6x4 == _0x1b73[126]) && _0x21f6x2) {
                 if (_0x21f6x9 == _0x1b73[49]) {
                     if (_0x21f6x4 == _0x1b73[171]) {
                         _0x21f6x4 = _0x1b73[126];
                     } else {
                         _0x21f6x4 = _0x1b73[171];
                     };
                 };
                 if (_0x21f6x9 == _0x1b73[189]) {
                     if (_0x21f6x4 == _0x1b73[171]) {
                         _0x21f6x4 = _0x1b73[99];
                     } else {
                         if (_0x21f6x4 == _0x1b73[126]) {
                             _0x21f6x4 = _0x1b73[156];
                         };
                     };
                 };
             };
             return _0x21f6x4;
         }
     };
     vkBoard[_0x1b73[190]] = function(_0x21f6x3, _0x21f6x2) {
         this[_0x1b73[191]] = new vkBoard[_0x1b73[33]]();
         this[_0x1b73[191]][_0x1b73[42]]();
         this[_0x1b73[192]] = new vkBoard[_0x1b73[33]]();
         this[_0x1b73[192]][_0x1b73[42]]();
         this[_0x1b73[193]] = this[_0x1b73[192]];
         this[_0x1b73[194]] = false;
         this[_0x1b73[195]] = false;
         this[_0x1b73[196]] = false;
         this[_0x1b73[197]] = false;
         this[_0x1b73[198]] = 0;
         this[_0x1b73[199]] = 0;
         this[_0x1b73[200]] = _0x1b73[187];
         this[_0x1b73[201]] = false;
         this[_0x1b73[202]] = function(_0x21f6x9) {};
         this[_0x1b73[203]] = function() {};
         this[_0x1b73[204]] = function() {
             return false;
         };
         this[_0x1b73[205]] = function(_0x21f6x9) {
             return false;
         };
         this[_0x1b73[206]] = function() {};
         this[_0x1b73[207]] = function(_0x21f6x9) {
             return _0x21f6x9;
         };
         this[_0x1b73[208]] = $(_0x1b73[56] + _0x21f6x2);
         this[_0x1b73[209]] = document[_0x1b73[210]](_0x21f6x2);
         var _0x21f6x5 = [_0x1b73[211]];
         for (var _0x21f6x4 = 0; _0x21f6x4 < 13; _0x21f6x4++) {
             _0x21f6x5[_0x1b73[214]](_0x1b73[212], _0x21f6x4, _0x1b73[213]);
         };
         _0x21f6x5[_0x1b73[214]](_0x1b73[215]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[216]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[217]);
         for (var _0x21f6x4 = 13; _0x21f6x4 < 25; _0x21f6x4++) {
             _0x21f6x5[_0x1b73[214]](_0x1b73[212], _0x21f6x4, _0x1b73[213]);
         };
         _0x21f6x5[_0x1b73[214]](_0x1b73[218]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[216]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[219]);
         for (var _0x21f6x4 = 26; _0x21f6x4 < 37; _0x21f6x4++) {
             _0x21f6x5[_0x1b73[214]](_0x1b73[212], _0x21f6x4, _0x1b73[213]);
         };
         _0x21f6x5[_0x1b73[214]](_0x1b73[220]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[216]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[221]);
         for (var _0x21f6x4 = 37; _0x21f6x4 < 47; _0x21f6x4++) {
             _0x21f6x5[_0x1b73[214]](_0x1b73[212], _0x21f6x4, _0x1b73[213]);
         };
         _0x21f6x5[_0x1b73[214]](_0x1b73[222]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[216]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[223]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[224]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[225]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[226]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[227]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[216]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[228]);
         _0x21f6x5[_0x1b73[214]](_0x1b73[229]);
         document[_0x1b73[210]](_0x21f6x3)[_0x1b73[230]] = _0x21f6x5[_0x1b73[231]](_0x1b73[187]);
         this[_0x1b73[232]]();
         this[_0x1b73[233]]();
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[234]] = function(_0x21f6x3) {
         this[_0x1b73[191]][_0x1b73[185]](_0x21f6x3);
         this[_0x1b73[233]]();
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[235]] = function(_0x21f6x3) {
         this[_0x1b73[192]][_0x1b73[185]](_0x21f6x3);
         this[_0x1b73[233]]();
         this[_0x1b73[208]][_0x1b73[236]](_0x1b73[36], this[_0x1b73[236]](_0x1b73[36]));
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[237]] = function() {
         this[_0x1b73[193]] = (this[_0x1b73[193]] === this[_0x1b73[191]]) ? this[_0x1b73[192]] : this[_0x1b73[191]];
         this[_0x1b73[238]]();
         this[_0x1b73[233]]();
         this[_0x1b73[208]][_0x1b73[236]](_0x1b73[36], this[_0x1b73[236]](_0x1b73[36]));
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[239]] = function() {
         this[_0x1b73[237]]();
         this[_0x1b73[206]]();
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[240]] = function() {
         this[_0x1b73[194]] = !this[_0x1b73[194]];
         this[_0x1b73[233]]();
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[241]] = function() {
         this[_0x1b73[196]] = !this[_0x1b73[196]];
         this[_0x1b73[233]]();
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[242]] = function() {
         this[_0x1b73[197]] = !this[_0x1b73[197]];
         this[_0x1b73[233]]();
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[243]] = function() {
         this[_0x1b73[195]] = !this[_0x1b73[195]];
         this[_0x1b73[233]]();
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[244]] = function() {
         if (this[_0x1b73[200]] != _0x1b73[187]) {
             this[_0x1b73[200]] = _0x1b73[187];
             this[_0x1b73[194]] = false;
             this[_0x1b73[233]]();
         } else {
             var _0x21f6x3 = vkBoard[_0x1b73[0]][_0x1b73[245]](this[_0x1b73[209]], 1, 0);
             this[_0x1b73[202]](_0x21f6x3);
         };
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[246]] = function() {
         vkBoard[_0x1b73[0]][_0x1b73[248]](this[_0x1b73[209]], _0x1b73[247]);
         this[_0x1b73[203]]();
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[249]] = function() {
         if (!this[_0x1b73[204]]()) {
             vkBoard[_0x1b73[0]][_0x1b73[248]](this[_0x1b73[209]], _0x1b73[250]);
         };
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[236]] = function(_0x21f6x3) {
         if (_0x21f6x3 == _0x1b73[36]) {
             return this[_0x1b73[193]][_0x1b73[36]];
         } else {
             if (_0x21f6x3 == _0x1b73[40]) {
                 return this[_0x1b73[193]][_0x1b73[40]];
             } else {
                 if (_0x21f6x3 == _0x1b73[38]) {
                     return this[_0x1b73[193]][_0x1b73[38]];
                 };
             };
         };
         return _0x1b73[187];
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[238]] = function() {
         this[_0x1b73[194]] = false;
         this[_0x1b73[195]] = false;
         this[_0x1b73[196]] = false;
         this[_0x1b73[197]] = false;
         this[_0x1b73[198]] = 0;
         this[_0x1b73[199]] = 0;
         this[_0x1b73[200]] = _0x1b73[187];
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[251]] = function() {
         if (this[_0x1b73[199]] != 0) {
             clearInterval(this[_0x1b73[199]]);
             this[_0x1b73[198]] = 0;
             this[_0x1b73[199]] = 0;
         };
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[252]] = function(_0x21f6x9) {
         var _0x21f6x2 = vkBoard[_0x1b73[33]][_0x1b73[186]][_0x1b73[253]](this[_0x1b73[193]][_0x1b73[34]], _0x21f6x9);
         if (_0x21f6x2) {
             var _0x21f6x5 = vkBoard[_0x1b73[33]][_0x1b73[186]][_0x1b73[254]](this[_0x1b73[197]], this[_0x1b73[196]], this[_0x1b73[194]], this[_0x1b73[195]], _0x21f6x2[_0x1b73[162]] ? _0x21f6x2[_0x1b73[162]] : _0x1b73[45]);
             var _0x21f6x4 = _0x21f6x2[_0x21f6x5] ? _0x21f6x2[_0x21f6x5] : _0x1b73[187];
             if (this[_0x1b73[200]] != _0x1b73[187]) {
                 var _0x21f6x3 = vkBoard[_0x1b73[33]][_0x1b73[186]][_0x1b73[255]](this[_0x1b73[193]][_0x1b73[35]], _0x21f6x4, this[_0x1b73[200]]);
                 if (_0x21f6x3 != _0x1b73[187]) {
                     vkBoard[_0x1b73[0]][_0x1b73[248]](this[_0x1b73[209]], _0x21f6x3);
                 };
                 this[_0x1b73[200]] = _0x1b73[187];
             } else {
                 if (vkBoard[_0x1b73[33]][_0x1b73[186]][_0x1b73[256]](this[_0x1b73[193]][_0x1b73[35]], _0x21f6x4)) {
                     this[_0x1b73[200]] = _0x21f6x4;
                 } else {
                     if (_0x21f6x4 != _0x1b73[187]) {
                         if (!this[_0x1b73[205]](_0x21f6x4)) {
                             vkBoard[_0x1b73[0]][_0x1b73[248]](this[_0x1b73[209]], _0x21f6x4);
                         };
                     };
                 };
             };
         };
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[233]] = function() {
         if (!this[_0x1b73[193]][_0x1b73[34]]) {
             return;
         };
         var _0x21f6x5, _0x21f6x4, _0x21f6x6, _0x21f6x9;
         var _0x21f6x3 = this[_0x1b73[193]][_0x1b73[34]][_0x1b73[11]];
         for (var _0x21f6x2 = 0; _0x21f6x2 < _0x21f6x3; _0x21f6x2++) {
             _0x21f6x4 = this[_0x1b73[193]][_0x1b73[34]][_0x21f6x2];
             if (!$(_0x1b73[257] + _0x21f6x4[_0x1b73[105]])) {
                 continue;
             };
             _0x21f6x6 = vkBoard[_0x1b73[33]][_0x1b73[186]][_0x1b73[254]](this[_0x1b73[197]], this[_0x1b73[196]], this[_0x1b73[194]], this[_0x1b73[195]], _0x21f6x4[_0x1b73[162]] ? _0x21f6x4[_0x1b73[162]] : _0x1b73[45]);
             _0x21f6x9 = _0x21f6x4[_0x21f6x6] ? _0x21f6x4[_0x21f6x6] : _0x1b73[187];
             if (this[_0x1b73[200]] != _0x1b73[187]) {
                 _0x21f6x9 = vkBoard[_0x1b73[33]][_0x1b73[186]][_0x1b73[255]](this[_0x1b73[193]][_0x1b73[35]], _0x21f6x9, this[_0x1b73[200]]);
             };
             if (!this[_0x1b73[194]]) {
                 _0x21f6x9 = this[_0x1b73[207]](_0x21f6x9);
                 if (_0x21f6x9 == _0x1b73[187]) {
                     _0x21f6x9 = _0x1b73[258];
                 };
                 _0x21f6x5 = _0x1b73[259] + _0x21f6x9 + _0x1b73[229];
             } else {
                 if (_0x21f6x9 == _0x1b73[187]) {
                     _0x21f6x9 = _0x1b73[258];
                 };
                 _0x21f6x5 = _0x1b73[260] + _0x21f6x9 + _0x1b73[229];
             };
             document[_0x1b73[210]](_0x1b73[257] + _0x21f6x4[_0x1b73[105]])[_0x1b73[230]] = _0x21f6x5;
         };
         if (this[_0x1b73[197]]) {
             $(_0x1b73[263])[_0x1b73[262]](_0x1b73[261]);
             $(_0x1b73[264])[_0x1b73[262]](_0x1b73[261]);
         } else {
             $(_0x1b73[263])[_0x1b73[265]](_0x1b73[261]);
             $(_0x1b73[264])[_0x1b73[265]](_0x1b73[261]);
         };
         if (this[_0x1b73[196]]) {
             $(_0x1b73[266])[_0x1b73[262]](_0x1b73[261]);
             $(_0x1b73[267])[_0x1b73[262]](_0x1b73[261]);
         } else {
             $(_0x1b73[266])[_0x1b73[265]](_0x1b73[261]);
             $(_0x1b73[267])[_0x1b73[265]](_0x1b73[261]);
         };
         if (this[_0x1b73[194]]) {
             $(_0x1b73[268])[_0x1b73[262]](_0x1b73[261]);
             $(_0x1b73[269])[_0x1b73[262]](_0x1b73[261]);
         } else {
             $(_0x1b73[268])[_0x1b73[265]](_0x1b73[261]);
             $(_0x1b73[269])[_0x1b73[265]](_0x1b73[261]);
         };
         if (this[_0x1b73[195]]) {
             $(_0x1b73[270])[_0x1b73[262]](_0x1b73[261]);
         } else {
             $(_0x1b73[270])[_0x1b73[265]](_0x1b73[261]);
         };
     };
     vkBoard[_0x1b73[190]][_0x1b73[43]][_0x1b73[232]] = function() {
         var _0x21f6x3 = this;
         $(_0x1b73[279])[_0x1b73[278]](_0x1b73[271], _0x1b73[272], function(_0x21f6x4) {
             var _0x21f6x2 = this[_0x1b73[273]];
             _0x21f6x3[_0x1b73[199]] = setInterval(function() {
                 _0x21f6x3[_0x1b73[198]]++;
                 if (_0x21f6x3[_0x1b73[198]] > 5) {
                     switch (_0x21f6x2) {
                         case _0x1b73[274]:
                             _0x21f6x3[_0x1b73[244]]();
                             break;;
                         default:
                             if (_0x21f6x2[_0x1b73[276]](_0x1b73[275]) != -1) {
                                 _0x21f6x3[_0x1b73[252]](_0x21f6x2[_0x1b73[277]](7));
                                 _0x21f6x3[_0x1b73[194]] = false;
                                 _0x21f6x3[_0x1b73[196]] = false;
                                 _0x21f6x3[_0x1b73[197]] = false;
                                 _0x21f6x3[_0x1b73[233]]();
                             };
                             break;;
                     };
                 };
             }, 50);
         });
         $(_0x1b73[279])[_0x1b73[278]](_0x1b73[271], _0x1b73[280], function(_0x21f6x2) {
             _0x21f6x3[_0x1b73[251]]();
         });
         $(_0x1b73[279])[_0x1b73[278]](_0x1b73[271], _0x1b73[281], function(_0x21f6x2) {
             _0x21f6x3[_0x1b73[251]]();
         });
         $(_0x1b73[279])[_0x1b73[278]](_0x1b73[271], _0x1b73[282], function(_0x21f6x4) {
             var _0x21f6x2 = this[_0x1b73[273]];
             switch (_0x21f6x2) {
                 case _0x1b73[283]:
                     ;
                 case _0x1b73[284]:
                     _0x21f6x3[_0x1b73[240]]();
                     break;;
                 case _0x1b73[285]:
                     ;
                 case _0x1b73[286]:
                     _0x21f6x3[_0x1b73[242]]();
                     _0x21f6x3[_0x1b73[241]]();
                     break;;
                 case _0x1b73[287]:
                     ;
                 case _0x1b73[288]:
                     _0x21f6x3[_0x1b73[241]]();
                     _0x21f6x3[_0x1b73[242]]();
                     break;;
                 case _0x1b73[289]:
                     _0x21f6x3[_0x1b73[243]]();
                     break;;
                 case _0x1b73[274]:
                     _0x21f6x3[_0x1b73[244]]();
                     break;;
                 case _0x1b73[290]:
                     _0x21f6x3[_0x1b73[246]]();
                     break;;
                 case _0x1b73[291]:
                     _0x21f6x3[_0x1b73[249]]();
                     break;;
                 default:
                     if (_0x21f6x2[_0x1b73[276]](_0x1b73[275]) != -1) {
                         _0x21f6x3[_0x1b73[252]](_0x21f6x2[_0x1b73[277]](7));
                         _0x21f6x3[_0x1b73[194]] = false;
                         _0x21f6x3[_0x1b73[196]] = false;
                         _0x21f6x3[_0x1b73[197]] = false;
                         _0x21f6x3[_0x1b73[233]]();
                     };
                     break;;
             };
         });
         _0x21f6x3[_0x1b73[208]][_0x1b73[295]](_0x1b73[292], function(_0x21f6x5) {
             var _0x21f6x4 = vkBoard[_0x1b73[0]][_0x1b73[4]](_0x21f6x5);
             if ((_0x21f6x4 == 65 || _0x21f6x4 == 67 || _0x21f6x4 == 86 || _0x21f6x4 == 88 || _0x21f6x4 == 89 || _0x21f6x4 == 90) && (_0x21f6x3[_0x1b73[197]] && !_0x21f6x3[_0x1b73[196]] && !_0x21f6x3[_0x1b73[194]])) {
                 return;
             };
             if (_0x21f6x3[_0x1b73[193]] == _0x21f6x3[_0x1b73[191]] && _0x21f6x4 != 27) {
                 return;
             };
             switch (_0x21f6x4) {
                 case 17:
                     _0x21f6x3[_0x1b73[197]] = false;
                     _0x21f6x3[_0x1b73[242]]();
                     break;;
                 case 18:
                     _0x21f6x3[_0x1b73[196]] = false;
                     _0x21f6x3[_0x1b73[241]]();
                     break;;
                 case 16:
                     _0x21f6x3[_0x1b73[194]] = false;
                     _0x21f6x3[_0x1b73[240]]();
                     break;;
                 case 27:
                     _0x21f6x3[_0x1b73[239]]();
                     break;;
                 case 8:
                     _0x21f6x3[_0x1b73[244]]();
                     _0x21f6x5[_0x1b73[293]]();
                     break;;
                 case 32:
                     _0x21f6x3[_0x1b73[249]]();
                     _0x21f6x5[_0x1b73[293]]();
                     break;;
                 case 10:
                     _0x21f6x3[_0x1b73[246]]();
                     _0x21f6x5[_0x1b73[293]]();
                     break;;
                 default:
                     var _0x21f6x2 = vkBoard[_0x1b73[33]][_0x1b73[186]][_0x1b73[294]](vkBoard[_0x1b73[0]][_0x1b73[4]](_0x21f6x5));
                     if (_0x21f6x2 != -1) {
                         _0x21f6x3[_0x1b73[252]](_0x1b73[144] + _0x21f6x2);
                         _0x21f6x3[_0x1b73[233]]();
                         _0x21f6x5[_0x1b73[293]]();
                         _0x21f6x3[_0x1b73[201]] = true;
                     };
                     break;;
             };
         });
         if ($[_0x1b73[3]][_0x1b73[5]]) {
             _0x21f6x3[_0x1b73[208]][_0x1b73[295]](_0x1b73[296], function(_0x21f6x2) {
                 if (_0x21f6x3[_0x1b73[201]]) {
                     _0x21f6x2[_0x1b73[293]]();
                     _0x21f6x3[_0x1b73[201]] = false;
                 };
             });
         };
         _0x21f6x3[_0x1b73[208]][_0x1b73[295]](_0x1b73[297], function(_0x21f6x2) {
             switch (vkBoard[_0x1b73[0]][_0x1b73[4]](_0x21f6x2)) {
                 case 17:
                     _0x21f6x3[_0x1b73[197]] = true;
                     _0x21f6x3[_0x1b73[242]]();
                     break;;
                 case 18:
                     _0x21f6x3[_0x1b73[196]] = true;
                     _0x21f6x3[_0x1b73[241]]();
                     break;;
                 case 16:
                     _0x21f6x3[_0x1b73[194]] = true;
                     _0x21f6x3[_0x1b73[240]]();
                     break;;
                 default:
                     ;
             };
         });
     };
     var _0xe365 = ["To start using this bookmarklet, drag it to your browser\x27s bookmarks toolbar.", "languages", "getElementById", "selected", "options", "TextAreaResizer", "fn", "processed", "addClass", "mousedown", "bind", "\x3Cdiv class=\x22grippie\x22\x3E\x3C/div\x3E", "append", "parent", "\x3Cdiv class=\x22resizable-textarea\x22\x3E\x3Cspan\x3E\x3C/span\x3E\x3C/div\x3E", "wrap", "div.grippie", "marginRight", "style", "offsetWidth", "px", "each", "el", "data", "blur", "y", "height", "opacity", "css", "mouseup", "mousemove", "max", "unbind", "focus", "clientX", "scrollLeft", "documentElement", "clientY", "scrollTop", "ready", "textarea.resizable:not(.processed)", "location", "http://vkboard.com/virtual-albanian-keyboard/", "1", "http://vkboard.com/virtual-amharic-keyboard/", "2", "http://vkboard.com/virtual-arabic-keyboard/", "3", "http://vkboard.com/virtual-armenian-keyboard/", "4", "http://vkboard.com/virtual-bangla-keyboard/", "5", "http://vkboard.com/virtual-cantonese-keyboard/", "6", "http://vkboard.com/virtual-chinese-keyboard/", "7", "http://vkboard.com/virtual-coptic-keyboard/", "8", "http://vkboard.com/virtual-croatian-keyboard/", "9", "http://vkboard.com/virtual-czech-keyboard/", "10", "http://vkboard.com/virtual-danish-keyboard/", "11", "http://vkboard.com/virtual-dhivehi-keyboard/", "12", "http://vkboard.com/virtual-dutch-keyboard/", "13", "http://vkboard.com/virtual-english-uk-keyboard/", "14", "http://vkboard.com/virtual-english-us-keyboard/", "15", "http://vkboard.com/virtual-estonian-keyboard/", "16", "http://vkboard.com/virtual-farsi-keyboard/", "17", "http://vkboard.com/virtual-finnish-keyboard/", "18", "http://vkboard.com/virtual-french-keyboard/", "19", "http://vkboard.com/virtual-georgian-keyboard/", "20", "http://vkboard.com/virtual-german-keyboard/", "21", "http://vkboard.com/virtual-greek-keyboard/", "22", "http://vkboard.com/virtual-gujarati-keyboard/", "23", "http://vkboard.com/virtual-hebrew-keyboard/", "24", "http://vkboard.com/virtual-hindi-keyboard/", "25", "http://vkboard.com/virtual-hungarian-keyboard/", "26", "http://vkboard.com/virtual-irish-keyboard/", "27", "http://vkboard.com/virtual-italian-keyboard/", "28", "http://vkboard.com/virtual-japanese-keyboard/", "29", "http://vkboard.com/virtual-kannada-keyboard/", "30", "http://vkboard.com/virtual-kazakh-keyboard/", "31", "http://vkboard.com/virtual-khmer-keyboard/", "32", "http://vkboard.com/virtual-khowar-keyboard/", "33", "http://vkboard.com/virtual-korean-keyboard/", "34", "http://vkboard.com/virtual-kurdish-keyboard/", "35", "http://vkboard.com/virtual-lao-keyboard/", "36", "http://vkboard.com/virtual-latvian-keyboard/", "37", "http://vkboard.com/virtual-lithuanian-keyboard/", "38", "http://vkboard.com/virtual-malayalam-keyboard/", "39", "http://vkboard.com/virtual-marathi-keyboard/", "40", "http://vkboard.com/virtual-myanmar-keyboard/", "41", "http://vkboard.com/virtual-nepali-keyboard/", "42", "http://vkboard.com/virtual-norwegian-keyboard/", "43", "http://vkboard.com/virtual-oriya-keyboard/", "44", "http://vkboard.com/virtual-pashto-keyboard/", "45", "http://vkboard.com/virtual-polish-keyboard/", "46", "http://vkboard.com/virtual-portuguese-keyboard/", "47", "http://vkboard.com/virtual-punjabi-keyboard/", "48", "http://vkboard.com/virtual-romanian-keyboard/", "49", "http://vkboard.com/virtual-russian-keyboard/", "50", "http://vkboard.com/virtual-sinhala-keyboard/", "51", "http://vkboard.com/virtual-slovak-keyboard/", "52", "http://vkboard.com/virtual-slovenian-keyboard/", "53", "http://vkboard.com/virtual-spanish-keyboard/", "54", "http://vkboard.com/virtual-swedish-keyboard/", "55", "http://vkboard.com/virtual-syriac-keyboard/", "56", "http://vkboard.com/virtual-tamil-keyboard/", "57", "http://vkboard.com/virtual-telugu-keyboard/", "58", "http://vkboard.com/virtual-tibetan-keyboard/", "59", "http://vkboard.com/virtual-thai-keyboard/", "60", "http://vkboard.com/virtual-turkish-keyboard/", "61", "http://vkboard.com/virtual-urdu-keyboard/", "62", "http://vkboard.com/virtual-ukrainian-keyboard/", "63", "http://vkboard.com/virtual-uzbek-keyboard/", "64", "http://vkboard.com/virtual-vietnamese-keyboard/", "65", "val", "onchange", "click", "hide", "#share-buttons", "share", "visibility", "visible", "parse", "XFBML", "go", "plusone", "\x3Ciframe allowtransparency=\x22true\x22 frameborder=\x220\x22 scrolling=\x22no\x22 class=\x22twitter-share-button twitter-count-horizontal\x22 title=\x22Twitter Tweet Button\x22 data-twttr-rendered=\x22true\x22 style=\x22width: 90px; height: 20px;\x22 src=\x22http://platform.twitter.com/widgets/tweet_button.html?url=http://www.vkBoard.com/\x26count=horizontal\x26size=m\x22\x3E\x3C/iframe\x3E", "html", "#tshare", "#fcomments", "#comments", "vkBoard-text", "length", "value", "setCaretPosition", "util", "_trackEvent", "vkBoard", "Select", "push", "#select", "", "#vkBoard-text", "New", "#new", "href", "twitter", "https://twitter.com/intent/tweet?text=", "\x26via=vkBoard.com", "Twitter", "innerHTML", "response", "Type a message in the box, before tweeting to twitter.", "delay", "fast", "fadeOut", "fadeIn", "#response", "#twitter", "authResponse", "stream.publish", "Update your Facebook status", "error_msg", "Message published to facebook successfully.", "Message not published to facebook.", "api", "publish_stream", "login", "Type a message in the box, before posting to facebook.", "#facebook", "google", "http://www.google.com/search?ie=UTF-8\x26q=", "Google", "Type a message in the box, before searching in google.", "#google", "yahoo", "http://search.yahoo.com/search?p=", "Yahoo", "Type a message in the box, before searching in yahoo.", "#yahoo", "youtube", "http://www.youtube.com/results?search_query=", "Youtube", "Type a message in the box, before searching in youtube.", "#youtube", "The file saved to your computer successfully.", "document.location=\x22../SaveAsWord.php?keyboard-text=", "\x22", "Save", "Type a message in the box, before saving the file.", "#save", "printarea", "_blank", "open", "document", "\x3Chtml\x3E\x3Chead\x3E\x3Cmeta http-equiv=\x22Content-Type\x22 content=\x22text/html; charset=UTF-8\x22\x3E\x3Ctitle\x3EvkBoard.com\x3C/title\x3E\x3Cstyle type=\x22text/css\x22 media=\x22screen\x22\x3EBODY {margin: 0px;font-size: 12px;font-family: Arial, sans-serif;}div#PrintHeader {height: 40px;padding-right: 30px;padding-left: 30px;background: #f1f1f1;border-bottom: 1px solid #e8e8e8;padding-top: 7px;padding-bottom: 8px;} div#PrintText {width: 700px;}       div#PrintArea {padding: 50px 50px;}#PrintIcon{Position: absolute;top: 3px;height: 48px;width: 48px;text-decoration: inherit;display: block;left: 50%;margin-left: -24px;background-image: url(http://vkboard.com/wp-content/themes/vkBoard/img/print-icon-preview-page.png);}\x3C/style\x3E\x3Cstyle type=\x22text/css\x22 media=\x22print\x22\x3E   BODY { margin: 5px;font-size: 16px;font-family: Arial, sans-serif;}div#PrintHeader {display: none;}div#PrintText {width: 700px;}\x3C/style\x3E\x3C/head\x3E\x3Cbody\x3E\x3Cdiv id=\x22PrintHeader\x22\x3E\x3Ca href=\x22\x22 onclick=\x22window.print()\x22 title=\x22Print\x22 id=\x22PrintIcon\x22\x3E \x3C/a\x3E\x3C/div\x3E\x3Cdiv id=\x22PrintArea\x22\x3E\x3Cdiv id=\x22PrintText\x22\x3E\x3Cspan\x3E", "write", "newText", "\x3C/span\x3E\x3C/div\x3E\x3C/div\x3E\x3C/body\x3E\x3C/html\x3E", "close", "Type a message in the box, before previewing the text.", "\x3Chtml\x3E\x3Chead\x3E\x3Ctitle\x3EvkBoard.com\x3C/title\x3E\x3C/head\x3E\x3Cbody onload=\x22window.print()\x22\x3E", "\x3C/body\x3E\x3C/html\x3E", "Type a message in the box, before printing the text."];

     function info() {
         alert(_0xe365[0]);
     };

     function SetSel(_0xd7f7x3) {
         var _0xd7f7x4 = document[_0xe365[2]](_0xe365[1]);
         _0xd7f7x4[_0xe365[4]][_0xd7f7x3][_0xe365[3]] = true;
     };
     $(document)[_0xe365[39]](function(_0xd7f7x5) {
         var _0xd7f7x6, _0xd7f7x7;
         var _0xd7f7x8 = 0;
         var _0xd7f7x9 = 32;
         var _0xd7f7xa;
         _0xd7f7x5[_0xe365[6]][_0xe365[5]] = function() {
             return this[_0xe365[21]](function() {
                 _0xd7f7x6 = _0xd7f7x5(this)[_0xe365[8]](_0xe365[7]);
                 _0xd7f7x7 = null;
                 _0xd7f7x5(this)[_0xe365[15]](_0xe365[14])[_0xe365[13]]()[_0xe365[12]](_0xd7f7x5(_0xe365[11])[_0xe365[10]](_0xe365[9], {
                     el: this
                 }, _0xd7f7xc));
                 var _0xd7f7xb = _0xd7f7x5(_0xe365[16], _0xd7f7x5(this)[_0xe365[13]]())[0];
                 _0xd7f7xb[_0xe365[18]][_0xe365[17]] = (_0xd7f7xb[_0xe365[19]] - _0xd7f7x5(this)[0][_0xe365[19]]) + _0xe365[20];
             });
         };

         function _0xd7f7xc(_0xd7f7xd) {
             _0xd7f7x6 = _0xd7f7x5(_0xd7f7xd[_0xe365[23]][_0xe365[22]]);
             _0xd7f7x6[_0xe365[24]]();
             _0xd7f7x8 = _0xd7f7x12(_0xd7f7xd)[_0xe365[25]];
             _0xd7f7x7 = _0xd7f7x6[_0xe365[26]]() - _0xd7f7x8;
             _0xd7f7x6[_0xe365[28]](_0xe365[27], 0.25);
             _0xd7f7x5(document)[_0xe365[30]](_0xd7f7xe)[_0xe365[29]](_0xd7f7x11);
             return false;
         };

         function _0xd7f7xe(_0xd7f7xd) {
             var _0xd7f7xf = _0xd7f7x12(_0xd7f7xd)[_0xe365[25]];
             var _0xd7f7x10 = _0xd7f7x7 + _0xd7f7xf;
             if (_0xd7f7x8 >= (_0xd7f7xf)) {
                 _0xd7f7x10 -= 5;
             };
             _0xd7f7x8 = _0xd7f7xf;
             _0xd7f7x10 = Math[_0xe365[31]](_0xd7f7x9, _0xd7f7x10);
             _0xd7f7x6[_0xe365[26]](_0xd7f7x10 + _0xe365[20]);
             if (_0xd7f7x10 < _0xd7f7x9) {
                 _0xd7f7x11(_0xd7f7xd);
             };
             return false;
         };

         function _0xd7f7x11(_0xd7f7xd) {
             _0xd7f7x5(document)[_0xe365[32]](_0xe365[30], _0xd7f7xe)[_0xe365[32]](_0xe365[29], _0xd7f7x11);
             _0xd7f7x6[_0xe365[28]](_0xe365[27], 1);
             _0xd7f7x6[_0xe365[33]]();
             _0xd7f7x6 = null;
             _0xd7f7x7 = null;
             _0xd7f7x8 = 0;
         };

         function _0xd7f7x12(_0xd7f7xd) {
             return {
                 x: _0xd7f7xd[_0xe365[34]] + document[_0xe365[36]][_0xe365[35]],
                 y: _0xd7f7xd[_0xe365[37]] + document[_0xe365[36]][_0xe365[38]]
             };
         };
     });
     Â;
     $(document)[_0xe365[39]](function() {
         $(_0xe365[40]).TextAreaResizer();
     });
     $(document)[_0xe365[39]](function() {
         var _0xd7f7x13 = document[_0xe365[2]](_0xe365[1]);
         var _0xd7f7x14 = function() {
             switch ($(this)[_0xe365[172]]()) {
                 case _0xe365[43]:
                     document[_0xe365[41]] = _0xe365[42];
                     break;;
                 case _0xe365[45]:
                     document[_0xe365[41]] = _0xe365[44];
                     break;;
                 case _0xe365[47]:
                     document[_0xe365[41]] = _0xe365[46];
                     break;;
                 case _0xe365[49]:
                     document[_0xe365[41]] = _0xe365[48];
                     break;;
                 case _0xe365[51]:
                     document[_0xe365[41]] = _0xe365[50];
                     break;;
                 case _0xe365[53]:
                     document[_0xe365[41]] = _0xe365[52];
                     break;;
                 case _0xe365[55]:
                     document[_0xe365[41]] = _0xe365[54];
                     break;;
                 case _0xe365[57]:
                     document[_0xe365[41]] = _0xe365[56];
                     break;;
                 case _0xe365[59]:
                     document[_0xe365[41]] = _0xe365[58];
                     break;;
                 case _0xe365[61]:
                     document[_0xe365[41]] = _0xe365[60];
                     break;;
                 case _0xe365[63]:
                     document[_0xe365[41]] = _0xe365[62];
                     break;;
                 case _0xe365[65]:
                     document[_0xe365[41]] = _0xe365[64];
                     break;;
                 case _0xe365[67]:
                     document[_0xe365[41]] = _0xe365[66];
                     break;;
                 case _0xe365[69]:
                     document[_0xe365[41]] = _0xe365[68];
                     break;;
                 case _0xe365[71]:
                     document[_0xe365[41]] = _0xe365[70];
                     break;;
                 case _0xe365[73]:
                     document[_0xe365[41]] = _0xe365[72];
                     break;;
                 case _0xe365[75]:
                     document[_0xe365[41]] = _0xe365[74];
                     break;;
                 case _0xe365[77]:
                     document[_0xe365[41]] = _0xe365[76];
                     break;;
                 case _0xe365[79]:
                     document[_0xe365[41]] = _0xe365[78];
                     break;;
                 case _0xe365[81]:
                     document[_0xe365[41]] = _0xe365[80];
                     break;;
                 case _0xe365[83]:
                     document[_0xe365[41]] = _0xe365[82];
                     break;;
                 case _0xe365[85]:
                     document[_0xe365[41]] = _0xe365[84];
                     break;;
                 case _0xe365[87]:
                     document[_0xe365[41]] = _0xe365[86];
                     break;;
                 case _0xe365[89]:
                     document[_0xe365[41]] = _0xe365[88];
                     break;;
                 case _0xe365[91]:
                     document[_0xe365[41]] = _0xe365[90];
                     break;;
                 case _0xe365[93]:
                     document[_0xe365[41]] = _0xe365[92];
                     break;;
                 case _0xe365[95]:
                     document[_0xe365[41]] = _0xe365[94];
                     break;;
                 case _0xe365[97]:
                     document[_0xe365[41]] = _0xe365[96];
                     break;;
                 case _0xe365[99]:
                     document[_0xe365[41]] = _0xe365[98];
                     break;;
                 case _0xe365[101]:
                     document[_0xe365[41]] = _0xe365[100];
                     break;;
                 case _0xe365[103]:
                     document[_0xe365[41]] = _0xe365[102];
                     break;;
                 case _0xe365[105]:
                     document[_0xe365[41]] = _0xe365[104];
                     break;;
                 case _0xe365[107]:
                     document[_0xe365[41]] = _0xe365[106];
                     break;;
                 case _0xe365[109]:
                     document[_0xe365[41]] = _0xe365[108];
                     break;;
                 case _0xe365[111]:
                     document[_0xe365[41]] = _0xe365[110];
                     break;;
                 case _0xe365[113]:
                     document[_0xe365[41]] = _0xe365[112];
                     break;;
                 case _0xe365[115]:
                     document[_0xe365[41]] = _0xe365[114];
                     break;;
                 case _0xe365[117]:
                     document[_0xe365[41]] = _0xe365[116];
                     break;;
                 case _0xe365[119]:
                     document[_0xe365[41]] = _0xe365[118];
                     break;;
                 case _0xe365[121]:
                     document[_0xe365[41]] = _0xe365[120];
                     break;;
                 case _0xe365[123]:
                     document[_0xe365[41]] = _0xe365[122];
                     break;;
                 case _0xe365[125]:
                     document[_0xe365[41]] = _0xe365[124];
                     break;;
                 case _0xe365[127]:
                     document[_0xe365[41]] = _0xe365[126];
                     break;;
                 case _0xe365[129]:
                     document[_0xe365[41]] = _0xe365[128];
                     break;;
                 case _0xe365[131]:
                     document[_0xe365[41]] = _0xe365[130];
                     break;;
                 case _0xe365[133]:
                     document[_0xe365[41]] = _0xe365[132];
                     break;;
                 case _0xe365[135]:
                     document[_0xe365[41]] = _0xe365[134];
                     break;;
                 case _0xe365[137]:
                     document[_0xe365[41]] = _0xe365[136];
                     break;;
                 case _0xe365[139]:
                     document[_0xe365[41]] = _0xe365[138];
                     break;;
                 case _0xe365[141]:
                     document[_0xe365[41]] = _0xe365[140];
                     break;;
                 case _0xe365[143]:
                     document[_0xe365[41]] = _0xe365[142];
                     break;;
                 case _0xe365[145]:
                     document[_0xe365[41]] = _0xe365[144];
                     break;;
                 case _0xe365[147]:
                     document[_0xe365[41]] = _0xe365[146];
                     break;;
                 case _0xe365[149]:
                     document[_0xe365[41]] = _0xe365[148];
                     break;;
                 case _0xe365[151]:
                     document[_0xe365[41]] = _0xe365[150];
                     break;;
                 case _0xe365[153]:
                     document[_0xe365[41]] = _0xe365[152];
                     break;;
                 case _0xe365[155]:
                     document[_0xe365[41]] = _0xe365[154];
                     break;;
                 case _0xe365[157]:
                     document[_0xe365[41]] = _0xe365[156];
                     break;;
                 case _0xe365[159]:
                     document[_0xe365[41]] = _0xe365[158];
                     break;;
                 case _0xe365[161]:
                     document[_0xe365[41]] = _0xe365[160];
                     break;;
                 case _0xe365[163]:
                     document[_0xe365[41]] = _0xe365[162];
                     break;;
                 case _0xe365[165]:
                     document[_0xe365[41]] = _0xe365[164];
                     break;;
                 case _0xe365[167]:
                     document[_0xe365[41]] = _0xe365[166];
                     break;;
                 case _0xe365[169]:
                     document[_0xe365[41]] = _0xe365[168];
                     break;;
                 case _0xe365[171]:
                     document[_0xe365[41]] = _0xe365[170];
                     break;;
             };
         };
         _0xd7f7x13[_0xe365[173]] = _0xd7f7x14;
         $(_0xe365[176])[_0xe365[10]](_0xe365[174], function() {
             $(this)[_0xe365[32]](_0xe365[174]);
             $(_0xe365[176])[_0xe365[175]]();
             var _0xd7f7x15 = document[_0xe365[2]](_0xe365[177]);
             $(_0xd7f7x15)[_0xe365[28]](_0xe365[178], _0xe365[179]);
             FB[_0xe365[181]][_0xe365[180]](_0xd7f7x15);
             gapi[_0xe365[183]][_0xe365[182]](_0xd7f7x15);
             $(_0xe365[186])[_0xe365[185]](_0xe365[184]);
         });
         $(_0xe365[188])[_0xe365[10]](_0xe365[174], function() {
             $(this)[_0xe365[32]](_0xe365[174]);
             $(_0xe365[187])[_0xe365[175]]();
             FB[_0xe365[181]][_0xe365[180]](this);
             return false;
         });
         var _0xd7f7x16 = document[_0xe365[2]](_0xe365[189]);
         $(_0xe365[198])[_0xe365[10]](_0xe365[174], function() {
             vkBoard[_0xe365[193]][_0xe365[192]](_0xd7f7x16, 0, _0xd7f7x16[_0xe365[191]][_0xe365[190]]);
             _gaq[_0xe365[197]]([_0xe365[194], _0xe365[195], _0xe365[196], _0xd7f7x16[_0xe365[191]][_0xe365[190]].toString()]);
         });
         $(_0xe365[202])[_0xe365[10]](_0xe365[174], function() {
             $(_0xe365[200])[_0xe365[172]](_0xe365[199]);
             vkBoard[_0xe365[193]][_0xe365[192]](_0xd7f7x16, 0, _0xd7f7x16[_0xe365[191]][_0xe365[190]]);
             _gaq[_0xe365[197]]([_0xe365[194], _0xe365[195], _0xe365[201], _0xd7f7x16[_0xe365[191]][_0xe365[190]].toString()]);
         });
         $(_0xe365[216])[_0xe365[10]](_0xe365[174], function() {
             if (document[_0xe365[2]](_0xe365[189])[_0xe365[191]][_0xe365[190]] > 0) {
                 document[_0xe365[2]](_0xe365[204])[_0xe365[203]] = _0xe365[205] + encodeURIComponent(_0xd7f7x16[_0xe365[191]]) + _0xe365[206];
                 _gaq[_0xe365[197]]([_0xe365[194], _0xe365[195], _0xe365[207], _0xd7f7x16[_0xe365[191]][_0xe365[190]].toString()]);
             } else {
                 document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[210];
                 $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
             };
             return true;
         });
         $(_0xe365[227])[_0xe365[10]](_0xe365[174], function() {
             if (document[_0xe365[2]](_0xe365[189])[_0xe365[191]][_0xe365[190]] > 0) {
                 FB[_0xe365[225]](function(_0xd7f7x17) {
                     if (_0xd7f7x17[_0xe365[217]]) {
                         var _0xd7f7x18 = {
                             method: _0xe365[218],
                             message: document[_0xe365[2]](_0xe365[189])[_0xe365[191]],
                             user_prompt_message: _0xe365[219]
                         };
                         FB[_0xe365[223]](_0xd7f7x18, function(_0xd7f7x17) {
                             if (_0xd7f7x17 && !_0xd7f7x17[_0xe365[220]]) {
                                 document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[221];
                                 $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
                             } else {
                                 document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[222];
                                 $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
                             };
                         });
                     };
                 }, {
                     scope: _0xe365[224]
                 });
             } else {
                 document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[226];
                 $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
             };
         });
         $(_0xe365[232])[_0xe365[10]](_0xe365[174], function() {
             if (document[_0xe365[2]](_0xe365[189])[_0xe365[191]][_0xe365[190]] > 0) {
                 document[_0xe365[2]](_0xe365[228])[_0xe365[203]] = _0xe365[229] + encodeURIComponent(_0xd7f7x16[_0xe365[191]]);
                 _gaq[_0xe365[197]]([_0xe365[194], _0xe365[195], _0xe365[230], _0xd7f7x16[_0xe365[191]][_0xe365[190]].toString()]);
             } else {
                 document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[231];
                 $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
             };
             return true;
         });
         $(_0xe365[237])[_0xe365[10]](_0xe365[174], function() {
             if (document[_0xe365[2]](_0xe365[189])[_0xe365[191]][_0xe365[190]] > 0) {
                 document[_0xe365[2]](_0xe365[233])[_0xe365[203]] = _0xe365[234] + encodeURIComponent(_0xd7f7x16[_0xe365[191]]);
                 _gaq[_0xe365[197]]([_0xe365[194], _0xe365[195], _0xe365[235], _0xd7f7x16[_0xe365[191]][_0xe365[190]].toString()]);
             } else {
                 document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[236];
                 $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
             };
             return true;
         });
         $(_0xe365[242])[_0xe365[10]](_0xe365[174], function() {
             if (document[_0xe365[2]](_0xe365[189])[_0xe365[191]][_0xe365[190]] > 0) {
                 document[_0xe365[2]](_0xe365[238])[_0xe365[203]] = _0xe365[239] + encodeURIComponent(_0xd7f7x16[_0xe365[191]]);
                 _gaq[_0xe365[197]]([_0xe365[194], _0xe365[195], _0xe365[240], _0xd7f7x16[_0xe365[191]][_0xe365[190]].toString()]);
             } else {
                 document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[241];
                 $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
             };
             return true;
         });
         $(_0xe365[248])[_0xe365[10]](_0xe365[174], function() {
             if (document[_0xe365[2]](_0xe365[189])[_0xe365[191]][_0xe365[190]] > 0) {
                 document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[243];
                 $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
                 setTimeout(_0xe365[244] + encodeURIComponent(_0xd7f7x16[_0xe365[191]]) + _0xe365[245], 100);
                 _gaq[_0xe365[197]]([_0xe365[194], _0xe365[195], _0xe365[246], _0xd7f7x16[_0xe365[191]][_0xe365[190]].toString()]);
             } else {
                 document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[247];
                 $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
             };
             return false;
         });
     });

     function preview() {
         if (document[_0xe365[2]](_0xe365[189])[_0xe365[191]][_0xe365[190]] > 0) {
             var _0xd7f7x1a = document[_0xe365[2]](_0xe365[189])[_0xe365[191]];
             var _0xd7f7x1b = document[_0xe365[2]](_0xe365[249]);
             var _0xd7f7x1c = window[_0xe365[251]](_0xe365[199], _0xe365[250]);
             _0xd7f7x1c[_0xe365[252]][_0xe365[251]]();
             _0xd7f7x1c[_0xe365[252]][_0xe365[254]](_0xe365[253]);
             _0xd7f7x1c[_0xe365[252]][_0xe365[254]](document[_0xe365[2]](_0xe365[255])[_0xe365[208]] = _0xd7f7x1a);
             _0xd7f7x1c[_0xe365[252]][_0xe365[254]](_0xe365[256]);
             _0xd7f7x1c[_0xe365[252]][_0xe365[257]]();
         } else {
             document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[258];
             $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
         };
         return false;
     };

     function print() {
         if (document[_0xe365[2]](_0xe365[189])[_0xe365[191]][_0xe365[190]] > 0) {
             var _0xd7f7x1a = document[_0xe365[2]](_0xe365[189])[_0xe365[191]];
             var _0xd7f7x1b = document[_0xe365[2]](_0xe365[249]);
             var _0xd7f7x1c = window[_0xe365[251]](_0xe365[199], _0xe365[250]);
             _0xd7f7x1c[_0xe365[252]][_0xe365[251]]();
             _0xd7f7x1c[_0xe365[252]][_0xe365[254]](_0xe365[259]);
             _0xd7f7x1c[_0xe365[252]][_0xe365[254]](document[_0xe365[2]](_0xe365[255])[_0xe365[208]] = _0xd7f7x1a);
             _0xd7f7x1c[_0xe365[252]][_0xe365[254]](_0xe365[260]);
             _0xd7f7x1c[_0xe365[252]][_0xe365[257]]();
         } else {
             document[_0xe365[2]](_0xe365[209])[_0xe365[208]] = _0xe365[261];
             $(_0xe365[215])[_0xe365[214]](_0xe365[212])[_0xe365[211]](3000)[_0xe365[213]](_0xe365[212])[_0xe365[211]](100);
         };
         return false;
     };

 }
