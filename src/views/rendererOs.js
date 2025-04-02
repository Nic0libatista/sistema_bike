

//capturar o foco na busca pelo nome do cliente
// a constante foco obtem o elemento html (input) identificada como searchClient
const foco = document.getElementById('searchClient')



// Capturar os dados dos inputs
let frmClient = document.getElementById('frmClient');
let nameClient = document.getElementById('inputNameClient');
let cpfClient = document.getElementById('inputCPFClient');
let marcaCliente = document.getElementById('inputMarcaClient');
let modeloCliente = document.getElementById('inputModelClient');
let chassiCliente = document.getElementById('inputChassiClient');
let corCliente = document.getElementById('inputCorCliente');
let tipoCliente = document.getElementById('inputTypeCliente');
let obsCliente = document.getElementById('inputOBSClient');
let fotoCliente = document.getElementById('inputPhotoClient');

// Teste para verificar recebimento dos dados
    console.log(marcaCliente.value, modeloCliente.value);


    

// CRUD CREATE/UPDATE
frmClient.addEventListener('submit', async (event) => {
    // Evitar comportamento padrão do submit
    event.preventDefault();

// Criar objeto para armazenar os dados do cliente
const clientBike = {
    marcaCli: marcaCliente.value,
    modeloCli: modeloCliente.value,
    chassiCli: chassiCliente.value,
    corCli: corCliente.value,
    tipoCli: tipoCliente.value,
    obsCli: obsCliente.value,
    fotoCli: fotoCliente.value
};

// Enviar para a API
api.newClientBike(bike);
});