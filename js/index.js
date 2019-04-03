window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        Game.init("canvas");
        document.getElementById('canvas').classList.toggle("display");
        document.getElementById('entry').classList.add("display");
        document.getElementById('entry').classList.remove("entry-page");
    };
};