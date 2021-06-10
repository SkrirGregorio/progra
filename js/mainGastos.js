inicializarDb(); // Inicalizamos nuestra base de deatos y las tablas
//Llamamos nuestra funcion automaticamente para cargar la lista de registros

obtenerSubGrupos();
obtenerGastos();



///Funcion para obtener los  datos 
async function obtenerSubGrupos() {
    // Llamamos a nuestra funcion de la base de datos que ara la consulta
    let datos = await selectSubGrupos();
    // Evaluamos si se obtuvieron registros    
    if (datos != 'Vacio') {
        let t = ''; // Variable temporal para almacenar html

        // Recorremos la lista obtenida para ir agregando options al list box

        for (let i = 0; i < datos.length; i++) {
            t += `
            <option value="${datos[i].id}">${datos[i].nombre}</option>
      `;
        }
        //Insertamos el html creado por el for en nuestro list box
        $('#subgrupos').html(t);
    }

}

///Funcion para obtener los grupos de la base de datos y mostrarlos en la tabla
async function obtenerGastos() {
    // Llamamos a nuestra funcion de la base de datos que ara la consulta
    let datos = await selectGastos();
    if (datos != 'Vacio') {
        let t = ''; // Variable temporal para almacenar html
        for (let i = 0; i < datos.length; i++) {
            t += `
       <tr>
       <th scope="row">${datos[i].id}</th>
       <td>${datos[i].nombre}</td>
       <td>Q${datos[i].valor}</td>
       <td>${datos[i].periodo}</td>
       <td>${datos[i].subgrupo}</td>
       <td>${datos[i].grupo}</td>
       <td><button type="button" onClick="eliminar(${datos[i].id})">Eliminar</button></td>

   </tr>
      `;
        }
        //Insertamos el html creado por el for en nuestra tabla

        $('#gastos').html(t);
    } else {
        // Si no se encotraron registros se puestra la alterta
        alert('No hay registros!')
    }

}


//funcion para registrar un nuevo 
$('#formulario').submit(function(e) {
    e.preventDefault(); // Evita que se recargue la pagina

    //Obtenemos los valores de los inputs y los almacenamos en variables
    let nombre = $('#nombre').val()
    let subgrupo = $('#subgrupos').val()
    let valor = $('#valor').val()
    let periodo = $('#periodo').val()

    // Creamos una nueva instancia del modelo y le enviamos los datos que se requieren
    let g = new Gasto(0, nombre, valor, subgrupo, periodo);
    // LLamamos a nuestra funcion encargada de hacer el registro, la funcion se encuentra en el archivo de base de datos
    insertarGasto(g);

    //Limpiamos los imputs del Formulario
    $('#nombre').val('');
    $('#subgrupos').val('');
    $('#valor').val('');
    $('#periodo').val('');

    ///Llamamos a nuestra funcion encargada de obtener de nuevo el listado
    obtenerGastos();
});

// Funcion encargada de eliminar un registro por medio de un id
function eliminar(id) {
    // llamamos a la funcion encargada de eliminar un registro
    eliminarGasto(id);

    ///Llamamos a nuestra funcion encargada de obtener de nuevo el listado
    obtenerGastos();
}