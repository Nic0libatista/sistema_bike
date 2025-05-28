// arquivo de pre carregamento e reforço de segurança na comunicação entre processos (IPC)

//const { contextBridge, ipcRenderer } = require("electron")

// importaçao dos recursos do framework
// contextbridge segunrança | ipcrenderer comunicação
const {contextBridge,ipcRenderer} = require('electron')

//enviar ao main um pedido para conexão com banco de dados e troca de icone no processo de renderização (index.html - renderer.html)
ipcRenderer.send('db-connect')

contextBridge.exposeInMainWorld('api',{
    clientWindow: () => ipcRenderer.send('client-Window'),
    osWindow: () => ipcRenderer.send('os-Window'),
    estoqueWindow: () => ipcRenderer.send('estoque-Window'),
    bikeWindow: () => ipcRenderer.send('bike-Window'),
    dbstatus:(message) => ipcRenderer.on('db-status', message),
    newClient:(client)=>ipcRenderer.send('new-client',client),
    newOs: (OS) => ipcRenderer.send("new-os", OS),
    newbike :(bike)=>ipcRenderer.send('new-bike',bike),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    searchName:(name)=>ipcRenderer.send('search-name',name),
    renderClient:(dataClient)=>ipcRenderer.on('render-client', dataClient),
    setClient: (args) => ipcRenderer.on('set-client', args),
    deleteClient: (id) => ipcRenderer.send('delete-client', id),
    // updateClient:(id) => ipcRenderer.send('update-client', client),
    searchModel: (modelo) => ipcRenderer.send('search-model', modelo),
    renderModel: (callback) => ipcRenderer.on('render-model', callback),
    updateClient: (client) => ipcRenderer.send('update-client', client),
    searchClients: () => ipcRenderer.send('search-clients'),
    listClients: (clients) => ipcRenderer.on('list-clients', clients),
    searchOS: () => ipcRenderer.send('search-os'),
    validateClient: () => ipcRenderer.send('validate-client'),
    setSearch: (args) => ipcRenderer.on('set-search', args),
    renderOS: (dataOS) => ipcRenderer.on('render-os', dataOS),
    deleteOS: (idOS) => ipcRenderer.send('delete-os', idOS),
    updateOS: (os) => ipcRenderer.send('update-os', os),
    printOS: () => ipcRenderer.send('print-os')
})

function dbstatus(message){
    ipcRenderer.on('db-status', message)
}