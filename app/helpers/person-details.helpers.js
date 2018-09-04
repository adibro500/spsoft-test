
// var Joi = require('joi')
var urlConst = require('../constants/url-constants')


function PersonDetailsHelpers() {
    console.log('[Person object invoked]')
}



const Person = require('../models/person_details.models.js')

    // Create and Save a new Person
    PersonDetailsHelpers.prototype.create = (req, res) => {
    if(req.name !== undefined && req.desc !== undefined && req.img_url !== undefined && req.name !== '' && req.desc !== '' && req.img_url !== '' ){
        return res.status(400).send({
            message: 'please enter all fields'
        })
    }
    const person = new Person({
        name: req.body.name,
        desc: req.body.desc,
        img_url: req.body.img_url,

    })  
    person.save().then(data => {
        res.send(data)
    })
    .catch(error => {
        err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Person."
            
    })
    
    }
})
    }
    
    // Retrieve and return all Persons from the database.
    PersonDetailsHelpers.prototype.findAll = (req, res) => {
        Person.find()
        .then(persons => {
            res.send(persons);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Persons."
            });
        });
    }
    
    // Find a single Person with a PersonId
    PersonDetailsHelpers.prototype.findOne = (req, res) => {
        Person.findById(req.params.person_id)
        .then(person => {
            if(!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.person_id
                });            
            }
            res.send(person)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.person_id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Person with id " + req.params.person_id
            });
        });
    }
    
    // Update a Person identified by the PersonId in the request
    PersonDetailsHelpers.prototype.update = (req, res) => {
        if(!req.body) {
            return res.status(400).send({
                message: "Person content can not be empty"
            });
        }
    
        // Find Person and update it with the request body
        Person.findByIdAndUpdate(req.params.person_id, {
            name: req.body.name || "Untitled Person",
            desc: req.body.desc || "Untitled Person",
            img_url: req.body.img_url || "Untitled Person",

        }, {new: true})
        .then(person => {
            if(!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.person_id
                });
            }
            res.send(person);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.person_id
                });                
            }
            return res.status(500).send({
                message: "Error updating Person with id " + req.params.person_id
            });
        });
    }
    
    // Delete a Person with the specified PersonId in the request
    PersonDetailsHelpers.prototype.delete = (req, res) => {
        Person.findByIdAndRemove(req.body.person_id)
        .then(person => {
            if(!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.body.person_id
                });
            }
            res.send({message: "Person deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Person not found with id " + req.body.person_id
                });                
            }
            return res.status(500).send({
                message: "Could not delete Person with id " + req.body.person_id
            });
        });
    }


exports.PersonDetailsHelpers = PersonDetailsHelpers