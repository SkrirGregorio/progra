inicializarDb();
obtenerSubGrupos();
obtenerGastos();   



 ///Funcion para obtener los  datos 
 async function obtenerSubGrupos() {
    let datos = await selectSubGrupos();
    if (datos!='Vacio') {
        let t = '';
        for (let i = 0; i < datos.length; i++) {
            t += `
            <option value="${datos[i].id}">${datos[i].nombre}</option>
      `;
        }
        $('#subgrupos').html(t);
    }

}

async function obtenerGastos() {
    let datos = await selectGastos();
    if (datos!='Vacio') {
        let t = '';
        for (let i = 0; i < datos.length; i++) {
            t += `
       <tr>
       <th scope="row">${datos[i].id}</th>
       <td>${datos[i].nombre}</td>
       <td>Q${datos[i].valor}</td>
       <td>${datos[i].periodo}</td>
       <td>${datos[i].subgrupo}</td>
       <td>${datos[i].grupo}</td>
   </tr>
      `;
        }
        $('#gastos').html(t);
    }

}


//funcion para registrar un nuevo 
$('#formulario').submit(function (e) {
    e.preventDefault();
    let nombre = $('#nombre').val()
    let subgrupo = $('#subgrupos').val()
    let valor = $('#valor').val()
    let periodo = $('#periodo').val()


    let g =new Gasto(0,nombre,valor,subgrupo,periodo);
    insertarGasto(g);
    $('#nombre').val('');
    $('#subgrupos').val('');
    $('#valor').val('');
    $('#periodo').val('');

    obtenerGastos();     
})