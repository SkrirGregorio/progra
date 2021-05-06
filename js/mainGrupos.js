inicializarDb();
obtenerGrupos();
 /*

  let g1 =new Grupo(0,'grupo1');

 insertarGrupo(g1);
 let subgru = new Subgrupos(0, 'subgrupo1', 1);
 console.log(subgru);
 insertarSubgrupos (subgru); */

 

 ///Funcion para obtener los grupos de la base de datos y mostrarlos en la tabla
 async function obtenerGrupos() {
     let datos = await selectGrupos();
     if (datos!='Vacio') {
     let t = '';
     for (let i = 0; i < datos.length; i++) {
        t += `
        <tr>
           <th scope="row">${datos[i].id}</th>
           <td>${datos[i].nombre}</td>
       </tr>
        `;        
     }
     $('#datos').html(t);     
    }
}
 
//funcion para registrar un nuevo grupo

$('#formulario').submit(function (e) {
    e.preventDefault();
    let nombre = $('#nombre').val()
    let g =new Grupo(0,nombre);
    insertarGrupo(g);
    $('#nombre').val('');
    obtenerGrupos();     
})

