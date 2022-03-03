let ProModel = require('../model/Promo');

exports.allPromo = (req, res) => {
    // res.status(200).send("all song Content.");
    ProModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  };

  exports.addPromo = (req, res) => {
    // res.status(200).send("all song Content.");
    ProModel.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  };

  exports.getOnePro = (req, res) => {
    // res.status(200).send("all song Content.");
    ProModel.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  };

  exports.updatePromo = (req, res) => {
    // res.status(200).send("all song Content.");
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
  };

  exports.deletePromo = (req, res) => {
    // res.status(200).send("all song Content.");
    ProModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
            msg: data
            })
        }
    })
  };