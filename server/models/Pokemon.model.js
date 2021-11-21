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
  ownerId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  location: {
    type: {
      type: String,
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      required: true
    }
  }


})
pokemonSchema.index({ location: '2dsphere' });
var Pokemon = mongoose.model('Pokemon', pokemonSchema);
export default Pokemon;



