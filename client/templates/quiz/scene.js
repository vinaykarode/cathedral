Template.scene.rendered=function(){
    var scene = Snap('#sceneFooter'),
        tree = scene.select('#treeOne'),
        treeTwo = scene.select('#treeTwo'),
        treeThree = scene.select('#treeThree')
        
    
    treeMove();
    treeTwoMove();
    treeThreeMove();
    
    function treeMove(){
        tree.stop().animate({ transform: 'r5,1325,125' }, 2000, function(){
            tree.stop().animate({transform:'-r15,1325,125'},1500, function(){treeMove()})
        })
    }
    
    function treeTwoMove(){
        treeTwo.stop().animate({ transform: 'r5,1150,157' }, 2000, function(){
            treeTwo.stop().animate({transform:'-r15,1150,157'},1500, function(){treeTwoMove()})
        })
    }
        
    function treeThreeMove(){
        treeThree.stop().animate({ transform: 'r5,1250,132' }, 2000, function(){
            treeThree.stop().animate({transform:'-r15,1250,132'},1500, function(){treeThreeMove()})
        })
    }
    
}