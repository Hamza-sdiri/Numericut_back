const express = require('express');
const Machine = require('../models/Machine'); 


exports.createMachine = (req, res) => {
    const machine = new Machine({
        name: req.body.name,
        description: req.body.description,
        SN: req.body.SN,
        model: req.body.model,
        price: req.body.price,
    });
    machine.save().then(
        () => {
            res.status(201).json({
                message: 'Machine saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.getMachineById = (req,res)=>{
    Machine.findOne({
        _id: req.params.id
    }).then(
        (machine) => {
            res.status(200).json(machine);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}

exports.getAllMachines = (req, res) => {
    Machine.find().then(
        (machines) => {
            res.status(200).json(machines);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.updateMachine = (req, res) => {
    const machine = new Machine({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      SN: req.body.SN,
      model: req.body.model,
      price: req.body.price,
    });
    Machine.updateOne({_id: req.params.id}, machine).then(
        () => {
            res.status(201).json({
                message: 'Machine updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.deleteMachine = (req, res) => {
    Machine.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                
                error: error
            });
        }
    );
}