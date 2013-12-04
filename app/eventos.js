// JavaScript Document
$$.ajaxSettings.async = true;
$$.ajaxSettings.timeout = 10000;

var accesado_inicio = 0;
var accesado_catalogo = 0;
var accesado_como = 0;
var filtros_cargados = 0;
var me_encantan =  new Array();
var me_encantan_sql;
var cambio_encantan = 0;
var error_filtros = 1;

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
			if(filtros_cargados == 0) {
				$$.ajax({
					type: 'GET', 
					url: obtenerCategorias + "34",
					dataType: 'json',
					timeout:5000,
					success: function(response) {
							var plantilla = '{{#categories}}<option value="{{id}}">{{title}}</option>{{/categories}} ';
							var texto = Mustache.render(plantilla, response);
							$$('section#inicio article fieldset select#filtro-disponibilidad').append('<option value="0">Cualquier disponibilidad</option>'+texto)
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'¡No se logro cargar el menu Disponibilidad!',  
							cargar_filtro(34),         
							'Dress4aday',           
							'Cerrar'               
						);
						error_filtros = 0;
					 }//error
				});//AJAX
				$$.ajax({
					type: 'GET', 
					url: obtenerCategorias + "4",
					dataType: 'json', 
					timeout:5000,
					success: function(response) {
							var plantilla = '{{#categories}}<option value="{{id}}">{{title}}</option>{{/categories}}';
							var texto = Mustache.render(plantilla, response);
							$$('section#inicio article fieldset select#filtro-tipo').append('<option value="0">Todos los tipos </option>'+texto);
							//Lungo.Notification.hide();
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'¡No se logro cargar el menu Tipo!',  
							alertDismissed,       
							'Dress4aday',           
							'Cerrar'                  
						);
						error_filtros = 0;
					 }//error
				});//AJAX
				$$.ajax({
					type: 'GET', 
					url: obtenerCategorias + "7",
					dataType: 'json', 
					timeout:5000,
					success: function(response) {
							var plantilla = '{{#categories}}<option value="{{id}}">{{title}}</option>{{/categories}}';
							var texto = Mustache.render(plantilla, response);
							$$('section#inicio article fieldset select#filtro-color').append('<option value="0">Todos los colores</option>'+texto)
							
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'¡No se logro cargar el menu Color!',  
							alertDismissed,        
							'Dress4aday',            
							'Cerrar'                  
						);
						error_filtros = 0;
					 }//error
				});//AJAX
				$$.ajax({
					type: 'GET', // defaults to 'GET'
					url: obtenerCategorias + "13&orderby=order&title_li=",
					dataType: 'json', //'json'
					timeout:5000,
					success: function(response) {
							var plantilla = '{{#categories}}<option value="{{id}}">{{title}}</option>{{/categories}}';
							var texto = Mustache.render(plantilla, response);
							$$('section#inicio article fieldset select#filtro-talla').append('<option value="0">Todas las tallas</option>'+texto)
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
						error_filtros = 0;
					 }//error
				});//AJAX	
				if(error_filtros == 0) {
					//cargar_filtro();
				}
			}
			
		},
		'tap #buscar-por':function(event) {
			//alert("Hola");
			var opciones = "";
			$('section#inicio article fieldset select option:selected').each(function(index) {
				if($(this).val() > 0)
					opciones += '&cat[]=' + $(this).val();
			});
			if(opciones == "") {
				navigator.notification.alert(
					'Es necesario seleccionar al menos una categoría',  // message
					alertDismissed,         // callback
					'Dress4aday',            // title
					'Cerrar'                  // buttonName
				);
			}
			else {
				Lungo.Element.loading("section#catalogo #catalogo-art-1", 1);
				Lungo.Router.section("catalogo");
				$$.ajax({
					type: 'GET', // defaults to 'GET'
					url: obtenerVestidosFiltrado + opciones + "&count=200",
					dataType: 'json', //'json'
					async: true,
					success: function(response) {
							var plantilla = '<ul id="thelist">{{#posts}} <li data-articulo-id="{{id}}"> \
							<span class="me-encanta" data-encanta-id="{{id}}" data-encanta-thumb="{{thumbnail_images.full.url}}" data-encanta-precio="{{custom_fields.precio}}" id="{{id}}" data-encanta-titulo="{{title}}"><img src="img/corazon.png"></span>\
							<div class="thumbnail"><img src="{{thumbnail_images.full.url}}"></div>\
							<div><div class="on-right text tiny precio">{{custom_fields.precio}}</div><strong>{{title}}</strong><small>{{{content}}}</small></div> \
							</li> {{/posts}}</ul>';
							var texto = Mustache.render(plantilla, response);
							ancho = response.count * 322;
							$$('section#catalogo article#catalogo-art-1').html('<div id="scroller" style="width:' + ancho +'px">'+texto+'</div>');
							//Cuando hagamos una busqueda nueva, marcamos aquellos que ya le gustan al usuario
							$$("section#catalogo article#catalogo-art-1 ul li span").each(function(index) {
								pos = me_encantan.indexOf( $$(this).attr("id") )
								if(pos > -1) {
									$$(this).addClass("me-encanto");
									//var pos = me_encantan.indexOf( id );
									//pos > -1 && me_encantan.splice( pos, 1 );
								}
							});
							//Evitamos que el boton catalogo cargue nuevamente todos los vestidos
							accesado_catalogo = 1;
					},//sucess
					error: function(xhr, type) { 
						navigator.notification.alert(
							'No se logro cargar el Catalogo de Productos. Haz clic nuevamente en Inicio e intentalo nuevamente!',  // message
							alertDismissed,         // callback
							'Dress4aday',            // title
							'Cerrar'                  // buttonName
						);
					 }//error
				});//AJAX
			}//ELSE
		},
	/*======================================================================||
	||								CATALOGO								||
	||	Al entrar al entrar al menu Catalogo cargamos todos vestidos de la 	||
	||	galeria 															||
	||======================================================================*/
		'tap section footer a:nth-child(2)' :function() {
			if(accesado_catalogo == 0) {
				Lungo.Element.loading("#catalogo-art-1", 1);
				$$.ajax({
					type: 'GET', // defaults to 'GET'
					url: obtenerVestidos,
					dataType: 'json', //'json'
					async: true,
					success: function(response) {
							var plantilla = '<ul id="thelist">{{#posts}} <li data-articulo-id="{{id}}"> \
							<span class="me-encanta" data-encanta-id="{{id}}" id="{{id}}" data-encanta-titulo="{{title}}" data-encanta-thumb="{{thumbnail_images.full.url}}" data-encanta-precio="{{custom_fields.precio}}"><img src="img/corazon.png"></span>\
							<div class="thumbnail"><img src="{{thumbnail_images.full.url}}"></div>\
							<div><div class="on-right text tiny precio">{{custom_fields.precio}}</div><strong>{{title}}</strong><small>{{{content}}}</small></div> \
							</li> {{/posts}}</ul>';
							var texto = Mustache.render(plantilla, response);
							ancho = response.count * 322;
							$$('section#catalogo article#catalogo-art-1').html('<div id="scroller" style="width:' + ancho +'px">'+texto+'</div>');
							accesado_catalogo = 1;
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
		
	/*======================================================================||
	||								ME ENCANTAN								||
	||	Al entrar al entrar al menu Me encanta buscamos en la base de datos	||
	||  local los ids de los vestidos que le gustaron y los cargamos		||
	||======================================================================*/
		'tap section footer a:nth-child(3)' :function() {
			mostrarVestidosEncantan();
		},
		'tap .me-encanta':function(event) {
			event.preventDefault();
			identificador = $$(this).attr("data-encanta-id");
			tit_v =  $$(this).attr("data-encanta-titulo");
			thumb_v =  $$(this).attr("data-encanta-thumb");
			precio_v =  $$(this).attr("data-encanta-precio");
			if($$(this).hasClass("me-encanto")) {
				$$(this).removeClass("me-encanto");
				borrarVestidoEncantan(identificador);
				var pos = me_encantan.indexOf( identificador );
				pos > -1 && me_encantan.splice( pos, 1 );
				cambio_encantan = 1;
			}
			else {
				$$(this).addClass("me-encanto");
				var pos = me_encantan.indexOf( identificador );
				if(pos < 0) {
					me_encantan.push(identificador);
					cambio_encantan = 1;
				}
				agregarVestidoEncantan(identificador,tit_v,thumb_v,precio_v);
			}
		},
		'tap #eliminar-todos':function(event) {
			event.preventDefault();
			function accion_eliminar(buttonIndex) {
				if(buttonIndex == 1) {
					borrarVestidosEncantan()
				}
			}
			navigator.notification.confirm(
				'¿En verdad quieres eliminar todos los vestidos que te encantan?', // message
				 accion_eliminar,            // callback to invoke with index of button pressed
				'Dress4aday',           // title
				'Si,No'         // buttonLabels
			);
		},
		'tap .menos':function(event) {
			event.preventDefault();
			id= $$(this).attr("data-encanta-id");
			$$(this).parent().remove();
			borrarVestidoEncantan(id);
			$$("section#catalogo article#catalogo-art-1 ul li span").each(function(index) {
				if($$(this).attr("id") == id) {
					$$(this).removeClass("me-encanto");
					var pos = me_encantan.indexOf( id );
					pos > -1 && me_encantan.splice( pos, 1 );
				}
			});
		},
		
		
	/*======================================================================||
	||								COMO FUNCIONA							||
	||	Al entrar al entrar al menu Como funciona cargamos la imagen que 	||
	||  explica el proceso													||
	||======================================================================*/
		'tap #como-f' :function() {			
			if(accesado_como == 0) {
				Lungo.Element.loading("section#como #como-art-1", 1);
				$$.ajax({
					type: 'GET', // defaults to 'GET'
					url: obtenerComo,
					dataType: 'json', //'json'
					async: true,
					success: function(response) {
							var plantilla = '{{#page}} {{{content}}}{{/page}}';
							var texto = Mustache.render(plantilla, response);
							$$("section#como article#como-art-1").html(texto)
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
					navigator.notification.alert(
							response,  // message
							alertDismissed,         // callback
							'Dress4aday',            // title
							'Cerrar'                  // buttonName
						);
				}
			})
		},
		/*
		//
		// Al cargar la sección contacto mostramos el iframe del mapa y le preguntamos al usuario
		// si desea añadir al mensaje del correo los modelos que tiene en su lista de "Me encantan"
		// Al salir de la sección contacto desaparecemos el iframe del mapa
		//
		*/
		'load section#contacto':function(event) {
			$$("iframe").css("display","inherit");
			agregarVestidosEncantan();
			//alert(me_encantan.length );
			//alert("me_encantan.length: " + me_encantan.length +"me_encantan_sql.length: "+ me_encantan_sql);
			if(me_encantan.length > 0 || me_encantan_sql.length != "") {
				navigator.notification.confirm(
					'Tienes vestidos que te encantan, ¿te gustaria adjuntar los modelos, al texto del mensaje?', // message
					 onConfirm,            // callback to invoke with index of button pressed
					'Dress4aday',           // title
					'Si,No'         // buttonLabels
				);

			}
			else {
				$$("section#contacto article textarea").val("")
			}
		},
		'unload section#contacto':function(event) {
			$$("iframe").css("display","none");
		},
		
	
})

