
var obtenerID_e = 0;    
var obtenerID_b = 0;   

function ActionCreate(){

    var nombre_D    =   document.getElementById("crearNombre").value;
    var apeP_O      =   document.getElementById("crearApeP").value;
    var apeM_G      =   document.getElementById("crearApeM").value;
    var programa_A  =   document.getElementById("crearPrograma").value;

    $.ajax({
      method:"POST",
      url: "php/alta_alumnos.php",
      data: { accion:"create", nombre:nombre_D, apeP:apeP_O, apeM:apeM_G, programa:programa_A},
      success: function( result ) 
        {
            resultJSON = JSON.parse(result);

            if(resultJSON.estado==1)
            {
                var tabla=$('#example2').DataTable(); 
                Botones='<button type="button" class="btn btn-info" data-toggle="modal" data-target="#EditarAlumno" onclick="IdentificaActualizar('+resultJSON.id+');">Editar</button>';
                Botones=Botones+' <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#EliminarAlumno" onclick="IndentificaEliminar('+resultJSON.id+');">Eliminar</button></div>';

                tabla.row.add([
                    programa_A, 
                    nombre_D, 
                    Botones
                    ]).draw().node().id="row_"+resultJSON.id;

              $('#CrearAlumno').modal('hide');
            }
            else
            {
                alert("Respuesta del servidor" + result);
            }
        }
    });
}



function ActionRead(){

    $.ajax({
      method:"POST",
      url: "./php/alta_alumnos.php",
      data: { accion: "read" },
      success: function(result) {

        var resultJSON = JSON.parse(result);

        if(resultJSON.estado==1)
        {

            var tabla=$('#example2').DataTable();
            resultJSON.crud.forEach(function(alumnos){

                Botones='<button type="button" class="btn btn-info" data-toggle="modal" data-target="#EditarAlumno" onclick="IdentificaActualizar('+alumnos.id+');">Editar</button>';
                Botones=Botones+' <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#EliminarAlumno" onclick="IndentificaEliminar('+alumnos.id+');">Eliminar</button>';

                tabla.row.add([
                    alumnos.programa, 
                    alumnos.nombre, 
                    Botones
                    ]).draw().node().id="row_"+alumnos.id;

            });


        }
        else
        {

            alert(resultJSON.mensaje);
        }
      }
    });
}


function ActionUpdate() {

    
    var id = obtenerID_e;
    var nombre_Dd        =   document.getElementById("editarNombre").value;  
    var apeP_Oo          =   document.getElementById("editarApelP").value;
    var apeM_Gg          =   document.getElementById("editarApelM").value;
    var programa_Aa      =   document.getElementById("editarPrograma").value;
    
  $.ajax({
      method: "POST",
      url: "php/alta_alumnos.php",
      data: { accion:"update", 
            id:id, 
            nombre:nombre_Dd, 
            apeP:apeP_Oo, 
            apeM:apeM_Gg, 
            programa: programa_Aa
        },
      success: function(result) {
            resultJSON = JSON.parse(result);
            if (resultJSON.estado == 1) 
            {

                var tabla = $("#example2").DataTable();

                renglon = tabla.row("#row_" + id).data();
                renglon[0] = programa_Aa;
                renglon[1] = nombre_Dd;

                tabla.row("#row_" + id).data(renglon);

                $('#EditarAlumno').modal('hide');
            } 
            else
            {
                alert(resultJSON.mensaje);
            }

      }
  });
}
function IdentificaActualizar(id){
    obtenerID_e = id; 

    tabla       = $("#example2").DataTable();

    renglon     = tabla.row("#row_"+obtenerID_e).data();

    programa    = renglon[0];
    nombre      = renglon[1];

    $("#editarPrograma").val(programa);
    $("#editarNombre").val(nombre);

}



function ActionDelete(){

    IdDelete=obtenerID_b;

            $.ajax({
                method:"POST",
                url: "php/alta_alumnos.php",
                data: {
                    accion:"delete",
                    id: IdDelete
                },
                success: function( result ) {
                    resultJSON = JSON.parse(result);

                    if(resultJSON.estado==1)
                    {
                        tabla = $("#example2").DataTable();

                        tabla.row("#row_"+IdDelete).remove().draw();

                    $('#EliminarAlumno').modal('hide');
                    }else{
                        alert(resultJSON.mensaje);
                    }
                }
            });
}



function IndentificaEliminar(id){

    alert("Desea eliminar al registro "+id);
    obtenerID_b=id;

}
