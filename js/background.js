class Background {
    constructor(w, h, ctx){
        this.canvasW = w;
        this.canvasH = h;
        this.ctx = ctx;
        this.background = new Image();
        this.background.src = "./images/backgroundOpac.png";
    }

    draw() {
        this.ctx.save();
        // this.ctx.scale(1, 1);
        this.ctx.drawImage(this.background, 0, 0, window.innerWidth, window.innerHeight);
        this.ctx.restore();
    }
}