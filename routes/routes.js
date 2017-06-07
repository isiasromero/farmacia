var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');

router.get('/', controllers.HomeController.index);
router.get('/signup', controllers.UserController.getSignUp);
router.post('/signup', controllers.UserController.postSignUp);
router.get('/signin', controllers.UserController.getSignIn);
router.post('/signin',  passport.authenticate('local', {
	successRedirect : '/',
	failureRedirect : '/signin',
	failureFlash : true
}));
router.get('/logout', controllers.UserController.logout);


router.get('/medicamentos', controllers.gestionMedicinaController.getMedicina);

router.get('/alimento-y-bebidas', controllers.gestionAlimentoController.getAlimentos);
router.get('/aseo-y-hogar', controllers.gestionAseoController.getAseo);
router.get('/maquillaje-y-accesorios', controllers.gestionMaqController.getMaquillaje);

router.get('/gestionar-alimento', controllers.gestionAlimentoController.getAlimentos);
router.post('/editar-alimento', controllers.gestionAlimentoController.editarAlimento);
router.get('/gestionar-aseo', controllers.gestionAseoController.getAseo);
router.post('/editar-aseo', controllers.gestionAseoController.editarAseo);
router.get('/gestionar-maquillaje', controllers.gestionMaqController.getMaquillaje);
router.post('/editar-maquillaje', controllers.gestionMaqController.editarMaquillaje);
router.get('/gestionar-medicina', controllers.gestionMedicinaController.getMedicina);
router.post('/editar-medicina', controllers.gestionMedicinaController.editarMedicina);
router.get('/agregar-producto', controllers.adminProductosController.agregarProducto);
router.post('/agregar-producto', controllers.adminProductosController.agregarProductoPost);
router.post('/actualizar-producto', controllers.adminProductosController.actualizarProducto);
router.post('/eliminar-producto', controllers.adminProductosController.eliminarProducto);


router.get('/gestionar-usuarios', controllers.gestionUsuariosController.getUsuarios);
router.post('/eliminar-usuario', controllers.gestionUsuariosController.deleteUsuario);

module.exports = router;
