import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
  //TODOAdd more details  to the model
  userName: {
    type: String,
  },
  role: {
    type: String,
    enum: ['player', 'admin'],
    default: 'player',
    required: true,
  },
  password: String,
  coins: {
    type: Number,
    required: true,
    default: 0,
  },
  pokemons: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Pokemon",
  }


})
var User = mongoose.model('User', userSchema);

export default User;