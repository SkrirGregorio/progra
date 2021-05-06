inicializarDb();
obtenerSubGrupos();
obtenerGrupos();


 ///Funcion para obtener los grupos de la base de datos y mostrarlos en la tabla
 async function obtenerGrupos() {
     let datos = await selectGrupos();

     if (datos!='Vacio') {
         let t = '';
         for (let i = 0; i < datos.length; i++) {
             t += `
        <option value="${datos[i].id}">${datos[i].nombre}</option>  
       `;
         }
         $('#grupos').html(t);
     }

}

 ///Funcion para obtener los grupos de la base de datos y mostrarlos en la tabla
 async function obtenerSubGrupos() {
     let datos = await selectSubGrupos();
     if (datos!='Vacio') {
         let t = '';
         for (let i = 0; i < datos.length; i++) {
             t += `
        <tr>
        <th scope="row">${datos[i].id}</th>
        <td>${datos[i].nombre}</td>
        <td>${datos[i].grupo}</td>

    </tr>
       `;
         }
         $('#subGupos').html(t);
     }

}

//funcion para registrar un nuevo 

$('#formulario').submit(function (e) {
    e.preventDefault();
    let nombre = $('#nombre').val()
    let grupo = $('#grupos').val()

    let g =new Subgrupos(0,nombre,grupo);
    insertarSubgrupos(g);
    $('#nombre').val('');
    $('#grupos').val('');
    obtenerSubGrupos();     
})