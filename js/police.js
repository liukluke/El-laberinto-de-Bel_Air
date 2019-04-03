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

        this.i = 0;
    }

    draw() { 
        this.ctx.save();
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.posX, this.posY, this.blockSize, this.blockSize);     
        this.ctx.restore();
    }

    gameOver() {
        document.getElementById('canvas').classList.toggle("display");
        document.getElementById('background').classList.remove("container");
        document.getElementById('background').classList.add("game-over"); 
    }

    direction(playerPosX, playerPosY) {

        this.playerPosX = playerPosX;
        this.playerPosY = playerPosY;

        this.pathStart = [this.blockSize, this.canvasH - this.blockSize];
        this.pathEnd = [this.playerPosX,this.playerPosY];
    
        this.currentPath = this.findPath(this.board, this.pathStart,this.pathEnd, this.blockSize);
        console.log(this.currentPath.length)
 
    }

    move(interval, playerPosX, playerPosY) {

        // this.pathStart = [25,50];
        // this.pathEnd = [800, 400];

        if(this.posX == playerPosX && this.posY == playerPosY){
            this.gameOver();
            return clearInterval(interval);

        } else {
            
           if(this.currentPath[this.i] !== undefined) {
               this.posX = this.currentPath[this.i][0];
               this.posY = this.currentPath[this.i][1];
               this.i ++;
           }
        }       

    }       

    findPath(board, pathStart, pathEnd, blockSize) {
        this.abs = Math.abs;
        this.max = Math.max;
        this.pow = Math.pow;
        this.sqrt = Math.sqrt;

        this.blockSize = blockSize;
        this.maxWalkableTileNum = 0;
        this.world = board;
        this.worldWidth = board[0].length * this.blockSize;
        this.worldHeight = board.length * this.blockSize;
        this.worldSize = this.worldWidth * this.worldHeight;
        

        this.distanceFunction = ManhattanDistance;
        this.findNeighbours = function(){};

        function ManhattanDistance(Point, Goal)
        {	// linear movement - no diagonals - just cardinal directions (NSEW)
            return this.abs(Point.x - Goal.x) + this.abs(Point.y - Goal.y);
        }

        function Neighbours(x, y, a)
        {
            var	N = y - 1,
            S = y + 1,
            E = x + 1,
            W = x - 1,
            myN = N > -1 && canWalkHere(x, N, a),
            myS = S < a.worldHeight && canWalkHere(x, S, a),
            myE = E < a.worldWidth && canWalkHere(E, y, a),
            myW = W > -1 && canWalkHere(W, y, a),
            result = [];
            if(myN)
            result.push({x:x, y:N});
            if(myE)
            result.push({x:E, y:y});
            if(myS)
            result.push({x:x, y:S});
            if(myW)
            result.push({x:W, y:y});
            a.findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
            return result;
        }

        // function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
        // {
        //     if(myN)
        //     {
        //         if(myE && canWalkHere(E, N))
        //         result.push({x:E, y:N});
        //         if(myW && canWalkHere(W, N))
        //         result.push({x:W, y:N});
        //     }
        //     if(myS)
        //     {
        //         if(myE && canWalkHere(E, S))
        //         result.push({x:E, y:S});
        //         if(myW && canWalkHere(W, S))
        //         result.push({x:W, y:S});
        //     }
        // }

        // function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
        // {
        //     myN = N > -1;
        //     myS = S < worldHeight;
        //     myE = E < worldWidth;
        //     myW = W > -1;
        //     if(myE)
        //     {
        //         if(myN && canWalkHere(E, N))
        //         result.push({x:E, y:N});
        //         if(myS && canWalkHere(E, S))
        //         result.push({x:E, y:S});
        //     }
        //     if(myW)
        //     {
        //         if(myN && canWalkHere(W, N))
        //         result.push({x:W, y:N});
        //         if(myS && canWalkHere(W, S))
        //         result.push({x:W, y:S});
        //     }
        // }

        function canWalkHere(x, y, a)
        {     
            return (a.world[parseInt(y/a.blockSize)][parseInt(x/a.blockSize)] !== 1);
        }

        function Node(Parent, Point, a)
        {
            var newNode = {
                // pointer to another Node object
                Parent:Parent,
                // array index of this Node in the world linear array
                value:Point.x + (Point.y * a.worldWidth),
                // the location coordinates of this Node
                x:Point.x,
                y:Point.y,
                // the distanceFunction cost to get
                // TO this Node from the START
                f:0,
                // the distanceFunction cost to get
                // from this Node to the GOAL
                g:0
            };
    
            return newNode;
        }

        function calculatePath(a){
        // create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]}, a);
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]}, a);
		// create an array that will contain all world cells
		var AStar = new Array(a.worldSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = a.worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y, a);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i], a);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + a.distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + a.distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until until the Open list is empty
		return result;
    }
    return calculatePath(this);
    }

}