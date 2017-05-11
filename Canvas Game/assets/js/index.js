document.getElementById('start').onclick        =   showGame;
window.addEventListener("resize", onResize);
onResize();

function onResize(){
    var height  =   document.getElementById('mainImg').clientHeight;
    document.getElementById('places').style.height  =   height+'px';
    var top  =   document.getElementById('mainImg').offsetTop;
    document.getElementById('places').style.top  =   top+'px';
    var width  =   document.getElementById('mainImg').clientWidth;
    document.getElementById('places').style.width  =   width+'px';
}

function showGame()
{
    document.getElementById('step1').style.display  =   'none';
    document.getElementById('step2').style.display  =   'block';
    onResize();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}