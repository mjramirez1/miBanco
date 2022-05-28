const args = process.argv.slice(2)

const descripcion = args[1]
const fecha = args[2]
const monto = args[3]
const cuenta = args[4]

async function nuevaTransaccion(client, release, pool) {
    const transanccion = {
        rowMode: 'array',
        name: 'nueva transaccion',
        text: 'INSERT INTO transacciones (descripcion, fecha, monto, cuenta) VALUES ($1, $2, $3, $4)RETURNING *;',
        values: [descripcion, fecha, monto, cuenta]
    }


    await client.query(transanccion, (errorConsulta, res) => {
        if (errorConsulta) {
            console.error('Error en su consulta, vuelva a ingresar datos', errorConsulta.code)
        } else {
            console.log('Estudiante agregado con éxito', res.rows[0])
            release()
            pool.end()
        }
    })
}



/*

pool.connect(async (_errorConexion, client, release) => {
    try {
        await client.query("BEGIN");
        const nueva = 'INSERT INTO transacciones (descripcion, fecha, monto, cuenta) VALUES ($1, $2, $3, $4)RETURNING *;'
        await client.query(nueva, [descripcion, fecha, monto, cuenta])

    } catch (error) {
        await client.query("ROLLBACK");
        console.log(`Error código: ${error.code}`)
        console.log("Detalle del error: " + error.detail)
        console.log("Tabla originaria del error: " + error.table)
        console.log("Restricción violada en el campo: " + error.constraint)
    }
    release();
    pool.end();
}
)
*/
module.exports = nuevaTransaccion