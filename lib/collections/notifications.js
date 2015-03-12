Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function(userId, doc, fieldNames){
        return ownsDocument(userId,doc) && fieldNames.length === 1 && fieldNames[0] === 'read';
    }
});

createCommentNotification = function(comment){
    var question = Questions.findOne(comment.postId);
    if(comment.userId !== question.userId){
        Notifications.insert({
            userId:question.userId,
            postId:question._id,
            commentId:comment._id,
            commenterName:comment.author,
            read:false
        });
    }
};

// createQuestionNotifications = function (question){
//     console.log('creating notification'+ Meteor.userId()+ 'questionsid' + question.userId);
//     var newQuestion = Questions.findOne(question._id);
//     // if(question.userId === Meteor.userId()){
//     //     console.log('inserting notification');
//     //     Notifications.insert({
//     //         postId:question._id,
//     //         questionOwner:question.userId,
//     //         questionAuthor: question.author,
//     //         read:false
//     //     });
//     // }
//     var otherUsers = Meteor.users.find({}, {fields:{username: 'vinay'}});
//     console.log(otherUsers);
//     for(var i=0; i<otherUsers.count(); i++){
//         // console.log(otherUsers.username + 'users will be notified');
//     }
// };