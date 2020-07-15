var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var canvaswidth;
var canvasheight;
var circlesarray = [];
// var speedMultiplier = 10;
// var ballCount = 10;
// var ballSizeAdder = 5;
// var ballSizeVarience = 10;
handleControlClick();
function handleControlClick() {
    speedMultiplier = parseInt(document.querySelector("#speedMultiplier").value);
    ballCount = parseInt(document.querySelector("#ballCount").value);
    ballSizeAdder = parseInt(document.querySelector("#ballSizeAdder").value);
    ballSizeVarience = parseInt(document.querySelector("#ballSizeVarience").value);
    trail=document.querySelector("#trail").checked;
    // console.log(trail);
    init();
}


function circle(x, y, xspeed, yspeed, radius, color) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.color = color;

    this.radius = radius;
    this.draw = function () {
        c.beginPath();
        c.strokeStyle = "rgba(" + this.color + ",1)";
        c.fillStyle = "rgba(" + this.color + ",1)";

        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.stroke();
    }
    this.update = function () {
        if (this.x >= canvaswidth - this.radius && this.xspeed > 0) {
            this.xspeed = -this.xspeed;
        }
        if (this.x <= this.radius && this.xspeed < 0) {
            this.xspeed = -this.xspeed;
        }
        if (this.y >= canvasheight - this.radius && this.yspeed > 0) {
            this.yspeed = -this.yspeed;
        }
        if (this.y <= this.radius && this.yspeed < 0) {
            this.yspeed = -this.yspeed;
        }
        // console.log(this.xspeed,this.yspeed);
        this.x += this.xspeed;
        this.y += this.yspeed;

        // gravity
        // this.yspeed+=0.2;
        // friction
        // this.yspeed*=0.999;
        // this.xspeed*=0.999;
        // this.yspeed<0.25 && this.yspeed>-0.25?this.yspeed=0:this.yspeed*=0.99;
        // this.xspeed<0.1 && this.xspeed>-0.1?this.xspeed=0:this.xspeed*=0.99;

        this.draw();
    }


}


function init() {
    circlesarray = [];
    // console.log("window.innerWidth=",window.innerWidth);
    // console.log("document.querySelector('html').scrollWidth=",document.querySelector('html').scrollWidth);
    // console.log("document.querySelector('html').offsetWidth=",document.querySelector('html').offsetWidth);
    // console.log("document.querySelector('html').clientWidth=",document.querySelector('html').clientWidth);
    // console.log("window.innerHeight=",window.innerHeight);
    // console.log("document.querySelector('html').scrollHeight=",document.querySelector('html').scrollHeight);
    // console.log("document.querySelector('html').offsetHeight=",document.querySelector('html').offsetHeight);
    // console.log("document.querySelector('html').clientHeight=",document.querySelector('html').clientHeight);

    canvaswidth = window.innerWidth * 3 / 4;
    canvasheight = window.innerHeight / 2;

    // canvaswidth = document.querySelector('html').offsetWidth;
    // canvasheight = document.querySelector('html').offsetHeight;

    canvas.width = canvaswidth;
    canvas.height = canvasheight;


    // var colorlist=["38, 70, 83","42, 157, 143","233, 196, 106","244, 162, 97","231, 111, 81"];
    // var colorlist=["40, 61, 59","25, 114, 120","237, 221, 212","196, 69, 54","119, 46, 37"];
    var colorlist = ["38, 84, 124", "239, 71, 111", "255, 209, 102", "6, 214, 160"];
    // var colorlist=["38, 84, 124","239, 71, 111","255, 209, 102","6, 214, 160","40, 61, 59","25, 114, 120","237, 221, 212","196, 69, 54","119, 46, 37","38, 70, 83","42, 157, 143","233, 196, 106","244, 162, 97","231, 111, 81"];



    for (let i = 0; i < ballCount; i++) {
       
        let radius=Math.floor(Math.random() * ballSizeVarience) + ballSizeAdder;
       

        circlesarray.push(new circle(
            Math.floor(Math.random() * canvaswidth),
             Math.floor(Math.random() * canvasheight), 
             (Math.random() - 0.5) * speedMultiplier,
              (Math.random() - 0.5) * speedMultiplier,
              radius,
               colorlist[Math.floor(Math.random() * colorlist.length)]));
        circlesarray[i].draw();
        // console.log("r=",circlesarray[i].radius);
    }


}

function animate() {
    requestAnimationFrame(animate);
    if(!trail){
        c.clearRect(0, 0, canvaswidth, canvasheight);
    }

    for (let i = 0; i < circlesarray.length; i++) {
        circlesarray[i].update();
    }

}




window.addEventListener('resize', function () {
    init();
});

// init();
animate();












$(document).ready(function(){
    $('span.icon').click(function(){
        $('#myLinks').slideToggle("slow");
    });
})


