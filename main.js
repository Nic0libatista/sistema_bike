console.log("Processo principal")

const { app, BrowserWindow, nativeTheme, Menu, ipcMain } = require('electron')

//linha relacionada ao preload.js
const path = require('node:path')

// importação dos modulo de conectar e desconectar (modulo de conexão)
const {conectar, desconectar} = require('./database.js')

// importação do schema clientes da camada model
const clientModel = require ('./src/models/cliente.js')

const clientBikeModel = require ('./src/models/bike.js')
//Importação do schema bikes da camada model

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
            label: 'clientes'
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
            telefoneCliente: client.phoneCli,
            cepCliente: client.cepCli,
            logradouroCliente: client.adressCli,
            numeroCliente: client.numberCli,
            complementoCliente: client.complementCli,
            bairroCliente: client.neighborhoodCli,
            cidadeCliente: client.cityCli,
            ufCliente: client.ufCli
        });

        //salvar os dados do cliente no banco de dados
        await newClient.save()
        } catch(error) {
        console.log(error)
    }
})



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//clientesBike -- crud create
ipcMain.on('new-clientBike', async (event,client) => {
    // !!! teste de recebimento dos dados do cliente
    console.log(clientBike)

    try {

        //criar nova estrutura de dados usando a class modelo. !!! os atributos precisam ser identicos ao modelo de dados cliente.js
        // e os valores são definidos pelo conteúdo de objeto cliente
        const newClientBike = new clientBikeModel({
            marcaCliente: client.marcaCli,
            modeloCliente: client.modeloCli,
            chassiCliente: client.chassiCli,
            corCliente: client. corCli,
            obsCliente: client.obsCli,
            fotoCliente: client.fotoCli
        })

        //salvar os dados do cliente no banco de dados
        await newClientBike.save()
        } catch(error) {
        console.log(error)
    }
})