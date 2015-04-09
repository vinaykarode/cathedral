Template.quizMap.rendered = function(){
  var continentSvg = Snap('#continent-map'),
    europe = continentSvg.select('#europe'),
    asia=continentSvg.select('#asia'),
    north_america = continentSvg.select('#north_america'),
    south_america = continentSvg.select('#south_america'),
    africa = continentSvg.select('#africa'),
    australia = continentSvg.select('#australia');

    europe.hover(inContinent,outContinent);
    asia.hover(inContinent,outContinent);
    australia.hover(inContinent,outContinent);
    africa.hover(inContinent,outContinent);
    north_america.hover(inContinent,outContinent);
    south_america.hover(inContinent,outContinent);
    
    var g;
    function inContinent(){
////        this.attr({fill:'green'});
//        g = continentSvg.gradient("l(2, 1, 0, 1)#5C5C5C-#fff-#5C5C5C");
//        this.attr({fill:g});
//        g.attr({ x1: 0, y1: 1, x2: 2, y2: 1 });
//        g.animate({ x1: 0, y1: 100, x2: 0, y2: 100 }, 20000, mina.linear, anim); 
        
        g = continentSvg.gradient("r(0.5, 0.5, 0.9)#80a166-#1f3b08");
        this.attr({fill:g});
//        g.attr({ x1: 0, y1: 1, x2: 2, y2: 1 });
//        g.animate({ x1: 0, y1: 100, x2: 0, y2: 100 }, 20000, mina.linear, anim);
        
        this.animate({transform: 's1.06,1.06,100,100'},500,mina.bounce)
    }
    function outContinent(){
        this.attr({fill:'#97b9d3',stroke:'#ffffff',strokewidth:'0.1'})
        this.animate({transform: 's1,1,200,200'},500,mina.bounce)

    } 
function anim () {

};


   
}
