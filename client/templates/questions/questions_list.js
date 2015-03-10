var questionsdata = [
    {
        question: 'what is your name',
        optA: 'vinay',
        optB: 'kumar',
        optC: 'stanley',
        optD: 'karode'
    },
    {
        question: 'where do you work',
        optA: 'dynex',
        optB: 'semi',
        optC: 'conductor',
        optD: 'lincoln'
    }
    ]

Template.questionsList.helpers({
    // questions : questionsdata
    questions : function(){
        return Questions.find({}, {sort: {submitted:-1}});
    }
});