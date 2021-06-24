<?php 
//Modelo
include("conexion.php");

if(isset($_POST['accion'])){
    $accion                 = $_POST['accion'];
    $parametro              = $_POST['parametro'];
}
if(isset($_GET['accion'])){    
    $accion                 = $_GET['accion'];
    $parametro              = $_GET['parametro'];
}

switch ($parametro) {
    case 1:
        accionRead1PHP($conexion); //Siempre entra aquí. entonces hay que poner los actionRead en este mismo case? si y mandas un parametro extra para saber cual debe de regresarte
    break;   
    case 2:
        accionRead2PHP($conexion);
    break;    
    case 3:
        accionRead3PHP($conexion);
    break;  
}

function accionRead1PHP($conexion)
{   
    $respuesta = array();//arreglo1
    if(isset($_GET['id'])){
        $id=$_GET['id'];

        $query=" SELECT c.id, d.eje_tematico, c.actividad, c.horas, d.modalidad, d.factor, ce.creditos, (d.factor*ce.creditos) AS horas_usadas ";
        $query=$query." FROM constancia c, denominacion d, constancia_electiva ce ";
        $query=$query." WHERE d.id=c.denominacion_id c.id=".$id;

        $resultado = mysqli_query($conexion,$query);
        $numeroRegistros = mysqli_num_rows($resultado);

        if($numeroRegistros>=1){
            $Registros=mysqli_fetch_array($resultado);
            
            $respuesta["estado"] = 1;
            $respuesta["mensaje"] = "Si hay registros";

            $respuesta["id"]           = $Registros["id"];
            $respuesta["actividad"]    = $Registros["actividad"];          
            $respuesta["eje_tematico"]    = $Registros["eje_tematico"];
            $respuesta["modalidad"]     = $Registros["modalidad"];
            $respuesta["horas"]     = $Registros["horas"];
            $respuesta["horas_usadas"]     = $Registros["horas_usadas"];
            $respuesta["factor"]     = $Registros["factor"];
            $respuesta["creditos"]     = $Registros["creditos"];

        }else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "No hay registros";
        }

    }else{

        $query=" SELECT d.eje_tematico, c.actividad, c.horas, d.modalidad, d.factor, ce.creditos, (d.factor*ce.creditos) AS horas_usadas ";
        $query=$query." FROM constancia c, denominacion d, constancia_electiva ce ";
        $query=$query." WHERE d.id=c.denominacion_id AND eje_tematico='Énfasis en la profesión' AND c.id=ce.constancia_id ";

        $resultado = mysqli_query($conexion,$query);
        $numeroRegistros = mysqli_num_rows($resultado);
        if($numeroRegistros >= 1){
            $respuesta["estado"]         = 1;
            $respuesta["mensaje"]        = "Si hay registros";
            $respuesta["constancias"] = array();//arreglo2
        
            while($row = mysqli_fetch_array($resultado)){
                $objetoConstancia = array();//arreglo3
             
                //$objetoConstancia["id"]           = $row["id"];
                $objetoConstancia["actividad_1"]    = $row["actividad"];
                $objetoConstancia["eje_tematico_1"]    = $row["eje_tematico"];
                $objetoConstancia["modalidad_1"]     = $row["modalidad"]; 
                $objetoConstancia["horas_totales_1"]     = $row["horas"];
                $objetoConstancia["horas_usadas_1"]     = $row["horas_usadas"]; 
                $objetoConstancia["factor_1"]     = $row["factor"];         
                $objetoConstancia["creditos_1"]     = $row["creditos"];  

                array_push($respuesta["constancias"],$objetoConstancia); //INSERTA POR LA PARTE DE LAS CONSTANCIAS
            }
        }
        else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "NO hay registros";
        }
    }
    echo json_encode($respuesta);
    mysqli_close($conexion);
}


