const express = require('express')
const server = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { application, query } = require('express');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRUD").then(()=>{
    console.log("Conectado ao mongoose")
}).catch((err)=>{
    console.log("Erro ao conectar "+ err)
})

server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

//model 
const UsuarioSchema = mongoose.Schema({

    nome: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    }
})

/*
const MembroSchema = mongoose.Schema({
    "nome": {type: String},
    "fone_res":{type: String},
    "fone_com":{type: String},
    "celular": {type: String},
    "endereço": {type: String},
    "departamento": {type: String}
})
*/

mongoose.model('usuarios', UsuarioSchema)
//mongoose.model('teste', MembroSchema)

const Usuario = mongoose.model('usuarios')

//const Membros = mongoose.model('teste')

/*
new usuario({
    nome: "Usuario7",
    idade: 7
}).save().then(()=>{
    console.log("usuario criado")
}).catch((e)=>{
    console.log("erro "+e)
})
*/
/*
const Membros = new mongoose.Schema({
    nome: String,
    fone_res: String,
    fone_com: String,
    celular: String,
    endereço: String,
    departamento: String},{collection: 'teste'})
*/
const Membros = mongoose.model('teste', new mongoose.Schema({
    nome: String,
    fone_res: String,
    fone_com: String,
    celular: String,
    endereço: String,
    departamento: String},
    {collection: 'teste'}
))
//Membros.find({}, function(err, data) { console.log(err, data, data.length);});

server.get('/', (req, res)=>{
    
    Membros.find().then((data)=>{
        //console.log(data[0].nome)
        res.send(data)
    }).catch((e)=>{
        console.log("deu erro "+e)
    })
})
server.get('/:nome', (req, res)=>{
    
    Membros.find({"nome": {$regex : req.params.nome, $options: 'i'}})
    .then((data)=>{
        res.send(data)
    }).catch((e)=>{

        console.log("deu erro "+e)
    })
})
server.post('/add', (req, res)=>{
    Membros.create(req.body).then(()=>{
        res.send("criado com sucesso")
    }).catch((e)=>{
        res.send("Erro ao criar usuario: "+e)
    })
})

server.put('/up/:nomeCompleto', (req, res)=>{
    Membros.findOneAndUpdate({"nome" : req.params.nomeCompleto}, req.body)
    .then((data)=>{
        if(data == null){
            res.send("Usuarios não encontrado")    
        } else{
            res.send("Atualizado com sucesso")
        }        
    }).catch((e)=>{
        res.send("Erro ao deletar usuario: "+e)
    })
})

server.delete('/del/:nomeCompleto', (req, res)=>{
    Membros.where().findOneAndDelete({"nome": req.params.nomeCompleto})
    .then((data)=>{
        if(data == null){
            res.send("Usuarios não encontrado")    
        } else{
            res.send("Deleatdo com sucesso")
        }        
    }).catch((e)=>{
        res.send("Erro ao deletar usuario: "+e)
    })
})


server.listen(3000, (
    console.log("Rodando")
))