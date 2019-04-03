var Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    keys: {
      TOP_KEY: 38,
      DOWN_KEY: 40,
      LEFT_KEY: 37,
      RIGHT_KEY: 39,
    },

    init: function(canvasId) {   
        this.canvas = document.getElementById(canvasId);
        
        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext("2d");

        this.start();
    },

    start: function(){
        this.reset();
        this.interval = setInterval(() => {
            this.clear(); 
            // this.moveAll();
            this.drawAll();
            this.police.move(this.player.posX, this.player.posY, this.interval);
            this.player.move();
        },10);  
    },

    reset: function() {
        this.labyrinth = new Labyrinth(this.canvas.width, this.canvas.height, this.ctx);
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys, this.labyrinth.board, this.labyrinth.blockSize);
        this.police = new Police(this.canvas.width, this.canvas.height, this.ctx, this.labyrinth.board, this.labyrinth.blockSize);
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawAll: function() {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasW);
        this.player.draw();
        this.police.draw();
        this.labyrinth.draw();
    }, 

    moveAll: function() {

    }

};