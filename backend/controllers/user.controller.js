let SongModel = require('../model/Song');
let UserModel = require('../model/User');

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.allUsers = (req, res) => {
    // res.status(200).send("all song Content.");
    UserModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  };
