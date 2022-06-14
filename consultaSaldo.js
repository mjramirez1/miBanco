const Cursor = require('pg-cursor')
const args = process.argv.slice(2)
const id = args[1]

const consultarSaldo = async(client, release, pool) => {
    try{
        const consultar ={
            text: 'SELECT saldo FROM cuentas WHERE id = $1',
            value: [id]
        }
        const consulta = new Cursor(consultar.text, consultar.values)
        const cursor = await client.query(consulta)
        cursor.read(1, (err, rows) => {
            console.log(rows)
            cursor.close()
            release()
            pool.end()
        })
    } catch (error){
        console.log(`Error código: ${error.code}`)
        console.log(`Detalle del error:${error.detail}`)
        console.log(`Tabla originaria del error: ${error.table}`)
        console.log(`Restricción violada en el campo: ${error.constraint}`)
        release()
        pool.end()
    }
}
module.exports = consultarSaldo