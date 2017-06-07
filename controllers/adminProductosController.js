var mysql = require('mysql');
var config = require('.././database/config');
var fs = require("fs");

module.exports = {

  agregarProducto:function(req, res, next){
    if(req.isAuthenticated() && req.user.rol == "1"){
      res.render('agregarProducto', {isAuthenticated : req.isAuthenticated(), user : req.user, message: req.flash('info')});
    }else{
      res.redirect('/');
    }
  },

  agregarProductoPost:function(req, res, next){
    fs.rename(req.files.imagen.path, "public/img/"+req.files.imagen.name);
    var producto = {
      nombre : req.body.producto,
      descripcion : req.body.descripcion,
      imagen : req.files.imagen.name,
			precio : req.body.precio,
      categoria : req.body.categoria,
      cantidad : req.body.cantidad
		};
    var db = mysql.createConnection(config);
		db.connect();
		db.query('INSERT INTO productos SET ?', producto, function(err, rows, fields){
			if(err) throw err;
			db.end();
		});
    req.flash('info', '¡Producto registrado correctamente!');
    return res.redirect('/agregar-producto');
  },

  actualizarProducto:function(req, res, next){
    var id = req.body.id;
    var nombre = req.body.producto;
    var descripcion = req.body.descripcion;
		var	precio = req.body.precio;
    var categoria = req.body.categoria;
    var cantidad = req.body.cantidad;
    var db = mysql.createConnection(config);
		db.connect();
		db.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, cantidad = ? WHERE id = ?', [nombre,descripcion,precio,categoria,cantidad,id], function(err, rows, fields){
			if(err) throw err;
			db.end();
		});
    switch(categoria){
      case "1":
        req.flash('info', '¡Producto actualizado correctamente!');
        res.redirect('/gestionar-alimento');
        break;
      case "2":
        req.flash('info', '¡Producto actualizado correctamente!');
        res.redirect('/gestionar-aseo');
        break;
      case "3":
        req.flash('info', '¡Producto actualizado correctamente!');
        res.redirect('/gestionar-maquillaje');
        break;
      case "4":
        req.flash('info', '¡Producto actualizado correctamente!');
        res.redirect('/gestionar-medicina');
        break;
    }
    return 0;
  },

  eliminarProducto:function(req, res, next){
    var id = req.body.id;
	  var db = mysql.createConnection(config);
	  var respuesta={res:false};
	  db.connect();
	  db.query('DELETE FROM productos where id = ' + id, function(err,rows,fields){
			if(err)throw err;
			db.end();
			respuesta.res=true;
	    res.json(respuesta);
		});
  }
};
