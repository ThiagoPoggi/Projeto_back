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
    res.status(200).send({message: "Pagina principal!"});
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
    //salvando o id em uma variável 
    const id = req.params.id;
    //Utilizando o findbyid para retornar livro por id
    livros.findById(id, (err, livros) =>{
        if(err){
            res.status(400).json(err.message)
        }else{
            res.status(200).send(livros)
        }
    })
})

//Cadastro de um novo livro
app.post('/livros', (req, res) => {
    //Criando variavel que recebe o conteudo passando em body
    let livro = new livros(req.body);
    //Persistindo ele no banco
    livro.save((err) => {
        if(err){
            res.status(500).send("Erro no cadastro do livro!")
        }else{
            res.status(201).send(livro.toJSON())
        }
    })
})

//Atualização de livro por id
app.put('/livros/:id', (req, res) => {
    //Salvando o id em uma variavel
    const id = req.params.id;
    //Utilizando o metodo que localiza o id e atualiza
    livros.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
        if(err){
            res.status(500).send({message: err.message})
        }else{
            res.status(200).send("Livro atualizado com sucesso!")
        }
    })
});

//Excluindo um livro por id
app.delete('/livros/:id', (req, res) => {
    const id = req.params.id;
    //Utilizando o metodo para localizar por id e excluir
    livros.findByIdAndDelete(id, (err) =>{
        if(err){
            res.status(500).send({message: err.message})
        }else{
            res.status(200).send("Livro Removido com sucesso!!")
        }
    })
});


function buscarlivro(id){
    return livros.findIndex(livro => livro.id == id);
}
export default app;
