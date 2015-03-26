Quiz = new Mongo.Collection('quiz');

Meteor.methods({
  quizCorrectAnswer:function(postattributes){
          check(postattributes, {
             _id:String     
          });
        var _id = postattributes._id;
        var correctAnswerId =  Questions.update({_id:_id}, {$set:{quizQuestionDisplayed: true}});
        return;
  },
    
    quizReset:function(){
            Questions.update({quizQuestionDisplayed:true},{$set:{quizQuestionDisplayed:false}},{multi:true});
            return;
    }
        
})