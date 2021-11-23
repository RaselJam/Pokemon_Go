import mongoose from 'mongoose';
const pokemonSchema = mongoose.Schema({
  //TODOAdd more details  to the model
  name: {
    type: String,
    required: true,
    default: 'The Anonymous'
  },
  description: String,
  speed: {
    type: Number,
    required: true,
    default: 10,
  },
  attack: {
    type: Number,
    required: true,
    default: 10,
  },
  life: {
    type: Number,
    required: true,
    default: 10,
  },
  imageURL: String,
  ownerId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  location: {
    type: {
      type: String,
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      //IronHack madrid as deafult :
      default: [40.392604, -3.698713],
      required: true
    }
  }


})
pokemonSchema.index({ location: '2dsphere' });
var Pokemon = mongoose.model('Pokemon', pokemonSchema);
export default Pokemon;



