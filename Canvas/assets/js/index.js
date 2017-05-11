//Canvas context
var cnv =   document.getElementById('mycanvas');
var ctx =   cnv.getContext('2d');

ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText('Canvas Tutorial!!', cnv.width/2, 30);

//Rectangle
ctx.font = "20px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "left";
ctx.fillText('Rectangle Canvas', 25, 60);
ctx.strokeStyle =   'blue';
ctx.lineWidth   =   '10';
ctx.fillStyle   =   'green';
ctx.fillRect(25, 90, 200, 100);
ctx.fillStyle   =   'yellow';
ctx.fillRect(400, 90, 200, 100);
ctx.strokeRect(400, 90, 200, 100);
ctx.clearRect(50, 115, 150, 50);
ctx.fillStyle   =   'green';
ctx.fillRect(75, 125.5, 100, 25);

//Triangle
ctx.fillStyle = "red";
ctx.fillText('Triangle Canvas', 25, 230);
ctx.moveTo(125, 260);
ctx.lineTo(25, 400);
ctx.lineTo(225, 400);
ctx.lineCap     =   "round";
ctx.closePath();
ctx.fillStyle   =   'orange';
ctx.fill();
ctx.lineWidth   =   5;
ctx.strokeStyle =   'blue';
ctx.stroke();

//Circle
ctx.lineWidth   =   1;
ctx.strokeStyle =   'red';
ctx.strokeText('Circle Canvas', 25, 450);
ctx.beginPath();
ctx.lineWidth   =   5;
ctx.strokeStyle =   'blue';
ctx.fillStyle   =   'red';
ctx.arc(75, 540, 50, 0, Math.PI*2);
ctx.fill();
ctx.stroke();

//Semi-circle
ctx.lineWidth   =   1;
ctx.strokeStyle =   'red';
ctx.strokeText('Semi-circle Canvas', 400, 450);
ctx.beginPath();
ctx.lineWidth   =   5;
ctx.strokeStyle =   'blue';
ctx.arc(450, 540, 50, 0, Math.PI);
ctx.closePath();
ctx.fill();
ctx.stroke();

//Image
ctx.lineWidth   =   1;
ctx.strokeStyle =   'red';
ctx.strokeText('Image Canvas', 25, 650);
var pict = new Image();
pict.src = "../assets/images/Calpoly_Large.jpg";
pict.onload = function() {
    ctx.drawImage(pict, 25, 700, pict.width*0.5, pict.height*0.5)
};

//LOGO
var canvas  =   document.getElementById('logo');
var context =   canvas.getContext('2d');

context.beginPath();
context.moveTo(35, 60);
context.lineTo(70, 40);
context.strokeStyle = '#008000';
context.lineWidth = 7;
context.stroke();

context.beginPath();
context.moveTo(70, 40);
context.lineTo(105, 60);
context.strokeStyle = '#0000FF';
context.stroke();

context.beginPath();
context.moveTo(105, 60);
context.lineTo(105, 95);
context.strokeStyle = '#ff0000';
context.stroke();

context.beginPath();
context.moveTo(105, 95);
context.lineTo(70, 115);
context.strokeStyle = '#b8860b';
context.stroke();

context.beginPath();
context.moveTo(70, 115);
context.lineTo(35,95 );
context.strokeStyle = '#888888';
context.stroke();

context.beginPath();
context.moveTo(35, 95);
context.lineTo(35, 60);
context.strokeStyle = '#FFFF00';
context.stroke();

context.font = '30pt Calibri';
context.strokeStyle = 'black';
context.strokeText('N', 55, 90);

context.font = "20px Comic Sans MS";
context.fillStyle = "#008000";
context.fillText('N', 25, 140);
context.fillStyle = "#ff0000";
context.fillText('I', 42, 140);
context.fillStyle = "#b8860b";
context.fillText('V', 55, 140);
context.fillStyle = "#888888";
context.fillText('E', 69, 140);
context.fillStyle = "#F5D04C";
context.fillText('D', 82, 140);
context.fillStyle = "#0000FF";
context.fillText('H', 97, 140);
context.fillStyle = "#888888";
context.fillText('A', 111, 140);

//Bouncing Ball
var canvas  =   document.getElementById("canvas_anim");
var c       =   canvas.getContext("2d");

var container = {
    x: 0,
    y: 0,
    width: 600,
    height: 300
};
//create the array of circles that will be animated
var circles = [{
    x: 50,
    y: 100,
    r: 10,
    vx: 10,
    vy: 9,
    color: 125
}, {
    x: 150,
    y: 80,
    r: 20,
    vx: 15,
    vy: 8,
    color: 205
}, {
    x: 90,
    y: 150,
    r: 5,
    vx: 5,
    vy: 15,
    color: 25
}, {
    x: 100,
    y: 50,
    r: 15,
    vx: 8,
    vy: 10,
    color: 100
}];

function animate() {
    c.fillStyle = "#000000";
    c.fillRect(container.x, container.y, container.width, container.height);

    for (var i = 0; i < circles.length; i++) {

        c.fillStyle = 'hsl(' + circles[i].color++ + ', 100%, 50%)';
        c.beginPath();
        c.arc(circles[i].x, circles[i].y, circles[i].r, 0, Math.PI * 2, true);
        c.fill()

        if (circles[i].x - circles[i].r + circles[i].vx < container.x || circles[i].x + circles[i].r + circles[i].vx > container.x + container.width) {
            circles[i].vx = -circles[i].vx;
        }

        if (circles[i].y + circles[i].r + circles[i].vy > container.y + container.height || circles[i].y - circles[i].r + circles[i].vy < container.y) {
            circles[i].vy = -circles[i].vy;
        }

        circles[i].x += circles[i].vx
        circles[i].y += circles[i].vy
    }

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);



