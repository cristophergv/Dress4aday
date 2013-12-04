// Espera a que PhoneGap se inicie
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap esta listo, y ahora se pueden hacer llamadas a los métodos
function onDeviceReady() {
/*======================================================================||
||							CONEXIÓN A INTERNET							||
||	Funcion que se encarga de verificar la conexión a internet del  	||
||	usuario y realizar determinadas cosas en caso de tener o no			||
||======================================================================*/
	/*function checkConnection() {
		var networkState = navigator.network.connection.type;
		if(networkState != 'none') {
			$('#blanco').addClass('quitar-blanco');
		}
		else {
			$('#blanco').removeClass('quitar-blanco');
		}
	}// CheckConnection
	checkConnection();
*/

/*======================================================================||
||							CREAMOS LA BASE DE DATOS					||
||	Funcion que se encarga de crear la base de datos en el celular	 	||
||	en donde se guardaran los vestidos que le encantan al usuario		||
||======================================================================*/
	function crearBD() {
		function crearDB(tx) {
			//tx.executeSql('DROP TABLE IF EXISTS ENCANTAN');
			tx.executeSql('CREATE TABLE IF NOT EXISTS ENCANTAN (id INTEGER PRIMARY KEY ASC, id_vestido TEXT, titulo_vestido TEXT, url_portada TEXT, precio TEXT)');
		}
		function errorCrear(tx, err) {
			navigator.notification.alert(
				'Error al crear la base de datos!',  // message
				alertDismissed,         // callback
				'Dress4aday',            // title
				'Cerrar'                  // buttonName
			);
		}
		function exitoCrear() {
			//alert("Exito!");
		}
		var db = window.openDatabase("dressforaday", "1.0", "Dressforaday DB", 2000000);
		db.transaction(crearDB, errorCrear, exitoCrear);
		// Populate the database
		//
	}
	crearBD();	
	
	//Verificamos si el usuario tiene vestidos que le encanten
	agregarVestidosEncantan();
	
} //onDevideReady
