import { Router } from '../common/router'
import * as restify from 'restify'
import { User } from './users.model'

class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {

        application.get('/users', (req, resp, next) => {
            User.find().then(users => {
                resp.json(users)
                return next()
            })
        })

        application.get('users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user)
                    return next();
                }

                resp.send(404)
                return next();
            })
        })

        //verbo post é utilizado para incluir um novo registro
        application.post('users/', (req, resp, next) => {
            let user = new User(req.body)
            user.save().then(user => {
                user.password = undefined
                resp.json(user)
                return next()
            })
        })

        //verbo put é utilizado para atualizar TODOS os campos de um registro
        application.put('users/:id', (req, resp, next) => {
            const options = { overwrite: true }

            User.update({ _id: req.params.id }, req.body, options).exec()
                .then(result => {
                    if (result.n) {
                        return User.findById(req.params.id)
                    } else {
                        resp.send(404)
                    }
                }).then(user => {
                    resp.json(user)
                    return next()
                })
        })

        //verbo patch é utilizando para atualizar apenas os campos informados do registro
        application.patch('users/:id', (req, resp, next) => {

            const options = { new: true }

            User.findByIdAndUpdate(req.params.id, req.body, options).then(user => {
                if (user) {
                    resp.json(user)
                    return next()
                }
                resp.send(404)
                return next()
            })

        })

        //verbo delete é utilizado para remover o registro
        application.del('users/:id', (req, resp, next) => {

            User.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
                if (cmdResult.result.n) {
                    resp.send(204)
                } else {
                    resp.send(404)
                }
                return next()
            })

        })

    }
}

export const usersRouter = new UsersRouter()