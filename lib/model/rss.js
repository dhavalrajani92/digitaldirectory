rssFeed = new Mongo.Collection("rssFeed");

Schema = {};

Schema.rssFeed = new SimpleSchema({

directoryId:{
  type:String
},
rssFeed:{
  type:[Object],
  blackbox:true
}
});

//Attached Schema with rssFeed collection
rssFeed.attachSchema(Schema.rssFeed);
