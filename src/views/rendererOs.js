let frmOs = document.getElementById('frmOs');
let nomeClienteOs = '';
let nomeFuncionario = document.getElementById('inputNomeFuncionario');
let osStatus = document.getElementById('osStatus');
let valorTotal = document.getElementById('inputvalorTotal');
let nameMecanico = document.getElementById('inputNameMecanico');


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

frmOs.addEventListener('submit', async (event) => {
    event.preventDefault();

      // ⚠️ Se não buscar cliente, bloqueia
      if (!nomeClienteOs || nomeClienteOs.trim() === '') {
        alert('⚠️ Busque o cliente antes de gerar a OS!');
        return;
    }

    
    let servicos = getServicosSelecionados();



    console.log(nomeFuncionario.value, osStatus.value, servicos, valorTotal.value, nameMecanico.value, nomeClienteOs);

    const OS = {
        funcionarioos: nomeFuncionario.value,
        statusos: osStatus.value,
        serviçosos: servicos,
        valoros: valorTotal.value,
        mecanicoos: nameMecanico.value,
        clienteos: nomeClienteOs
    };

    api.newOs(OS);
});
