const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Promo = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  img_url: {
    type: String
  },
  time_end: {
    type: Date
  },
  user_id: {
    type: String
  }
  
  
},
{ timestamps:true }, {
  collection: 'Promotions'
})
module.exports = mongoose.model('Promo', Promo)