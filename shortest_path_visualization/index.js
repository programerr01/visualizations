var points = []
var oneSelected;
var twoSelected;
var index = [];
var graph = [];
function setup(){
    createCanvas(600,400);
    background(0);
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function  minDistance(dist,visited){
    var V = graph.length;
	var min = Infinity,min_index;
	for(var v =0; v<V;v++){
		if(visited[v] == false && dist[v] <= min)
			min = dist[v],min_index = v;

	}
	return min_index;
}

function printPath(parent){
	var v = parent.length-1;
	fill(255,0,0);
	ellipse(points[v].x ,points[v].y,36,36);
	fill(0,0,255);
	ellipse(points[0].x,points[0].y,36,36);
	while(1==1){
		if(parent[v] == -1){
			break;
}
		stroke(222,250,0);
		var a  = points[v];
		var b = points[parent[v]]	
	    	line(a.x,a.y,b.x,b.y);
	    	sleep(500);
	    	v = parent[v];

	}
}

function shortest_path(){
	console.log(graph);
    var V = graph.length;
    var dist = new Array(V);
    var path = new Array(V);
    var visited = new Array(V);
    for(var i=0;i <V;i++){
        dist[i] = Infinity;
        visited[i] = false;
    }
    dist[0] = 0;
    path[0] = -1; 
    for(var count =0; count < V-1;count++){
		var u = minDistance(dist, visited);
		//Marked the picked vertex as visited
		visited[u] = true;

		for(var v=0;v<V;v++){
			//Update the distance only if it's not in shortest path 		
			
			if(!visited[v] && graph[u][v]  && dist[u] + graph[u][v] < dist[v]){
				dist[v] = dist[u] + graph[u][v];
				
				path[v] = u;
				//r a= points[u];
				//r b = points[v];
				//roke(255,255,0);
	    			//ne(a.x,a.y,b.x,b.y);
			}
        }
    }
    console.log(dist,path);
    printPath(path);
    
}

function draw(){
     fill(255);
     stroke(255);
     
    for(var i =0;i < points.length;i++){
        if(oneSelected == points[i]){
            fill(255,0,0);
           
            ellipse(oneSelected.x, oneSelected.y,30,30);
        }   
        else if(twoSelected == points[i]){
            fill(0,255,0)
            ellipse(twoSelected.x, twoSelected.y,30,30);
        }
        else{
            fill(255)
            ellipse(points[i].x, points[i].y,30,30);
        }

    }
    for(var i =0;i < points.length;i++){
        for(var j=0;j <points.length;j++){
            if(i != j){
                var a = points[i];
                var b = points[j];
            }
        }
    }
}
function add_to_graph(a,b){
    var dist = Math.sqrt((a.x -b.x)**2 + (a.y -b.y)**2);
    if(graph[index[0]]){
        graph[index[0]][index[1]] = dist;
    }
    else{
        graph[index[0]] = [];
        graph[index[0]][index[1]] = dist;

    }
    if(!graph[index[1]])
    	graph[index[1]] =[];
    console.log(graph);
}

function connect(a,b){
    console.log(a,b);
    stroke(255);
    line(a.x,a.y,b.x,b.y);
    stroke(0,0,255);
   // triangle(a.x+30,a.y-6,a.x+30,a.y+6,a.x+50,a.y)
    add_to_graph(a,b);
}

function mousePressed(){
    if(oneSelected && twoSelected){
        oneSelected =null;
        twoSelected =null;
        index = [];
    }
    if(oneSelected){
        for(var i =0;i < points.length;i++){
            var a = points[i];
            var b =createVector(mouseX,mouseY);
            var dist = Math.sqrt((a.x -b.x)**2 + (a.y -b.y)**2)
            if(dist < 20){
		if(a == oneSelected){
			return;
		}
                twoSelected = a;
                index[1] = i;
                connect(oneSelected,twoSelected);
                // build_graph(oneSelected, twoSelected);
                return;
            }
        }
    }
    else{
        for(var i =0;i < points.length;i++){
            var a = points[i];
            var b =createVector(mouseX,mouseY);
            var dist = Math.sqrt((a.x -b.x)**2 + (a.y -b.y)**2)
            if(dist < 20){
                index[0] = i;
                oneSelected = a;
                return;
            }
        }
        
    }
  	
    points.push(createVector(mouseX, mouseY));
   
    // ellipse(mouseX, mouseY,30,30); 
    // console.log(points[0].x)
        
    
}
