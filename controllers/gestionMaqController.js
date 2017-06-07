var mysql = require('mysql');
var config = require('.././database/config');

module.exports = {

  getMaquillaje : function(req, res, next){
    var db = mysql.createConnection(config);
		db.connect();
		db.query('SELECT id, nombre, descripcion, imagen, precio, cantidad FROM productos where categoria=3', function(err, rows, fields){
			if(err) throw err;

      if(req.isAuthenticated() && req.user.rol == "1"){
        res.render('gestionMaquillaje', {maquillaje: rows, isAuthenticated : req.isAuthenticated(), user : req.user,message: req.flash('info')});
      }else{
        res.render('accesorios', {accesorios: rows, isAuthenticated : req.isAuthenticated(), user : req.user });
      }
    });
    return 0;
  },

  editarMaquillaje : function(req, res, next){
    var id = req.body.id;
    var db = mysql.createConnection(config);
		db.connect();
		db.query('SELECT *  FROM productos WHERE id = ' + id, function(err, rows, fields){
			if(err) throw err;
      if(req.isAuthenticated() && req.user.rol == "1"){
        res.render('editar', {producto:rows[0], isAuthenticated : req.isAuthenticated(), user : req.user});
      }else{
        res.redirect('/');
      }
    });
    return 0;
  }
};
