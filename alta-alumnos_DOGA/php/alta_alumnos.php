<?php

if(isset($_POST['accion']))
{

    include "conexion.php";

    switch ($_POST['accion']) 
    {
        case 'read':
            AccionLeer($conexion);
            break;
        case 'update':
            AccionActualizar($conexion);
            break;
        case 'create':
            AccionCrear($conexion);
            break;
        case 'delete':
            AccionEliminar($conexion);
            break;
        default:
            $Mensaje["estado"]=0;
            $Mensaje["mensaje"]="La accion que desea no esta disponible";
            echo json_encode($Mensaje);
            break;
    }

}else{
    $Mensaje["estado"]=0;
    $Mensaje["mensaje"]="No ha indicado la accion";
    echo json_encode($Mensaje);
}

function AccionLeer($conexion)
{

    $Sentencia = "SELECT * FROM alumnos";

    $Mensaje["crud"]    =   array();

    $Resultado  = mysqli_query($conexion,$Sentencia);


    while($Renglon = mysqli_fetch_array($Resultado)){

        $Tipo_Evento = array();

        $Tipo_Evento["id"]          = $Renglon["id"];
        $Tipo_Evento["programa"]    = $Renglon["programa"];
        $Tipo_Evento["nombre"]      = $Renglon["nombre"];

        array_push($Mensaje["crud"], $Tipo_Evento);
    }
    $Mensaje["estado"]  =1;
    $Mensaje["mensaje"] ="Se han obtenido todos los datos correctamente para mostrar";

    echo json_encode($Mensaje);
}

function AccionCrear($conexion)
{

    $nombrelocal    = $_POST['nombre'];
    $apePlocal      = $_POST['apeP'];
    $apeMlocal      = $_POST['apeM'];
    $programalocal  = $_POST['programa'];

    $Sentencia = "INSERT INTO alumnos (id, nombre, apeP, apeM, programa) VALUES (NULL, '".$nombrelocal."', '".$apePlocal."', '".$apeMlocal."', '".$programalocal."')";

    
    $Resultado = mysqli_query($conexion,$Sentencia);

    if($Resultado>=1)
    {
        $Mensaje['estado']   = 1; 
        $Mensaje['mensaje']  = "El registro se creo con Exito";
        $Mensaje['id']       = mysqli_insert_id($conexion); 
        echo json_encode($Mensaje);
    }
    else
    {
        $Mensaje['estado']  = 0;
        $Mensaje['mensaje'] = "ERROR";
        $Mensaje['id']      = -1; 
        echo json_encode($Mensaje);
    }
}



function AccionActualizar($conexion)
{

    $Id             = $_POST['id'];
    $nombrelocal    = $_POST['nombre'];
    $apePlocal      = $_POST['apeP'];
    $apeMlocal      = $_POST['apeM'];
    $programalocal  = $_POST['programa'];

    $Sentencia ="UPDATE alumnos SET  nombre='".$nombrelocal."', apeP='".$apePlocal."', apeM='".$apeMlocal."', programa='".$programalocal."' WHERE id=".$Id;

    mysqli_query($conexion,$Sentencia);

    if(mysqli_affected_rows($conexion)>0){
        $Mensaje['estado']=1;
        $Mensaje['mensaje']="El registro se actualizó correctamente";
    }else{
        $Mensaje['estado']=0;
        $Mensaje['mensaje']="ERROR";
    }
    echo json_encode($Mensaje);

}


function AccionEliminar($conexion)
{

    $Mensaje=array();

    if(isset($_POST['id'])){

        $id = $_POST['id'];

        $Sentencia = "DELETE FROM alumnos WHERE id=".$id;

        mysqli_query($conexion,$Sentencia);

        if(mysqli_affected_rows($conexion)>0){
            $Mensaje["estado"]    =1;
            $Mensaje["mensaje"]   ="se elimino";

        }else{
            $Mensaje["estado"]    =0;
            $Mensaje["mensaje"]   ="error";
        }
    }else{
        $Mensaje["estado"]    =0;
        $Mensaje["mensaje"]   ="Falta un id";
    }

    echo json_encode($Mensaje);
}

?>
