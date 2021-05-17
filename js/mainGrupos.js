inicializarDb(); // Inicalizamos nuestra base de deatos y las tablas

//Llamamos nuestra funcion automaticamente para cargar la lista de registros
obtenerGrupos();

 

 ///Funcion para obtener los grupos de la base de datos y mostrarlos en la tabla
async function obtenerGrupos() {
     // Llamamos a nuestra funcion de la base ddeatos que ara la consulta
    let datos = await selectGrupos();
    
    // Evaluamos si se obtuvieron registros
     if (datos!='Vacio') {
         let t = ''; // Variable temporal para almacenar html
         
     // Recorremos la lista obtenida para ir agregando filas a la tabla    
     for (let i = 0; i < datos.length; i++) {
        t += `
        <tr>
           <th scope="row">${datos[i].id}</th>
           <td>${datos[i].nombre}</td>
           <td><button type="button" onClick="eliminar(${datos[i].id})">Eliminar</button></td>

       </tr>
        `;        
         }
         //Insertamos el html creado por el for en nuestra tabla
     $('#datos').html(t);     
     } else {
         // Si no se encotraron registros se puestra la alterta
         alert('No hay registros!')
    }
}
 

//funcion para registrar un nuevo grupo
$('#formulario').submit(function (e) {
    e.preventDefault();// Evita que se recargue la pagina
    //Obtenemos los valores de los inputs y los almacenamos en variables
    let nombre = $('#nombre').val();

    // Creamos una nueva instancia del modelo y le enviamos los datos que se requieren
    let g = new Grupo(0, nombre);
    
    // LLamamos a nuestra funcion encargada de hacer el registro, la funcion se encuentra en el archivo de base de datos
    insertarGrupo(g);

    //Limpiamos los imputs del Formulario
    $('#nombre').val('');

    ///Llamamos a nuestra funcion encargada de obtener de nuevo el listado
    obtenerGrupos();
});

// Funcion encargada de eliminar un registro por medio de un id
function eliminar(id) {

    // llamamos a la funcion encargada de eliminar un registro
    eliminarGrupo(id);

     ///Llamamos a nuestra funcion encargada de obtener de nuevo el listado
     obtenerGrupos();
}

