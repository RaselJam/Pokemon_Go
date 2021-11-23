import mongoose from 'mongoose';
const foodSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
    default: 'grass'
  },
  description: String,
  amount: {
    type: Number,
    required: true,
    default: 10,
  },

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
foodSchema.index({ location: '2dsphere' });
var Food = mongoose.model('Food', foodSchema);
export default Food;