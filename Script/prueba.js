// When true, moving the mouse draws on the canvas
let seleccion = false;
let x, y;

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup

function seleccionarCarta (e){
    
    isDrawing = true;
}

function moverCarta (e){
    if (isDrawing) {
        drawLine(x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
}

function dejarCarta(e){
    if (isDrawing) {
        drawLine(x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
}

