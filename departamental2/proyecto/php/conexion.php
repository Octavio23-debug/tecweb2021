<?php
    //servidor --> conexion a "localhost"
    $servidor               = "localhost";
    //usuario
    $usuario                = "root";
    //clave --> en este caso usamos con XAMPP
    $clave                  = "";
    //dase de datos --> en este caso se llama "electivas"
    $basedatos              = "electivas";
    //Conexion a MYSQL con PHP
    $conexion = mysqli_connect($servidor, $usuario, $clave, $basedatos);
    //msqli_set_charset($conexion,"utf8");
?>