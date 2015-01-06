var PlantSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String,
    optional: true
  },
  info: {
    type: [String],
    optional: true
  },
  tips: {
    type: [String],
    optional: true
  }
})

Plants = new Meteor.Collection("Plants");

Plants.attachSchema(PlantSchema);