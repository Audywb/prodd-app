const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Role = new Schema({
  name: {
    type: String
  }
},
//  {
//   collection: 'User'
//     }
)
module.exports = mongoose.model('Role', Role)