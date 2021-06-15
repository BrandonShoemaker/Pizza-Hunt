const {Pizza} = require('../models');

const PizzaController = {
    getAllPizza(req, res){
        Pizza.find({})
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbPizzaDate => res.json(dbPizzaDate))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });

    },
    getPizzaById({params}, res){
        Pizza.findOne({_id:params.id})
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaDate => {
            if(!dbPizzaDate){
                res.status(404).json({message: 'This type of pizza doesnt exist.'})
                return;
            }

            res.json(dbPizzaDate);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createPizza({body}, res){
        Pizza.create(body)
        .then(dbPizzaDate => res.json(dbPizzaDate))
        .catch(err => res.status(400).json(err));
    },
    updatePizza({params, body}, res){
        Pizza.findOneAndUpdate({_id:params.id}, body, {new:true, runValidators: true})
        .then(dbPizzaDate => {
            if(!dbPizzaDate){
                res.status(404).json({message: 'No such pizza exists.'});
                return;
            }
            res.json(dbPizzaDate);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    deletePizza({params}, res){
        Pizza.findOneAndDelete({_id:params.id})
        .then(dbPizzaDate => {
            if(!dbPizzaDate){
                res.status(404).json({message: 'No such pizza exists.'});
                return;
            }
            res.json(dbPizzaDate);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
};

module.exports = {PizzaController};