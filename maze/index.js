var rows, cols;
var w = 25
var grid = []
var current;
var path = [];
var making  = true;
function setup(){
    frameRate(60);

    createCanvas(400,400);
    cols = floor(width/w);
    rows = floor(height/w);
    for(var i =0;i < rows;i++){
        for(var j =0;j < cols;j++){
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }
    current = grid[0];
    current.visited = true;
    path.push(current)
}

function draw(){
    background(51);
    current.show("yes")
    for(var i =0;i <grid.length;i++){
        // console.log(i);
        
 //        if(grid[i] == current){
 //        	noStroke();
 //        	fill(10,100,220,100);
 //        	var i = current.i;
 //        	var j = current.j;
 //        	rect(i*w,j*w,w,w);
	// }
	
	
		grid[i].show();
		
    }
	//noStroke();
	//fill(100,100,100,100);
	//var i = current.i;
	//var j = current.j;
	//rect(i*w,j*w,w,w);
    // current = grid[0]
    // current.visited = true;
    if(making){
        var next = current.checkNeighbours();
        if(next){
        
            removeWalls(current,next)
            next.visited = true;
            current = next;
            path.push(current)
        }
    }
    else{
        // console.log(current);
        // current.visited = true;
        if(current == grid[grid.length-1]){
            for(var each of path){
                each.visited = false;
                each.backtrack = true;
                each.reVisited = false;
                each.rebacktrack = true;
                each.show();

            }
            noLoop();
        }
        var next = current.findNextValidNeighbour()
        if(next){
            path.push(current)
            // next.reVisited = true;
            console.log("Changing values")
            current = next;
            next.reVisited = true;
        }

    }
    // noLoop();
}

function index(i,j){
    if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
        return -1;
    }
    return (j+i *cols);
}
function Cell(i,j){
    this.i = i;
    this.j = j;
    this.walls = [true, true,true,true]
    this.visited = false;
    this.backtrack = false;
    this.reVisited = false;
    this.rebacktrack = false;

    this.findNextValidNeighbour = function(){
        var neighbours = [];
        // console.log(current)
        if(!current.walls[0]){
            // console.log("TOP")
            var top = grid[index(i,j-1)]
            if(top && !top.reVisited){
              
                neighbours.push(top)
            }
            
        }
         if(!current.walls[1]){
            var right = grid[index(i+1,j)]
            // console.log("rght")
            if(right && !right.reVisited){
                
                neighbours.push(right)
            }
            
        }
        if(!current.walls[2]){
            var bottom = grid[index(i,j+1)]
            // console.log("BTTM")
            if(bottom && !bottom.reVisited){
                neighbours.push(bottom);
            }
        }
        if(!current.walls[3]){
            var left = grid[index(i-1,j)]
            // console.log("left")
            if(left && !left.reVisited){
                neighbours.push(left)
            }
        }
        // console.log(neighbours);
        if(neighbours.length > 0){
            
            return random(neighbours)
        }
        else{
            if(path.length){
                console.log("BACKING")
                current = path.pop();
                current.rebacktrack = true;
            }
           
        }
    }

    this.checkNeighbours = function(){
        var neighbours = [];
        // console.log(current)
        var top = grid[index(i,j-1)]
        var right = grid[index(i+1,j)]
        var bottom = grid[index(i,j+1)]
        var left = grid[index(i-1,j)]

        if(top && !top.visited){
            neighbours.push(top);
        }
        if(right &&!right.visited){
            neighbours.push(right);
        }
        if(bottom && !bottom.visited){
            neighbours.push(bottom);
        }
        if(left && !left.visited){
            neighbours.push(left);
        }
        if(neighbours.length > 0){
            
            return random(neighbours)
        }
        else{
            if(path.length == 0){
                // noLoop();
                path = []
                making = false;
                current = grid[0];
                path.push(current)
                current.reVisited = true;
                console.log("PATH");
                return;
            
            }
            else{
                current = path.pop();
                current.backtrack = true;
            }
        }
    }
    this.show = function(a){
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        fill(255);
        // noFill();
        // rect(x,y,w,w)
        if(this.walls[0]){
             line(x  ,y  ,x+w,y);
        }
        if(this.walls[1]){
             line(x+w,y  ,x+w,y+w)
        }
        if(this.walls[2]){
             line(x+w,y+w,x  ,y+w)
        }
        if(this.walls[3]){
             line(x  ,y+w,x  ,y+w)
        }
        if(a){
            noStroke();
            fill(0,0,0,200);
            rect(x,y,w,w)

        }
        if(this.visited){
            noStroke();
            if(this.backtrack && making){
                fill(255,0,100,100);
            }
           
            // else if(this.reVisited && this.rebacktrack){
            //     fill(0,0,255,100);
            // }
            else if(this.reVisited){
                fill(0,255,0,50);
            }
            
            else{
                fill(255,0,255,100);
            }
           
            rect(x,y,w,w);
        }
        else if(this.rebacktrack && this.backtrack){
                noStroke();
                fill(0,0,255,100);
                rect(x,y,w,w);
        }
       

    }
}




function removeWalls(a , b){
    var x = a.i - b.i;
    var y = a.j - b.j;
    if(x == 1){
        a.walls[3] = false
        b.walls[1] = false
    }
    else if(x == -1){
        b.walls[3] = false
        a.walls[1] = false
    }
    if(y > 0){
        a.walls[0] = false;
        b.walls[2] = false;
    }
    else if(y < 0){
        b.walls[0] = false;
        a.walls[2] = false;
    }
    
}
