const {Pizza, Comment} = require('../models');

const commentController = {
    addComment({params, body}, res){
        Comment.create(body)
        .then(({_id}) => {
            return Pizza.findOneAndUpdate({_id: params.pizzaId}, {$push: {comments: _id}}, {new: true})
        })
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: 'No such pizza found.'})
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(500).json(err));
    },
    addReply({params, body}, res){
        Comment.findOneAndUpdate({_id: params.commentId}, {$push: {replies: body}}, {new: true, runValidators: true})
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: 'No such pizza'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(500).json(err));
    },
    removeComment({params}, res){
        Comment.findOneAndDelete({_id: params.commentId})
        .then(deletedComment => {
            if(!deletedComment){
                res.status(404).json({message: 'No such comment.'});
                return;
            }
            return Pizza.findOneAndUpdate({_id: params.pizzaId}, {$pull: {comments: params.commentId}}, {new: true});
        })
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: 'No such pizza.'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(500).json(err));
    },
    removeReply({params}, res){
        Comment.findOneAndDelete({_id: params.commentId}, {$pull: {replyId: params.replyId}}, {new: true})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(500).json(err));
    }
};

module.exports = commentController;