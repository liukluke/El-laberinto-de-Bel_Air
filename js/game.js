var Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    counter: 0,
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
            this.counter++
            this.clear(); 
            // this.moveAll();
            this.drawAll();
            if(this.counter % 25 === 0){
                console.log("calculando")
                // this.police.direction(this.player.posX, this.player.posY);
                this.police.move(this.interval, this.player.posX, this.player.posY);
            }
            // this.police.direction(this.player.posX, this.player.posY);
            this.player.move(this.interval);
            
        },10);  
    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
        this.labyrinth = new Labyrinth(this.canvas.width, this.canvas.height, this.ctx);
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys, this.labyrinth.board, this.labyrinth.blockSize);
        this.police = new Police(this.canvas.width, this.canvas.height, this.ctx, this.labyrinth.board, this.labyrinth.blockSize);
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawAll: function() {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasW);
        this.background.draw();
        this.player.draw();
        this.police.draw();
        this.labyrinth.draw();
    }, 

    moveAll: function() {

    }

};