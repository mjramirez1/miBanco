const { Pool } = require('pg')
const args = process.argv.slice(2)
const nuevaTransaccion = require('./nuevaTransaccion')
const consulta = require('./consulta')
const consultarSaldo = require('./consultarSaldo')

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'mi_banco_db',
    password: '1234',
    port: 5432,
    max: 20,
    min: 0,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
}
const pool = new Pool(config)
const programa = args[0]

pool.connect(async (errorConexion, client, release) => {
    if (errorConexion) {
        console.error(errorConexion)
    } else {
        if (programa === 'nuevaTransaccion') {
            nuevaTransaccion(client, release, pool)
            
        } if (programa === 'consulta') {
            consulta(client, release, pool)

        } if (programa === 'consultarSaldo') {
            consultarSaldo(client, release, pool)

        }
    }
})

