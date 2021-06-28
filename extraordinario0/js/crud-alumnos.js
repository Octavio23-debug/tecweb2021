/*Controlador*/

var idSeleccionadoParaEliminar = 0;
var idSeleccionadoParaActualizar = 0;

function actionCreate(){
    //Referencias
    var tabla                = $('#dataTables-example').DataTable();/*Servira como una referencia a nuestra tabla*/

    var nombre_create  = document.getElementById("nombre_create").value;/* Tambien puede ser: $('#txt_alta_1').val */
    var apellido_paterno_create     = document.getElementById("apellido_paterno_create").value;
    var apellido_materno_create   = document.getElementById("apellido_materno_create").value;
    var p_academico_create        = document.getElementById("p_academico_create").value;


    $.ajax({
            url: "php/crud-alumnos.php",
            method: 'POST', //este metodo se utiliza cuando vamos a crear
            data: {
                nombre               : nombre_create,
                apellido_paterno     : apellido_paterno_create,
                apellido_materno     : apellido_materno_create,
                p_academico          : p_academico_create,
              accion              : 'Create'  
            },
            success: function( Resultado ) {//Se ejecuta esta funcion hasta que el servidor responda, si se tarda, lo pone en segundo plano
                var objetoJSON = JSON.parse(Resultado);
                    if(objetoJSON.estado == 1){
                                //AGREGAR BOTONES
                        var botones = '<a class="btn btn-primary" data-toggle="modal" data-target="#modal-lg-actualizar" onclick="recuperaDatosUpdate('+objetoJSON.id+');" href="#">';
                        botones = botones + '<i class="fa fa-edit ">';
                        botones = botones + '</i>';
                        botones = botones + ' Actualizar';
                        botones = botones + '</a>';
                        botones = botones + ' <a class="btn btn-danger" data-toggle="modal" data-target="#Modal-Eliminar"  onclick="idSeleccionEliminar('+objetoJSON.id+');" href="#">';
                        botones = botones + '<i class="fa fa-pencil">';
                        botones = botones + '</i>';
                        botones = botones + ' Eliminar';
                        botones = botones + '</a>';

                        tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                            nombre_create,
                            apellido_paterno_create,
                            p_academico_create,
                            botones
                        ]).node().id = 'renglon_'+objetoJSON.id;
    
                    tabla.draw(false);

                    alert(objetoJSON.mensaje);
                    $('#myModal').modal ('hide'); //hide = ocultar; show = mostrar
                    
                }else{
                        alert(objetoJSON.mensaje);
                }
        }//Si el servidor tarda en contestar entonces se seguira, ya que este es un sistema asincrono
    });
}

function actionRead(){
    //GET
    $.ajax({
        url: "php/crud-alumnos.php",
        method: 'GET',
            data: {
            accion       : 'Read'
            },
            success: function( Resultado ){
                    var objetoJSON = JSON.parse(Resultado);
                    if(objetoJSON.estado == 1){
                            //mostrar todos los registros de la base de datos en la tabla
                            var tabla         = $('#dataTables-example').DataTable();
                            
                            for(var constancia of objetoJSON.alumnos){
                                    //AGREGAR BOTONES
                                    var botones = '<a class="btn btn-primary" data-toggle="modal" data-target="#modal-lg-actualizar" onclick="recuperaDatosUpdate('+constancia.id+');" href="#">';
                                    botones = botones + '<i class="fa fa-edit ">';
                                    botones = botones + '</i>';
                                    botones = botones + ' Actualizar';
                                    botones = botones + '</a>';
                                    botones = botones + ' <a class="btn btn-danger" data-toggle="modal" data-target="#Modal-Eliminar" onclick="idSeleccionEliminar('+constancia.id+');" href="#">';
                                    botones = botones + '<i class="fa fa-pencil">';
                                    botones = botones + '</i>';
                                    botones = botones + ' Eliminar';
                                    botones = botones + '</a>';

                                    tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        alumno.nombre,
                                        alumno.apellido_paterno,
                                        alumno.p_academico,
                                        botones
                                    ]).node().id = 'renglon_'+constancia.id;

                                    tabla.draw(false);
                            }
                    }else{
                            //No nos interesa mostrar nada
                    }
            }
    });
}

