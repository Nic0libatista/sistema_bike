

//capturar o foco na busca pelo nome do cliente
// a constante foco obtem o elemento html (input) identificada como searchClient
const foco = document.getElementById('searchClient')



// Capturar os dados dos inputs
let frmClientbike = document.getElementById('frmClientbike');
let nameClient = document.getElementById('inputNameClient');
let cpfClient = document.getElementById('inputCPFClient');
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
    console.log( nameClient.value,cpfClient.value, marcaCliente.value, modeloCliente.value,chassiCliente.value ,  corCliente.value, tipoCliente.value, obsCliente.value);



// Criar objeto para armazenar os dados do cliente
const bike = {
    nameCli: nameClient.value,
    cpfCli: cpfClient.value,
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

//////////////// setar o cliente não cadastrado (recortar do campo de busca e colar no camppo nome)
 
api.setClient((args) => {
    // criar uma variavel p armazenar o valor digitado no campo de busca (nome ou cpf)
    let campoBusca = document.getElementById('searchClient').value
    // foco no campo de nome do cliente
    nameClient.focus()
    // remover o valor digitado no campo de busca
    foco.value =""
    // preencher o campo de nome do cliente com o nome da busca
    nameClient.value = campoBusca
})