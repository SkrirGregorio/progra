inicializarDb(); // Inicalizamos nuestra base de deatos y las tablas
//Llamamos nuestra funcion automaticamente para cargar la lista de registros

obtenerIngresos();



 ///Funcion para obtener los grupos de la base de datos y mostrarlos en la tabla
async function obtenerIngresos() {
     // Llamamos a nuestra funcion de la base de datos que ara la consulta
    let datos = await selectIngresos();
    if (datos!='Vacio') {
        let t = '';// Variable temporal para almacenar html
        for (let i = 0; i < datos.length; i++) {
            t += `
       <tr>
       <th scope="row">${datos[i].id}</th>
       <td>${datos[i].nombre}</td>
       <td>Q${datos[i].valor}</td>
       <td>${datos[i].periodo}</td>
       <td><button type="button" onClick="eliminar(${datos[i].id})">Eliminar</button></td>

   </tr>
      `;
        }
          //Insertamos el html creado por el for en nuestra tabla

        $('#ingresos').html(t);
    } else {
        // Si no se encotraron registros se puestra la alterta
        alert('No hay registros!')
   }

}


//funcion para registrar un nuevo 
$('#formulario').submit(function (e) {
    e.preventDefault();// Evita que se recargue la pagina

    //Obtenemos los valores de los inputs y los almacenamos en variables
    let nombre = $('#nombre').val()
    let valor = $('#valor').val()
    let periodo = $('#periodo').val()

    // Creamos una nueva instancia del modelo y le enviamos los datos que se requieren
    let g = new Ingresos(0, nombre, valor, periodo);
    // LLamamos a nuestra funcion encargada de hacer el registro, la funcion se encuentra en el archivo de base de datos
    insertarIngreso(g);

    //Limpiamos los imputs del Formulario
    $('#nombre').val('');
    $('#valor').val('');
    $('#periodo').val('');

    ///Llamamos a nuestra funcion encargada de obtener de nuevo el listado
    obtenerIngresos();
});

// Funcion encargada de eliminar un registro por medio de un id
function eliminar(id) {
    // llamamos a la funcion encargada de eliminar un registro
    eliminarIngreso(id);

     ///Llamamos a nuestra funcion encargada de obtener de nuevo el listado
     obtenerIngresos();
}