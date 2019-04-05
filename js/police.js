class Police {
    constructor(w, h, ctx, board, blockSize){
        this.canvasW = w;
        this.canvasH = h;
        this.ctx = ctx;
        this.blockSize = blockSize;

        // this.posX = this.canvasW - this.blockSize;
        // this.posY = this.canvasH - this.blockSize;
        this.board = board;
        this.boardW = board.length * this.blockSize;

        this.policeMan = new Image();
        this.policeManFlip = new Image();
        this.policeMan.src = "./images/police.png";
        this.policeManFlip.src = "./images/police-flip.png";
        this.characterFrameW = 370;
        
        this.frame = 0;
        this.sense = 1;

        this.i = 0;
        this.posX = this.canvasW - this.blockSize;
        this.posY = this.canvasH/2 - this.blockSize;;
    }

    draw() { 
        this.ctx.save();
        // this.ctx.scale(1, 1);
        if (this.sense === 1) {
            this.ctx.drawImage(this.policeMan, this.frame * this.characterFrameW, 0, 360, 570, this.posX, this.posY, this.blockSize, this.blockSize);
        } else {
            this.ctx.drawImage(this.policeManFlip, this.frame * this.characterFrameW, 0, 360, 570, this.posX, this.posY, this.blockSize, this.blockSize);
        }
        this.ctx.restore();
    }

    gameOver() {
        document.getElementById('canvas').classList.toggle("display");
        document.getElementById('canvas2').classList.toggle("display");
        document.getElementById('background').classList.remove("container");
        document.getElementById('restar-button').classList.toggle("display");
        document.getElementById('background').classList.add("game-over");   
    }

    canMove(posX,posY) {
        return (posY >= 0) && (posX >= 0) && (posY <= this.canvasH) && (posX < this.canvasW) && (this.board[posY/this.blockSize][posX/this.blockSize] != 1); 
    }

    left(){
        if(this.canMove(this.posX - this.blockSize, this.posY)) {
            this.posX -= this.blockSize;
            this.sense = -1;
            if (--this.frame < 0) {this.frame = 2;}
        }
    }    

    right() {
        if(this.canMove(this.posX + this.blockSize, this.posY)){
            this.posX += this.blockSize;
            this.sense = 1;
            if (++this.frame > 2) {this.frame = 0;}
        }
        // else {this.down()}
    }

    down() {
        if(this.canMove(this.posX, this.posY-this.blockSize)){
            this.posY -= this.blockSize;
            this.sense = 1;
            if (++this.frame > 2) this.frame = 0;
        }
        // else {this.left()}
    }

    up() {
        if(this.canMove(this.posX, this.posY+this.blockSize)){
            this.posY+= this.blockSize;
            this.sense = -1;
            if (--this.frame < 0) {this.frame = 2;} 
        }
        // else {this.right()}
    }
    
    move(audio, interval, playerPosX, playerPosY) {

        if(this.posX == playerPosX && this.posY == playerPosY){
            audio.pause();
            this.gameOver();
            return clearInterval(interval);

        } else {    
            
            if(this.posX > playerPosX) {
                this.left();
            }
            if(this.posX < playerPosX) {
                this.right();
            }
            if(this.posY > playerPosY) {
                this.down();
            }
            if(this.posY < playerPosY) {
                this.up();
            }

            // if(this.posX > playerPosX && this.canMove(this.posX-this.blockSize, this.posY)) {
            //     this.posX -= this.blockSize;
            //     this.sense = -1;
            //     if (--this.frame < 0) {this.frame = 2;}
            // }
            // else if(this.posX < playerPosX && this.canMove(this.posX+this.blockSize, this.posY)) {
            //     this.posX += this.blockSize;
            //     this.sense = 1;
            //     if (++this.frame > 2) {this.frame = 0;}
            // }
            // if(this.posY > playerPosY && this.canMove(this.posX, this.posY-this.blockSize)) {
            //     this.posY -= this.blockSize;
            //     this.sense = 1;
            //     if (++this.frame > 2) this.frame = 0;
            // }
            // else if(this.posY < playerPosY && this.canMove(this.posX, this.posY+this.blockSize)) {
            //     this.posY+= this.blockSize;
            //     this.sense = -1;
            //     if (--this.frame < 0) {this.frame = 2;}
            // }
        }       

    }       

}