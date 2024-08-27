const express = require('express');
const Comande = require('../models/Comande'); 


exports.createComande = (req, res) => {
    const comande = new Comande({
        name: req.body.name,
        description: req.body.description,
        SN: req.body.SN,
        model: req.body.model,
        price: req.body.price,
    });
    comande.save().then(
        () => {
            res.status(201).json({
                message: 'Comande saved successfully!'
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

exports.getComandeById = (req,res)=>{
    Comande.findOne({
        _id: req.params.id
    }).then(
        (comande) => {
            res.status(200).json(comande);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}

exports.getAllComande = (req, res) => {
    Comande.find().then(
        (comandes) => {
            res.status(200).json(comandes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.updateComande = (req, res) => {
    const comande = new Comande({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        SN: req.body.type,
        model: req.body.model,
        price: req.body.price,
    });
    Comande.updateOne({_id: req.params.id}, comande).then(
        () => {
            res.status(201).json({
                message: 'Comande updated successfully!'
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

exports.deleteComande = (req, res) => {
    Comande.deleteOne({_id: req.params.id}).then(
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