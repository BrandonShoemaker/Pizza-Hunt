const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        require: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (generatedDate) => dateFormat(generatedDate)
    },
    size: {
        type: String,
        default: 'Large',
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large']
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const Pizza = model('Pizza', PizzaSchema);

PizzaSchema.virtual('commentCount').get(function(){
    return this.comments.reduce((total, comments) => total + comments.replies.length + 1, 0);
})

module.exports = Pizza;