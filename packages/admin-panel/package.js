Package.describe({
    name: 'material:admin-panel',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('jquery');
    // api.addFiles('admin-panel.js');
    //   api.addFiles('fonts/glyphicons-halflings-regular.eot', 'client',{isAsset: true} );
    //   api.addFiles('fonts/glyphicons-halflings-regular.woff2', 'client',{isAsset: true});
    // api.addFiles('fonts/glyphicons-halflings-regular.woff', 'client',{isAsset: true});
    // api.addFiles('fonts/glyphicons-halflings-regular.ttf', 'client',{isAsset: true});
    // api.addFiles('fonts/glyphicons-halflings-regular.svg', 'client',{isAsset: true});
    //
    api.addFiles([
        'fonts/glyphicons-halflings-regular.eot',
        'fonts/glyphicons-halflings-regular.woff2',
        'fonts/glyphicons-halflings-regular.woff',
        'fonts/glyphicons-halflings-regular.ttf',
        'fonts/glyphicons-halflings-regular.svg',

        'fonts/roboto/Roboto-Light-webfont.eot',
        'fonts/roboto/Roboto-Light-webfont.woff',
        'fonts/roboto/Roboto-Light-webfont.ttf',
        'fonts/roboto/Roboto-Light-webfont.svg',


        'fonts/roboto/Roboto-Regular-webfont.eot',
        'fonts/roboto/Roboto-Regular-webfont.woff',
        'fonts/roboto/Roboto-Regular-webfont.ttf',
        'fonts/roboto/Roboto-Regular-webfont.svg',

        'fonts/roboto/Roboto-Medium-webfont.eot',
        'fonts/roboto/Roboto-Medium-webfont.woff',
        'fonts/roboto/Roboto-Medium-webfont.ttf',
        'fonts/roboto/Roboto-Medium-webfont.svg',


        'fonts/roboto/Roboto-Bold-webfont.eot',
        'fonts/roboto/Roboto-Bold-webfont.woff',
        'fonts/roboto/Roboto-Bold-webfont.ttf',
        'fonts/roboto/Roboto-Bold-webfont.svg',

        'fonts/shadowsintolight/shadowsintolight-webfont.eot',
        'fonts/shadowsintolight/shadowsintolight-webfont.woff',
        'fonts/shadowsintolight/shadowsintolight-webfont.ttf',
        'fonts/shadowsintolight/shadowsintolight-webfont.svg',

        'fonts/weather-icons/weather-icons.eot',
        'fonts/weather-icons/weather-icons.woff',
        'fonts/weather-icons/weather-icons.ttf',
        'fonts/weather-icons/weather-icons.svg',

        'fonts/weathericons-regular-webfont.eot',
        'fonts/weathericons-regular-webfont.woff2',
        'fonts/weathericons-regular-webfont.woff',
        'fonts/weathericons-regular-webfont.ttf',
        'fonts/weathericons-regular-webfont.svg',

        'vendors/bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff',
        'vendors/bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.ttf',
        'vendors/farbtastic/marker.png',
        'vendors/farbtastic/mask.png',
        'vendors/farbtastic/wheel.png',
        'img/icons/weather/28.png',
        'img/icons/weather/2.png',

    ], 'client', {
        isAsset: true
    });

    api.addFiles("vendors/bower_components/fullcalendar/dist/fullcalendar.min.css", 'client');
    api.addFiles("vendors/bower_components/animate.css/animate.min.css", 'client');
    api.addFiles("vendors/bower_components/bootstrap-sweetalert/lib/sweet-alert.css", 'client');
    api.addFiles("vendors/bower_components/material-design-iconic-font/dist/css/material-design-iconic-font.min.css", 'client');
    api.addFiles("vendors/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css", 'client');
    api.addFiles("vendors/bootgrid/jquery.bootgrid.min.css", 'client');



    api.addFiles("css/app.min.1.css", 'client');
    api.addFiles("css/app.min.2.css", 'client');
    api.addFiles("css/form_wizard.css", 'client');
    api.addFiles("vendors/farbtastic/farbtastic.css", 'client');
    api.addFiles("vendors/bower_components/chosen/chosen.min.css", 'client');
    api.addFiles("img/jquery.bxslider.css", 'client');
    api.addFiles("img/tv-themes.css", 'client');
    api.addFiles("css/weather-icons.css", 'client');


    // api.addFiles("vendors/bower_components/jquery/dist/jquery.min.js", 'client');
    // api.addFiles("js/jquery-migrate-1.2.1.min.js", 'client');

    api.addFiles("vendors/bower_components/bootstrap/dist/js/bootstrap.min.js", 'client');

    api.addFiles("vendors/bower_components/flot/jquery.flot.js", 'client');
    api.addFiles("vendors/bower_components/flot/jquery.flot.resize.js", 'client');
    api.addFiles("vendors/bower_components/flot.curvedlines/curvedLines.js", 'client');
    api.addFiles("vendors/sparklines/jquery.sparkline.min.js", 'client');
    api.addFiles("vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js", 'client');

    api.addFiles("vendors/bower_components/moment/min/moment.min.js", 'client');
    api.addFiles("vendors/bower_components/fullcalendar/dist/fullcalendar.min.js", 'client');
    api.addFiles("vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js", 'client');
    api.addFiles("vendors/bower_components/Waves/dist/waves.min.js", 'client');
    api.addFiles("vendors/bootstrap-growl/bootstrap-growl.min.js", 'client');
    api.addFiles("vendors/bower_components/bootstrap-sweetalert/lib/sweet-alert.min.js", 'client');
    api.addFiles("vendors/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js", 'client');

    api.addFiles("vendors/bower_components/jquery-placeholder/jquery.placeholder.min.js", 'client');
    api.addFiles("vendors/bootgrid/jquery.bootgrid.updated.min.js", 'client');
    api.addFiles("vendors/farbtastic/farbtastic.min.js", 'client');
    api.addFiles("vendors/bower_components/chosen/chosen.jquery.min.js", 'client');
    api.addFiles("js/functions.js", 'client');
    // api.addFiles("js/spin.min.js", 'client');
    // api.addFiles("js/jquery.autosize.min.js", 'client');
    // api.addFiles("js/jquery.nanoscroller.min.js", 'client');
    // api.addFiles("js/additional-methods.min.js", 'client');
    api.addFiles("js/jquery.bootstrap.wizard.min.js", 'client');
    api.addFiles("img/jquery.bxslider.js", 'client');



});
