// ===========================================================
// == Busca avançada =========================================

const input = document.getElementById('inputSearchClient')
const suggestionList = document.getElementById('viewListSuggestion')
let idClient = document.getElementById('inputIdClient')
let nameClient = document.getElementById('inputNameClient')
let phoneClient = document.getElementById('inputPhoneClient')

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
               // nameClient.value = c.nomeCliente
               // phoneClient.value = c.
                input.value = c.nomeCliente
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



let frmOs = document.getElementById('frmOs');
let nomeClienteOs = '';
let nomeFuncionario = document.getElementById('inputNomeFuncionario');
let osStatus = document.getElementById('osStatus');
let valorTotal = document.getElementById('inputvalorTotal');
let nameMecanico = document.getElementById('inputNameMecanico');
let pecas = document.getElementById('inputPecas')


function searchClient() {
    let name = document.getElementById('inputSearchClient').value;

    if (!name) {
        api.validateSearch();
        return;
    }

    api.searchName(name);

    api.renderClient((event, dataClient) => {
        const dadosCliente = JSON.parse(dataClient);

        if (dadosCliente.length > 0) {
            nomeClienteOs = dadosCliente[0].nomeCliente; // <-- aqui salva o nome sem precisar criar input
            console.log('Nome do cliente buscado:', nomeClienteOs); // para testes
        } else {
            nomeClienteOs = '';
        }
    });
}



// Função para capturar os serviços selecionados
function getServicosSelecionados() {
    let servicosSelecionados = [];
    for (let i = 1; i <= 9; i++) {
        let checkbox = document.getElementById(`servico${i}`);
        if (checkbox && checkbox.checked) {
            let texto = checkbox.nextElementSibling.innerText;
            servicosSelecionados.push(texto);
        }
    }
    return servicosSelecionados.join(', ');
}

function buscarCliente() {
    searchClient();
}
 

// captura do id da OS (CRUD Delete e Update)
let idOS = document.getElementById('inputOS')
// captura do id do campo data
let dateOS = document.getElementById('inputData')





frmOs.addEventListener('submit', async (event) => {
    event.preventDefault();

      // ⚠️ Se não buscar cliente, bloqueia
      if (!nomeClienteOs) {
        alert('⚠️ Busque o cliente antes de gerar a OS!');
        return;
    }

    
    let servicos = getServicosSelecionados();



    console.log(nomeFuncionario.value, osStatus.value, servicos, valorTotal.value, nameMecanico.value, pecas.value, nomeClienteOs);

    const OS = {
        
        funcionarioos: nomeFuncionario.value,
        statusos: osStatus.value,
        serviçosos: servicos,
        valoros: valorTotal.value,
        mecanicoos: nameMecanico.value,
        clienteos: nomeClienteOs,
        pecasos: pecas.value

    };

    api.newOs(OS);
});

// == Buscar OS - CRUD Read ===================================

function findOS() {
    api.searchOS()
}

api.renderOS((event, dataOS) => {
    console.log(dataOS)
    const os = JSON.parse(dataOS)
    // preencher os campos com os dados da OS
    idOS.value = os._id
    // formatar data:
    const data = new Date(os.dataEntrada)
    const formatada = data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })
    dateOS.value = formatada
     nomeFuncionario= os.nomefuncionario
   osStatus= os.status
     servicos = os.servicos
     valorTotal= os.total
    nameMecanico = os.nomemecanico
    nomeClienteOs = os.nomecliente
   pecas = os.pecas

})

// == Fim - Buscar OS - CRUD Read =============================
// ============================================================


// ============================================================
// == Reset form ==============================================

function resetForm() {
    // Limpar os campos e resetar o formulário com as configurações pré definidas
    location.reload()
}

// Recebimento do pedido do main para resetar o form
api.resetForm((args) => {
    resetForm()
})

// == Fim - reset form ========================================
// ============================================================

