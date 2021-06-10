inicializarDb(); // Inicalizamos nuestra base de deatos y las tablas

//Variables Globales
var totalG = 0;
var totalI = 0;
var saldo = 0;

var meses = 1;



//Llamamos nuestra funcion automaticamente para cargar la lista de registros
obtenerGastos();
obtenerIngresos();

///Funcion para obtener los grupos de la base de datos y mostrarlos en la tabla
async function obtenerGastos() {
        totalG = 0;
    totalI = 0;
    saldo = 0;
    // Llamamos a nuestra funcion de la base de datos que ara la consulta
    let datos = await selectGastos();
    if (datos != 'Vacio') {
        let t = ''; // Variable temporal para almacenar html
        for (let i = 0; i < datos.length; i++) {
            caluclarGastos(parseInt(datos[i].valor), datos[i].periodo);
            t += `
      <tr>
      <td>${datos[i].nombre}</td>
      <td>Q${datos[i].valor}</td>
      <td>${datos[i].periodo}</td>


  </tr>
     `;
        }
        //Insertamos el html creado por el for en nuestra tabla

        $('#cuerpoG').html(t);
        $('#totalG').html('Q' + totalG.toFixed(2));


    } else {
        // Si no se encotraron registros se puestra la alterta
        alert('No hay registros!')
    }

}

///Funcion para obtener los grupos de la base de datos y mostrarlos en la tabla
async function obtenerIngresos() {
    // Llamamos a nuestra funcion de la base de datos que ara la consulta
    let datos = await selectIngresos();
    if (datos != 'Vacio') {
        let t = ''; // Variable temporal para almacenar html
        for (let i = 0; i < datos.length; i++) {
            calcularIngresos(parseInt(datos[i].valor), datos[i].periodo);

            t += `
      <tr>
      <td>${datos[i].nombre}</td>
      <td>Q${datos[i].valor}</td>
      <td>${datos[i].periodo}</td>

  </tr>
     `;
        }
        //Insertamos el html creado por el for en nuestra tabla

        $('#cuerpoI').html(t);
        $('#totalI').html('Q' + totalI.toFixed(2));
        //Calcular Saldo
        calcularSaldo();
    } else {
        // Si no se encotraron registros se puestra la alterta
        alert('No hay registros!')
    }

}

function calcularSaldo() {
    saldo = totalI - totalG;
    $('#saldo').html('Q' + saldo.toFixed(2));

}


function caluclarGastos(gasto, periodo) {
    let suma = 0;
    if (periodo == 'Una vez') {
        suma = gasto;
    }
    if (periodo == 'diario') {
        suma = (30 * gasto) * meses;
    }
    if (periodo == 'Semanal') {
        suma = (4 * gasto) * meses;
    }
    if (periodo == 'Mensual') {
        suma = gasto * meses;
    }
    totalG = totalG + suma;

}

function calcularIngresos(ingreso, periodo) {
    let suma = 0;
    if (periodo == 'Una vez') {
        suma = ingreso;
    }
    if (periodo == 'diario') {
        suma = (30 * ingreso) * meses;
    }
    if (periodo == 'Semanal') {
        suma = (4 * ingreso) * meses;
    }
    if (periodo == 'Mensual') {
        suma = ingreso * meses;
    }
    totalI = totalI + suma;

}


//Evento para evaluar el formulario 
// Cuando se da click en l boton calcular
$('#formulario').submit(function(e) {
    meses = $('#meses').val(); //guardamos el valor del campo
    //Volvemos a llamar las funciones para mostrar gastos e ingresos y calcular saldo
    obtenerGastos();
    obtenerIngresos();

    if (meses == 1) {
        $('#eva').html(meses + ' mes');
    }
    if (meses > 1) {
        $('#eva').html(meses + ' meses');
    }
    e.preventDefault();
});