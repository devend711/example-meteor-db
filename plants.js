PlantSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String
  },
  size: {
    type: String
  },
  imageUrl: {
    type: String,
    optional: true
  },
  tips: {
    type: [String],
    optional: true
  }
})

var Plants = new Meteor.Collection("Plants");

Plants.attachSchema(PlantSchema);

if (Meteor.isClient) { 
  // Template.plants.helpers({
  //   plantArray: function(){
  //     return Plants.find({}, {sort: {name: 1}});
  //   }
  // });
  Meteor.subscribe('plantArray');
}

if (Meteor.isServer) {
  Meteor.publish('plantArray', function(){
    return Plants.find({}, {sort: {name: 1}});
  });
  
  Meteor.startup(function () {
    if (Plants.find().count() == 0) { // seed the DB if empty
      var json = JSON.parse(Assets.getText('seed.json'));
      for (i=0; i<json.length; i++) {
        try {
          Plants.insert(json[i]);
        } catch(err) {
          console.log("Unable to add: " + JSON.stringify(json[i]));
        }
      }
    }
  });
}