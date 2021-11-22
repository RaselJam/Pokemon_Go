import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
  //TODOAdd more details  to the model
  userName: {
    type: String,
  },
  role: {
    type: String,
    enum: ['PLAYER', 'ADMIN'],
    default: 'PLAYER',
    //required: true,
  },

  password: String,
  //TODO add min max:
  coins: {
    type: Number,
    required: true,
    default: 0,
  },
  //TODO investigate more about Ref:
  // pokemons: {
  //   type: [mongoose.SchemaTypes.ObjectId],
  //   ref: "Pokemon",
  // }


})
var User = mongoose.model('User', userSchema);

export default User;