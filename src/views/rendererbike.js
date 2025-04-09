

//capturar o foco na busca pelo nome do cliente
// a constante foco obtem o elemento html (input) identificada como searchClient
const foco = document.getElementById('searchClient')



// Capturar os dados dos inputs
let frmClientbike = document.getElementById('frmClientbike');
//let nameClient = document.getElementById('inputNameClient');
//let cpfClient = document.getElementById('inputCPFClient');
let marcaCliente = document.getElementById('inputMarcaClient');
let modeloCliente = document.getElementById('inputModelClient');
let chassiCliente = document.getElementById('inputChassiClient');
let corCliente = document.getElementById('inputCorCliente');
let tipoCliente = document.getElementById('inputTypeCliente');
let obsCliente = document.getElementById('inputOBSClient');
let fotoCliente = document.getElementById('inputPhotoClient');

    

// CRUD CREATE/UPDATE
frmClientbike.addEventListener('submit', async (event) => {
    // Evitar comportamento padrão do submit
    event.preventDefault();

    
// Teste para verificar recebimento dos dados
    console.log(marcaCliente.value, modeloCliente.value,chassiCliente.value ,  corCliente.value, tipoCliente.value, obsCliente.value);



// Criar objeto para armazenar os dados do cliente
const bike = {
    marcaCli: marcaCliente.value,
    modeloCli: modeloCliente.value,
    chassiCli: chassiCliente.value,
    corCli: corCliente.value,
    tipoCli: tipoCliente.value,
    obsCli: obsCliente.value,
//fotoCli: fotoCliente.value
};

// Enviar para a API
api.newbike(bike);
});