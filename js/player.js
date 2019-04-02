class Player {
    constructor(w, h, ctx, keys, board, blockSize){
        this.canvasW = w;
        this.canvasH = h;
        this.ctx = ctx;
        this.keys = keys;
        this.board = board;
        this.boardW = board.length;
        this.blockSize = blockSize;

        this.posX = 0;
        this.posY = 0;
        this.will = new Image();
        this.willFlip = new Image();
        this.will.src = "./images/willyPlayer.png";
        this.willFlip.src = "./images/willyPlayer-flip.png";
        this.characterFrameW = 370;
        
        this.frame = 0;
        this.sense = 1;

    }
  
    draw() {
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasW);
        this.ctx.scale(1, 1);
        if (this.sense === 1) {
            this.ctx.drawImage(this.will, this.frame * this.characterFrameW, 0, 360, 570, this.posX, this.posY, 25, 25);
        } else {
            this.ctx.drawImage(this.willFlip, this.frame * this.characterFrameW, 0, 360, 570, this.posX, this.posY, 25, 25);
        }
        this.ctx.restore();
    }
         
    canMove(posX,posY) {
        return (posY >= 0) && (posX >= 0) && (this.board[posY/25][posX/25] != 1); 
    }

    move() {    
        document.onkeydown = function (e) {
            if(e.keyCode == this.keys.LEFT_KEY && this.canMove(this.posX-this.blockSize, this.posY)) {
                this.sense = -1;
                this.posX -= this.blockSize;
                if (--this.frame < 0) {this.frame = 2;}
            }
            if(e.keyCode == this.keys.RIGHT_KEY && this.canMove(this.posX+this.blockSize, this.posY)) {
                this.sense = 1;
                this.posX += this.blockSize;
                if (++this.frame > 2) {this.frame = 0;}
            }
            if(e.keyCode == this.keys.TOP_KEY && this.canMove(this.posX, this.posY-this.blockSize)) {
                this.sense = 1;
                this.posY -= this.blockSize;
                if (++this.frame > 2) this.frame = 0;
            }
            if(e.keyCode == this.keys.DOWN_KEY && this.canMove(this.posX, this.posY+this.blockSize)) {
                this.sense = -1;
                this.posY += this.blockSize;
                if (--this.frame < 0) {this.frame = 2;}
            }
        }.bind(this);
    }
    
}