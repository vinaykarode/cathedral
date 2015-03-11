Questions = new Meteor.Collection("questions");

Questions.allow({
    update: function(userId, post){
        return ownsDocument(userId,post);
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
            continent: String
        });
        console.log(postAttributes);
        
    var user = Meteor.user();
    var question = _.extend(postAttributes, {
        userId : user._id,
        author: user.username,
        submitted : new Date()
    });
    var questionId = Questions.insert(question);
    return {
        _id:questionId
    };
        
    }
});