function actionRead1(){
    //GET
    $.ajax({
        url: "php/desglose-creditos.php",
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
                            var tabla = $('#tabla_1').DataTable();
                                var suma=0;
                                for(var constancia of objetoJSON.constancias){

                                        suma+=parseInt(constancia.creditos_1);
                                        tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        constancia.actividad_1,
                                        constancia.eje_tematico_1,
                                        constancia.modalidad_1,
                                        constancia.horas_totales_1,
                                        constancia.horas_usadas_1,
                                        constancia.factor_1,
                                        constancia.creditos_1,
                                        ]).node().id = 'renglon_'+constancia.id;

                                        tabla.draw(false);
                                }
                                //alert(suma); 
                                document.getElementById("span_total_1").innerHTML=suma;     
                    }else{
                            //No nos interesa mostrar nada
                    }
            },
    });
}

function actionRead2(){
    //GET
    $.ajax({
        url: "php/desglose-creditos.php",
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
                            var tabla = $('#tabla_2').DataTable();
                                var suma=0;
                                for(var constancia of objetoJSON.constancias){

                                        suma+=parseInt(constancia.creditos_2);
                                        tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        constancia.actividad_2,
                                        constancia.eje_tematico_2,
                                        constancia.modalidad_2,
                                        constancia.horas_totales_2,
                                        constancia.horas_usadas_2,
                                        constancia.factor_2,
                                        constancia.creditos_2
                                        ]).node().id = 'renglon_'+constancia.id;

                                        tabla.draw(false);
                                }    
                                //alert(suma);
                                document.getElementById("span_total_2").innerHTML=suma; 
                    }else{
                            //No nos interesa mostrar nada
                    }
            },
    });
}

function actionRead3(){
    //GET
    $.ajax({
        url: "php/desglose-creditos.php",
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
                            var tabla = $('#tabla_3').DataTable();
                            var suma=0;
                                for(var constancia of objetoJSON.constancias){

                                        suma+=parseInt(constancia.creditos_3);
                                        tabla.row.add([    /*Esto nos ayudara a poder agregar mas renglones a nuestra tabla */
                                        constancia.actividad_3,
                                        constancia.eje_tematico_3,
                                        constancia.modalidad_3,
                                        constancia.horas_totales_3,
                                        constancia.horas_usadas_3,
                                        constancia.factor_3,
                                        constancia.creditos_3
                                        ]).node().id = 'renglon_'+constancia.id;

                                        tabla.draw(false);
                                }       
                                //alert(suma);
                                document.getElementById("span_total_3").innerHTML=suma;    
                    }else{
                            //No nos interesa mostrar nada
                    }
            },
    });
}
