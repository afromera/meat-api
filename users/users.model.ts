
const users = [
    {name: 'Alex Fernandes Romera', email: 'af_romera@hotmail.com'}
    ,{name: 'Grazielle Allonso Romera', email: 'grazi@gmail.com'}
    ,{name: 'Caroline Allonso', email: 'carol@gmail.com'}
]

export class User {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }
}