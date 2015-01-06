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
  Meteor.subscribe('plants');

  Template.plants.helpers({
    plants: function() {
      if (Session.get("searchTerm") && Session.get("searchTerm") != "") { // if there's a search term, filter the results
        return Plants.find({"name": new RegExp([Session.get("searchTerm")].join(""),"i")}, 
                            {sort: {name: 1}});
      }
      return Plants.find({}, {sort: {name: 1}});
    },

    reapplyMasonry: function() {
      setTimeout(function(){
        applyMasonry();
      }, 1000);
    }
  });

  Template.body.events({
    "change input#search": function(event) {
      Session.set("searchTerm", event.target.value);
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('plants', function() {
    return Plants.find({}, {sort: {name: 1}}); // publish all of them for now
  });

  Meteor.startup(function() {
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

function applyMasonry() {
  console.log('called masonry');
  $container = $('#plants-container');
  $container.masonry({
    itemSelector: '.plant-card',
    gutterWidth: 15
  });
  $container.masonry('reloadItems');
}