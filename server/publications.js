Meteor.publish('questions', function(){
    return Questions.find();
});

Meteor.publish('comments', function(postId){
    check(postId,String);
    return Comments.find({postId:postId});
});

Meteor.publish('notifications', function(){
    return Notifications.find();
})