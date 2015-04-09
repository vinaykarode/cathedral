Template.quizHomeTwo.rendered = function(){
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var ImageSurface = famous.surfaces.ImageSurface; 
var Surface = famous.core.Surface;
var Easing = famous.transitions.Easing;
var StateModifier = famous.modifiers.StateModifier;
var Transitionable = famous.transitions.Transitionable;
var SpringTransition = famous.transitions.SpringTransition;
var View = famous.core.View;
Transitionable.registerMethod('spring', SpringTransition);
    
var mainContext = Engine.createContext();

//create a view
    var viewSize = [1300,800];

//adding a view
    var view = new View();
    
    var viewModifier = new StateModifier({
        origin:[0.5,0.5],
        align:[0.5,0.5]
    })
    
mainContext.add(viewModifier).add(view);

//creating reference node in view wiht size
    var viewSizeModifier = new StateModifier({
        size:viewSize
    });
    
    var sizeNode = view.add(viewSizeModifier);

//background color for the view
    
    var background = new Surface({
        properties:{
            backgroundColor:'gray'
        }
    })
    
    var backgroundModifier = new StateModifier({
        transform:Transform.behind
    })
    
    sizeNode.add(backgroundModifier).add(background);
    
    
//var africa = new ImageSurface({
//    size: [200, 200],
//    content: '/img/africa.svg',
//    classes: ['double-sided']
//});
//var africaModifier = new StateModifier({
//    origin:[0.5,0],
//    align:[0.5,0.5]
//});
// 
var asia = new ImageSurface({
    size: [455, 455],
    content: '/img/asia.svg',
    classes: ['double-sided']
}); 
    
var asiaModifier = new StateModifier({
    origin:[0.5,0.5],
    align:[0.64,0.395]
});
    
var europe = new ImageSurface({
    size: [277, 332],
    content: '/img/europe.svg',
    classes: ['double-sided'],
    properties:{
        Color:'green'
    }
});
    
var europeModifier = new StateModifier({
    origin:[0.5,0.5],
    align:[0.45,0.3]
});
    
//var australia = new ImageSurface({
//    size: [200, 200],
//    content: '/img/australia.svg',
//    classes: ['double-sided']
//});
//
//var australiaModifier = new StateModifier({
//    origin:[0.5,0],
//    align:[0.7,0.7]
//});
//    
var namerica = new ImageSurface({
    size: [451, 437],
    content: '/img/namerica.svg',
    classes: ['double-sided']
});

var namericaModifier = new StateModifier({
    origin:[0.5,0.5],
    align:[0.2,0.33]
});
    
var samerica = new ImageSurface({
    size: [451, 235],
    content: '/img/samerica.svg',
    classes: ['double-sided']
});

var samericaModifier = new StateModifier({
    origin:[0.5,0.5],
    align:[0.255,0.71]
});

//    mainContext.add(africaModifier).add(africa);
    sizeNode.add(asiaModifier).add(asia);
    sizeNode.add(europeModifier).add(europe);
//    mainContext.add(australiaModifier).add(australia);
    sizeNode.add(namericaModifier).add(namerica);
    sizeNode.add(samericaModifier).add(samerica);

}