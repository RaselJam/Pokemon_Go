import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    enum: ['PLAYER', 'ADMIN'],
    default: 'PLAYER',
    required: true,
  },

  password: String,
  coins: {
    type: Number,
    required: true,
    min: 0,
    max: 20000,
    default: 0,
  }
})
var User = mongoose.model('User', userSchema);

export default User;