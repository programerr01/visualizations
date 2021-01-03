var points = []
var tree = []
function setup(){
    createCanvas(400,400);
    background(0);
}

function minimum_spanning_tree(){
    background(0);
    console.log(points);
    tree = [];
    var res = new Array(points.length);
    for(var i =0;i < res.length;i++){
        res[i] = false;
    }
    var best_score=Infinity;
    tree.push([points[0],points[0]]);
    res[0] =true;
    var j  = 0;
    while(tree.length != points.length){
        sc = [Infinity,0,0];
        for(var j =0;j < tree.length;j++){
            // console.log(tree[j])
            for(var a of tree[j]){
                for(var p of points){
                    var d = dist(a.x,a.y,p.x,p.y);
                    var index = points.indexOf(p);
                    if(res[index]){
                        continue;
                    }
                    if(d < sc[0] && (a.x != p.x) && (a.y != p.y)){
                        sc[0] = d;
                        sc[1] = a;
                        sc[2] = p;
                        
                    }
                }
            }
         
        }
        console.log(sc[1]);
        tree.push([sc[1],sc[2]]);
        var index = points.indexOf(sc[2]);
        console.log(index);
        res[index] = true;
        j++;
    }
    for(var c of points){
        ellipse(c.x,c.y,20,20);
    }
    console.log(res);
    // console.log(tree,points);
    for(var i =0;i < tree.length;i++){
        var a = tree[i][0]
        var b = tree[i][1]
        // console.log(tree[i]);
        // console.log(tree[i+1]);
        line(a.x,a.y ,b.x,b.y);
    }

}
function draw(){

}
function mousePressed(){
    console.log("DD");
    var a = createVector(mouseX, mouseY);
    points.push(a);
    stroke(255);
    ellipse(a.x,a.y,20,20);
    minimum_spanning_tree();
}