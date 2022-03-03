const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  roles:[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref:"Role"
      }
  ],
  profile_url: {
    type: String
  },
}, {
  collection: 'User'
})
module.exports = mongoose.model('User', User)