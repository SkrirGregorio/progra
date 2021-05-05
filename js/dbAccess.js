let db;

function inicializarDb() {
    db = window.openDatabase("GastosDB", "1.0", "Base de datos de gastos", 10000);
    populateDB();
}

function populateDB() {
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS gastos (id integer primary key autoincrement, nombre text, valor integer, subgrupo integer)');
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
        tx.executeSql('INSERT INTO gasto (nombre, valor) VALUES (?,?)', [gasto.nombre, gasto.valor], correcto('Gasto Insertado Correctamente'), (transaction,error)=>console.log(error.message));

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
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM grupos  ORDER BY id, nombre', [], (tx, result) => {
            let rows = result.rows;
            if (rows.length >= 1) {
                console.log(rows);
                return rows;
            } else {
                return 'Vacio';
            }
        });

    });
}

function selectSubGrupos() {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM subgrupos  ORDER BY id', [], (tx, result) => {
            let rows = result.rows;
            if (rows.length >= 1) {
                console.log(rows);
                return rows;
            } else {
                return 'Vacio';
            }
        });

    });
}

function selectGastos() {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM gato  ORDER BY id', [], (tx, result) => {
            let rows = result.rows;
            if (rows.length >= 1) {
                console.log(rows);
                return rows;
            } else {
                return 'Vacio';
            }
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

