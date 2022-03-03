const express = require('express');
const app = express();
const proRoute = express.Router();
let ProModel = require('../model/Promo');
// Add Song
proRoute.route('/create-pro').post((req, res, next) => {
  ProModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Get all songs
proRoute.route('/promo').get((req, res) => {
  ProModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get single song
proRoute.route('/get-pro/:id').get((req, res) => {
  ProModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update song
proRoute.route('/update-pro/:id').put((req, res, next) => {
  ProModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Promotion successfully updated!')
    }
  })
})
// Delete song
proRoute.route('/delete-pro/:id').delete((req, res, next) => {
  ProModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = proRoute;