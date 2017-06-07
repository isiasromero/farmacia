var mysql = require('mysql');
var config = require('.././database/config');

module.exports = {
  getUsuarios : function(req, res, next){
    var db = mysql.createConnection(config);
		db.connect();
		db.query('SELECT id, nombres, apellidos, email, password, telefono, direccion FROM users WHERE rol=2', function(err, rows, fields){
			if(err) throw err;

      if(req.isAuthenticated() && req.user.rol == "1"){
        res.render('gestionUsuarios', {usuarios: rows, isAuthenticated : req.isAuthenticated(), user : req.user});
      }else{
        res.redirect('/');
      }
    });
    return 0;
  },

  deleteUsuario : function(req, res, next){
    var id = req.body.id;
	  var db = mysql.createConnection(config);
	  var respuesta={res:false};
	  db.connect();
	  db.query('DELETE FROM users where id = ' + id, function(err,rows,fields){
			if(err)throw err;
			db.end();
			respuesta.res=true;
	    res.json(respuesta);
		});
  }
};
