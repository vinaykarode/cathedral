var s = Snap("#svg");
// // Circle with 80px radius
// var circle = s.circle(90,120,80);
// // Square with 160px side width
// var square = s.rect(210,40,160,160);
// // Ellipse with 80px vertical radius and 50px horizontal radius
// var ellipse = s.ellipse(460,120,50,80);

// circle.attr({
//   fill: 'coral',
//   stroke: 'coral',
//   strokeOpacity: .3,
//   strokeWidth: 10
// });
 
// square.attr({
//   fill: 'lightblue',
//   stroke: 'lightblue',
//   strokeOpacity: .3,
//   strokeWidth: 10
// });
 
// ellipse.attr({
//   fill: 'mediumturquoise',
//   stroke: 'mediumturquoise',
//   strokeOpacity: .2,
//   strokeWidth: 10
// });

var c1 = s.circle(200,200,150);
var c2 = s.circle(150,200,150);

var circles = s.group(c1,c2);

var ellipse = s.ellipse(175,210,170,100);

circles.attr({
    fill:'coral',
    fillOpacity:.5,
    mask:ellipse
})
ellipse.attr({
    fill:'#fff',
    opacity:.4
})

function blink(){
  ellipse.animate({ry:1}, 120, function(){
    ellipse.animate({ry: 90}, 220);
  });
};
 
// Recall blink method once every 3 seconds
 
setInterval(blink, 1000);
ellipse.animate({ transform: 'r360,150,150' }, 1000, mina.bounce );