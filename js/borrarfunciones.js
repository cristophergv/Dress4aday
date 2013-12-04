// JavaScript Document

ME_ENCANTAN

/*function imprimir_encantan() {
				var devolucion = "";
				if(cambio_encantan == 1 && me_encantan.length > 0) {
					$$('section#encantan article#encantan-art-1').html("");
					for (var i = 0, elemento; elemento = me_encantan[i]; i++) {
					  $$.ajax({
							type: 'GET', // defaults to 'GET'
							url: obtenerVestido + elemento,
							dataType: 'json', //'json'
							async: true,
							success: function(response) {
									var plantilla = '{{#post}}<div class="thumb big selectable grid-bloque"><span class="menos" data-encanta-id="{{id}}" data-encanta-titulo="{{title}}"><img src="img/menos.png"></span> <div class="thumbnail-mini"><img src="{{thumbnail_images.thumbnail.url}}"></div><div><div class="on-right text tiny precio-mini">{{custom_fields.precio}}</div><strong>{{title}}</strong><small>{{{content}}}</small></div></div>{{/post}}';
									var texto = Mustache.render(plantilla, response);
									cambio_encantan = 0;
									$$('section#encantan article#encantan-art-1').append(texto)
									
									return devolucion;
							},//sucess
							error: function(xhr, type) { 
								navigator.notification.alert(
									'No se lograron cargar los vestidos que te encantan. Haz clic nuevamente en el menu Me Encantan!',  // message
									alertDismissed,         // callback
									'Dress4aday',            // title
									'Cerrar'                  // buttonName
								);
							 }//error
						});//AJAX
					}//FOR
				}//IF cambio_encantan
				if(me_encantan.length == 0) {
					$$('section#encantan article#encantan-art-1').html("No tiene vestidos que te encanten");
				}
			}//function
			imprimir_encantan();
			*/	