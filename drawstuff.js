/* classes */ 

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class


/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    
// draw random pixels
function drawRandPixels(context) {
    var c = new Color(0,0,0,0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.01;
    var numPixels = (w*h)*PIXEL_DENSITY; 
    
    // Loop over 1% of the pixels in the image
    for (var x=0; x<numPixels; x++) {
        c.change(Math.random()*255,Math.random()*255,
            Math.random()*255,255); // rand color
        drawPixel(imagedata,
            Math.floor(Math.random()*w),
            Math.floor(Math.random()*h),
                c);
    } // end for x
    context.putImageData(imagedata, 0, 0);
} // end draw random pixels

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
    const INPUT_ELLIPSOIDS_URL = 
        "https://ncsucgclass.github.io/prog1/ellipsoids.json";
        
    // load the ellipsoids file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_ELLIPSOIDS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.error("Unable to open input ellipsoids file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input ellipsoids

//get the input triangles from the standard class URL
function getInputTriangles() {
    const INPUT_TRIANGLES_URL = 
        "https://ncsucgclass.github.io/prog1/triangles.json";
        
    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_TRIANGLES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.error("Unable to open input triangles file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input triangles

//get the input boxex from the standard class URL
function getInputBoxes() {
    const INPUT_BOXES_URL = 
        "https://ncsucgclass.github.io/prog1/boxes.json";
        
    // load the boxes file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_BOXES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.error("Unable to open input boxes file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input boxes

// put random points in the ellipsoids from the class github
function drawRandPixelsInInputEllipsoids(context) {
    var inputEllipsoids = getInputEllipsoids();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputEllipsoids != String.null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var ellipsoidXRadius = 0; // init ellipsoid x radius
        var ellipsoidYRadius = 0; // init ellipsoid y radius
        var numEllipsoidPixels = 0; // init num pixels in ellipsoid
        var c = new Color(0,0,0,0); // init the ellipsoid color
        var n = inputEllipsoids.length; // the number of input ellipsoids
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids, draw rand pixels in each
        for (var e=0; e<n; e++) {
            cx = w*inputEllipsoids[e].x; // ellipsoid center x
            cy = h*inputEllipsoids[e].y; // ellipsoid center y
            ellipsoidXRadius = Math.round(w*inputEllipsoids[e].a); // x radius
            ellipsoidYRadius = Math.round(h*inputEllipsoids[e].b); // y radius
            numEllipsoidPixels = ellipsoidXRadius*ellipsoidYRadius*Math.PI; // projected ellipsoid area
            numEllipsoidPixels *= PIXEL_DENSITY; // percentage of ellipsoid area to render to pixels
            numEllipsoidPixels = Math.round(numEllipsoidPixels);
            //console.log("ellipsoid x radius: "+ellipsoidXRadius);
            //console.log("ellipsoid y radius: "+ellipsoidYRadius);
            //console.log("num ellipsoid pixels: "+numEllipsoidPixels);
            c.change(
                inputEllipsoids[e].diffuse[0]*255,
                inputEllipsoids[e].diffuse[1]*255,
                inputEllipsoids[e].diffuse[2]*255,
                255); // ellipsoid diffuse color
            for (var p=0; p<numEllipsoidPixels; p++) {
                do {
                    x = Math.random()*2 - 1; // in unit square 
                    y = Math.random()*2 - 1; // in unit square
                } while (Math.sqrt(x*x + y*y) > 1) // a circle is also an ellipse
                drawPixel(imagedata,
                    cx+Math.round(x*ellipsoidXRadius),
                    cy+Math.round(y*ellipsoidYRadius),c);
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
                //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            } // end for pixels in ellipsoid
        } // end for ellipsoids
        context.putImageData(imagedata, 0, 0);
    } // end if ellipsoids found
} // end draw rand pixels in input ellipsoids

// draw 2d projections read from the JSON file at class github
function drawInputEllipsoidsUsingArcs(context) {
    var inputEllipsoids = getInputEllipsoids();
    
    
    if (inputEllipsoids != String.null) { 
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputEllipsoids.length; 
        //console.log("number of ellipsoids: " + n);

        // Loop over the ellipsoids, draw each in 2d
        for (var e=0; e<n; e++) {
            context.fillStyle = 
                "rgb(" + Math.floor(inputEllipsoids[e].diffuse[0]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[1]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[2]*255) +")"; // diffuse color
            context.save(); // remember previous (non-) scale
            context.scale(1, inputEllipsoids[e].b/inputEllipsoids[e].a); // scale by ellipsoid ratio 
            context.beginPath();
            context.arc(
                Math.round(w*inputEllipsoids[e].x),
                Math.round(h*inputEllipsoids[e].y),
                Math.round(w*inputEllipsoids[e].a),
                0,2*Math.PI);
            context.restore(); // undo scale before fill so stroke width unscaled
            context.fill();
            //console.log(context.fillStyle);
            //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
            //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            //console.log("a: "+Math.round(w*inputEllipsoids[e].a));
            //console.log("b: "+Math.round(h*inputEllipsoids[e].b));
        } // end for ellipsoids
    } // end if ellipsoids found
} // end draw input ellipsoids

//put random points in the triangles from the class github
function drawRandPixelsInInputTriangles(context) {
    var inputTriangles = getInputTriangles();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputTriangles != String.null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var numTrianglePixels = 0; // init num pixels in triangle
        var c = new Color(0,0,0,0); // init the triangle color
        var n = inputTriangles.length; // the number of input files
        //console.log("number of files: " + n);

        // Loop over the triangles, draw rand pixels in each
        for (var f=0; f<n; f++) {
        	var tn = inputTriangles[f].triangles.length;
        	//console.log("number of triangles in this files: " + tn);
        	
        	// Loop over the triangles, draw each in 2d
        	for(var t=0; t<tn; t++){
        		var vertex1 = inputTriangles[f].triangles[t][0];
        		var vertex2 = inputTriangles[f].triangles[t][1];
        		var vertex3 = inputTriangles[f].triangles[t][2];

        		var vertexPos1 = inputTriangles[f].vertices[vertex1];
        		var vertexPos2 = inputTriangles[f].vertices[vertex2];
        		var vertexPos3 = inputTriangles[f].vertices[vertex3];
        		//console.log("vertexPos1 " + vertexPos1);
        		//console.log("vertexPos2 " + vertexPos2);
        		//console.log("vertexPos3 " + vertexPos3);
        		
        		// triangle position on canvas
        		
        		var v1 = [w*vertexPos1[0], h*vertexPos1[1]];
        		var v2 = [w*vertexPos2[0], h*vertexPos2[1]];
        		var v3 = [w*vertexPos3[0], h*vertexPos3[1]];
        		
        		// calculate triangle area on canvas (shoelace formula)
        		var triangleArea = 0.5*Math.abs(v1[0]*v2[1]+v2[0]*v3[1]+v3[0]*v1[1]-v2[0]*v1[1]-v3[0]*v2[1]-v1[0]*v3[1]);
        		var numTrianglePixels = triangleArea; // init num pixels in triangle
            	//console.log("triangle area " + triangleArea);
            	numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
            	numTrianglePixels = Math.round(numTrianglePixels);
            	// console.log("numTrianglePixels " + numTrianglePixels);
            	c.change(
            		inputTriangles[f].material.diffuse[0]*255,
                	inputTriangles[f].material.diffuse[1]*255,
                	inputTriangles[f].material.diffuse[2]*255,
                	255); // triangle diffuse color
            	for (var p=0; p<numTrianglePixels; p++) {
                    var point; // on canvas plane
            		var triangleTest = 0;
            		while (triangleTest == 0 ){ //if the pixel outside the triangle
                  
            			point = [Math.floor(Math.random()*w), Math.floor(Math.random()*h)];
                    	// plane checking
            			
                    	var t1 = ((point[0]-v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) < 0.0;
                    	var t2 = ((point[0]-v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
                    	var t3 = ((point[0]-v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;
                    	
                    	if((t1==t2)&&(t2==t3)) // draw the pixel if inside the triangle
                    		triangleTest = 1;
            		}
            		drawPixel(imagedata,point[0],point[1],c);
                	//console.log("color: ("+c.r+","+c.g+","+c.b+")");
                	//console.log("x: "+ x);
                	//console.log("y: "+ y);
            	} // end for pixels in triangle
        	} // end for triangles
    	} // end for files
        context.putImageData(imagedata, 0, 0);
    } // end if triangle file found
} // end draw rand pixels in input triangles

//draw 2d projections traingle from the JSON file at class github
function drawInputTrainglesUsingPaths(context) {
    var inputTriangles = getInputTriangles();
    
    if (inputTriangles != String.null) { 
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputTriangles.length; 
        //console.log("number of files: " + n);

        // Loop over the input files
        for (var f=0; f<n; f++) {
        	var tn = inputTriangles[f].triangles.length;
        	//console.log("number of triangles in this files: " + tn);
        	
        	// Loop over the triangles, draw each in 2d
        	for(var t=0; t<tn; t++){
        		var vertex1 = inputTriangles[f].triangles[t][0];
        		var vertex2 = inputTriangles[f].triangles[t][1];
        		var vertex3 = inputTriangles[f].triangles[t][2];

        		var vertexPos1 = inputTriangles[f].vertices[vertex1];
        		var vertexPos2 = inputTriangles[f].vertices[vertex2];
        		var vertexPos3 = inputTriangles[f].vertices[vertex3];
        		//console.log("vertexPos1 " + vertexPos1);
        		//console.log("vertexPos2 " + vertexPos2);
        		//console.log("vertexPos3 " + vertexPos3);
        		
            	context.fillStyle = 
            	    "rgb(" + Math.floor(inputTriangles[f].material.diffuse[0]*255)
            	    +","+ Math.floor(inputTriangles[f].material.diffuse[1]*255)
            	    +","+ Math.floor(inputTriangles[f].material.diffuse[2]*255) +")"; // diffuse color
            
            	var path=new Path2D();
            	path.moveTo(w*vertexPos1[0],h*vertexPos1[1]);
            	path.lineTo(w*vertexPos2[0],h*vertexPos2[1]);
            	path.lineTo(w*vertexPos3[0],h*vertexPos3[1]);
            	path.closePath();
            	context.fill(path);

        	} // end for triangles
        } // end for files
    } // end if triangle files found
} // end draw input triangles

// put random points in the boxes from the class github
function drawRandPixelsInInputBoxes(context) {
    var inputBoxes = getInputBoxes();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputBoxes != String.null) { 
	    var x  = 0; var y  = 0; // pixel coord init
        var lx = 0; var rx = 0; // input lx, rx from boxes.json
        var by = 0; var ty = 0; // input by, ty from boxes.json
        var fz = 0; var rz = 0; // input fz, rz from boxes.json
        var numBoxPixels = 0; // init num pixels in boxes
        var c = new Color(0,0,0,0); // init the box color
        var n = inputBoxes.length; // the number of input boxes
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids, draw rand pixels in each
        for (var b=0; b<n; b++) {
			// input lx,rx,by,ty on canvas
			lx = w*inputBoxes[b].lx;
			rx = w*inputBoxes[b].rx;
			by = h*inputBoxes[b].by;
			ty = h*inputBoxes[b].ty;           
			
            numBoxesPixels  = (rx-lx)*(ty-by); // projected box area 
            numBoxesPixels *= PIXEL_DENSITY;  // percentage of box area to render to pixels
            numBoxesPixels  = Math.round(numBoxesPixels);
           
            //console.log("num box pixels: "+numBoxesPixels);
            
			c.change(
                inputBoxes[b].diffuse[0]*255,
                inputBoxes[b].diffuse[1]*255,
                inputBoxes[b].diffuse[2]*255,
                255); // box diffuse color
            for (var p=0; p<numBoxesPixels; p++) {
                do {
                    x = Math.floor(Math.random()*w); 
                    y = Math.floor(Math.random()*h); 
                } while ( x<lx || x>rx || y>ty || y<by ) // inside the projection
                drawPixel(imagedata,x,y,c);
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: " + x);
                //console.log("y: " + y);
            } // end for pixels in box
        } // end for boxes
        context.putImageData(imagedata, 0, 0);
    } // end if boxes found
} // end draw rand pixels in input boxes

//draw 2d projections boxes from the JSON file at class github
function drawInputBoxesUsingPaths(context) {
    var inputBoxes = getInputBoxes();
    var n = inputBoxes.length; // the number of input boxes
	
    if (inputBoxes != String.null) { 
		var w = context.canvas.width;
        var h = context.canvas.height;
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var x  = 0; var y  = 0; // pixel coord init
        var lx = 0; var rx = 0; // input lx, rx from boxes.json
        var by = 0; var ty = 0; // input by, ty from boxes.json
        var fz = 0; var rz = 0; // input fz, rz from boxes.json
        //console.log("number of files: " + n);

        // Loop over the input files
        for (var b=0; b<n; b++) {
				
			// input lx,rx,by,ty on canvas
			lx = w*inputBoxes[b].lx;
			rx = w*inputBoxes[b].rx;
			by = h*inputBoxes[b].by;
			ty = h*inputBoxes[b].ty; 
        		
            context.fillStyle = 
            	"rgb(" + Math.floor(inputBoxes[b].diffuse[0]*255)
            	+","+ Math.floor(inputBoxes[b].diffuse[1]*255)
            	+","+ Math.floor(inputBoxes[b].diffuse[2]*255) +")"; // diffuse color
            
            var path=new Path2D();
            path.moveTo(lx,ty);
            path.lineTo(lx,by);
            path.lineTo(rx,by);
			path.lineTo(rx,ty);
            path.closePath();
            context.fill(path);

        } // end for files
    } // end if box files found
} // end draw input boxes


function vSub(a,b) { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
function vAdd(a,b) { return [a[0]+b[0], a[1]+b[1], a[2]+b[2]]; }
function vScale(a,s) { return [a[0]*s, a[1]*s, a[2]*s]; }
function vDot(a,b) { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]; }
function vCross(a,b) {
    return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
    ];
}
function vLength(a) { return Math.sqrt(vDot(a,a)); }
function vNormalize(a) {
    var len = vLength(a);
    return (len > 1e-12) ? [a[0]/len, a[1]/len, a[2]/len] : [0,0,0];
}
function clamp01(x) { return (x < 0) ? 0 : ((x > 1) ? 1 : x); }

const DEFAULTS = {
    canvasWidth: 512, canvasHeight: 512,
    eye: [0.5, 0.5, -0.5],
    viewdir: [0, 0, 1],
    upguide: [0, 1, 0],
    dist: 0.5,
    l: -0.5, r: 0.5, b: -0.5, t: 0.5,
    shadows: true
};

function getInputLights() {
    const INPUT_LIGHTS_URL =
        "https://ncsucgclass.github.io/prog1/lights.json";

    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", INPUT_LIGHTS_URL, false);
    httpReq.send(null);
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    }
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log("Unable to open input lights file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
}

function buildCameraBasis(viewdir, upguide) {
    var w = vNormalize(viewdir);
    var u = vNormalize(vCross(upguide, w));
    var v = vCross(w, u);
    return {u: u, v: v, w: w};
}

function intersectEllipsoid(eye, dir, ell) {
    var ex = eye[0]-ell.x, ey = eye[1]-ell.y, ez = eye[2]-ell.z;
    var dx = dir[0], dy = dir[1], dz = dir[2];

    if (ell.rotX) {
        var cosA = Math.cos(-ell.rotX), sinA = Math.sin(-ell.rotX);
        var ey2 = ey*cosA - ez*sinA, ez2 = ey*sinA + ez*cosA;
        ey = ey2; ez = ez2;
        var dy2 = dy*cosA - dz*sinA, dz2 = dy*sinA + dz*cosA;
        dy = dy2; dz = dz2;
    }

    var a2 = ell.a*ell.a, b2 = ell.b*ell.b, c2 = ell.c*ell.c;

    var A = (dx*dx)/a2 + (dy*dy)/b2 + (dz*dz)/c2;
    var B = 2 * ( (ex*dx)/a2 + (ey*dy)/b2 + (ez*dz)/c2 );
    var C = (ex*ex)/a2 + (ey*ey)/b2 + (ez*ez)/c2 - 1;

    var disc = B*B - 4*A*C;
    if (disc < 0) return null;

    var sq = Math.sqrt(disc);
    var t1 = (-B - sq) / (2*A);
    var t2 = (-B + sq) / (2*A);
    const EPS = 1e-6;

    var lo = Math.min(t1, t2), hi = Math.max(t1, t2);

    function passesClip(t) {
        if (!ell.clip) return true;
        var p = vAdd(eye, vScale(dir, t));
        var side = vDot(vSub(p, ell.clip.point), ell.clip.normal);
        return side <= 0;
    }

    if (lo > EPS && passesClip(lo)) return lo;
    if (hi > EPS && passesClip(hi)) return hi;
    return null;
}

function ellipsoidNormal(p, ell) {
    var rx = p[0]-ell.x, ry = p[1]-ell.y, rz = p[2]-ell.z;
    if (ell.rotX) {
        var cosA = Math.cos(-ell.rotX), sinA = Math.sin(-ell.rotX);
        var ry2 = ry*cosA - rz*sinA, rz2 = ry*sinA + rz*cosA;
        ry = ry2; rz = rz2;
    }
    var n = vNormalize([
        2*rx / (ell.a*ell.a),
        2*ry / (ell.b*ell.b),
        2*rz / (ell.c*ell.c)
    ]);
    if (ell.rotX) {
        var cosB = Math.cos(ell.rotX), sinB = Math.sin(ell.rotX);
        var ny = n[1]*cosB - n[2]*sinB, nz = n[1]*sinB + n[2]*cosB;
        n = [n[0], ny, nz];
    }
    return ell.flipNormal ? vScale(n, -1) : n;
}

function intersectTriangle(eye, dir, v0, v1, v2) {
    const EPS = 1e-8;
    var edge1 = vSub(v1, v0);
    var edge2 = vSub(v2, v0);
    var h = vCross(dir, edge2);
    var a = vDot(edge1, h);
    if (Math.abs(a) < EPS) return null;

    var f = 1.0 / a;
    var s = vSub(eye, v0);
    var u = f * vDot(s, h);
    if (u < 0 || u > 1) return null;

    var q = vCross(s, edge1);
    var v = f * vDot(dir, q);
    if (v < 0 || (u + v) > 1) return null;

    var t = f * vDot(edge2, q);
    return (t > 1e-6) ? t : null;
}

function buildTriangleList(triangleFiles) {
    var list = [];
    if (!triangleFiles || triangleFiles == String.null) return list;
    for (var f = 0; f < triangleFiles.length; f++) {
        var file = triangleFiles[f];
        for (var t = 0; t < file.triangles.length; t++) {
            var idx = file.triangles[t];
            list.push({
                v0: file.vertices[idx[0]],
                v1: file.vertices[idx[1]],
                v2: file.vertices[idx[2]],
                material: file.material
            });
        }
    }
    return list;
}

function triangleNormal(tri, dir) {
    var n = vNormalize(vCross(vSub(tri.v1, tri.v0), vSub(tri.v2, tri.v0)));
    return (vDot(n, dir) > 0) ? vScale(n, -1) : n;
}

function intersectScene(origin, dir, ellipsoids, triangles, skipObj) {
    var bestT = null, bestObj = null, bestKind = null;

    for (var e = 0; e < ellipsoids.length; e++) {
        if (ellipsoids[e] === skipObj) continue;
        var t = intersectEllipsoid(origin, dir, ellipsoids[e]);
        if (t !== null && (bestT === null || t < bestT)) {
            bestT = t; bestObj = ellipsoids[e]; bestKind = "ellipsoid";
        }
    }

    for (var tr = 0; tr < triangles.length; tr++) {
        if (triangles[tr] === skipObj) continue;
        var tt = intersectTriangle(origin, dir, triangles[tr].v0, triangles[tr].v1, triangles[tr].v2);
        if (tt !== null && (bestT === null || tt < bestT)) {
            bestT = tt; bestObj = triangles[tr]; bestKind = "triangle";
        }
    }

    return (bestObj === null) ? null : {t: bestT, obj: bestObj, kind: bestKind};
}

function isShadowed(shadowOrigin, lightPos, ellipsoids, triangles, skipObj) {
    var toLight = vSub(lightPos, shadowOrigin);
    var distToLight = vLength(toLight);
    var dir = vScale(toLight, 1/distToLight);
    var hit = intersectScene(shadowOrigin, dir, ellipsoids, triangles, skipObj);
    return (hit !== null && hit.t < distToLight);
}

function shadeIntersection(p, n, eyePos, mat, lights, ellipsoids, triangles, selfObj, shadowsOn) {
    var rgb = [0,0,0];
    var shadowOrigin = vAdd(p, vScale(n, 1e-4));
    var V = vNormalize(vSub(eyePos, p));

    for (var li = 0; li < lights.length; li++) {
        var light = lights[li];
        var lightPos = [light.x, light.y, light.z];

        for (var k = 0; k < 3; k++) rgb[k] += light.ambient[k] * mat.ambient[k];

        var blocked = shadowsOn && isShadowed(shadowOrigin, lightPos, ellipsoids, triangles, selfObj);
        if (blocked) continue;

        var L = vNormalize(vSub(lightPos, p));
        var H = vNormalize(vAdd(L, V));
        var nDotL = Math.max(0, vDot(n, L));
        var nDotH = Math.max(0, vDot(n, H));
        var specTerm = (nDotH > 0) ? Math.pow(nDotH, mat.n) : 0;

        for (var k2 = 0; k2 < 3; k2++) {
            rgb[k2] += light.diffuse[k2]  * mat.diffuse[k2]  * nDotL;
            rgb[k2] += light.specular[k2] * mat.specular[k2] * specTerm;
        }
    }

    return [clamp01(rgb[0]), clamp01(rgb[1]), clamp01(rgb[2])];
}

function rayCastEllipsoids(context, params) {
    params = params || {};
    var eye     = params.eye     || DEFAULTS.eye;
    var viewdir = params.viewdir || DEFAULTS.viewdir;
    var upguide = params.upguide || DEFAULTS.upguide;
    var dist    = (params.dist !== undefined) ? params.dist : DEFAULTS.dist;
    var l = (params.l !== undefined) ? params.l : DEFAULTS.l;
    var r = (params.r !== undefined) ? params.r : DEFAULTS.r;
    var b = (params.b !== undefined) ? params.b : DEFAULTS.b;
    var t = (params.t !== undefined) ? params.t : DEFAULTS.t;
    var lit      = (params.lit !== undefined) ? params.lit : true;
    var shadows  = (params.shadows !== undefined) ? params.shadows : DEFAULTS.shadows;
    var includeTriangles = (params.includeTriangles !== undefined) ? params.includeTriangles : true;

    var ellipsoids = getInputEllipsoids();
    if (ellipsoids == String.null) ellipsoids = [];
    var triangles = includeTriangles ? buildTriangleList(getInputTriangles()) : [];
    if (ellipsoids.length === 0 && triangles.length === 0) return;

    var lights = params.lights;
    if (lit && !lights) {
        lights = getInputLights();
        if (lights == String.null) lights = [];
    }

    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    var c = new Color(0,0,0,255);

    var basis = buildCameraBasis(viewdir, upguide);
    var windowCenter = vAdd(eye, vScale(basis.w, dist));

    for (var row = 0; row < h; row++) {
        var winY = t - (t - b) * (row + 0.5) / h;
        for (var col = 0; col < w; col++) {
            var winX = l + (r - l) * (col + 0.5) / w;

            var pointOnWindow = vAdd(windowCenter,
                vAdd(vScale(basis.u, winX), vScale(basis.v, winY)));
            var dir = vNormalize(vSub(pointOnWindow, eye));

            var hit = intersectScene(eye, dir, ellipsoids, triangles, null);

            if (hit !== null) {
                var mat = (hit.kind === "ellipsoid") ? hit.obj : hit.obj.material;
                if (!lit) {
                    c.change(mat.diffuse[0]*255, mat.diffuse[1]*255, mat.diffuse[2]*255, 255);
                } else {
                    var hitPoint = vAdd(eye, vScale(dir, hit.t));
                    var normal = (hit.kind === "ellipsoid")
                        ? ellipsoidNormal(hitPoint, hit.obj)
                        : triangleNormal(hit.obj, dir);
                    var shaded = shadeIntersection(hitPoint, normal, eye, mat, lights, ellipsoids, triangles, hit.obj, shadows);
                    c.change(shaded[0]*255, shaded[1]*255, shaded[2]*255, 255);
                }
                drawPixel(imagedata, col, row, c);
            }
        }
    }

    context.putImageData(imagedata, 0, 0);
}

function readSceneParamsFromUI() {
    function num(id, fallback) {
        var el = document.getElementById(id);
        if (!el || el.value === "") return fallback;
        var val = parseFloat(el.value);
        return isNaN(val) ? fallback : val;
    }
    var params = {
        eye:     [num("eyeX", DEFAULTS.eye[0]), num("eyeY", DEFAULTS.eye[1]), num("eyeZ", DEFAULTS.eye[2])],
        viewdir: [num("lookX", DEFAULTS.viewdir[0]), num("lookY", DEFAULTS.viewdir[1]), num("lookZ", DEFAULTS.viewdir[2])],
        upguide: [num("upX", DEFAULTS.upguide[0]), num("upY", DEFAULTS.upguide[1]), num("upZ", DEFAULTS.upguide[2])],
        dist: DEFAULTS.dist,
        l: num("winLeft", DEFAULTS.l), r: num("winRight", DEFAULTS.r),
        b: num("winBottom", DEFAULTS.b), t: num("winTop", DEFAULTS.t)
    };
    var shadowEl = document.getElementById("shadowsOn");
    params.shadows = shadowEl ? shadowEl.checked : DEFAULTS.shadows;
    var trianglesEl = document.getElementById("trianglesOn");
    params.includeTriangles = trianglesEl ? trianglesEl.checked : false;
    return params;
}

function renderFromUI() {
    var canvas = document.getElementById("viewport");
    var widthEl = document.getElementById("canvasWidth");
    var heightEl = document.getElementById("canvasHeight");
    canvas.width  = widthEl  ? (parseInt(widthEl.value, 10)  || DEFAULTS.canvasWidth)  : DEFAULTS.canvasWidth;
    canvas.height = heightEl ? (parseInt(heightEl.value, 10) || DEFAULTS.canvasHeight) : DEFAULTS.canvasHeight;

    var context = canvas.getContext("2d");
    rayCastEllipsoids(context, readSceneParamsFromUI());
}

function rotatePointAroundX(p, pivot, angleRad) {
    var cosA = Math.cos(angleRad), sinA = Math.sin(angleRad);
    var dy = p[1]-pivot[1], dz = p[2]-pivot[2];
    return [p[0], pivot[1] + (dy*cosA - dz*sinA), pivot[2] + (dy*sinA + dz*cosA)];
}
function rotateDirAroundX(v, angleRad) {
    var cosA = Math.cos(angleRad), sinA = Math.sin(angleRad);
    return [v[0], v[1]*cosA - v[2]*sinA, v[1]*sinA + v[2]*cosA];
}

function buildPokeballScene(openDeg, lightBoost) {
    if (openDeg === undefined) openDeg = 0;
    if (lightBoost === undefined) lightBoost = 1;
    var ballCenter = [0.5, 0.5, 0.55];
    var outerR = 0.22, innerR = outerR * 0.85;

    var hinge = [ballCenter[0], ballCenter[1], ballCenter[2] + outerR];
    var topAngle = openDeg * Math.PI / 180;
    var botAngle = -openDeg * Math.PI / 180;

    var topCenter = rotatePointAroundX(ballCenter, hinge, topAngle);
    var botCenter = rotatePointAroundX(ballCenter, hinge, botAngle);

    var topClipNormal = rotateDirAroundX([0,-1,0], topAngle);
    var botClipNormal = rotateDirAroundX([0, 1,0], botAngle);

    function shell(center, radius, clipNormal, flip, amb, diff, spec, n) {
        return {
            x: center[0], y: center[1], z: center[2],
            a: radius, b: radius, c: radius,
            ambient: amb, diffuse: diff, specular: spec, n: n,
            clip: {point: center, normal: clipNormal},
            flipNormal: flip
        };
    }

    var redOuter  = shell(topCenter, outerR, topClipNormal, false,
        [0.55,0.15,0.14], [0.75,0.05,0.05], [0.4,0.4,0.4], 20);
    var redInner  = shell(topCenter, innerR, topClipNormal, true,
        [0.4,0.34,0.3], [0.7,0.6,0.56], [0.25,0.25,0.25], 10);

    var whiteOuter = shell(botCenter, outerR, botClipNormal, false,
        [0.3,0.3,0.28], [0.85,0.85,0.82], [0.5,0.5,0.5], 25);
    var whiteInner = shell(botCenter, innerR, botClipNormal, true,
        [0.4,0.34,0.3], [0.7,0.6,0.56], [0.25,0.25,0.25], 10);

    var bandTiltFrac = 0.15;
    var hingeBand = {
        x: topCenter[0], y: topCenter[1], z: topCenter[2],
        a: outerR*1.08, b: 0.02, c: outerR*1.08, rotX: topAngle*bandTiltFrac,
        ambient: [0.03,0.03,0.03], diffuse: [0.04,0.04,0.04],
        specular: [0.25,0.25,0.25], n: 12
    };
    var buttonOffset = rotateDirAroundX([0, 0, -(outerR*1.08 + 0.02)], topAngle*bandTiltFrac);
    var whiteButton = {
        x: topCenter[0]+buttonOffset[0], y: topCenter[1]+buttonOffset[1], z: topCenter[2]+buttonOffset[2],
        a: 0.045, b: 0.045, c: 0.012, rotX: topAngle*bandTiltFrac,
        ambient: [0.15,0.15,0.14], diffuse: [0.85,0.85,0.82],
        specular: [0.5,0.5,0.5], n: 20
    };

    var bulb = {
        x: ballCenter[0], y: ballCenter[1], z: 0.48, a: 0.045, b: 0.045, c: 0.045,
        ambient: [0.4,0.38,0.3], diffuse: [1,0.95,0.75], specular: [1,1,0.9], n: 6
    };

    var lights = [
        {x: ballCenter[0], y: ballCenter[1], z: 0.48,
         ambient: vScale([0.3,0.3,0.25], lightBoost),
         diffuse: vScale([1,0.95,0.8], lightBoost),
         specular: vScale([1,1,0.9], lightBoost)},
        {x: 0.5, y: ballCenter[1], z: -0.3,
         ambient: vScale([0.1,0.1,0.1], lightBoost),
         diffuse: vScale([0.55,0.55,0.52], lightBoost),
         specular: vScale([0.4,0.4,0.4], lightBoost)}
    ];

    return {
        ellipsoids: [redOuter, redInner, whiteOuter, whiteInner, hingeBand, whiteButton, bulb],
        lights: lights
    };
}

function rayCastPokeball(context, openDeg, lightBoost, bgLevel, whiteout) {
    if (bgLevel === undefined) bgLevel = 0;
    if (whiteout === undefined) whiteout = 0;
    var scene = buildPokeballScene(openDeg, lightBoost);
    var w = context.canvas.width, h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    for (var i = 0; i < imagedata.data.length; i += 4) {
        imagedata.data[i]   = bgLevel;
        imagedata.data[i+1] = bgLevel;
        imagedata.data[i+2] = bgLevel;
        imagedata.data[i+3] = 255;
    }

    var c = new Color(0,0,0,255);
    var eye = DEFAULTS.eye, viewdir = DEFAULTS.viewdir, upguide = DEFAULTS.upguide;
    var basis = buildCameraBasis(viewdir, upguide);
    var windowCenter = vAdd(eye, vScale(basis.w, DEFAULTS.dist));

    for (var row = 0; row < h; row++) {
        var winY = DEFAULTS.t - (DEFAULTS.t - DEFAULTS.b) * (row + 0.5) / h;
        for (var col = 0; col < w; col++) {
            var winX = DEFAULTS.l + (DEFAULTS.r - DEFAULTS.l) * (col + 0.5) / w;
            var pointOnWindow = vAdd(windowCenter,
                vAdd(vScale(basis.u, winX), vScale(basis.v, winY)));
            var dir = vNormalize(vSub(pointOnWindow, eye));

            var hit = intersectScene(eye, dir, scene.ellipsoids, [], null);
            if (hit !== null) {
                var hitPoint = vAdd(eye, vScale(dir, hit.t));
                var normal = ellipsoidNormal(hitPoint, hit.obj);
                var shaded = shadeIntersection(hitPoint, normal, eye, hit.obj,
                    scene.lights, scene.ellipsoids, [], hit.obj, true);
                if (whiteout > 0) {
                    shaded[0] += (1 - shaded[0]) * whiteout;
                    shaded[1] += (1 - shaded[1]) * whiteout;
                    shaded[2] += (1 - shaded[2]) * whiteout;
                }
                c.change(shaded[0]*255, shaded[1]*255, shaded[2]*255, 255);
                drawPixel(imagedata, col, row, c);
            }
        }
    }

    context.putImageData(imagedata, 0, 0);
}

var revealImage = new Image();
revealImage.src = "prof watson outline.png";

function drawReveal(context) {
    var w = context.canvas.width, h = context.canvas.height;
    context.fillStyle = "white";
    context.fillRect(0, 0, w, h);
    if (revealImage.complete) {
        context.drawImage(revealImage, 0, 0, w, h);
    } else {
        revealImage.onload = function () { context.drawImage(revealImage, 0, 0, w, h); };
    }
}

function renderMakeItYourOwn() {
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    var DELAY_MS = 1000;
    var OPEN_MS = 1100;
    var BRIGHT_MS = 1300;
    var ANGLE_START = 0, ANGLE_OPEN = 45;
    var startTime = null;

    function frame(now) {
        if (startTime === null) startTime = now;
        var t = now - startTime;

        if (t < DELAY_MS) {
            rayCastPokeball(context, ANGLE_START, 1, 0, 0);
            requestAnimationFrame(frame);
        } else if (t < DELAY_MS + OPEN_MS) {
            var openT = clamp01((t - DELAY_MS) / OPEN_MS);
            var angle = ANGLE_START + openT * (ANGLE_OPEN - ANGLE_START);
            rayCastPokeball(context, angle, 1, 0, 0);
            requestAnimationFrame(frame);
        } else if (t < DELAY_MS + OPEN_MS + BRIGHT_MS) {
            var brightT = clamp01((t - DELAY_MS - OPEN_MS) / BRIGHT_MS);
            var boost = 1 + brightT * brightT * 5;
            var bgLevel = Math.round(255 * brightT);
            rayCastPokeball(context, ANGLE_OPEN, boost, bgLevel, brightT);
            requestAnimationFrame(frame);
        } else {
            drawReveal(context);
        }
    }

    requestAnimationFrame(frame);
}

function main() {

    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    renderFromUI();

    document.addEventListener("keydown", function (e) {
        if (e.code === "Space" || e.key === " ") {
            e.preventDefault();
            renderMakeItYourOwn();
        }
    });
}
