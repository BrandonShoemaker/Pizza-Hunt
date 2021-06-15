const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: [ReplySchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
});

const ReplySchema = new Schema({
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String,
        required: true,
        trim: true
    },
    writtenBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createAtVal => dateFormat(createAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
})

CommentSchema.virtual('replyCount').get(function(){
    return this.replies.length;
})

const Comment = model('Comment', CommentSchema);


module.exports = Comment;