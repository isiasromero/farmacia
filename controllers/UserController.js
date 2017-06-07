var mysql = require('mysql');
var bcrypt = require('bcryptjs');
module.exports = {
  getSignUp : function(req, res, next){
    return res.render('signup');
  },


  postSignUp : function(req, res, next){
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(req.body.password, salt);

		var user = {
      id : req.body.id,
      nombres : req.body.nombres,
      apellidos : req.body.apellidos,
			email : req.body.email,
			password : password,
      telefono : req.body.telefono,
      direccion : req.body.direccion,
      rol : "2",
		};

    var config = require('.././database/config');

    var db = mysql.createConnection(config);

		db.connect();

		db.query('INSERT INTO users SET ?', user, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});
    req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
    return res.redirect('/signin');
  },

  getSignIn: function(req, res, next){
		return res.render('signin', {message: req.flash('info')});
	},
  logout : function(req, res, next){
		req.logout();
		res.redirect('/');
	}
};
