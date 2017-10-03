rssFeedDdl = new Mongo.Collection("rssFeedDdl");

Schema = {};

Schema.rssFeedDdl = new SimpleSchema({

rssFeeds:{
  type:[String]
},
branding:{
  type:String,
  optional: true
}
});

//Attached Schema with rssFeed collection
rssFeedDdl.attachSchema(Schema.rssFeedDdl);
