import express from 'express';

const app = express();
app.use(express.json());

const livros = [
    {id: 1, 'Titulo': 'Aprendendo javaScript'},
    {id: 2, 'Titulo': 'Aprendendo Node'},
    {id: 3, 'Titulo': 'Desvendando o protocolo HTTP'}
]

//Rota principal
app.get('/', (req,res) => {
    res.status(200).send("Pagina principal!");
})

//Exibição de livros
app.get('/livros', (req, res) => {
    res.status(200).send(livros);
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
