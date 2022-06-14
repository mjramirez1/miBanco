const Cursor = require('pg-cursor')

const consulta = async(client, release, pool) => {
    try{
        const consultar ={
            text: 'SELECT * FROM transacciones'
        }
        const consulta = new Cursor(consultar.text)
        const cursor = await client.query(consulta)
        cursor.read(10, (err, rows) => {
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
module.exports = consulta