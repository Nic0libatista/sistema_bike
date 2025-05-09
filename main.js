console.log("Processo principal")

const { app, BrowserWindow, nativeTheme, Menu, ipcMain, dialog, shell } = require('electron')

//linha relacionada ao preload.js
const path = require('node:path')

// importação dos modulo de conectar e desconectar (modulo de conexão)
const {conectar, desconectar} = require('./database.js')

// importação do schema clientes da camada model
const clientModel = require ('./src/models/cliente.js')

const clientBikeModel = require ('./src/models/bike.js')

const OSModel = require('./src/models/os.js')

const {jspdf, default: jsPDF} = require('jspdf')
//importação da biblioteca fs (nativa js) p manipulação de arquivos (no caso, uso do pdf)
const fs = require('fs')


// Janela principal
let win
const createWindow = () => {
    // a linha abaixo define o tema (claro ou escuro)
    nativeTheme.themeSource = 'light' //(dark ou light)
    win = new BrowserWindow({
        width: 800,
        height: 600,
        //autoHideMenuBar: true,
        //minimizable: false,
        resizable: false,
        // ativar preload.js
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })



    // menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
    //recebimento dos pedidos do renderizador para abertura de janelas

}

    ipcMain.on('client-Window',() => {
        clientWindow()
    })

    ipcMain.on('os-Window',() => {
        osWindow()
    })

    ipcMain.on('estoque-Window',() => {
        estoqueWindow()
    })

    ipcMain.on('bike-Window',() => {
        bikeWindow()
    })


// Janela sobre
function aboutWindow() {
    nativeTheme.themeSource = 'light'
    // a linha abaixo obtém a janela principal
    const main = BrowserWindow.getFocusedWindow()
    let about
    // Estabelecer uma relação hierárquica entre janelas
    if (main) {
        // Criar a janela sobre
        about = new BrowserWindow({
            width: 360,
            height: 220,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            parent: main,
            modal: true
        })
    }
    //carregar o documento html na janela
    about.loadFile('./src/views/sobre.html')
}

// Janela clientes
let client
function clientWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    if(main) {
        client = new BrowserWindow({
            width: 850,
            height: 700,
            //autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true,
             // ativar preload.js
             webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
        })
    }
    client.loadFile('./src/views/cliente.html')  
    client.center() // iniciar no centro da tela
}


// Janela bikes
let bike
function bikeWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    if(main) {
        bike = new BrowserWindow({
            width: 850,
            height: 990,
            //autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true,
             // ativar preload.js
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
        })
    }
    bike.loadFile('./src/views/bike.html')  
    bike.center() // iniciar no centro da tela
}



// Janela OS
let os
function osWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    if(main) {
        os = new BrowserWindow({
            width: 1100,
            height: 850,
          //  autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true,
             // ativar preload.js
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
        })
    }
    os.loadFile('./src/views/os.html')   
    os.center() //iniciar no centro da tela
}


