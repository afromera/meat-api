

let replicados = (array, qtde, retorno = []) => {
    for(let i = 0; i < qtde; i++) retorno = retorno.concat(array)
    return retorno
}

console.log(replicados([1,2],3))

