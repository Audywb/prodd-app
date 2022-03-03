const { authJwt } = require("../middlewares");
const controller = require("../controllers/promo.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/api/promo',controller.allPromo);
    app.get('/api/get-pro/:id',controller.getOnePro);
    app.post('/api/create-pro',[authJwt.verifyToken, authJwt.isAdmin],controller.addPromo);
    app.put('/api/update-pro/:id',[authJwt.verifyToken, authJwt.isAdmin],controller.updatePromo);
    app.delete('/api/delete-pro/:id',[authJwt.verifyToken, authJwt.isAdmin],controller.deletePromo);



}