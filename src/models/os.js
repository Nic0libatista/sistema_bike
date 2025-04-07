/**
 * Modelo de dados para construção das coleções("tabelas")
 * Clientes
 */

//importação dos recursos do framework mongoose
const {model , Schema} = require('mongoose')
const { type } = require('os')

// criação da estrutura da coleção clientes
const OSchema = new Schema({
    funcionarioos: {type:String},
    statusos: {type:String},
    serviçosos: {type:String},
    valoros: {type:String},
    mecanicoos: {type: String}
    


},//não versiona os dados armazenado
{versionKey:false})

// exporta para o main o modelo de dados
//Obs: Clientes será o nome da coleção
module.exports = model('OS',OSchema)