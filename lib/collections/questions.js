Questions = new Meteor.Collection("questions");

Questions.allow({
    update: function(userId, post){
        var isAdmin = null;
        var user= Meteor.users.findOne({username: 'admin'});
        // console.log(user);
        if(user){
        // isAdmin = Meteor.userId() === user._id
        isAdmin = userId === user._id;
        // console.log(isAdmin);
        }
        return (ownsDocument(userId,post) || isAdmin);
    },
    remove:function(userId,post){
        return ownsDocument(userId,post);
    }
})

Meteor.methods({
    questionsInsert: function(postAttributes){
        check(Meteor.userId(), String);
        check(postAttributes, {
            question: String,
            optA: String,
            optB: String,
            optC: String,
            optD: String,
            answer: String,
            continent: String,
            difficult:String
        });
        console.log(postAttributes);
        
    var user = Meteor.user();
    var question = _.extend(postAttributes, {
        userId : user._id,
        author: user.username,
        submitted : new Date(),
        commentsCount:0,
        upVoters:[],
        votes:0,
        quizQuestionDisplayed: false
    });
    var questionId = Questions.insert(question);
    return {
        _id:questionId
    };
        
    },
    
    upvote:function(questionId){
    
        check(this.userId,String);
        check(questionId,String);
        // var question = Questions.findOne(questionId);
        
        // if(!question)
        //     throw new Meteor.Error('invalid', 'Post not found');
        // if(_.include(question.upvoters, this.userId))
        //     throw new Meteor.Error('invalid', 'Already upvoted this post');
        // Questions.update(question._id,{
        //     $addToSet : {upvoters: this.userId},
        //     $inc:{votes :1}
        // });
        
    var affected = Questions.update({
        _id:questionId,
        upvoters : {$ne: this.userId}
    },{
        $addToSet:{upvoters :this.userId},
        $inc:{votes: 1}
    });
    if(!affected)
        throw new Meteor.Error('invalid', 'you werent able to vote');
        
        
        
    }
    
});

