Comments = new Mongo.Collection('comments');

Meteor.methods({
    commentInsert: function(commentAttributes){
        check(this.userId, String);
        check(commentAttributes,{
            postId: String,
            body: String
        });
        
        var user = Meteor.user();
        var question = Questions.findOne(commentAttributes.postId);
        if(!question)
            throw new Meteor.Error('invalid-comment', 'you must comment on a post');
        comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        
        Questions.update(comment.postId, {$inc : {commentsCount : 1}});
        
        //create comment and save Id
        comment._id = Comments.insert(comment);
        
        //create notification , informing the user that there's been a comment
        createCommentNotification(comment);
        
        return comment._id;
    }
})