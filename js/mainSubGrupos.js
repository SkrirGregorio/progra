inicializarDb(); // Inicalizamos nuestra base de deatos y las tablas

//Llamamos nuestra funcion automaticamente para cargar la lista de registros
obtenerSubGrupos();
obtenerGrupos();


 ///Funcion para obtener los grupos de la base de datos y mostrarlos en el list box para que pueda ser seleccionada por el usuario
async function obtenerGrupos() {

    // Llamamos a nuestra funcion de la base de datos que ara la consulta
    let datos = await selectGrupos();
    
    // Evaluamos si se obtuvieron registros
     if (datos!='Vacio') {
         let t = '';// Variable temporal para almacenar html

          // Recorremos la lista obtenida para ir agregando options al list box
         for (let i = 0; i < datos.length; i++) {
             t += `
        <option value="${datos[i].id}">${datos[i].nombre}</option>  
       `;
         }
         //Insertamos el html creado por el for en nuestro list box
         $('#grupos').html(t);
     }

}

 ///Funcion para obtener los grupos de la base de datos y mostrarlos en la tabla
async function obtenerSubGrupos() {
     // Llamamos a nuestra funcion de la base de datos que ara la consulta
    let datos = await selectSubGrupos();
        // Evaluamos si se obtuvieron registros
     if (datos!='Vacio') {
         let t = '';// Variable temporal para almacenar html
         for (let i = 0; i < datos.length; i++) {
             t += `
        <tr>
        <th scope="row">${datos[i].id}</th>
        <td>${datos[i].nombre}</td>
        <td>${datos[i].grupo}</td>
        <td><button type="button" onClick="eliminar(${datos[i].id})">Eliminar</button></td>

    </tr>
       `;
         }
          //Insertamos el html creado por el for en nuestra tabla
         $('#subGupos').html(t);
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
    let grupo = $('#grupos').val()

    // Creamos una nueva instancia del modelo y le enviamos los datos que se requieren
    let g = new Subgrupos(0, nombre, grupo);
    // LLamamos a nuestra funcion encargada de hacer el registro, la funcion se encuentra en el archivo de base de datos
    insertarSubgrupos(g);

    //Limpiamos los imputs del Formulario
    $('#nombre').val('');
    $('#grupos').val('');

    ///Llamamos a nuestra funcion encargada de obtener de nuevo el listado
    obtenerSubGrupos();
});

// Funcion encargada de eliminar un registro por medio de un id
function eliminar(id) {
    // llamamos a la funcion encargada de eliminar un registro
    eliminarSubGrupo(id);

     ///Llamamos a nuestra funcion encargada de obtener de nuevo el listado
     obtenerSubGrupos();
}