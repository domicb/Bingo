<?php

$Numero = Aleatorio_1_90 ( $ListaNumero = json_decode ( $_GET ['Valor'] ));

echo $Numero;

function Aleatorio_1_90($ListaNumero) {
	
	$Aleatorio;
	
	do {
		$Aleatorio = rand ( 1, 90 );
	
	} while ( in_array ( $Aleatorio, $ListaNumero ) );
	
	$ListaNumero[]=$Aleatorio; 

	return $Aleatorio;

}
