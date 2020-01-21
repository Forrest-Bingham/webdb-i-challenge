const express = require('express');
const db = require('../dbConfig.js');
const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(acc => {
      res.json(acc);
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to get accounts' });
    });
  });

  router.post('/', (req,res) => {
      const body = req.body;
      if(body){
          if(body.name && body.budget && typeof body.name =="string" && typeof body.budget== "number")
          {
            db('accounts').insert(body)
            .then( add => {
                res.status(200).json(add);
            })
            .catch( error => {
                console.log(error)
                res.status(500).json({
                    error: "Unable to create new account"
                })
            })
          }
          else {
              res.status(400).json({
                  error: "Please make sure to add a name and a budget"
              })
          }
        
      }
      else {
          res.status(500).json({
              error: "Please enter name and budget of account"
          })
      }
      
  })

  router.put('/:id', (req,res) => {
      const body = req.body; 
      db('accounts').where({ id: req.params.id }).update({name: body.name, budget: body.budget})
      .then( update => {
          if(update){
              if(body.name && body.budget && typeof body.name == "string" && typeof body.budget=="number"){
                  res.status(200).json(body);
              } else {
                  res.status(400).json({
                      error: "Please enter name or budget."
                  })
              }

          } else {
              res.status(404).json({
                  error: "ID not found"
              })
          }
      })
  })

  router.delete('/:id', (req,res)=> {
      db('accounts').where({id: req.params.id}).del()
      .then( deleted => {
        if(deleted){
            res.status(200).json(deleted);
        } else {
            res.status(404).json({
                error: "ID not found"
            })
        }
      })
      .catch( error => {
          console.log(error);
          res.status(500).json({
              error: "Unable to delete ID"
          })
      })
  })

  

  module.exports = router;