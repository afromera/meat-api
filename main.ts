
import * as restify from 'restify'

const server = restify.createServer({
    name: "meat-api",
    version: "1.0.0"
})

//para restify conseguir obter o resultado dos parametros passado na querystring
server.use(restify.plugins.queryParser())

//registrar a rota info
server.get('/info', [
    (req, resp, next) => {

        //barrando o IE7
        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {

            ////pode utilizar assim
            //resp.status(400)
            //resp.json({ message: "Favor Atualizar ou utilizar outro Navegador" })
            ////vai barrar a proxima chamada
            //return next(false)

            //ou pode criar objeto de erro
            let error: any = new Error()
            error.statusCode = 400
            error.message = "Favor Atualizar ou utilizar outro Navegador"
            return next(error)
        }

        //restify: sempre utilizar quando finalizar ou chamar a proxima requisicao
        return next()
    },
    (req, resp, next) => {
        //resp.contentType = "application/json";
        //resp.status(400)
        //resp.setHeader('Content-Type', 'application/json')    
        //resp.send({message:"Hello"})

        resp.json({
            browser: req.userAgent(),
            method: req.method,
            url: req.href(),
            path: req.path(),
            query: req.query
        })

        // aqui estou somente finalizando
        return next()
    }
])

//configurar a porta
server.listen(3000, () => {
    console.log('API is running on http://localhost:3000')
})

