const express = require('express');
const Comande = require('../models/Comande');

exports.createComande = (req, res) => {
    const comande = new Comande({
        customer: req.body.customer, // ObjectId of the user
        totalPrice: req.body.totalPrice, // Total price of the order
        shippingAddress: req.body.shippingAddress, // Shipping address for the order
        paymentMethod: req.body.paymentMethod, // Payment method used
        orderStatus: req.body.orderStatus || 'processing', // Defaults to 'processing' if not provided
        orderedAt: req.body.orderedAt || Date.now(), // Defaults to current date if not provided
        deliveredAt: req.body.deliveredAt // Can be null if not provided
    });

    comande.save()
        .then(() => {
            res.status(201).json({ message: 'Comande saved successfully!' });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
};


exports.getComandeById = (req, res) => {
    Comande.findOne({ _id: req.params.id })
        .then((comande) => {
            res.status(200).json(comande);
        })
        .catch((error) => {
            res.status(404).json({ error: error });
        });
}

exports.getAllComandes = (req, res) => {
    Comande.find()
        .then((comandes) => {
            res.status(200).json(comandes);
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
}

exports.updateComande = (req, res) => {
    Comande.findOne({ _id: req.params.id })
        .then((comande) => {
            if (!comande) {
                return res.status(404).json({ message: 'Comande not found!' });
            }

            comande.customer = req.body.customer || comande.customer;
            comande.totalPrice = req.body.totalPrice || comande.totalPrice;
            comande.shippingAddress = req.body.shippingAddress || comande.shippingAddress;
            comande.paymentMethod = req.body.paymentMethod || comande.paymentMethod;
            comande.orderStatus = req.body.orderStatus || comande.orderStatus;
            comande.orderedAt = req.body.orderedAt || comande.orderedAt;
            comande.deliveredAt = req.body.deliveredAt || comande.deliveredAt;

            return comande.save();
        })
        .then(() => {
            res.status(200).json({ message: 'Comande updated successfully!' });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
}

exports.deleteComande = (req, res) => {
    Comande.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Deleted!' });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
}
