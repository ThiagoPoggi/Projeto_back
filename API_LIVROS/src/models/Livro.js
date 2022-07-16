import mongoose from 'mongoose';

//Definindo o schema de armazenamento

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        Titulo: {type: String, require: true},
        Autor: {type: String, require: true},
        Editora: {type: String, require: true},
        NumeroPagina: {type: Number}
    }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;