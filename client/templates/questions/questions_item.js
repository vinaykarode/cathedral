Template.questionsItem.helpers({
    'ownPost':function(){
        return this.userId === Meteor.userId();
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