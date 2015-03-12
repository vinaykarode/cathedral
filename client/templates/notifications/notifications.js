Template.notifications.helpers({
    'notifications': function(){
        return Notifications.find({userId:Meteor.userId(), read:false});
    },
    'notificationCount': function(){
        return Notifications.find({userId:Meteor.userId(), read:false}).count();
    },
    'notificationQuestions':function(){
        return Notifications.find({questionOwner: Meteor.userId(), read:false});
    }
});

Template.notificationItem.helpers({
    'notificationPostPath':function(){
        return Router.routes.questionsPage.path({_id:this.postId});
    }
});

Template.notificationItem.events({
    'click a':function(){
        Notifications.update(this._id,{$set:{read:true}});
    }
});