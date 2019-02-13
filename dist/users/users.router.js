"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find()
                .then(this.render(resp, next))
                .catch(next);
        });
        application.get('users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        });
        //verbo post é utilizado para incluir um novo registro
        application.post('users/', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            user.save()
                .then(this.render(resp, next))
                .catch(next);
        });
        //verbo put é utilizado para atualizar TODOS os campos de um registro
        application.put('users/:id', (req, resp, next) => {
            const options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(result => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    resp.send(404);
                }
            }).then(this.render(resp, next))
                .catch(next);
        });
        //verbo patch é utilizando para atualizar apenas os campos informados do registro
        application.patch('users/:id', (req, resp, next) => {
            const options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        });
        //verbo delete é utilizado para remover o registro
        application.del('users/:id', (req, resp, next) => {
            users_model_1.User.remove({ _id: req.params.id })
                .exec()
                .then((cmdResult) => {
                (cmdResult.result.n) ? resp.send(204) : resp.send(404);
                return next();
            }).catch(next);
        });
    }
}
exports.usersRouter = new UsersRouter();
