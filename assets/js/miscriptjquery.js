$(document).ready(function() {

	event.preventDefault();

	//Permite almacenar los precios...
	var precios = new Array();
	var cantidadProductos = 0;
	var imgSeleccionadas = new Array();
	var preciosSeleccionados = new Array();
	var total = 0;

	$('#mostrarImg, #enviar, #pagar').hide();

	$('#computadorasEscritorio , #Laptos , #Monitores, #inicio').click(function(event) {

		if (cantidadProductos == 0) {
			$('#cantidad, #total').hide();
		}

		$('#pagar, #enviar, #descripcion').show();
		$('#galeria').html("");
		$('#mostrarImg').hide();

		//Qué elemento fue pulsado(#computadorasEscritorio , #Laptos , #Monitores, #inicio)
		var idLista = $(event.target).attr('id');

		if (idLista == 'computadorasEscritorio') {

			cargarImagenesPrecios("imgComputEscritorio/c", 8000);
			$('#mostrarContenido').css({
				'background' : 'url("assets/img/ce.jpg")',
				'background-size' : 'cover',
				'background-position': 'center'
			});
			$('#producto').html("<br /> <br />Computadoras de Escritorio");

		} else if (idLista == 'Laptos') {

			cargarImagenesPrecios("imgLaptop/lp", 6500);
			$('#mostrarContenido').css({
				'background' : 'url("assets/img/l.jpg")',
				'background-size' : 'cover',
				'background-position': 'center'
			});
			$('#producto').html("<br /> <br />Laptos");

		} else if (idLista == 'Monitores') {

			cargarImagenesPrecios("imgMonitor/m", 2010);
			$('#mostrarContenido').css({
				'background' : 'url("assets/img/m.jpg")',
				'background-size' : 'cover',
				'background-position': 'center'
			});
			$('#producto').html("<br /> <br />Monitores");

		} else if (idLista == 'inicio') {

			$('#pagar').hide();
			$('#mostrarContenido').css('background', 'none');
			$('#producto').html('Bienvenidos a pepitosTI..</br>	Agrega productos a tu carrito :)');
			$('#enviar').hide();
		}

		$('#descripcion').html("");

	});
	//Fin click

	/*
	 * Objetivo: Se utiliza para cargar imagenes y cargar precios
	 */
	function cargarImagenesPrecios(path, precio) {
		for (var i = 0; i < 5; i++) {
			var imagenes = "<img id='" + i + "' src='assets/img/" + path + "" + i + ".png' />";
			$('#galeria').append(imagenes);
		}

		for (var i = 1; i < 6; i++) {
			precios[i - 1] = i * precio;
		}
	}//Fin cargarImagenesPrecios

	/*
	 * Objetivo: Permite animar la imagen seleccionada
	 */
	$("#galeria").click(function(event) {

		$('#mostrarImg').show();
		$('#descripcion').html("");

		var objetoImagen = $(event.target);
		var id = objetoImagen.attr('id');

		$('#mostrarImg').attr('src', "" + objetoImagen.attr('src'));

		$('#mostrarImg').animate({
			width : 10,
			height : 20
		}, 1000).animate({
			width : 220,
			height : 200
		}, "slow", function() {
			var datosProducto = "<ul> Modelo</ul> <li>2012</li> <ul>Precio</ul> <li id='precio'>" + precios[id] + "</li>";
			$('#descripcion').html(datosProducto);

		});
	});
	//Fin #galeria click

	$('#enviar').click(function() {

		if ( typeof ($('#mostrarImg').attr('src')) == "undefined")
			return false;
		
		$('#cantidad, #total').show();
		
		$('#cantidad').text("Cantidad: " + (++cantidadProductos));

		preciosSeleccionados.push($('<h4>' + $('#precio').text() + '</h4>'));
		//Agregar al array el precio del producto seleccionado.
		total += parseInt($('#precio').text());
		//Convertimos el precio string a int y lo sumamos con el existente.

		$('#total').text("Total: " + total);
		imgSeleccionadas.push($('<img src="' + $('#mostrarImg').attr('src') + '">'));

	});
	//Fin #enviar click

	$('#pagar').click(function() {

		$('#pagar , #enviar').hide();

		if (cantidadProductos == 0) {
			alert('No tiene productos en su carrito...Porfavor agregue ');
			return false;
		}

		$('#mostrarImg, #descripcion').hide();
		$("#galeria").text("");

		$.each(imgSeleccionadas, function(i, item) {
			$("#galeria").append(item).append(preciosSeleccionados[i]);
		});

		$('#producto').html("<br /> <br />" + $('#total').text() + " de sus compras");

		//Restable cantidad de productos a 0
		total = 0;
		cantidadProductos = 0;
		imgSeleccionadas = new Array();
		preciosSeleccionados = new Array();

		$('#cantidad , #total').text("");
	});
	//Fin #pagar click

});
//Fin $document
