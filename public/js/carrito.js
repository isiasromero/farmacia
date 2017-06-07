(function($){
	'use strict';

	function init(){
		var total = 0,
		items = 0

		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;

		if(undefined != cart.items && cart.items != null && cart.items != '' && cart.items.length > 0){
			_.forEach(cart.items, function(n, key) {
			   items = (items + n.cant)
			   total = total  + (n.cant * n.price)
			});

		}
		$('#totalItems').text(items)
	}

	function addtoCart(id){
    var elemento = document.getElementById(id);
    var nombre = elemento.getAttribute('nombre');
    var precio = elemento.getAttribute('precio');
    var imagen = elemento.getAttribute('imagen');
    var cantidad = elemento.getAttribute('cantidad');
    alert(nombre + ' ' + precio + ' ' + imagen + ' ' + cantidad);
    /*
		var cant = 1;
		if(cant <= cantidad){
				if(cant > 0){
						var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
						app.searchProd(cart)
				}else{
					alert('Solo se permiten cantidades mayores a cero')
				}
		}else{
			alert('No se pueden añadir más de este producto')
		}*/
	}

	function searchProd(cart,id,cant,name,price,img,available){
		var curProd = _.find(cart.items, { 'id': id })
		if(undefined != curProd && curProd != null){
			if(curProd.cant < available){
				curProd.cant = parseInt(curProd.cant + cant)
			}else{
				alert('No se pueden añadir más de este producto')
			}
		}else{
			var prod = {
				id : id,
				cant : cant,
				name : name,
				price : price,
				img : img,
				available : available
			}
			cart.items.push(prod)
		}
		localStorage.setItem('cart',JSON.stringify(cart))
		init()
		getProducts()
	}

	function getProducts(){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []},
		msg = '',
		wrapper = $('.cart'),
		total = 0
		wrapper.html('')

		if(undefined == cart || null == cart || cart == '' || cart.items.length == 0){
			wrapper.html('<li>Tu canasta está vacía</li>');
			$('.cart').css('left','-400%')
		}else{
			var items = '';
			_.forEach(cart.items, function(n, key) {

			   total = total  + (n.cant * n.price)
			   items += '<li>'
			   items += '<img src="'+n.img+'" />'
			   items += '<h3 class="title">'+n.name+'<br><span class="price">'+n.cant+' x $ '+n.price+' USD</span> <button class="add" onclick="updateItem('+n.id+','+n.available+')"><i class="icon ion-minus-circled"></i></button> <button onclick="deleteProd('+n.id+')" ><i class="icon ion-close-circled"></i></button><div class="clearfix"></div></h3>'
			   items += '</li>'
			});

			items += '<li id="total">Total : $ '+total+' USD <div id="submitForm"></div></li>'
			wrapper.html(items)
			$('.cart').css('left','-500%')
		}
	}


	function delete(id){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		var curProd = _.find(cart.items, { 'id': id })
		_.remove(cart.items, curProd);
		localStorage.setItem('cart',JSON.stringify(cart))
		init()
		getProducts()
	}

	function deleteProd(id,remove){
		if(undefined != id && id > 0){

			if(remove == true){
				delete(id)
			}else{
				var conf = confirm('¿Deseas eliminar este producto?')
				if(conf){
					delete(id)
				}
			}

		}
	}

	$(document).ready(function(){
		init()
		getProducts()
	})
})(jQuery)
