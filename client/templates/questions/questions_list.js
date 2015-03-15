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
    // 'questions' : function(){
    //     Session.set('radioSelected', '');
    //     Session.set('radioEditSelected','');
    //     return Questions.find({}, {sort: {submitted:-1}});
    // }
});

Template.questionsList.rendered = function(){
    this.find('.wrapper')._uihooks = {
        insertElement:function(node,next){
          $(node)
            .hide()
            .insertBefore(next)
            .fadeIn();
            
        },
        removeElement:function(node,next){
          $(node).fadeOut(function(){
              $(this).remove();
          });  
        },
        moveElement:function(node, next){
            var $node = $(node), $next = $(next);
            var oldTop = $node.offset().top;
            var height = $node.outerHeight(true);
            
            //find all elements between next and node
            var $inBetween =$next.nextUntil(node);
            if($inBetween.length === 0)
                $inBetween = $node.nextUntil(next);
                
            //put node in place
            $node.insertBefore(next);
            
            //measure new top
            var newTop = $node.offset().top;
            
            //move node back to where it was
            $node
                .removeClass('animate')
                .css('top', oldTop-newTop);
                
            //push everyother element down or up to put them back
            $inBetween
                .removeClass('animate')
                .css('top', oldTop < newTop ? height : -1 * height)
                
            //force a new redraw
            $node.offset();
            
            //reset everything to zero, animated
            $node.addClass('animate').css('top', 0);
            $inBetween.addClass('animate').css('top', 0);
            
        }   
    }
}