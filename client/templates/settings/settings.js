var rssfeed = [];
Template.settings.onCreated(function(){

  rssfeed = [];
  if (rssFeedDdl.find().fetch().length) {
      rssfeed = rssFeedDdl.find().fetch()[0].rssFeeds;
      rssfeed.forEach(function(d, i) {
          d['index'] = i + 1;
      });
  }
});


Template.settings.helpers({

    rssFeedList: function() {
       return rssfeed;
    },
    branding:function(){
      return rssFeedDdl.find().fetch()[0].branding;
    }

});

Template.settings.events({
    "click #add": function(event, template) {
        var ele = $('.clsfield:last').clone();
        $(ele).insertAfter(".clsfield:last");
        $(".clsfield:last .clsRssFeed").val("");

    },
    "click .closed": function(e, t) {
        if ($('.closed').closest('.clsfield').parent().find('.closed').length > 1) {
            $(e.currentTarget).closest('.clsfield').remove();
        }
        else {
          $(".clsfield:last .clsRssFeed").val("");
          $("#save").click();
        }
    },
    "change .clsRssFeed": function(e, v) {

        Meteor.call('getRssContent', "rssFeed", $(e.currentTarget).val(), "", "true", function(err, res) {
            if (err) {
                //  console.log(err);
                FlashMessages.sendError(infoMessages.RssFeedInCorrect);
                $(e.currentTarget).val("");
            } else {
                FlashMessages.sendSuccess(infoMessages.RssFeedCorrect);
            }
        });
    },
    "click #save": function(e, t) {
        var rssFeedArray = [];
        $('.clsRssFeed').each(function() {
            if ($(this).val() != "") {
                rssFeedArray.push($(this).val());
                console.log(rssFeedArray);
            }
        });
        var branding= $('[name="branding"]').val();
        Meteor.call("insert_rss_feed", rssFeedArray,branding, function(error, result) {
            if (error) {
                console.log("error", error);
                FlashMessages.sendError(error.reason);
            }
            else {
              FlashMessages.sendSuccess(infoMessages.SettingsSaved);
            }
        });


    }
});
