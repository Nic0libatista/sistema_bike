// ===========================================================
// == Busca avançada =========================================

const input = document.getElementById('inputSearchClient')
const suggestionList = document.getElementById('viewListSuggestion')
let idClient = document.getElementById('inputIdClient')
let nameClient = document.getElementById('inputNameClient')

const modeloCliente = document.getElementById('modeloCliente');
// let phoneClient = document.getElementById('inputPhoneClient')

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
                idClient.value = c._id
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
let relatorioCli = document.getElementById('inputRelatorioCliente')
let relatorioTec = document.getElementById('inputRelatorioTecnico')
let modeloCli = document.getElementById('inputModelClient')

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


     // validação do campo obrigatório 'idClient' (validação html não funciona via html para campos desativados)
     if (idClient.value === "") {
        api.validateClient()
    } else {
        // Teste importante (recebimento dos dados do formuláro - passo 1 do fluxo)
       // console.log(idOS.value, idClient.value, statusOS.value, computer.value, serial.value, problem.value, obs.value, specialist.value, diagnosis.value, parts.value, total.value)
        if (idOS.value === "") {
            //Gerar OS
            //Criar um objeto para armazenar os dados da OS antes de enviar ao main
            const os = {
                idClient_OS: idClient.value,
                funcionarioos: nomeFuncionario.value,
                statusos: osStatus.value,
                servicosos: servicos,
                valoros: valorTotal.value,
                mecanicoos: nameMecanico.value,
                clienteos: nomeClienteOs,
                pecasos: pecas.value,
                relatorioclios: relatorioCli.value,
                relatoriotecos: relatorioTec.value,
                modeloos: modeloCli.value
            }
            // Enviar ao main o objeto os - (Passo 2: fluxo)
            // uso do preload.js
            api.newOs(os);
        } else {
            //Editar OS
            //Gerar OS
            //Criar um objeto para armazenar os dados da OS antes de enviar ao main
            const os = {
                id_OS: idOS.value,
                idClient_OS: idClient.value,
                funcionarioos_OS: nomeFuncionario.value,
                statusos_OS: osStatus.value,
                servicosos_OS: servicos,
                valoros_OS: valorTotal.value,
                mecanicoos_OS: nameMecanico.value,
                clienteos_OS: nomeClienteOs,
                pecasos_OS: pecas.value,
                relatorioclios_OS: relatorioCli.value,
                relatoriotecos_OS: relatorioTec.value,
                modeloos_OS: modeloCli.value
           
            }
            // Enviar ao main o objeto os - (Passo 2: fluxo)
            // uso do preload.js
            api.updateOS(os)
        }
    }
})


 
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
    idClient.value = os.idCliente
    // disparar ação de busca do cliente pelo id
    idClient.dispatchEvent(new Event('change'))    
    nomeFuncionario.value = os.funcionarioos
osStatus.value = os.statusos
valorTotal.value = os.valoros
nameMecanico.value = os.mecanicoos
nomeClienteOs = os.clienteos;
input.value = os.clienteos;
pecas.value = os.pecasos
relatorioCli.value = os.relatorioclios
relatorioTec.value = os.relatoriotecos
servicos = os.servicosos,
modeloCli.value =os.modeloos

  // Ativar checkboxes com base nos serviços retornados
// Marcar os checkboxes dos serviços salvos na OS
const servicosArray = os.servicosos.split(',').map(s => s.trim().toLowerCase());

document.querySelectorAll('input[type="checkbox"][id^="servico"]').forEach(checkbox => {
    const valorCheckbox = checkbox.value.trim().toLowerCase();
    checkbox.checked = servicosArray.includes(valorCheckbox);
});

      // desativar o botão adicionar
      btnCreate.disabled = true
      // ativar os botões editar e excluir
      btnUpdate.disabled = false
      btnDelete.disabled = false   

      
})

// == Fim - Buscar OS - CRUD Read =============================
// ============================================================


// ============================================================
// == CRUD Delete =============================================

function removeOS() {
    console.log(idOS.value) // Passo 1 (receber do form o id da OS)
    api.deleteOS(idOS.value) // Passo 2 (enviar o id da OS ao main)
}

// == Fim - CRUD Delete =======================================
// ============================================================


// ============================================================
// == Imprimir OS ============================================= 

function generateOS() {
    api.printOS()
}

// == Fm - Imprimir OS ======================================== 
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