function accionRead2PHP($conexion)
{   
    $respuesta = array();//arreglo1
    if(isset($_GET['id'])){
        $id=$_GET['id'];

        $query=" SELECT c.id, d.eje_tematico, c.actividad, c.horas, d.modalidad, d.factor, ce.creditos, (d.factor*ce.creditos) AS horas_usadas ";
        $query=$query." FROM constancia c, denominacion d, constancia_electiva ce ";
        $query=$query." WHERE d.id=c.denominacion_id c.id=".$id;

        $resultado = mysqli_query($conexion,$query);
        $numeroRegistros = mysqli_num_rows($resultado);

        if($numeroRegistros>=1){
            $Registros=mysqli_fetch_array($resultado);
            
            $respuesta["estado"] = 1;
            $respuesta["mensaje"] = "Si hay registros";

            $respuesta["id"]           = $Registros["id"];
            $respuesta["actividad"]    = $Registros["actividad"];          
            $respuesta["eje_tematico"]    = $Registros["eje_tematico"];
            $respuesta["modalidad"]     = $Registros["modalidad"];
            $respuesta["horas"]     = $Registros["horas"];
            $respuesta["horas_usadas"]     = $Registros["horas_usadas"];
            $respuesta["factor"]     = $Registros["factor"];
            $respuesta["creditos"]     = $Registros["creditos"];

        }else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "No hay registros";
        }

    }else{

        $query=" SELECT d.eje_tematico, c.actividad, c.horas, d.modalidad, d.factor, ce.creditos, (d.factor*ce.creditos) AS horas_usadas ";
        $query=$query." FROM constancia c, denominacion d, constancia_electiva ce ";
        $query=$query." WHERE d.id=c.denominacion_id AND eje_tematico='Inquietudes vocacionales propias' AND c.id=ce.constancia_id ";

        $resultado = mysqli_query($conexion,$query);
        $numeroRegistros = mysqli_num_rows($resultado);
        if($numeroRegistros >= 1){
            $respuesta["estado"]         = 1;
            $respuesta["mensaje"]        = "Si hay registros";
            $respuesta["constancias"] = array();//arreglo2
        
            while($row = mysqli_fetch_array($resultado)){
                $objetoConstancia = array();//arreglo3
             
                //$objetoConstancia["id"]           = $row["id"];
                $objetoConstancia["actividad_2"]    = $row["actividad"];
                $objetoConstancia["eje_tematico_2"]    = $row["eje_tematico"];
                $objetoConstancia["modalidad_2"]     = $row["modalidad"]; 
                $objetoConstancia["horas_totales_2"]     = $row["horas"];
                $objetoConstancia["horas_usadas_2"]     = $row["horas_usadas"]; 
                $objetoConstancia["factor_2"]     = $row["factor"];         
                $objetoConstancia["creditos_2"]     = $row["creditos"];  

                array_push($respuesta["constancias"],$objetoConstancia); //INSERTA POR LA PARTE DE LAS CONSTANCIAS
            }
        }
        else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "NO hay registros";
        }
    }
    echo json_encode($respuesta);
    mysqli_close($conexion);
}


function accionRead3PHP($conexion)
{   
    $respuesta = array();//arreglo1
    if(isset($_GET['id'])){
        $id=$_GET['id'];

        $query=" SELECT c.id, d.eje_tematico, c.actividad, c.horas, d.modalidad, d.factor, ce.creditos, (d.factor*ce.creditos) AS horas_usadas ";
        $query=$query." FROM constancia c, denominacion d, constancia_electiva ce ";
        $query=$query." WHERE d.id=c.denominacion_id c.id=".$id;

        $resultado = mysqli_query($conexion,$query);
        $numeroRegistros = mysqli_num_rows($resultado);

        if($numeroRegistros>=1){
            $Registros=mysqli_fetch_array($resultado);
            
            $respuesta["estado"] = 1;
            $respuesta["mensaje"] = "Si hay registros";

            $respuesta["id"]           = $Registros["id"];
            $respuesta["actividad"]    = $Registros["actividad"];          
            $respuesta["eje_tematico"]    = $Registros["eje_tematico"];
            $respuesta["modalidad"]     = $Registros["modalidad"];
            $respuesta["horas"]     = $Registros["horas"];
            $respuesta["horas_usadas"]     = $Registros["horas_usadas"];
            $respuesta["factor"]     = $Registros["factor"];
            $respuesta["creditos"]     = $Registros["creditos"];

        }else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "No hay registros";
        }

    }else{

        $query=" SELECT d.eje_tematico, c.actividad, c.horas, d.modalidad, d.factor, ce.creditos, (d.factor*ce.creditos) AS horas_usadas ";
        $query=$query." FROM constancia c, denominacion d, constancia_electiva ce ";
        $query=$query." WHERE d.id=c.denominacion_id AND eje_tematico='Complementarias a la formación' AND c.id=ce.constancia_id ";

        $resultado = mysqli_query($conexion,$query);
        $numeroRegistros = mysqli_num_rows($resultado);
        if($numeroRegistros >= 1){
            $respuesta["estado"]         = 1;
            $respuesta["mensaje"]        = "Si hay registros";
            $respuesta["constancias"] = array();//arreglo2
        
            while($row = mysqli_fetch_array($resultado)){
                $objetoConstancia = array();//arreglo3
             
                //$objetoConstancia["id"]           = $row["id"];
                $objetoConstancia["actividad_3"]    = $row["actividad"];
                $objetoConstancia["eje_tematico_3"]    = $row["eje_tematico"];
                $objetoConstancia["modalidad_3"]     = $row["modalidad"]; 
                $objetoConstancia["horas_totales_3"]     = $row["horas"];
                $objetoConstancia["horas_usadas_3"]     = $row["horas_usadas"]; 
                $objetoConstancia["factor_3"]     = $row["factor"];         
                $objetoConstancia["creditos_3"]     = $row["creditos"];  

                array_push($respuesta["constancias"],$objetoConstancia); //INSERTA POR LA PARTE DE LAS CONSTANCIAS
            }
        }
        else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "NO hay registros";
        }
    }
    echo json_encode($respuesta);
    mysqli_close($conexion);
}

?>