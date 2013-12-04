// JavaScript Document
$$.ajaxSettings.async = true;
$$.ajaxSettings.timeout = 7000;
var afterNotification = function(){
    //Do something
};
var accesado_inicio = 0;
var accesado_catalogo = 0;
var accesado_como = 0;
var filtros_cargados = 0;
var me_encantan = "";
function alertDismissed() {

}
/*======================================================================||
||					ACTUALIZAR AL PULL TO REFRESH						||
||	Función que se ejecutar cuando el usuario hace Pull to Refresh		||
||	en la sección del listado de productos en el catalogo				||
||======================================================================*/
function actualizarCatalogo() {
	//$$('section#catalogo article#catalogo-art-1').html('<br/><p><br/><p><br/><p><center><img src="img/loadingmaster.gif"></center>');
	Lungo.Element.loading("#catalogo-art-1", 1);
	$$.ajax({
		type: 'GET', // defaults to 'GET'
		url: obtenerVestidos,
		dataType: 'json', //'json'
		async: true,
		success: function(response) {
				var plantilla = '{{#posts}} <div id="{{id}}" class="thumb big selectable grid-bloque"> <div class="thumbnail"><img src="{{thumbnail_images.thumbnail.url}}"></div><div><div class="on-right text tiny precio">{{custom_fields.precio}}</div><strong>{{title}}</strong><small>{{{content}}}</small></div></div> {{/posts}}</ul>';
				var texto = Mustache.render(plantilla, response);
				$$('section#catalogo article#catalogo-art-1').html(texto);
		},//sucess
		error: function(xhr, type) { 
			navigator.notification.alert(
				'No se logro cargar el Catalogo de Productos. Intentalo nuevamente!', 
				alertDismissed,       
				'Dress4aday',           
				'Cerrar'                 
			);
		 }//error
	});//AJAX
}