function actionDelete(){
    //DELETE
    $.ajax({
            url: "php/crud-alumnos.php",
            method: 'POST',
                data: {
                id: idSeleccionadoParaEliminar,
                accion: 'Delete'
                },
                success: function( Resultado ){
                        var objetoJSON = JSON.parse(Resultado);
                        if(objetoJSON.estado==1){
                                
                            //REFERENCIA
                                var tabla = $('#dataTables-example').DataTable();
                            //ELIMINAR DE LA TABLA EL RENGLON
                            tabla.row("#renglon_"+idSeleccionadoParaEliminar).remove().draw();
                        }
                        alert(objetoJSON.mensaje);
                        $('#Modal-Eliminar').modal ('hide'); //hide = ocultar; show = mostrar
                }
            });
}

function idSeleccionEliminar(id){
    //alert (id);
    idSeleccionadoParaEliminar = id;
    //necesitamos guardar el id que se selecciono para eliminar
}

function actionUpdate(){
    //PUT
    //var tabla                = $('#example1').DataTable();/*Servira como una referencia a nuestra tabla*/
    var nombre_actividad_update  = document.getElementById("nombre_update").value;/* Tambien puede ser: $('#txt_alta_1').val */
    var fecha_inicio_update     = document.getElementById("apellido_paterno_update").value;
    var fecha_fin_update   = document.getElementById("apellido_materno_update").value;
    var horas_update       = document.getElementById("p_academico_update").value;


    $.ajax({
            url: "php/crud-alumnos.php",
            method: 'POST',
            data: {
                    id :  idSeleccionadoParaActualizar,
                    nombre : nombre_update ,
                    apellido_paterno    : apellido_paterno_update ,
                    apellido_materno  : apellido_materno_update ,
                    p_academico       : p_academico_update ,
                     
                    accion       : 'Update'  
                  },
                success: function( resultado ){
                        var objetoJSON = JSON.parse(resultado);
                        if(objetoJSON.estado==1){
                            alert(objetoJSON.mensaje);
                            //Debemos de actualizar el renglon de la tabla
                            //refererncia a la tabla
                            var tabla = $('#dataTables-example').DataTable();/*Servira como una referencia a nuestra tabla*/

                            //obtengo en un temporal todos los datos del renglon
                            var renglon = tabla.row("#renglon_"+idSeleccionadoParaActualizar).data();

                            //actualizo en el temporal los datos del renglon
                            renglon[0]=nombre_update;
                            renglon[1]=apellido_paterno_update;
                            renglon[2]=p_academico_update;
                            //renglon[3]=botones;

                            //regreso el temporal a la tabla
                            tabla.row("#renglon_"+idSeleccionadoParaActualizar).data(renglon);

                            $('#modal-lg-actualizar').modal ('hide'); //hide = ocultar; show = mostrar
                        }else{
                            alert(objetoJSON.mensaje);
                        }
            }
    });
}

function recuperaDatosUpdate(id){
    //alert (id);
    idSeleccionadoParaActualizar=id;
    $.ajax({
            url: "php/crud-constancias.php",
            method: 'GET',
                data: {
                id: idSeleccionadoParaActualizar,
                accion       : 'Read'
                },
                success: function( resultado ){
                        var objetoJSON = JSON.parse(resultado);
                        if(objetoJSON.estado==1){
                            //mostrar en los campos los datos
                            //document.getElementById("eje_tematico_update").value=objetoJSON.eje_tematico; //ESTA ES OTRA FORMA DE OPTENER EL DATO
                            $("#nombre_update").val(objetoJSON.nombre); //ESTA ES OTRA FORMA DE OPTENER EL DATO                    
                            $("#apellido_paterno_update").val(objetoJSON.apellido_paterno);
                            $("#apellido_materno_update").val(objetoJSON.apellido_materno);
                            $("#p_academico_update").val(objetoJSON.p_academico);


                        }else{
                            alert(objetoJSON.mensaje);
                        }
            }
    });
}

