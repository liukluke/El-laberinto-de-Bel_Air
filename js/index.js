window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        Game.init("canvas");
        Canvas2.init("canvas2");
        document.getElementById('canvas').classList.toggle("display");
        document.getElementById('canvas2').classList.toggle("display");
        document.getElementById('entry').classList.add("display");
        document.getElementById('entry').classList.remove("entry-page");
    };
};