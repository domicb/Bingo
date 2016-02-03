window.onload = function() {carton()};

var premio = 0; //Variable global para el premio total del Bingo
var array_num = []; // Array que guarda los numeros aleatorios del cartón
var array_imagen = []; //Array que guarda las posiciones de las imagenes en el carton	 
var array_cantar= []; //Array que guarda los nodos señalados en el bingo para comprobarlos al cantar
comprobar = false;
var aleatorio =0;

function carton(){ //Función para crear el cartón
	var div = document.getElementById('bonoloto');
	var tabla = document.createElement('table');
	var aciertos = window.opener.contador_acierto+1;

	document.getElementById("numero").innerHTML = "BINGO LOTTO TOMBOLA CARTON Nº: "+aciertos;

	for (x=1; x<=3; x++){//Bucle para crear filas y columnas e introducirlas en la tabla del cartón
		var fila = document.createElement("tr");
			for (i=1; i<=9; i++){
				var columna = document.createElement('td');
				fila.appendChild(columna);		
					
				columna.setAttribute("id", x+","+i); //Le daremos "coordenadas" a los td
				columna.setAttribute("onclick", "pintar("+x+","+i+")"); 
				columna.setAttribute("class", "blanco") //Le daremos clase blanco como predeterminada de color para el css
			}
		tabla.appendChild(fila);
	}
	
	div.appendChild(tabla); //Introducir tabal en DIV principal
	tabla.setAttribute("class", "bingo"); //Tabla con clase de nombre "bingo"
	
		for (j=1; j<=3; j++){//Bucle que pinta los números en el tablón			
				for (k=1; k<=9; k++){
					numeros(j, k); //Pinta los numeros en funcion de las coordenadas de las celdas
				}
		}
	dibujo(); //Pinta los dibujos 
	
}

function numeros(primero, segundo){ //Pinta los numeros en la tabla según las coordeandas dass

	do{ //Bucle que obliga a pintar solo si el número no se encuentra dentro del array
		if (segundo==1){
			 aleatorio = Math.floor(Math.random() * (10 - 1)) + 1;
		}

		if (segundo>1 && segundo < 9){
			var minimo = (segundo-1)*10;
			var maximo = (segundo*10);
			 aleatorio = Math.floor(Math.random() * (maximo - minimo)) + minimo;
			
		}
		
		if (segundo==9){
			 aleatorio = Math.floor(Math.random() * (91 - 80)) + 80;
		}
		
	}while (interior(aleatorio)==true); //Repetira el bucle siempre que exista ese numero dentro del array

	array_num.push(aleatorio); //Introduce el numero aleatorio dentro del array
	document.getElementById(primero+","+segundo).innerHTML= aleatorio; 
}

function interior(dentro){ //Compara el numero aleatorio con el array 
	for (p=0; p<array_num.length; p++){
		if (array_num[p]==dentro){
			return true;
		}
	}
}

function dibujo(){//Función que pinta las imagenes en la tabla

		for (j=1; j<=3; j++){ //Bucle repetitivo con la funcion de dibujar 4 imagenes en cada fila
			array_imagen.length=0;
				for (k=1; k<5; k++){
					do{
					var imagenes = Math.floor(Math.random() * (10 - 1)) + 1; 
					}while(aleatorio_imagen(imagenes)==true);

					array_imagen.push(imagenes);
					document.getElementById(j+","+imagenes).innerHTML="";//Borramos el contendio del TD primero
					document.getElementById(j+","+imagenes).setAttribute("class", "imagen"); //Modificamos la clase segun las coordeandas para llamar a la imagen mediante css
					document.getElementById(j+","+imagenes).setAttribute("id", "imagen"); //Le damos id=imagen para las modificaciones oportunas en css

				}					
		}
}

function aleatorio_imagen(num_imagen){ //Compara el numero aleatorio con el array 
	for (l=0; l<array_imagen.length; l++){
		if (array_imagen[l]==num_imagen){
			return true;
		}
	}
}

function pintar(primero, segundo){//Esta función nos permite pintar sobre los números para su posterior canto de bingo
 	var x = document.getElementById(primero+","+segundo).getAttribute("class"); //Sacamos el nombre del atributo class de las coordenadas pasadas al clickar
	var nodo  = document.getElementById(primero+","+segundo).innerHTML; //Con ello sacamos el número de su interior

	if (x == "blanco"){//En el caso de que no este señalada
		document.getElementById(primero+","+segundo).setAttribute("class", "rojo"); //Le daremos rojo para marcarla
		array_cantar.push(nodo); //Y guardaremos el número del nodo en el array
	}
	
	else {
		document.getElementById(primero+","+segundo).setAttribute("class", "blanco"); //Si estaba marcado, lo desmarcamos
			for (l=0; l<array_cantar.length; l++){
				if (array_cantar[l]==nodo){
					array_cantar.splice(l,1); //Eliminamos el número que ya estaba en el array
				}
			}
	}
}

function cantar_bingo(){//Función llamada al pulsar el botón de cantar bingo
	var contador=0;
	for (u=0; u<array_cantar.length; u++){ //Compara los numeros guardados al pulsar y los salidos en las bolas
		for (a=0; a<Listanumeros.length; a++){
				if (array_cantar[u] == Listanumeros[a]){
					contador++
				}
		}
	}
	parar(); //Para el bingo siempre que pulsemos este botón

	if (contador<15){ //Menos de 15 números correctos no es bingo
		window.open('../Final/Fallol.html',"","width=460, height=480");
	}
	
	else if (contador==15 || contador>=14){ //Bingo correcto
		window.opener.contador_acierto += 1; //Llamamos la funcion contador_acierto de otro archivo para sumarle 1 por ser correcto
		calculo();
		window.open('../Final/Acierto-1.html',"","width=460, height=480");
	}
}

function parar(){//Funcion para parar la salida de las bolas
	clearInterval(bombointerval);
}

function seguir(){ //Función que reaunda la salida de bolas
	setInterval(global, 2500);
}

function calculo (){ //Función para el cálculo del premio
	premio = (window.opener.jugadores * window.opener.valor) / window.opener.contador_acierto;

	premio = premio * 0.8;

	//window.opener.jugadores --> Nos permite llamar a la variable jugadores de otro archivo HTML
	//window.opener.valor --> Nos permite llamar a la variable de otro archivo HTML
	//window.opener.contador_acierto --> Nos permite llamar a la variable  de otro archivo HTML
}