const express = require('express');
const { db } = require('../utils/db');

const clientRouter = express.Router();

clientRouter
    .get('/', (req,res)=> {
        res.render('clients/listOf', {
            clients : db.getall(),
        })
    })
    .get('/:id', (req,res)=> {
        res.render('clients/one',{
           client : db.getOne(req.params.id)
        })
    })
    
    .post('/', (req,res)=> {
        const id = db.create(req.body)
        //wrocone id trzeba gdzies przypisac wiec do zmiennej-stałej "const id"
        res.render('clients/added', {
            id,
        })
        //trzeba przesłac jako dodatkowe parametr zeby w hbs móc np wyswietlić co dokladnie
        // .render('clietns/added',{name : req.params.name})
        //i pozniej {{name}}w hbs
    })

    .put('/:id', (req,res)=> {
        db.update(req.params.id, req.body)
        res.render('clients/edited', {
            name : req.body.name,  //body jest w body, a parametr jest powyzej ; " '/:id: "
            id: req.params.id
        })
    })
    
    .delete('/del/:id', (req,res)=> {
        db.delete(req.params.id)
        res.render('clients/deleted') 
        //res.render(clients/hbs_z_usuwaniem_info_+_przekerowanie_gdzies_tam)    
    })
    //trzeba zainstalowac (npm i method-override), pobrac moduł i uzyc middleware'a z odpowiednia metoda "_method"
    
    .get('/form/add', (req,res)=> {
        res.render('clients/forms/add', {
            // clients : db.getall(),
        })
    })
    //tu bedzie przeskok do edycji w edit.hbs tego co dodawano w add.hbs , a pozniej stamtad wysłane do .PUT
    .get('/form/edit/:id', (req,res)=> {
        res.render('clients/forms/edit', {
            client : db.getOne(req.params.id)
        })
    })


module.exports = {clientRouter}