/*======================================================================||
||							EVENTOS DE LUNGO							||
||	Eventos que se realizan a lo largo de toda la App y cuando Lungo	||
||	esta cargado y listo										 		||
||======================================================================*/
Lungo.Events.init({
	/*======================================================================||
	||								INICIO									||
	||	Cargamos las imagenes de productos destacados y obtenemos los 		||
	||	filtros para el menu de busqueda que esta en el ASIDE				||
	||======================================================================*/
		'load section#inicio':function(event) {
			/*if(accesado_inicio == 0) {
				Lungo.Element.loading("#inicio-art-1", 1);
				$$.ajax({
					type: 'GET', // defaults to 'GET'
					url: obtenerPortada,
					dataType: 'json', //'json'
					async: true,
					success: function(response) {
							var plantilla = '{{#posts}} <div id="{{id}}" class="bloque-portada indented"><div class="imagen"> <img src="{{thumbnail_images.full.url}}"></div><div class="informacion"><strong>{{title}}</strong>{{{content}}}<span class="precio-portada">{{custom_fields.precio}}</span></div></div>{{/posts}}';
							var texto = Mustache.render(plantilla, response);
							$$('section#inicio article#inicio-art-1').html(texto);
							//Lungo.Notification.hide();
							accesado_inicio = 1;
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'No se logro cargar los articulos destacados. Haz clic nuevamente inicio!', 
							alertDismissed,         
							'Dress4aday',           
							'Cerrar'                 
						);
					 }//error
				});//AJAX
			}//IF*/
			if(filtros_cargados == 0) {
				$$.ajax({
					type: 'GET', 
					url: obtenerCategorias + "34",
					dataType: 'json',
					timeout:4000,
					success: function(response) {
							var plantilla = '<li><div class="navegacion-filtrado">Disponibilidad</div></li>{{#categories}}<li class="small"><input type="checkbox" class="small" />&nbsp;<label class="mediana">{{title}}</label><br/></li>{{/categories}}';
							var texto = Mustache.render(plantilla, response);
							$$('aside article ul.filtrado').append(texto)
							//Lungo.Notification.hide();
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'¡No se logro cargar el menu Disponibilidad!',  
							alertDismissed,         
							'Dress4aday',           
							'Cerrar'               
						);
					 }//error
				});//AJAX
				$$.ajax({
					type: 'GET', 
					url: obtenerCategorias + "4",
					dataType: 'json', 
					timeout:4000,
					success: function(response) {
							var plantilla = '<li><div class="navegacion-filtrado">Tipo</div></li>{{#categories}}<li class="small"><input type="checkbox" class="small" />&nbsp;<label class="mediana">{{title}}</label><br/></li>{{/categories}}';
							var texto = Mustache.render(plantilla, response);
							$$('aside article ul.filtrado').append(texto)
							//Lungo.Notification.hide();
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'¡No se logro cargar el menu Tipo!',  
							alertDismissed,       
							'Dress4aday',           
							'Cerrar'                  
						);
					 }//error
				});//AJAX
				$$.ajax({
					type: 'GET', 
					url: obtenerCategorias + "7",
					dataType: 'json', 
					timeout:4000,
					success: function(response) {
							var plantilla = '<li><div class="navegacion-filtrado">Color</div></li>{{#categories}}<li class="small"><input type="checkbox" class="small" />&nbsp;<label class="mediana">{{title}}</label><br/></li>{{/categories}}';
							var texto = Mustache.render(plantilla, response);
							$$('aside article ul.filtrado').append(texto)
							
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'¡No se logro cargar el menu Color!',  
							alertDismissed,        
							'Dress4aday',            
							'Cerrar'                  
						);
					 }//error
				});//AJAX
				$$.ajax({
					type: 'GET', // defaults to 'GET'
					url: obtenerCategorias + "13&orderby=order&title_li=",
					dataType: 'json', //'json'
					timeout:4000,
					success: function(response) {
							var plantilla = '<li><div class="navegacion-filtrado">Talla</div></li>{{#categories}}<li class="small"><input type="checkbox" class="small" />&nbsp;<label class="mediana">{{title}}</label><br/></li>{{/categories}}';
							var texto = Mustache.render(plantilla, response);
							$$('aside article ul.filtrado').append(texto);
							filtros_cargados = 1;
							//Lungo.Notification.hide();
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'¡No se logro cargar el menu Talla!',  // message
							alertDismissed,         // callback
							'Dress4aday',            // title
							'Cerrar'                  // buttonName
						);
					 }//error
				});//AJAX
			//Lungo.Notification.hide();
			
			}
		},
	/*======================================================================||
	||								CATALOGO								||
	||	Al entrar al entrar al menu Catalogo cargamos todos vestidos de la 	||
	||	galeria 															||
	||======================================================================*/
		/*'load section#catalogo':function(event) {
			
			var pull = new Lungo.Element.Pull('section#catalogo article#catalogo-art-1', {
				onPull: "Pull down to refresh",
				onRelease: "Release to get new data",
				onRefresh: "Refreshing...",
				callback: function() {
					actualizarCatalogo();
					pull.hide();
				}
			});
		},*/
		'tap section footer a:nth-child(2)' :function() {
			//Lungo.Router.article("catalogo","catalogo-art-1");
			//Lungo.Notification.show();
			if(accesado_catalogo == 0) {
				Lungo.Element.loading("#catalogo-art-1", 1);
				$$.ajax({
					type: 'GET', // defaults to 'GET'
					url: obtenerVestidos,
					dataType: 'json', //'json'
					async: true,
					success: function(response) {
							var plantilla = '<ul id="thelist">{{#posts}} <li> \
							<span class="me-encanta" data-encanta-id="{{id}}" data-encanta-titulo="{{title}}"><img src="img/corazon.png"></span>\
							<div class="thumbnail"><img src="{{thumbnail_images.full.url}}"></div>\
							<div><div class="on-right text tiny precio">{{custom_fields.precio}}</div><strong>{{title}}</strong><small>{{{content}}}</small></div> \
							</li> {{/posts}}</ul>';
							var texto = Mustache.render(plantilla, response);
							ancho = response.count * 322;
							$$('section#catalogo article#catalogo-art-1').html('<div id="scroller" style="width:' + ancho +'px">'+texto+'</div>');
							/*
							<div id="{{id}}" data-titulo="{{title}}" class="thumb big selectable grid-bloque"> <span class="me-encanta" data-encanta-id="{{id}}" data-encanta-titulo="{{title}}"><img src="img/corazon.png"></span><div class="thumbnail"><img src="{{thumbnail_images.thumbnail.url}}"></div><div><div class="on-right text tiny precio">{{custom_fields.precio}}</div><strong>{{title}}</strong><small>{{{content}}}</small></div></div>
							*/
							accesador_catalogo = 1;
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'No se logro cargar el Catalogo de Productos. Haz clic nuevamente en el menu Catalogo!',  // message
							alertDismissed,         // callback
							'Dress4aday',            // title
							'Cerrar'                  // buttonName
						);
					 }//error
				});//AJAX
			}
			texto = "";
		},
		'tap .me-encanta':function(event) {
			event.preventDefault();
			if($$(this).hasClass("me-encanto")) {
				$$(this).removeClass("me-encanto");
				me_encantan += $$(this).attr("data-encanta-id") + ", ";
			}
			else {
				$$(this).addClass("me-encanto");
			}
		},
		/*
		//
		// Al hacer clic en cualquier vestido, cargamos el article 2 y las imagenes de dicho vestido
		//
		*/
		'tap article#catalogo-art-1 .grid-bloque .thumbnail':function() {
			Lungo.Element.loading("#catalogo-art-2", 1);
			id = $$(this).attr("id");
			nombre = $$(this).attr("data-titulo");
			//Lungo.Notification.show();
			$$.ajax({
				type: 'GET', // defaults to 'GET'
				url: obtenerVestido + id,
				dataType: 'json', //'json'
				async: true,
				success: function(response) {
						if(response.post.attachments != "") {
							var plantilla = '{{#post.attachments}} <img src="{{images.full.url}}"> {{/post.attachments}}';
							var texto = Mustache.render(plantilla, response);
							$$('section#catalogo article#catalogo-art-2').html(texto)
						}
						else {
							var plantilla = '{{#post.thumbnail_images}} <img src="{{full.url}}"> {{/post.thumbnail_images}}';
							var texto = Mustache.render(plantilla, response);
							$$('section#catalogo article#catalogo-art-2').html(texto);
							
						}
						Lungo.dom("section#catalogo header .title").html(nombre);
						//Lungo.Notification.hide();
				},//sucess
				error: function(xhr, type) { 
					navigator.notification.alert(
						'No se logro cargar el articulo, vuelve atras e intentalo nuevamente!',  // message
						alertDismissed,         // callback
						'Dress4aday',            // title
						'Cerrar'                  // buttonName
					);
				 }//error
			});//AJAX
			Lungo.Router.article("catalogo","catalogo-art-2");
			//Lungo.Notification.hide();
		},
		'tap header #volver' :function() {
			Lungo.dom("section#catalogo header .title").html("Dress4aday");
		},
		/*
		//
		// Eventos de interacción con el sistema de filtrado / Elemento ASIDE
		//
		*/
		/*'swipeRight body' :function() {
			Lungo.Aside.show("filtro");
		},
		'swipeLeft body' :function() {
			Lungo.Aside.hide();
		},*/
		'tap aside header a' :function() {
			Lungo.Aside.hide();
		},
	/*======================================================================||
	||								ME ENCANTAN								||
	||	Al entrar al entrar al menu Me encanta buscamos en la base de datos	||
	||  local los ids de los vestidos que le gustaron y los cargamos		||
	||======================================================================*/
		'tap section footer a:nth-child(3)' :function() {
			$$('section#encantan article').html(me_encantan);
			//Lungo.Router.article("catalogo","catalogo-art-1");
			//Lungo.Notification.show();
			/*if(accesado_catalogo == 0) {
				Lungo.Element.loading("#catalogo-art-1", 1);
				$$.ajax({
					type: 'GET', // defaults to 'GET'
					url: obtenerVestidos,
					dataType: 'json', //'json'
					async: true,
					success: function(response) {
							var plantilla = '{{#posts}} <div id="{{id}}" data-titulo="{{title}}" class="thumb big selectable grid-bloque"> <div class="thumbnail"><img src="{{thumbnail_images.thumbnail.url}}"></div><div><div class="on-right text tiny precio">{{custom_fields.precio}}</div><strong>{{title}}</strong><small>{{{content}}}</small></div></div> {{/posts}}';
							var texto = Mustache.render(plantilla, response);
							$$('section#catalogo article#catalogo-art-1').html(texto);
							//Lungo.Notification.hide();
							accesador_catalogo = 1;
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'No se logro cargar el Catalogo de Productos. Haz clic nuevamente en el menu Catalogo!',  // message
							alertDismissed,         // callback
							'Dress4aday',            // title
							'Cerrar'                  // buttonName
						);
					 }//error
				});//AJAX
			}
			texto = "";*/
		},
	/*======================================================================||
	||								COMO FUNCIONA							||
	||	Al entrar al entrar al menu Como funciona cargamos la imagen que 	||
	||  explica el proceso													||
	||======================================================================*/
		'tap section footer a:nth-child(3)' :function() {
			//Lungo.Notification.show();
			Lungo.Element.loading("#como-art-1", 1);
			if(accesado_como == 0) {
				$$.ajax({
					type: 'GET', // defaults to 'GET'
					url: obtenerComo,
					dataType: 'json', //'json'
					async: true,
					success: function(response) {
							var plantilla = '{{#page}} {{{content}}}{{/page}}';
							var texto = Mustache.render(plantilla, response);
							$$('section#como article#como-art-1').html(texto)
							//Lungo.Notification.hide();
							accesado_como = 1;
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'No se logro cargar el articulo Como funciona, intentalo nuevamente!',  // message
							alertDismissed,         // callback
							'Dress4aday',            // title
							'Cerrar'                  // buttonName
						);
					 }//error
				});//AJAX
			}
		},
	/*======================================================================||
	||								CONTACTAR								||
	||======================================================================*/
		'tap #contactar':function(event) {
			event.preventDefault();
			datos = "&email=" + $$("input[name=email]").val() + "&nombre=" + $$("input[name=nombre]").val() + "&telefono=" + $$("input[name=telefono]").val() + "&mensaje=" + $$("textarea[name=mensaje]").val() ;
			$$.ajax({
				type: 'get', // defaults to 'GET'
				url: 'http://www.dress4aday.mx/email.php?' + datos,
				data: 	datos,
				dataType: 'text', //'json', 'xml', 'html', or 'text'
				async: true,
				success: function(response) { 
					navigator.notification.alert(
							response,  // message
							alertDismissed,         // callback
							'Dress4aday',            // title
							'Cerrar'                  // buttonName
						);
				},
				error: function(xhr, type) {  
					alert(response);
				}
			})
		},
		/*
		//
		// Al cargar la sección contacto mostramos el iframe del mapa
		// Al salir de la sección contacto desaparecemos el iframe del mapa
		//
		*/
		'load section#contacto':function(event) {
			$$("iframe").css("display","inherit");
		},
		'unload section#contacto':function(event) {
			$$("iframe").css("display","none");
		},
		
	
})


$('form').submit(function (e) {
        var opciones = "";
        e.preventDefault();
		$('input[type=checkbox]:checked').each(function(index, element) {
			if(opciones == '') {
				opciones = '?cat[]=' + $(this).val();
			}
			else {
            	opciones += '&cat[]=' + $(this).val();
			}
        });
		if(opciones == '') {
			opciones = "?cat=2";
		}
		//$('.filtrar').val(opciones);
		//alert(opciones);
		window.location.href = '<?php echo home_url(); ?>' + opciones;
    
    });