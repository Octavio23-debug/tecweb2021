<?php
    /* Modelo de datos = Modelo-Vista-Controlador
        Modelo      = .PHP
        Vista       = .HTML
        Controlador = .JS
        
        CRUD = 
        Crear(Creat)        = POST, 
        Leer(Read)          = GET, 
        Actualiza(Update)   = PUT,  
        Eliminar(Delete)    = DELETE 

        $_POST = es un arreglo;
    */

    // Parte de la Conexion
    include("conexion.php");

    $eje_tematico           = $_POST['eje_tematico']; 
    $modalidad              = $_POST['modalidad']; 
    $descripcion            = $_POST['descripcion']; 
    $factor                 = $_POST['factor']; 
    $ejemplos               = $_POST['ejemplos']; 
    $accion                 = $_POST['accion']; 
    
    //QUERY --> consulta --> En este caso lo vamos a usar para insertar
    $Query = "INSERT INTO denominacion (id, eje_tematico, modalidad, descripcion, factor, ejemplos) VALUES (NULL, '".$eje_tematico."', '".$modalidad."', '".$descripcion."', ".$factor.", '".$ejemplos."')";
    //Esta instruccion crea el registro en la base de datos
    $Resultado = mysqli_query($conexion, $Query); //la funcion regresa un 1, por que son los numeros de renglones afectados

    $Respuesta = array(); 

    if($Resultado>=1){
        //todo OK
        //JSON {"estado":1, "mensaje":"La informacion se guardo correctamente", "id":26} --> CODIFICACION 
        $Respuesta["estado"]    = 1;
        $Respuesta["mensaje"]   = "La información se guardó correctamente";
        $Respuesta["id"]        = 26;
        echo json_encode($Respuesta); 

    }else {
        //NO todo OK
        //JSON {"estado":0, "mensaje":"Ocurrio un error desconocido", "id":-1}
        $Respuesta["estado"]    = 0;
        $Respuesta["mensaje"]   = "Ocurrió un error desconocido";
        $Respuesta["id"]        = -1;
        echo json_encode($Respuesta);
    }

?>