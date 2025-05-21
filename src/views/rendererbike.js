

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


let arrayClients = []

input.addEventListener('input', () => {
    const search = input.value.toLowerCase() //captura o que foi digitado e converte tudo para minúsculo
    suggestionList.innerHTML = ""

    // Buscar os nomes dos clientes no banco
    api.searchClients()

    // Listar os clientes 
    api.listClients((event, clients) => {
        const listaClientes = JSON.parse(clients)
        arrayClients = listaClientes

        //Filtra os clientes cujo nome (c.nomeCliente) contém o texto digitado(search)
        const results = arrayClients.filter(c =>
            c.nomeCliente && c.nomeCliente.toLowerCase().includes(search)
        ).slice(0, 10) // máximo 10 nomes

        suggestionList.innerHTML = "" // limpa novamente após possível atraso

        // Para cada resultado, cria um item da lista
        results.forEach(c => {
            const item = document.createElement('li')
            item.classList.add('list-group-item', 'list-group-item-action')
            item.textContent = c.nomeCliente

            // Adiciona evento de clique no ítem da lista para preencher os campos do form
            item.addEventListener('click', () => {
               // idClient.value = c._id
                nomeCliente.value = c.nomeCliente
                cpfCliente.value = c.cpfCliente
                input.value = ""
                suggestionList.innerHTML = ""
            })

            // adiciona os nomes(itens <li>) a lista <ul>
            suggestionList.appendChild(item)
        })
    })
})

// setar o foco no campo de busca (validação de busca do cliente obrigatória)
api.setSearch((args) => {
    input.focus()
})

// Ocultar lista ao clicar fora
document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !suggestionList.contains(e.target)) {
        suggestionList.innerHTML = ""
    }
})

// == Fim - busca avançada =====================================
// =============================================================


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
            cpfClient.value=c.cpfCliente

             // bloqueio do botão adicionar
          btnCreate.disabled = false
          // desbloqueio dos botões
          btnUpdate.disabled = false
          btnDelete.disabled = false

        });
    })
}

function resetForm() {
    //limpar os campos e resetar o formulario com as configuraçoes pré definidas
    
    location.reload()
}

api.resetForm((args) => {
    resetForm()
})
