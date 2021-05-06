let db;

function inicializarDb() {
    db = window.openDatabase("GastosDB", "1.0", "Base de datos de gastos", 10000);
    populateDB();
}

function populateDB() {
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS gastos (id integer primary key autoincrement, nombre text, valor integer, subgrupo integer, periodo integer)');
    });
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS grupos (id integer primary key autoincrement, nombre text)');
    });
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS subgrupos (id integer primary key autoincrement, nombre text, grupo integer)');
    });
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ingresos (id integer primary key autoincrement, nombre text, valor integer)');
    });

}


function dropTable() {
    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS grupos)');
    });
}


function truncateTable() {
    db.transaction(tx => {
        tx.executeSql('DELETE FROM grupos)');
    });
}


function insertarGasto(gasto) {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO gastos (nombre, valor,periodo,subgrupo) VALUES (?,?,?,?)', [gasto.nombre, gasto.valor,gasto.periodo,gasto.subgrupo], correcto('Gasto Insertado Correctamente'), (transaction,error)=>console.log(error.message));

    });
}
function insertarGrupo(grupos) {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO grupos (nombre) VALUES (?)', [grupos.nombre], correcto('Grupo Insertado Correctamente'),(transaction,error)=>console.log(error.message));

    });
}
function insertarSubgrupos(subgrupos) {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO subgrupos (nombre, grupo) VALUES (?,?)', [subgrupos.nombre, subgrupos.grupo], correcto('Subgrupo Insertado Correctamente'), (transaction,error)=>console.log(error.message));

    });
}

function selectGrupos() {
    return new Promise(resolve => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM grupos  ORDER BY id', [], (tx, result) => {
                let rows = result.rows;
                if (rows.length >= 1) {
                    resolve(rows);
                } else {
                    resolve('Vacio');
                }
            });    
        });
      });
 
}

function selectSubGrupos() {
    return new Promise(resolve => {
        db.transaction(tx => {
            tx.executeSql('SELECT sb.id, sb.nombre, g.nombre as grupo FROM subgrupos sb INNER JOIN grupos g ON g.id = sb.grupo ORDER BY sb.id', [], (tx, result) => {
                let rows = result.rows;
                if (rows.length >= 1) {
                    resolve(rows);
                } else {
                    resolve('Vacio');
                }
            });
    
        });
      });
}

function selectGastos() {
    return new Promise(resolve => {
        db.transaction(tx => {
            tx.executeSql('SELECT ga.id,ga.nombre, ga.valor,ga.periodo, sb.nombre as subgrupo, g.nombre as grupo FROM gastos ga INNER JOIN subgrupos sb ON sb.id= ga.subgrupo INNER JOIN grupos g ON g.id = sb.grupo  ORDER BY ga.id', [], (tx, result) => {
                let rows = result.rows;
                if (rows.length >= 1) {
                    resolve(rows);
                } else {
                    resolve('Vacio');
                }
            });
    
        });
      });
}

function actualizar(gasto) {
    this.db.transaction(tx => {
        tx.executeSql('UPDATE grupos SET nombre=?, valor=? WHERE id=?', [gasto.nombre, gasto.valor, gasto.id], actualizadoCorecto(), (transaction,error)=>console.log(error.message));

    });
}

function correcto(m) {
    console.log(m);
}

function actualizadoCorecto() {
    console.log('actualizado');
}

