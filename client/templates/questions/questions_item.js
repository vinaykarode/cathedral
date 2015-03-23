Template.questionsItem.helpers({
    'ownPost':function(){
        var isAdmin = null;
        var user= Meteor.users.findOne({username: 'admin'});
        if(user){
        isAdmin = Meteor.userId() === user._id
        }
        // console.log(user._id +'  '+ this.userId + '  '+Meteor.userId());
        return (this.userId === Meteor.userId()) || isAdmin;
        // return true;
    },
    'upvotedClass':function(){
        var userId = Meteor.userId();
        if(userId && !_.include(this.upvoters, userId)){
            return 'btn-primary upvotable';
        }else {
            return 'disabled';
        }
    }
    // 'commentsCount':function(){
    //     return Questions.find({postId: this._id}).count();
    // }
});

Template.questionsItem.events({
    'click .upvotable':function(e){
        e.preventDefault();
        Meteor.call('upvote', this._id);
    }
})