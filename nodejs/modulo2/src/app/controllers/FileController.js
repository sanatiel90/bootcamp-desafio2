const path = require('path')

//controller para fazer a busca de arquivos dentro da pasta de uploads 
class FileController {
    show(req, res){
        //recupera o nome do arquivo q foi passada no params
        const { file } = req.params
        //recupera o caminho do arquivo
        const pathFile = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            file
        )
    //retorna o arquivo na resposta
    res.sendFile(pathFile)

    }
}

module.exports = new FileController()