const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getVendedor = (request, response, next) => {
    pool.query('SELECT * FROM vendedores', (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

const addVendedor = (request, response, next) => {
    const { nome } = request.body

    pool.query(
        'INSERT INTO vendedores (nome) VALUES ($1)',
        [nome],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Vendedor criada.' })
        },
    )
}

const updateVendedor = (request, response, next) => {
    const { codigo, nome } = request.body
    pool.query('UPDATE vendedores set nome=$1 where codigo=$2',
        [nome, codigo], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Vendedor atualizada.' })
        })
}

const deleteVendedor = (request, response, next) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM pessoas where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(201).json({ status: 'success', message: 'Vendedor apagada.' })
    })
}

const getVendedorPorID = (request, response, next) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM pessoas where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/vendedores')
    // GET endpoint
    .get(getVendedor)
    // POST endpoint
    .post(addVendedor)
    // PUT
    .put(updateVendedor)  
    

app.route('/vendedores/:id')
    .get(getVendedorPorID) 
    .delete(deleteVendedor) 


// Start server
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando nas porta 3003`)
})