Meteor.publish('questions', function(options){
    check(options,{
        sort:Object,
        limit:Number
    });
    return Questions.find({}, options);
});

Meteor.publish('singleQuest', function(id){
    check(id,String)
    return Questions.find(id);
})

Meteor.publish('comments', function(postId){
    check(postId,String);
    return Comments.find({postId:postId});
});

Meteor.publish('notifications', function(){
    return Notifications.find();
})