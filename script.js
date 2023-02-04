let WALL = 'rgb(255, 255, 255)';
let ORIGINAL = 'rgb(52, 52, 52)';

function setup() {
    let maze_container = document.getElementById('maze_container');

    for (let i=0; i<10; i++) {
        let row = document.createElement('div');
        row.className = 'row row' + (i+1);
        row.id = 'row' + (i+1);
         for (let j=0; j<10; j++) {
            let node = document.createElement('div');
            let nodeNum = ((i*10)+(j+1))
            node.className = 'node node' + nodeNum;
            node.id = 'node' + nodeNum;

            if (nodeNum != 1 && nodeNum != 100) {
                node.style.backgroundColor = ORIGINAL;
                node.onclick = function() {
                    clicked(this.id);
                }
            }
            row.appendChild(node);
        }
        maze_container.appendChild(row);
    }
}

function clicked(elementId) {
    let node = document.getElementById(elementId);
    let bgColor = node.style.backgroundColor;

    node.style.backgroundColor = bgColor === WALL ? ORIGINAL : WALL;

}

function reset() {
    for (let i=2; i<100; i++) {
        let node = document.getElementById('node' + i);
        node.style.backgroundColor = ORIGINAL;
    }
}