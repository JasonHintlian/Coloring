/*
 * Worcester State University 
 * CS_401 Software Developement 
 * Coloring Team: Jason Hintlian, Beto ??????
 */

// color variables 
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#a5252a";
var colorBlack = "#000000";
var colorBlue = "#0000ff";
var colorPink = "#ffc0cb";
var colorOrange = "#ffa500";
var colorRed = "#ff0000";
var colorWhite = "#ffffff";

//size variable

var sizeSmall = 2;
var sizeMedium = 10;
var sizeLarge = 30;

// holds the coloring page
var outlineImage = new Image();



// holds the current color
var currentColor = colorPurple;
var currentSize = sizeSmall;

//var currentState = new Red(this);
var myCanvas, context;

window.onload = function() {



    // Get the canvas element and its drawing context 
    myCanvas = document.getElementById('drawingCanvas');

    // make sure canvas loads  
    if (!myCanvas) {
        alert('Error: I cannot find the canvas element!');
        return;
    }
    // make sure we have context handle
    if (!myCanvas.getContext) {
        alert('Error: no canvas.getContext!');
        return;
    }

    // Get the 2D canvas context.
    context = myCanvas.getContext('2d');
    if (!context) {
        alert('Error: failed to getContext!');
        return;
    }
    // sets the aspect ratio, divisions just for readabilaty 2:1 4:3 16:9 etc...
    var widthToHeight = 16 / 9;

    // set canvas width to 80% of the window
    var canvasToWindow = .75;

    // gets the browser window dimensions
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    // get our canvas dimensions 
    var canvasWidth = viewportWidth * canvasToWindow;
    var canvasHeight = canvasWidth / widthToHeight;

    // set the the canvas dimensions
    myCanvas.setAttribute('width', canvasWidth);
    myCanvas.setAttribute('height', canvasHeight);

    // get handle 'c' for jqeury function soon to remove maybe
    //myCanvas.setAttribute('id', 'c');

    // set canvas background color white its magic
    context.fillStyle = '#ffffff';
    // fill the canvas with background color
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    //myCanvas.style.backgroundImage = defaultBackground;
    outlineImage.src = "assets/colorpage.png";

    // this makes sure the image is loaded before we move on
    // else the image will not be displayed

    outlineImage.onload = function() {
        // this is how you draw an image to canvas with own dimensions 0,0, x y are coordinates
        context.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);
    };


    // handles all canvas events
    function eventCanvas(event) {
        event._x = event.layerX;
        event._y = event.layerY;

        // Call the event handler of the tool. note: brushes on page represent sizes not tools
        // for future implementation of more tool
        var func = tool[event.type];
        if (func) {
            func(event);
        }
    }


        function init() {

            // plans to implement a state patern to handle tol selection in the future
            // var currentState = new Small(this);

            // The pencil tool instance.


            tool = new marker();

            // Attach the mousedown, mousemove and mouseup event listeners.
            myCanvas.addEventListener('mousedown', eventCanvas, false);
            myCanvas.addEventListener('mousemove', eventCanvas, false);
            myCanvas.addEventListener('mouseup', eventCanvas, false);
        }

// state has no funtion yet for state patern to come making many change still
        var marker = function(state) {
            var tool = this;
            this.started = false;

            // This is called when you start holding down the mouse button.
            // This starts the pencil drawing.
            this.mousedown = function(event) {
                context.beginPath();
                context.moveTo(event._x, event._y);
                tool.started = true;
            };

            // This function is called every time you move the mouse. it only 
            // draws if the tool.started state is set to true .
            this.mousemove = function(event) {
                context.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);
                if (tool.started) {
                    // try removing the '_' see what happens weird
                    context.lineTo(event._x, event._y);
                    context.strokeStyle = currentColor;
                    context.lineWidth = currentSize;
                    context.stroke();
                    context.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);

                }
            };

            // This is called when you release the mouse button.
            this.mouseup = function(event) {
                if (tool.started) {
                    tool.mousemove(event);
                    tool.started = false;
                }
            };
        };



        // Implementation to come

        var fillBucket = function(state) {

            var tool = this;
            this.started = false;

            // implementaion will only require the mouse down event paint fill logic to come

            this.state = state;
            this.mousedown = function(event) {
                context.beginPath();
                context.moveTo(event._x, event._y);
                tool.started = true;
            };
        };
        init();
    };
// function for setting a new color
    var setColor = function(color) {
        currentColor = color;
    };

// function for setting a new color
    var setSize = function(size) {
        currentSize = size;
    };

// not yet implemented 
    var setBackground = function(imagePath) {
        myCanvas.style.backgroundImage = imagePath;
};