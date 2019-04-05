window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        Game.init("canvas");
        Canvas2.init("canvas2");
        document.getElementById('canvas').classList.toggle("display");
        document.getElementById('canvas2').classList.toggle("display");
        document.getElementById('entry').classList.add("display");
        document.getElementById('entry').classList.remove("entry-page");
    };
    document.getElementById("restar-button").onclick = function() {
        document.getElementById('background').classList.remove("game-over"); 
        document.getElementById('background').classList.remove("winner"); 
        document.getElementById('canvas').classList.toggle("display");
        document.getElementById('canvas2').classList.toggle("display");
        document.getElementById('background').classList.add("container");
        document.getElementById('restar-button').classList.toggle("display");
        Game.init("canvas");
        Canvas2.init("canvas2");
    };   
    
};