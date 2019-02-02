"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { name: 'Alex Fernandes Romera', email: 'af_romera@hotmail.com' },
    { name: 'Grazielle Allonso Romera', email: 'grazi@gmail.com' },
    { name: 'Caroline Allonso', email: 'carol@gmail.com' }
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
}
exports.User = User;
