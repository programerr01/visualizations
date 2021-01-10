//Program for tower of hanoi problem 
//
var a=  prompt("Enter the number of disk that you want?");
// a = Integer(a)
var arr1 = []
for(var i =0;i < a;i++){
	arr1.push(a-i);
}
var arr2 = []
var arr3 = []
result = []
var i =0;

function setup(){
	createCanvas(400,400);
	background(0);
	stroke(255);
	color_it()
	frameRate(1);
		h(a,1,3);

}


function draw(){
	background(0);
	if(i < result.length){
		var start = result[i][0]
		var end = result[i][1]
		if(start == 1){
			val = arr1.pop();
		}
		else if(start == 2){
		val = arr2.pop();

		}
		else if(start == 3){
			val = arr3.pop();
		}
		if(end == 1){
			arr1.push(val);
		}
		else if(end == 2){
			arr2.push(val);
		}
		else if(end ==3){
			arr3.push(val);
		}
		// h(1,result[i][0], result[i][1])
		i++
	}
	else{
		background(255,0,0,200);
		textSize(32);
		text('Completed', width/2-80, height/2);
		noLoop();
	}
	
	draw_pipes();
	color_it();
}

function draw_pipes(){
	strokeWeight(3);
	var x = width /4;
	var y = height/6;
	line(x,y,x,4*y);	
	line(2*x,y,2*x,4*y);
	line(3*x,y,3*x,4*y);
}
function color_it(){
	var x = width /4;
	var y = 2*height/3;
	y = y-10
	for(var each of arr1){
		var w = each * 20;
		fill(255,w*10,w*2);
		rect(x-(w/2),y,w,40);
		y-=40;
	}
	x = 2*x;
	var y = 2*height/3;
	y = y-10
	for(var each of arr2){
		var w = each * 20;
		fill(255,w*10,w*2);
		rect(x-(w/2),y,w,40);
		y-=40;
	}
	x = x/2 *3;
	var y = 2*height/3;
	y = y-10
	for(var each of arr3){
		var w = each * 20;
		fill(255,w*10,w*2);
		rect(x-(w/2),y,w,40);
		y-=40;
	}
}



function h(n,start,end){
	if(n==1){
		pm(start,end)
	}
	else{
		var other= 6-(start + end)
		h(n-1,start,other)
		pm(start,end)
		h(n-1,other,end)
	}
}

function pm(start,end){
	var val;
	
	// color_it()
	result.push([start,end])
	console.log(start, " to ",end)
}
