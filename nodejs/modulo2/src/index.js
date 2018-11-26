//o index importa a logica do server e inicia o app
const server = require('./server')

//inicia na var de ambient PORT ou na 3000 se port nao setada 
server.listen(process.env.PORT || 3000)