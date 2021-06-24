
function actionRead1(){
    //GET
    $.ajax({
        url: "php/denominacion.php",
        method: 'GET',
            data: {
                parametro:1,
                accion: 'Read'
            },
            success: function( Resultado ){
                //alert(Resultado);
                    var objetoJSON = JSON.parse(Resultado);
                    if(objetoJSON.estado == 1){
                            //mostrar todos los registros de la base de datos en la tabla
                            var tabla = $('#example_1').DataTable();
                                
                                for(var denominacion of objetoJSON.denominaciones){

                                        tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        denominacion.modalidad_1,
                                        denominacion.ejemplos_1,
                                        denominacion.descripcion_1,
                                        ]).node().id = 'renglon_'+denominacion.id;

                                        tabla.draw(false);
                                }                  
                    }else{
                            //No nos interesa mostrar nada
                    }
            },
    });
}

function actionRead2(){
    //GET
    $.ajax({
        url: "php/denominacion.php",
        method: 'GET',
            data: {
            parametro:2,    
            accion: 'Read'
            },
            success: function( Resultado ){
                //alert(Resultado);
                    var objetoJSON = JSON.parse(Resultado);
                    if(objetoJSON.estado == 1){
                            //mostrar todos los registros de la base de datos en la tabla
                            var tabla = $('#example_2').DataTable();
                                
                                for(var denominacion of objetoJSON.denominaciones){
                                        //alert(denominacion.modalidad_2+" "+denominacion.modalidad_2+" "+denominacion.descripcion_2+" "+denominacion.id)
                                        tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        denominacion.modalidad_2,
                                        denominacion.ejemplos_2,
                                        denominacion.descripcion_2,//a muy bien profe
                                        ]).node().id = 'renglon_'+denominacion.id;//Me refereria solo al id, ya que los demas tiene un 2

                                        tabla.draw(false);
                                }                  
                    }else{
                            //No nos interesa mostrar nada
                    }
            },
    });
}

function actionRead3(){
    //GET
    $.ajax({
        url: "php/denominacion.php",
        method: 'GET',
            data: {
                parametro:3,
                accion: 'Read'
            },
            success: function( Resultado ){ 
                //alert(Resultado);
                    var objetoJSON = JSON.parse(Resultado);
                    if(objetoJSON.estado == 1){
                            //mostrar todos los registros de la base de datos en la tabla
                            var tabla = $('#example_3').DataTable();
                                
                                for(var denominacion of objetoJSON.denominaciones){

                                        tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        denominacion.modalidad_3,
                                        denominacion.ejemplos_3,
                                        denominacion.descripcion_3,
                                        ]).node().id = 'renglon_'+denominacion.id;

                                        tabla.draw(false);
                                }                  
                    }else{
                            //No nos interesa mostrar nada
                    }
            },
    });
}


function actionReadElectivas(){
    //GET
    $.ajax({
        url: "php/denominacion.php",
        method: 'GET',
            data: {
                parametro:4,
                accion: 'Read'
            },
            success: function( Resultado ){ 
                //alert(Resultado);
                    var objetoJSON = JSON.parse(Resultado);
                    if(objetoJSON.estado == 1){
                            //mostrar todos los registros de la base de datos en la tabla
                            var tabla = $('#tabla-electivas').DataTable();
                                
                                for(var electiva of objetoJSON.electivas){

                                    var porcentaje = (electiva.creditos_acumulados/electiva.creditos)*100;
                                    var barras = '<div class="progress progress-striped active">';
                                        barras = barras+'<div class="progress-bar progress-bar-primary"  id="electiva_1" role="progressbar"'; 
                                        barras = barras+'aria-valuenow="'+electiva.creditos_acumulados+'" aria-valuemin="0" aria-valuemax="'+electiva.creditos+'" style="width: '+porcentaje+'%">';
                                        barras = barras+'</div>';
                                        barras = barras+'</div>';
                                        //barras = barras+'<div style="text-align:center;" "'+porcentaje+'">porcentaje</div>';
                                        
                                        tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        electiva.nombre,
                                        //electiva.creditos,
                                        //electiva.creditos_acumulados,   //Cancele estos dos, ya que en la tabla no los agrego, si no en la variable barras
                                        barras
                                        ]).node().id = 'renglon_'+electiva.id;

                                        tabla.draw(false);
                                }                  
                    }else{
                            //No nos interesa mostrar nada
                    }
            },
    });
}


