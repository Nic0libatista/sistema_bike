/**
 * modelo de dados para construçãp das coleçoes(tabelas)
 * Clientes 
 */

//importação dos recursos do framework mongoose
const {model,Schema} =require('mongoose')

// criação da estrutura da coleção clientes
const bikeSchema = new Schema({
    marcaCliente: {
        type: String
    },
    modeloCliente: {
        type: String
    },
    chassiCliente: {
        type:String
    },
    corCliente: {
        type: String
    },

    tipoCliente: {
        type:String
    },

    obsCliente: {
        type:String
    },

    /* fotoCliente: {
        type:Image
    }

    dataCadastro: {
        type:Date,
        default: Date.now
    } */
       
}, {versionKey:false}) // n versionar os dados armazenados

//exportar para o main o modelo de dados
// !!! clientes será o nome da coleção 

module.exports = model('clientBike', bikeSchema)