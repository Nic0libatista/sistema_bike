// Buscar CEP
function buscarCEP() {
    //console.log("teste do evento blur")
    //armazenar o cep digitado na variável
    let cep = document.getElementById('inputCEPClient').value
    //console.log(cep) //teste de recebimento do CEP
    //"consumir" a API do ViaCEP
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
    //acessando o web service par abter os dados
    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            //extração dos dados
            document.getElementById('inputAddressClient').value = dados.logradouro
            document.getElementById('inputNeighboorhoodClient').value = dados.bairro
            document.getElementById('inputCityClient').value=dados.localidade
            document.getElementById('inputUFCliente').value =dados.uf
        })
        .catch(error => console.log(error))
}


 // vetor global q será usado na manipulação dos dados
 let arrayClient=[]

//capturar o foco na busca pelo nome do cliente
// a constante foco obtem o elemento html (input) identificada como searchClient
const foco = document.getElementById('searchClient')


// iniciar a janela de clientes alterando as propriedades de alguns elementos
document.addEventListener('DOMContentLoaded', ()=> {
    //desabilitar os botões 
  btnUpdate.disabled = true
  btnDelete.disabled = true
  // foco na busca do cliente
  foco.focus()
})


// Capturar os dados dos inputs
let frmClient = document.getElementById('frmClient');
let nameClient = document.getElementById('inputNameClient');
let cpfClient = document.getElementById('inputCPFClient');
let emailClient = document.getElementById('inputEmailClient');
let phoneClient = document.getElementById('inputPhoneClient');
let cepClient = document.getElementById('inputCEPClient');
let addressClient = document.getElementById('inputAddressClient');
let numberClient = document.getElementById('inputNumberClient');
let complementClient = document.getElementById('inputComplementClient');
let neighborhoodClient = document.getElementById('inputNeighboorhoodClient');
let cityClient = document.getElementById('inputCityClient');
let ufClient = document.getElementById('inputUFCliente');




// CRUD CREATE/UPDATE
frmClient.addEventListener('submit', async (event) => {
    // Evitar comportamento padrão do submit
    event.preventDefault();

    // Teste para verificar recebimento dos dados
    console.log(nameClient.value, cpfClient.value, emailClient.value, phoneClient.value, cepClient.value, addressClient.value, numberClient.value, complementClient.value, neighborhoodClient.value, cityClient.value, ufClient.value);



    // Criar objeto para armazenar os dados do cliente
    const client = {
        nameCli: nameClient.value,
        cpfCli: cpfClient.value,
        emailCli: emailClient.value,
        foneCli: phoneClient.value,
        cepCli: cepClient.value,
        addressCli: addressClient.value,
        numberCli: numberClient.value,
        complementCli: complementClient.value,
        neighborhoodCli: neighborhoodClient.value,
        cityCli: cityClient.value,
        ufCli: ufClient.value
    };

    // Enviar para a API
    api.newClient(client);
});




//////////////////////////////////////////// reset form ///////////////////////////////////////
function resetForm() {
    //limpar os campos e resetar o formulario com as configuraçoes pré definidas
    
    location.reload()
}

api.resetForm((args) => {
    resetForm()
})

/////////////////////////////////////////////////////////////////////////////////

function buscarCliente(){
    let name=document.getElementById('searchClient').value
    console.log(name)
    api.searchName(name)
    //recebimento dos dados do cliente
    api.renderClient((event,dataClient) => {
        // console.log(dataClient) // teste
        const dadosCliente=JSON.parse(dataClient)
        arrayClient =dadosCliente

        arrayClient.forEach((c) =>{
            nameClient.value=c.nomeCliente,
            cpfClient.value=c.cpfCliente,
            emailClient.value=c.emailCliente,
            phoneClient.value=c.foneCliente,
            cepClient.value=c.cepCliente,
            addressClient.value=c.logradouroCliente,
            numberClient.value=c.numeroCliente,
            complementClient.value=c.complementoCliente,
            neighborhoodClient.value=c.bairroCliente,
            cityClient.value=c.cidadeCliente,
            ufClient.value=c.ufCliente

             // bloqueio do botão adicionar
          btnCreate.disabled = true
          // desbloqueio dos botões
          btnUpdate.disabled = false
          btnDelete.disabled = false

        });
    })
}

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
// ////////////////////////// fim do crud read ////////////////// 