// Janela estoque
let estoque
function estoqueWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    if(main) {
        estoque = new BrowserWindow({
            width: 850,
            height: 700,
            //autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    estoque.loadFile('./src/views/estoque.html')  
    estoque.center() // iniciar no centro da tela
}






// Iniciar a aplicação
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//reduzir logs não críticos
app.commandLine.appendSwitch('log-level', '3')


// iniciar a conexão com banco de dados (pedido direto do preload)
ipcMain.on('db-connect',async (Event) => {
    let conectado = await conectar()
// se coenctado for igual a true 
    if (conectado) {
    // enviar uma mensagem para o renderizador trocar o icone
    // criar delay de 5s para sincronizar a nuvem
    setTimeout(()=> { 
    Event.reply('db-status', "conectado")
    }, 500); //500ms
    
}
})

// !!! desconectar quando a aplicação for encerrada
app.on('before-quit', () => {
    desconectar() 
})






// template do menu
const template = [
    {
        label: 'Cadastro',
        submenu: [
          {
            label: 'Cliente',
            click: () => clientWindow()

          },
          {
            label: 'Bike',
            click: () => bikeWindow()

          },
          {
            label: 'OS',
            click: () => osWindow()

          },
          {
            label: 'estoque',
            click: () => estoqueWindow()
          },
          {
            label: 'Sair',
            click: ()=> app.quit(),
            accelerator:'Alt+F4'
          }
        ]
    },
    {
        label: 'Relatórios',
        submenu: [
          {
            label: 'clientes',
            click: () => relatorioClientes()

          },
          {
            label: 'Os - abertas'
          },
          {
            label: 'Os - andamento'
          },
          {
            label: 'Os - aguardando peças'
          },
          {
            label: 'Os - concluida'
          },
        
        ]
    },    

    {
        label: 'Ferramentas',
        submenu: [
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            },
            {
                type: 'separator'
            },
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]

//clientes -- crud create
ipcMain.on('new-client', async (event,client) => {
    // !!! teste de recebimento dos dados do cliente
    console.log(client)

    try {

        //criar nova estrutura de dados usando a class modelo. !!! os atributos precisam ser identicos ao modelo de dados cliente.js
        // e os valores são definidos pelo conteúdo de objeto cliente
        const newClient = new clientModel({
            nomeCliente: client.nameCli,
            cpfCliente: client.cpfCli,
            emailCliente: client.emailCli,
            foneCliente: client.foneCli,
            cepCliente: client.cepCli,
            logradouroCliente: client.addressCli,
            numeroCliente: client.numberCli,
            complementoCliente: client.complementCli,
            bairroCliente: client.neighborhoodCli,
            cidadeCliente: client.cityCli,
            ufCliente: client.ufCli
        });

        //salvar os dados do cliente no banco de dados
        await newClient.save()

        dialog.showMessageBox({
            //customização
            type: 'info',
            title: "aviso",
            message: "cliente adicionado com sucesso",
            buttons: ['ok']
   }).then((result) => {
       // ação ao pressionar o botao (result - 0)
       if(result.response === 0){
           // enviar pedido para o renderizador limpar os campos e resetar as conf pre definidas
           // (rotulo 'reset-form) do preload js
           event.reply('reset-form')
       }
       // ação ao pressionar o botão

   })
   } catch(error) {
       //se codigo de erro for 11000 (cpf duplicado) enviar uma mensagem ao usuario
       if (error.code === 11000){
           dialog.showMessageBox({
               type: 'error',
               title: "atenção",
               message: " cpf já está cadastrado \n verifique se digitou corretamente",
               buttons: ['ok']

           }).then((result) => {
               if (result.response === 0) {
                   // limpar a caixa do cpf e deixar a borda em vermelho

               }

           })
       }
   console.log(error)
}
})




/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//clientesBike -- crud create
ipcMain.on('new-bike', async (event,bike) => {
    
    // !!! teste de recebimento dos dados do cliente
    console.log(bike)

    try {

        //criar nova estrutura de dados usando a class modelo. !!! os atributos precisam ser identicos ao modelo de dados cliente.js
        // e os valores são definidos pelo conteúdo de objeto cliente
        const newbike = new clientBikeModel({
            nomeCliente: bike.nameCli,
            cpfCliente: bike.cpfCli,
            marcaCli: bike.marcaCliente,
            modeloCli: bike.modeloCli,
            chassiCli: bike.chassiCli,
            corCli: bike.corCli,
            obsCli: bike.obsCli,
           //  fotoCliente: bike.fotoCli
        })

        //salvar os dados do cliente no banco de dados
        await newbike.save()
        } catch(error) {
        console.log(error)
    }
})

////////////////////////////////////// fim bike - crud //////////////////

/////////////////////////////// OS - CRUD CREATE
ipcMain.on('new-os', async (event, OS) => {
    // IMPORTANTE!! teste do passo dois
    console.log(OS)
    // Cadastrar a estrutura de dados do banco de dados Mongodb
    //ATENÇÃO !! os atributos deve ser identicos ao modelo de dados clientes.js
    //
    try {
        //cria uma nova estrutura de dados usando classe  modelo
        const newOs = new OSModel({
            funcionarioos: OS.funcionarioos,
            statusos: OS.statusos,
            serviçosos: OS.serviçosos,
            valoros: OS.valoros,
            mecanicoos: OS.mecanicoos,
            clienteos: OS.clienteos
        })
         //salvar os dados Clientes no banco de dados
         await newOs.save()
    } catch (error) {
        console.log(error)
    } 
})

//== FIM - OS - CRUD CREATE


///////////////////////////// relatorio de clientes ////////////////////////////////////////////////

async function relatorioClientes(){
    try{
        // passo 1: consultar o banco de dados e obter a listagem de clientes cadastrados por ordem alfabetica
        const clientes = await clientModel.find().sort({nomeCliente:1})
        // teste de recebimento da listagem de clientes
        // console.log(clientes)
        const doc = new jsPDF ('p', 'mm', 'a4')
        // definir o tamanho da  (tamanho equivalente ao word)
        // p = portrait | l = landscape | mm | a4
        // inserir imagem no doc html
        //imagempath é o caminho q será inserido no pdf
        // imagembase64 (uso da biblioteca fs para ler o arquivo no formato png)
        const imagePath = path.join(__dirname, 'src', 'public', 'img', 'logo.png')
        const imagebase64 = fs.readFileSync(imagePath, {encoding: 'base64'})
        doc.addImage(imagebase64, 'PNG', 5,8) // (5mm, 8mm) x,y

        doc.setFontSize(18)
        // escrever um texto (titulo)
        doc.text("relatorio de clientes", 80, 45) // x,y (mm)
        // inserir a data atual no relatorio
        const dataatual = new Date().toLocaleDateString('pt-BR')
        doc.setFontSize(12)
        doc.text(`Data: ${dataatual}`, 165, 10)
        // variavel de apoio na formatação
        let y = 70
        doc.text("nome", 14,y)
        doc.text("telefone",80, y)
        doc.text("email", 130, y)
        y +=5
        // desenhar uma linha
        doc.setLineWidth(0.5) // expessura da linha
        doc.line(10,y, 200,y) // 10 (inicio) --------- 200 (fim)
        
        y+=10 
        // renderizar os clientes cadastrados no banco
       

        clientes.forEach((c) => {
            // add outra pg se a folha inteira for preenchida (estrategia é saber tamanho da folha)
            // folha a4 tem y=297mm
            if (y > 265) {
                doc.addPage()
                y = 30 // reseta a variavel y
                doc.text("nome", 14,y)
                doc.text("telefone",80, y)
                doc.text("email", 130, y)
              
                y+=5
                
                // desenhar uma linha
                doc.setLineWidth(0.5) // expessura da linha
                doc.line(10,y, 200,y) // 10 (inicio) --------- 200 (fim)
                y+=10
                doc.text(c.nomeCliente, 14, y)
                doc.text(c.foneCliente, 80, y)
                doc.text(c.emailCliente || "n/a", 130, y)
                
                y+=10

            }
            doc.text(c.nomeCliente, 14, y)
            doc.text(c.foneCliente || "n/a", 80, y)
            doc.text(c.emailCliente || "n/a", 130, y)
            y += 10 


        })
        // add numeração automatica de páginas
        const paginas = doc.internal.getNumberOfPages()
        for (let i = 1; i <= paginas; i++) {
            doc.setPage(i)
            doc.setFontSize(10)
            doc.text(`pagina ${i} de ${paginas}`,105,290, {align:'center'})
        }

        // ...

        // definir o caminho do arquivo temporario
        const tempDir = app.getPath('temp')
        const filePath = path.join(tempDir, 'clientes.pdf')
        // salvar temporariamente o arquivo
        doc.save(filePath)
        // abrir o arquivo do aplicativo padrão de leitura de pdf do computador do usuario
        shell.openPath(filePath)
    } catch(error){
        console.log(error)
    }
    
}



////////////////////////////// fim - relatorio de clientes ///////////////////////////////////////////


////////////////////////////// validação de busca (preenchimento obrigatorio)////////////////////
ipcMain.on('validate-search', () =>{
    dialog.showMessageBox({
        type: 'warning',
        title: "Atenção!!",
        message: "Preencha o campo de busca",
        buttons: ['OK']
    })
})



/////////////////////////////// começo - pesquisa pelo nome /////////////////////////////////

ipcMain.on('search-name',async (event,name) =>{
    // console.log("teste IPC search-name")
    // console.log(name)
    // find --- (nomeCliente: name) - busca pelo nome 
    // regEXP (name,i) i= insensitive -- ignora maiusculo ou minusculo 
    try {
     const dataClient = await clientModel.find({
        $or: [
            {nomeCliente: new RegExp(name, 'i')},
            {cpfCliente: new RegExp(name, 'i')}
        ]
         
 
     })
     console.log(dataClient)
 
 //se o cliente n estiver cadastrado, alertar o usuario e questionar se ele quer cadastrar novo cliente
 // caso n queira, limpar os campos. caso queira, recortar o nome do campo de busca e colocar no campo nome
 
 // se o vetor tiver vazio [] (cliente não cadastrado )
 if (dataClient.length ===0){
 dialog.showMessageBox({
     type: 'question',
     title: "Aviso",
     message:"Cliente não cadastrado. \nDeseja cadastrar esse cliente?",
     defaultId: 0,
     buttons: ['Sim', 'Não'] // [0 e 1]
 
 
 }).then((result) =>{
     if(result.response === 0){
          // envia ao renderizador um pedido para setar os campos (recortar do campo de busca e colar no campo nome)
         event.reply('set-client')
     } else{
         // limpar o formulario
         event.reply('reset-form')
     }
 
 })
 } 
 
     // envia os dados do cliente ao renderer
     // !!! ipc apenas trabalha com string ent é necessario converter o JSON para string
     event.reply('render-client', JSON.stringify(dataClient))
    } catch(error){
     console.log(error)
    }
 })
 
 
 ///////////////////////////////// fim - pesquisa pelo nome //////////////////////////////////////////

 
/// crud deletee ////////////////////

ipcMain.on('delete-client', async (event, id) => {
    console.log(id) // teste do passo 2 (recebimento do id)
    try {
        //importante - confirmar a exclusão
        //client é o nome da variável que representa a janela
        const { response } = await dialog.showMessageBox(client, {
            type: 'warning',
            title: "Atenção!",
            message: "Deseja excluir este cliente?\nEsta ação não poderá ser desfeita.",
            buttons: ['Cancelar','Excluir'] //[0, 1]
        })
        if (response === 1) {
            console.log("teste do if de excluir")
            //Passo 3 - Excluir o registro do cliente
            const delClient = await clientModel.findByIdAndDelete(id)
            event.reply('reset-form')
        }
    } catch (error) {
        console.log(error)
    }
})






// crud ipdate /////////////////////////////////





ipcMain.on('update-client', async(event,client)=>{
    console.log(client)
    try {
       

const updateClient = await clientModel.findByIdAndUpdate(
    client.idCli, 
 {
    nomeCliente: client.nameCli,
    cpfCliente: client.cpfCli,
    emailCliente: client.emailCli,
    foneCliente: client.foneCli,
    cepCliente: client.cepCli,
    logradouroCliente: client.addressCli,
    numeroCliente: client.numberCli,
    complementoCliente: client.complementCli,
    bairroCliente: client.neighborhoodCli,
    cidadeCliente: client.cityCli,
    ufCliente: client.ufCli
        },
            {
                new: true
            }
        )
    // mensagem de confirmação
    dialog.showMessageBox({
        //customização
        type: 'info',
        title: "aviso",
        message: "dados do cliente aalterados com sucesso",
        buttons: ['ok']
}).then((result) => {
   // ação ao pressionar o botao (result - 0)
   if(result.response === 0){
       // enviar pedido para o renderizador limpar os campos e resetar as conf pre definidas
       // (rotulo 'reset-form) do preload js
       event.reply('reset-form')
   }
   // ação ao pressionar o botão

})

// confirmação 


    } catch(error){
        console.log(error)
    }
})


/////////////////////// busca por modelo ///////////////////////
ipcMain.on('search-model', async (event, modelo) => {
    try {
        const dataBike = await clientBikeModel.find({
            modeloCli: new RegExp(modelo, 'i') // busca insensível
        });

        if (dataBike.length === 0) {
            dialog.showMessageBox({
                type: 'info',
                title: 'Aviso',
                message: 'Modelo não cadastrado.'
            }).then(() => {
                event.reply('render-model', JSON.stringify([]));
            });
        } else {
            event.reply('render-model', JSON.stringify(dataBike));
        }
    } catch (error) {
        console.log(error);
    }
});