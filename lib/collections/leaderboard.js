Leaderboard = new Mongo.Collection('leaderboard');

var Schemas = {};

Schemas.lead = new SimpleSchema({
    playerName:{
        type:String,
        min:3,
        max:200
    },
    schoolCompanyName:{
        type:String,
        optional:true
    },
    continent:{
        type:String
    },
    playerScore:{
        type:Number
    },
    submitted:{
        type:Date
    }
})

Leaderboard.attachSchema(Schemas.lead);

Meteor.methods({
    leaderboardInsert:function(postAttributes){
//        check(postAttributes,{
//            playerName: String,
//            schoolCompanyName: String,
//            continent: String,
//            score:Number,
//        })
        
        var leaderboard = _.extend(postAttributes,{
            submitted: new Date()
        })
        
        var leaderId = Leaderboard.insert(leaderboard);
        return{
            _id:leaderId
        };
    }
})