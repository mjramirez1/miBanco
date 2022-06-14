const args = process.argv.slice(2)

const descripcion = args[1]
const fecha = args[2]
const monto = args[3]
const cuenta = args[4]

async function nuevaTransaccion(client, release, pool) {
    try {
        const transaccion = {
           // rowMode: 'array',
            name: 'nuevaTransaccion',
            text: 'INSERT INTO transacciones (descripcion, fecha, monto, cuenta) VALUES ($1, $2, $3, $4)RETURNING *;',
            values: [descripcion, fecha, monto, cuenta]
        }

        const actualizacion = {
           // rowMode: 'array',
            name: 'actualizacion',
            text: 'UPDATE transacciones SET monto = monto $3 WHERE cuenta = cuenta $4 RETURNING *;',
            values: [monto, cuenta]
        }

        await client.query('BEGIN')
        await client.query(transaccion, (error, res) => {
            if (error){
                console.log(error.code)
            } else {
                console.log(res.rows)
            }
        })
        await client.query(actualizacion, (error, res) => {
            if (error){
                console.log(error.code)
            } else {
                console.log(res.rows)
            }
        })
        await client.query('COMMIT')

    } catch (error) {
        await client.query('ROLLBACK');
        console.log(`Error código: ${error.code}`)
        console.log(`Detalle del error:${error.detail}`)
        console.log(`Tabla originaria del error: ${error.table}`)
        console.log(`Restricción violada en el campo: ${error.constraint}`)
    }

    release()
    pool.end()
}

module.exports = nuevaTransaccion