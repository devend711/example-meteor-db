var Plants = new Meteor.Collection("Plants");

if (Meteor.isClient) { 
  Template.plants.helpers({
    plantArray: function(){
      return Plants.find({}, {sort: {name: 1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


PlantSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
  },
  size: {
    type: String,
    label: "Size"
  }
})



Meteor.methods({
  addPlant: function(newPlant){
    if (Match.test(newPlant, PlantSchema)){
      return Plants.insert(newPlant);
    } else {
      throw new Meteor.Error(413, "Invalid plant!");
    }
  }
});
