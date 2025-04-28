/**
 * modelo de dados para construçãp das coleçoes(tabelas)
 * Clientes 
 */

//importação dos recursos do framework mongoose
const {model,Schema} =require('mongoose')
const bike = require('./bike'); 


// criação da estrutura da coleção clientes
const bikeSchema = new Schema({
    nomeCliente: {
        type: String
    },
    cpfCliente: {
        type: String,
    // unique: true,
        index: true
    },
    marcaCli: {
        type: String
    },
    modeloCli: {
        type: String
    },
    chassiCli: {
        type:String
    },
    corCli: {
        type: String
    },

    tipoCli:  {
        type:String
    },

    obsCli: {
        type:String
    },

     fotoCli: {
        type:String
    },

    dataCadastro: {
        type:Date,
        default: Date.now
    } 
       
}, {versionKey:false}) // n versionar os dados armazenados

//exportar para o main o modelo de dados
// !!! clientes será o nome da coleção 

module.exports = model('bike', bikeSchema)