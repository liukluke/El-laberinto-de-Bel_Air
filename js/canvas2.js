var Canvas2 = {

    init: function(canvasId2){

    this.canvas2 = document.getElementById(canvasId2);
    /** @type {CanvasRenderingContext2D} */
    this.ctx = canvas2.getContext("2d");

    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.x = 0;
    this.y = 0;

    this.dy = 10;

    canvas2.setAttribute("height", window.innerHeight);
    canvas2.setAttribute("width", window.innerWidth);

    this.background = new Image();
    this.background.src = "./images/backgroundFace.png";
   


    setInterval(() => {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.draw();
        this.move();
    },50);
    },

    draw: function() {
        this.ctx.drawImage(this.background, this.x, this.y, this.w, this.h);
        this.ctx.drawImage(this.background, this.x, this.y - this.h, this.w, this.h);
    }, 

    move: function () {
        this.y += this.dy;
        if (this.y > this.h) this.y = 0;
    }
   
};    