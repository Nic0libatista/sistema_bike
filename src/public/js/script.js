/*data atualizada no rodapé 
    @Autor Nicoli Santos
*/
function obterData(){
    const dataatual = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

return dataatual.toLocaleDateString('pt-br', options)
}

// executar a função ao iniciar do app 
document.getElementById('dataatual').innerHTML = obterData()


/*
function obterData() {
    const dataa = new Date();
    const ano = dataa.getFullYear();
    const mes = String(dataa.getMonth() + 1).padStart(2, '0');
    const dia = String(dataa.getDate()).padStart(2, '0');
    const horas = String(dataa.getHours()).padStart(2, '0');
    const minutos = String(dataa.getMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
}

// executar a função ao iniciar do app 
document.getElementById('dataa').innerHTML = obterData()


// Executar a função ao iniciar o app
//window.onload = function() {
  //  document.getElementById('Dataa').value = obterData();
//}; */


function calcularTotal() {
    let checkboxes = document.querySelectorAll('.form-check-input');
    let total = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += Number(checkbox.value) || 0;
        }
    });
    let totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('inputvalorTotal').value = totalFormatado;}