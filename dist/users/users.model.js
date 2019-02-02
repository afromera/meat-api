"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { id: '1', name: 'Alex Fernandes Romera', email: 'af_romera@hotmail.com' },
    { id: '2', name: 'Grazielle Allonso Romera', email: 'grazi@gmail.com' },
    { id: '3', name: 'Caroline Allonso', email: 'carol@gmail.com' }
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
    static findById(id) {
        let filtered = users.filter(user => user.id === id);
        let user = undefined;
        if (filtered.length > 0) {
            user = filtered[0];
        }
        return Promise.resolve(user);
    }
}
exports.User = User;
