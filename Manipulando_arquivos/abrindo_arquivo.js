var fs = require ('fs');
fs.readFile('./Arquivos/texto.md', 'utf-8', function (erro,texto){
    if (erro) throw erro;
    console.log(texto);
})

