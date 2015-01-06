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