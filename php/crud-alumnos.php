<?php
/*modelo de datos MVC (Modelo Vista Controlador)
Modelo = .php
Vista = .html
Controlador = .js

CRUD = create, read, update, delete
*/

include("conexionE.php");

if(isset($_POST['accion']))
    $accion=$_POST['accion'];
if(isset($_GET['accion']))
    $accion=$_GET['accion'];

switch ($accion) {
    case 'Create':
        # code...
        accionCreatePHP($conexionE);
        break;
    case 'Read':
        # code...
        accionReadPHP($conexionE);
        break;
    case 'Delete':
        # code...
        accionDeletePHP($conexionE);
        break;
    case 'Update':
        # code...
        accionUpdatePHP($conexionE);
        break;
    default:
        # code...
        break;
}

    function accionCreatePHP($conexionE){
    # code...
    $nombre=$_POST['nombre'];
    $apellido_paterno=$_POST['apellido_paterno'];
    $apellido_materno=$_POST['apellido_materno'];
    $p_academico=$_POST['p_academico'];


    $Query="INSERT INTO alumno (id, nombre, apellido_paterno, apellido_materno, p_academico) VALUES (NULL, '".$nombre."', '".$apellido_paterno."', '".$apellido_materno."', ".$p_academico."')";
    // crea el registro n la base de datos
    $Resultado=mysqli_query($conexionE,$Query);

    $Respuesta=array();

    if($Resultado>=1){
        //todo esta bien
        $Respuesta["estado"]=1;//Respuesta para el programador
        $Respuesta["mensaje"]="La informacion se gurdo correctamente";//Respuesta para alumnos o encargado de electivas
        $Respuesta["id"]=mysqli_insert_id($conexionE);//Respuesta para el programador
        echo json_encode($Respuesta);
    }else{
        //no todo ok 
        $Respuesta["estado"]=0;//Respuesta para el programador
        $Respuesta["mensaje"]="Ocurrio un error desconocido";//Respuesta para alumnos o encargado de electivas
        $Respuesta["id"]=-1;//Respuesta para el programador
        echo json_encode($Respuesta);
    }
    mysqli_close($conexionE);
}
function accionReadPHP($conexionE)
{
    $Respuesta=array();

    if (isset($_GET['id'])) {
        $id=$_GET["id"];
        $Query="SELECT * FROM alumno WHERE id=".$id;
        $Resultado=mysqli_query($conexionE,$Query);
        $numeroRegistros=mysqli_num_rows($Resultado);

        if($numeroRegistros>=1){
            $Registro=mysqli_fetch_array($Resultado);
            $Respuesta["estado"]=1;
            $Respuesta["mensaje"]="Si hay registros para mostrar";

            $Respuesta["id"]                    =$Registro["id"];
            $Respuesta["nombre"]                =$Registro["nombre"];
            $Respuesta["apellido_paterno"]      =$Registro["apellido_paterno"];
            $Respuesta["apellido_materno"]      =$Registro["apellido_materno"];
            $Respuesta["p_academico"]           =$Registro["p_academico"];
           
            
        }else{
            $Respuesta["estado"]=0;
            $Respuesta["mensaje"]="NO hay registros para mostrar";
        }
    }else{
        $Query="SELECT * FROM alumno";
        $Resultado=mysqli_query($conexionE,$Query);
        $numeroRegistros=mysqli_num_rows($Resultado);
        
        if($numeroRegistros>=1){
            $Respuesta["estado"]=1;
            $Respuesta["mensaje"]="Si hay registros para mostrar";
            $Respuesta["alumnos"]=array();

            while ($Registro=mysqli_fetch_array($Resultado)) {
                $objetoAlumno=array();
                $objetoAlumno["id"]                 =$Registro["id"];
                $objetoAlumno["nombre"]             =$Registro["nombre"];
                $objetoAlumno["apellido_paterno"]   =$Registro["apellido_paterno"];
                $objetoAlumno["apellido_materno"]   =$Registro["apellido_materno"];
                $objetoAlumno["p_academico"]        =$Registro["p_academico"];
                

                array_push($Respuesta["alumnos"],$objetoAlumno);
            }
            
        }else{
            $Respuesta["estado"]=0;
            $Respuesta["mensaje"]="NO hay registros para mostrar";
            
        }
        
    }
    echo json_encode($Respuesta);
    mysqli_close($conexionE);
}
function accionDeletePHP($conexionE)
{
    $Respuesta=array();
    $id=$_POST["id"];
    $Query="DELETE FROM alumno WHERE alumno.id = ".$id;    
    $Resultado=mysqli_query($conexionE,$Query);
    $numeroRegistros=mysqli_affected_rows($conexionE);

    if($numeroRegistros>=1){
        $Respuesta["estado"]=1;
        $Respuesta["mensaje"]="El registro se elimino correctamente";
    }else{
        $Respuesta["estado"]=0;
        $Respuesta["mensaje"]="Ocurrio un error desconocido";
    }
    
    echo json_encode($Respuesta);
    mysqli_close($conexionE);
}
function accionUpdatePHP($conexionE)
{
    $Respuesta=array();
    $id=$_POST["id"];
    $actividad=$_POST['actividad'];
    $fecha_inicio=$_POST['fecha_inicio'];
    $fecha_fin=$_POST['fecha_fin'];
    $horas=$_POST['horas'];
    $archivo=$_POST['archivo'];
    $observaciones=$_POST['observaciones'];

    $Query="UPDATE alumno SET nombre = '".$nombre."', apellido_paterno = '".$apellido_paterno."', apellido_materno = '".$apellido_materno."', p_academico = ".$p_academico."' WHERE alumno.id = ".$id;
    mysqli_query($conexionE,$Query);
    $numeroRegistros=mysqli_affected_rows($conexionE);


    if($numeroRegistros>=1){
        $Respuesta["estado"]=1;
        $Respuesta["mensaje"]="El registro se actualizó correctamente";
    }else{
        $Respuesta["estado"]=0;
        $Respuesta["mensaje"]="Ocurrio un error desconocido";
    }
    echo json_encode($Respuesta);
    mysqli_close($conexionE);
}
?>