import express from 'express';
import db from './config/dbConnect.js';
import livros from './models/Livro.js';

db.on('error', console.log.bind(console, 'error, no connection'));
db.once('open', () => {
    console.log('Database is connected');
});

const app = express();
app.use(express.json());

//Rota principal
app.get('/', (req,res) => {
    res.status(200).send("Pagina principal!");
})

//Exibição de livros
app.get('/livros', (req, res) => {
    //Utilizando o metodo . find() para retornar os dados
    livros.find((err, livros) => {
        res.status(200).json(livros);
    })
})

//Consulta de livros por id
app.get('/livros/:id', (req, res) => {
    let index = buscarlivro(req.params.id);
    res.json(livros[index]);
})

//Cadastro de um novo livro
app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso!');
})

//Atualização de livro por id
app.put('/livros/:id', (req, res) => {
    let index = buscarlivro(req.params.id);
    livros[index].Titulo = req.body.Titulo;
    res.status(200).send('Atualização realizada com sucesso!');
});

//Excluindo um livro por id
app.delete('/livros/:id', (req, res) => {
    let {id} =  req.params;
    let index = buscarlivro(id);
    livros.splice(index, 1);
    res.send(`Livro ${id} foi excluido com sucesso!`)
});


function buscarlivro(id){
    return livros.findIndex(livro => livro.id == id);
}
export default app;
