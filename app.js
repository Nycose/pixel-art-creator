const pixelCanvas = document.getElementById('pixel-canvas');
const sizePickerForm = document.getElementById('size-picker');
const eraseCanvasButton = document.getElementById('erase-button');
const fillCanvasButton = document.getElementById('fill-button');
const resetCanvasButton = document.getElementById('reset-button');
const colorPicker = document.getElementById('color-picker');

/* Creates a table based on canvas size user has entered */
function makeGrid(event) {
  const height = document.getElementById('inputHeight').value; // stores the current height and width in the size picker fields
  const width = document.getElementById('inputWidth').value;

  while (pixelCanvas.firstChild != null) { // clears canvas
    pixelCanvas.removeChild(pixelCanvas.firstChild);
  }

  for(let rowIndex = 1; rowIndex <= height; rowIndex++) { // create rows
    const row = document.createElement('tr');
    pixelCanvas.appendChild(row);

    for(let colIndex = 1; colIndex <= width; colIndex++) { // create columns
      const col = document.createElement('td');
      row.appendChild(col);
    }
  }
}

// Invoke makeGrid function when form is submitted
sizePickerForm.addEventListener('submit', function() {
  event.preventDefault(); // prevent the page from loading after a form submission event
  makeGrid();
});

// Erases colors on canvas. Loops through each cell of each row and changes the bg to white
eraseCanvasButton.addEventListener('click', function() {
  for(let rowIndex = 0; rowIndex <= pixelCanvas.childElementCount - 1; rowIndex++) {
    for(let colIndex = 0; colIndex <= pixelCanvas.children[rowIndex].childElementCount - 1; colIndex++) {
      pixelCanvas.children[rowIndex].children[colIndex].style.backgroundColor = "white";
    }
  }
});

// Change entire bg color of table. Changes bg color of each <td> in table to the color selected
fillCanvasButton.addEventListener('click', function() {
  for(let rowIndex = 0; rowIndex <= pixelCanvas.childElementCount - 1; rowIndex++) {
    for(let colIndex = 0; colIndex <= pixelCanvas.children[rowIndex].childElementCount - 1; colIndex++) {
      pixelCanvas.children[rowIndex].children[colIndex].style.backgroundColor = colorPicker.value;
    }
  }
});

// Resets canvas and page to default state
resetCanvasButton.addEventListener('click', function() {
  pixelCanvas.innerHTML = "";
  document.getElementById('inputHeight').value = 50;
  document.getElementById('inputWidth').value = 50;
  colorPicker.value = "#5eb3ce";
});

// Change bg color of the specific <td> that's clicked
pixelCanvas.addEventListener('click', function(event) {
  if(event.target.tagName === 'TD') {
    let cell = event.target; // store specific cell that's clicked
    cell.style.backgroundColor = colorPicker.value; //set background on target cell
  }
})

// Allows click and drag bg coloring.
let down = false; // Tracks if the mouse pointer is pressed
pixelCanvas.addEventListener('mousedown', function(e) {
	down = true;
	pixelCanvas.addEventListener('mouseup', function() {
		down = false;
	});
  // Ensures cells won't be colored if grid is left while pointer is held down
  pixelCanvas.addEventListener('mouseleave', function() {
    down = false;
  });

  // If a <td> generates a mouseover event AND the mouse pointer is pressed/clicked, change the bg color of the cell.
  pixelCanvas.addEventListener('mouseover', function(e) {
  	if (down) {
      if (e.target.tagName === 'TD') { // This inner IF statement prevents entire <tr> or <table> from being colored
      	e.target.style.backgroundColor = colorPicker.value;
      }
    }
  });
});
