const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getMercadoria = (request, response) => {
    pool.query('SELECT * FROM mercadorias', (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

const addMercadoria = (request, response) => {
    const { nome, preco } = request.body
    console.log("Mercadoria",nome)
    console.log("Preco",preco)
    pool.query(
        'INSERT INTO mercadorias (nome, preco) VALUES ($1, $2)',
        [nome, preco],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Mercadoria criado.' })
        },
    )
}

const updateMercadoria = (request, response) => {
    const { codigo, nome, preco } = request.body
    console.log("codigo", "nome", "preço", codigo, nome, preco)
    pool.query('UPDATE mercadorias set nome=$1, preco=$2 where codigo=$3',
        [nome, preco, codigo], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Mercadoria atualizado.' })
        })
}

const deleteMercadoria = (request, response) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM mercadorias where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(201).json({ status: 'success', message: 'Mercadoria apagado.' })
    })
}

const getMercadoriaPorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM mercadorias where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/mercadorias')
    // GET endpoint
    .get(getMercadoria)
    // POST endpoint
    .post(addMercadoria)
    // PUT
    .put(updateMercadoria)  

app.route('/mercadorias/:id')
    .get(getMercadoriaPorID) 
    .delete(deleteMercadoria) 


// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando na porta 3002`)
})