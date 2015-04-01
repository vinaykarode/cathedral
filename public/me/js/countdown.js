var canvasSize = 200,
    centre = canvasSize/2,
    radius = canvasSize*0.8/2,
    s = Snap('#svgCountDown'),
    path = "",
    arc = s.path(path),    
    startY = centre-radius,
    runBtn = document.getElementById('run'),
    percDiv = document.getElementById('time'),
    input = document.getElementById('input');

/*input.onkeyup = function(evt) {
    if(isNaN(input.value)) {
      input.value = '';
    }
};*/

runBtn.onclick = function() {
  run(input.value/100);
};

function run(time) {
    var endpoint = (time*360)+(360-(time*360));

    Snap.animate(endpoint, 0,   function (val) {
        arc.remove();

        var d = val,
            dr = d-90;
            radians = Math.PI*(dr)/180,
            endx = centre + radius*Math.cos(radians),
            endy = centre + radius * Math.sin(radians),
            largeArc = d>180 ? 1 : 0;  
            path = "M"+centre+","+startY+" A"+radius+","+radius+" 0 "+largeArc+",1 "+endx+","+endy;
  
        arc = s.path(path);
        arc.attr({
          stroke: '#3da08d',
          fill: 'none',
          strokeWidth: 12
        });
/*        percDiv.innerHTML =    Math.round(val/360*100) +'s';
*/      percDiv.innerHTML =    Math.round(val/(360/(time*100))) +'s';
		console.log(360/(time*100));
    }, (time * 100000), mina.linear);  
}

run(input.value/100);





