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

function applyMasonry() {
  console.log('called masonry');
  $container = $('#plants-container');
  $container.masonry({
    itemSelector: '.plant-card',
    gutterWidth: 15
  });
  $container.masonry('reloadItems');
}