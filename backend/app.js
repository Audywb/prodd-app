let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');


  const db = require("./model");
  const Role = db.role;
// Connecting mongoDB
// mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useFindAndModify: false
}).then(() => {
  console.log('Database connected successfully ')

  initial();
},
  error => {
    console.log('Could not connected to database : ' + error)
    
    process.exit();
  }
)


const songRoute = require('./routes/song.route')
const proRoute = require('./routes/promo.route')

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cors());

// RESTful API root
// app.use('/api', songRoute)
// app.use('/api/promo', proRoute)//new
app.get("/",(req,res) =>{
  res.json({massage:"Hello Stranger"})
})

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/promo2.routes')(app);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('PORT Connected on: ' + port)
})
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}