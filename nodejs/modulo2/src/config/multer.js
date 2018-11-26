//lib para trabalhar com upload
const multer = require('multer')
const path = require('path')
const crypto = require('crypto') //lib do proprio node q cria um numero random

module.exports = {
    //usando multer para salvar file em disco
    storage: multer.diskStorage({
        //local onde vai ser salvo
        destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        //nome do arquivo, vai ser add um numero random em bytes e concatenado com o nome original do arq, para q nao hajam arqs iguais
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, raw) => {
                if (err) return callback(err)
                //se nao houver erro, add um num hexadecimal concatenado com a extensao do original file enviado
                callback(null, raw.toString('hex') + path.extname(file.originalname))
            })
        }

    })
    
}