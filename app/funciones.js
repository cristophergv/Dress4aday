// JavaScript Document
/*======================================================================||
||							CALL BACK NOTIFICACIONES					||
||	Esta función no hace nada, solo sirve como callback					||
||======================================================================*/
function alertDismissed() {

}

var afterNotification = function(){
    //Do something
};

/*======================================================================||
||							CARGAR FILTRO QUE NO CARGO					||
||	Esta función recibe como parametro la categoria del filtro que no	||
||	se logro cargar adecudamente y vuelve a intentarlo					||
||======================================================================*/
function cargar_filtro() {
	//Lungo.Router.section("inicio");
	intentar = '<span class="button">Intentar nuevamente</span>';
	$$('section#inicio article').html(intentar);
}


/*======================================================================||
||					ADJUNTAR MODELOS QUE ENCANTAN AL MAIL				||
||	Función que se ejecuta cuando el usuario responde que si a la		||
||	pregunta de que si quiere adjuntar al correo los que le encantan	||
||======================================================================*/
function onConfirm(buttonIndex) {
	var adjuntar_modelos = "";
	if(buttonIndex == 1) {
		agregarVestidosEncantan();
	}
	else {
		$$("section#contacto article textarea").val("");
	}
}
function no() {
}
/*======================================================================||
||					ACTUALIZAR AL PULL TO REFRESH						||
||	Función que se ejecutar cuando el usuario hace Pull to Refresh		||
||	en la sección del listado de productos en el catalogo				||
||======================================================================*/
function actualizarCatalogo() {
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
||					INSERTAR VESTIDO QUE ENCANTA EN BD					||
||	Funcion que se encarga de guardar en la BD el vestido que le 	 	||
||	encanta al usuario													||WHERE id_vestido = "'+tit_ves+'"
||======================================================================*/
function agregarVestidoEncantan(id_ves, tit_ves, url_port, precio_ve) {
	function insertarVestido(tx) {
		/*tx.executeSql('SELECT * FROM ENCANTAN ', [], exitoConsulta, errorConsulta);
		function exitoConsulta(tx,results) {
			if(results.rows.length > 0) {
				alert("Ya");
			}
			else {*/
			/*}
		}*/
		query = 'INSERT INTO ENCANTAN (id_vestido, titulo_vestido, url_portada, precio) VALUES ("'+id_ves+'", "'+tit_ves+'", "'+url_port+'","'+precio_ve+'")';
		tx.executeSql(query);
		
	}
	function insertarExito(tx,results) {
		/*navigator.notification.alert(
			'Articulo agregado a los que te encantan',  // message
			alertDismissed,         // callback
			'Dress4aday',            // title
			'Cerrar'                  // buttonName
		);*/
	}
	function insertarError(err) {
		navigator.notification.alert(
			'No se pudo agregar a los que te encantan, intentalo nuevamente',  // message
			alertDismissed,         // callback
			'Dress4aday',            // title
			'Cerrar'                  // buttonName
		);
	}
	var db = window.openDatabase("dressforaday", "1.0", "Dressforaday DB", 2000000);
	db.transaction(insertarVestido, insertarError, insertarExito);
}

/*======================================================================||
||					MOSTRAR VESTIDOS EN "ME ENCANTAN"					||
||	Funcion que se encarga de mostrar en la sección de me encantan	 	||
||	todos los vestidos que le encantan al usuario						||
||======================================================================*/
function mostrarVestidosEncantan() {
	var m_encantan = "";
	function queryDB(tx) {
		tx.executeSql('SELECT * FROM ENCANTAN', [], exitoSelectCB, errorCB);
	}
	function exitoSelectCB(tx,results) {
		plantilla="";
		len = results.rows.length;
		for (i = 0; i < len; i++){
			plantilla += '<div class="thumb big selectable grid-bloque"><span class="menos" data-encanta-id="'+results.rows.item(i).id_vestido+'" data-encanta-titulo="'+results.rows.item(i).titulo_vestido+'"><img src="img/menos.png"></span> <div class="thumbnail-mini"><img src="'+results.rows.item(i).url_portada+'"></div><div><div class="on-right text tiny precio-mini">'+results.rows.item(i).precio+'</div><strong>'+results.rows.item(i).titulo_vestido+'</strong></div></div>';
		}//FOR
		$$('section#encantan article#encantan-art-1').html(plantilla)
		if(len == 0) {
			$$('section#encantan article#encantan-art-1').html("No tienes vestidos que te encanten")
			me_encantan.length = 0;
		}
	}
	function errorCB(err) {
		navigator.notification.alert(
			'Error al obtener los vestidos que te encantan. Haz clic nuevamente en "Me encantan"',  // message
			alertDismissed,         // callback
			'Dress4aday',            // title
			'Cerrar'                  // buttonName
		);
	}
	var db = window.openDatabase("dressforaday", "1.0", "Dressforaday DB", 2000000);
	db.transaction(queryDB, errorCB);
}

/*======================================================================||
||				BORRAR TODOS LOS VESTIDOS EN "ME ENCANTAN"				||
||	Funcion que se encarga de borrar todos los vestidos que le encantan	||
||	al usuario															||
||======================================================================*/
function borrarVestidosEncantan() {
	function borrarDB(tx) {
		tx.executeSql('DELETE FROM ENCANTAN', [], exitoDeleteBD, errorDeleteBD);
	}
	function exitoDeleteBD(tx,results) {
		$$('section#encantan article#encantan-art-1').html("No tiene vestidos que te encanten");
		me_encantan.length = 0;
	}
	function errorDeleteBD(err) {
		navigator.notification.alert(
			'Error al borrar los vestidos que te encantan. Intentalo nuevamente',  // message
			alertDismissed,         // callback
			'Dress4aday',            // title
			'Cerrar'                  // buttonName
		);
	}
	var db = window.openDatabase("dressforaday", "1.0", "Dressforaday DB", 2000000);
	db.transaction(borrarDB, errorDeleteBD);
}

/*======================================================================||
||						BORRAR VESTIDO EN "ME ENCANTAN"					||
||	Funcion que se encarga de borrar el vestido seleccionado de la		||
||	lista que le encantan al usuario									||
||======================================================================*/
function borrarVestidoEncantan(id) {
	function borrarVestidoDB(tx) {
		consulta = 'DELETE FROM ENCANTAN WHERE id_vestido=' + id;
		tx.executeSql(consulta, [], exitoDeleteVBD, errorDeleteVBD);
	}
	function exitoDeleteVBD(tx,results) {
		//$$('section#encantan article#encantan-art-1').html("No tiene vestidos que te encanten");
	}
	function errorDeleteVBD(err) {
		navigator.notification.alert(
			'Error al borrar el vestido de los que te encantan. Intentalo nuevamente',  // message
			alertDismissed,         // callback
			'Dress4aday',            // title
			'Cerrar'                  // buttonName
		);
	}
	var db = window.openDatabase("dressforaday", "1.0", "Dressforaday DB", 2000000);
	db.transaction(borrarVestidoDB, errorDeleteVBD);
}

/*======================================================================||
||				AGREGAR VESTIDOS EN "ME ENCANTAN" A CORREO				||
||	Funcion que se encarga de agregar al mensaje de contacto los	 	||
||	modelos que el usuario tiene en su ME ENCANTAN						||
||======================================================================*/
function agregarVestidosEncantan() {
	me_encantan_sql = "";
	function queryDB(tx) {
		tx.executeSql('SELECT titulo_vestido FROM ENCANTAN', [], exitoSelectCB, errorCB);
	}
	function exitoSelectCB(tx,results) {
		len = results.rows.length;
		//alert(len);
		me_encantan_sql = "";
		if(len == 0) {
			me_encantan.length = 0
			me_encantan_sql = "";
		}
		for (i = 0; i < len; i++){
			me_encantan_sql += results.rows.item(i).titulo_vestido + "\n";
		}//FOR
		$$("section#contacto article textarea").val("Me podrian dar informes de los siguientes modelos:\n" + me_encantan_sql);
	}
	function errorCB(err) {
		navigator.notification.alert(
			'Error al obtener los vestidos que te encantan. Haz clic nuevamente en "Contacto"',  // message
			alertDismissed,         // callback
			'Dress4aday',            // title
			'Cerrar'                  // buttonName
		);
	}
	var db = window.openDatabase("dressforaday", "1.0", "Dressforaday DB", 2000000);
	db.transaction(queryDB, errorCB);
}
