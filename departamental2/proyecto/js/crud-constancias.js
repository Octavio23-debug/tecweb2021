/*Controlador*/

var idSeleccionadoParaEliminar = 0;
var idSeleccionadoParaActualizar = 0;

function actionCreate(){
    //Referencias
    var tabla                = $('#dataTables-example').DataTable();/*Servira como una referencia a nuestra tabla*/

    var nombre_actividad_create  = document.getElementById("nombre_actividad_create").value;/* Tambien puede ser: $('#txt_alta_1').val */
    var fecha_inicio_create     = document.getElementById("fecha_inicio_create").value;
    var fecha_fin_create   = document.getElementById("fecha_termino_create").value;
    var horas_create        = document.getElementById("horas_create").value;
    var archivo_create      = document.getElementById("archivo_create").value;
    var observaciones_create      = document.getElementById("observaciones_create").value;

    $.ajax({
            url: "php/crud-constancias.php",
            method: 'POST', //este metodo se utiliza cuando vamos a crear
            data: {
                nombre_actividad  : nombre_actividad_create,
                fecha_inicio      : fecha_inicio_create,
                fecha_fin     : fecha_fin_create,
                horas             : horas_create,
                archivo           : archivo_create,
                observaciones     : observaciones_create,
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
                            nombre_actividad_create,
                            fecha_inicio_create,
                            horas_create,
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
        url: "php/crud-constancias.php",
        method: 'GET',
            data: {
            accion       : 'Read'
            },
            success: function( Resultado ){
                    var objetoJSON = JSON.parse(Resultado);
                    if(objetoJSON.estado == 1){
                            //mostrar todos los registros de la base de datos en la tabla
                            var tabla         = $('#dataTables-example').DataTable();
                            
                            for(var constancia of objetoJSON.constancias){
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
                                        constancia.nombre_actividad,
                                        constancia.fecha_inicio,
                                        constancia.horas,
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
            url: "php/crud-constancias.php",
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
    var nombre_actividad_update  = document.getElementById("nombre_actividad_update").value;/* Tambien puede ser: $('#txt_alta_1').val */
    var fecha_inicio_update     = document.getElementById("fecha_inicio_update").value;
    var fecha_fin_update   = document.getElementById("fecha_fin_update").value;
    var horas_update       = document.getElementById("horas_update").value;
    var archivo_update      = document.getElementById("archivo_update").value;
    var observaciones_update     = document.getElementById("observaciones_update").value;

    $.ajax({
            url: "php/crud-constancias.php",
            method: 'POST',
            data: {
                    id :  idSeleccionadoParaActualizar,
                    nombre_actividad : nombre_actividad_update ,
                    fecha_inicio    : fecha_inicio_update ,
                    fecha_fin  : fecha_fin_update ,
                    horas       : horas_update ,
                    archivo     : archivo_update ,
                    observaciones     : observaciones_update ,
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
                            renglon[0]=nombre_actividad_update;
                            renglon[1]=fecha_inicio_update;
                            renglon[2]=horas_update;
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
                            $("#nombre_actividad_update").val(objetoJSON.nombre_actividad); //ESTA ES OTRA FORMA DE OPTENER EL DATO                    
                            $("#fecha_inicio_update").val(objetoJSON.fecha_inicio);
                            $("#fecha_fin_update").val(objetoJSON.fecha_fin);
                            $("#horas_update").val(objetoJSON.horas);
                            $("#archivo_update").val(objetoJSON.archivo);
                            $("#observaciones_update").val(objetoJSON.observaciones);

                        }else{
                            alert(objetoJSON.mensaje);
                        }
            }
    });
}

