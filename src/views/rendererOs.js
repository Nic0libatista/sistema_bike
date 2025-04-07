let frmOs = document.getElementById('frmOs');
let nomeFuncionario = document.getElementById('inputNomeFuncionario');
let osStatus = document.getElementById('osStatus');
let valorTotal = document.getElementById('inputvalorTotal');
let nameMecanico = document.getElementById('inputNameMecanico');

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

    let servicos = getServicosSelecionados();

    console.log(nomeFuncionario.value, osStatus.value, servicos, valorTotal.value, nameMecanico.value);

    const OS = {
        funcionarioos: nomeFuncionario.value,
        statusos: osStatus.value,
        serviçosos: servicos,
        valoros: valorTotal.value,
        mecanicoos: nameMecanico.value
    };

    api.newOs(OS);
});
