{"filter":false,"title":"quiz.js","tooltip":"/lib/collections/quiz.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":15,"column":2},"action":"insert","lines":["Quiz = new Mongo.Collection('quiz');","","Meteor.methods({","  ","  quizCorrectAnswer:function(postattributes){","          check(postattributes, {","             _id:String     ","          });","          ","          var _id = postattributes._id;","         ","        var correctAnswerId =  Questions.update({_id:_id}, {$set:{quizQuestionDisplayed: true}});","          console.log(correctAnswerId);","  }","        ","})"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":15,"column":2},"end":{"row":15,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1427288125578,"hash":"4f77be189b3be603addaaca339fc368f6d1522bc"}