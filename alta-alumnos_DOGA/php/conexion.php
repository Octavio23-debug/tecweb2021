<?php
 //servidor --> conexion a "localhost"
 //$servidor               = "localhost";
 //usuario
 //$usuario                = "root";
 //clave --> en este caso usamos con XAMPP
 //$clave                  = "";
 //dase de datos --> en este caso se llama "electivas"
 //$basedatos              = "ets";
  //$puerto              = "3308";

 //Conexion a MYSQL con PHP
 //$conexion = mysqli_connect($servidor, $usuario, $clave, $basedatos, $puerto);
 //msqli_set_charset($conexionE,"utf8");



    $servidor   ="localhost";
    $usuario    ="root";
    $clave      ="";
    $basedatos  ="ets";
    

    $conexion = mysqli_connect($servidor,$usuario,$clave,$basedatos,);

    mysqli_set_charset($conexion,"utf8");
?>