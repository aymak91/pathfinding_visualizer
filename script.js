const LEN = 10;
const WALL = 'rgb(255, 255, 255)';
const ORIGINAL = 'rgb(52, 52, 52)';
const PATH = "rgb(252, 227, 3)";

function setup() {
    let maze_container = document.getElementById('maze_container');

    for (let i=0; i<LEN; i++) {
        let row = document.createElement('div');
        row.className = 'row row' + (i+1);
        row.id = 'row' + (i+1);
         for (let j=0; j<LEN; j++) {
            let node = document.createElement('div');
            let nodeNum = ((i*LEN)+(j+1))
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

function resetPath() {
    for (let i=2; i<100; i++) {
        let node = document.getElementById('node' + i);
        if (node.style.backgroundColor === PATH) node.style.backgroundColor = ORIGINAL;
    }
}

async function solveMaze() {
    resetPath();

    let maze = [];

    for (let i=0; i<LEN; i++) {
        maze[i] = new Array(LEN).fill(0);

    }

    let nodeVal = 1;

    for (let row=0; row<LEN; row++) {
        for (let col=0; col<LEN; col++) {
            const cell = document.getElementById('node' + nodeVal).style.backgroundColor;
            maze[row][col] = cell === WALL ? -1 : nodeVal;
            nodeVal++;
        }
    }

    const directions = [[1,0], [0,1], [-1,0], [0,-1]];
    
    const visited = [];
    const prev = new Array(LEN*LEN).fill(0);

    for (let i=0; i<LEN; i++) {
        visited[i] = new Array(LEN).fill(false);
    }
    
    const queue = [[0,0]];

    let solved = false;

    while (queue.length > 0) {
        const [row, col] = queue.shift();
        const node = maze[row][col];

        visited[row][col] = true;

        if (node === 100) {
            solved = true;
            break;
        }

        for (let i=0; i<directions.length; i++) {
            const nRow = directions[i][0] + row;
            const nCol = directions[i][1] + col;

            if (inBounds(maze, nRow, nCol) && maze[nRow][nCol] != -1 && !visited[nRow][nCol]) {
                queue.push([nRow, nCol]);
                visited[nRow][nCol] = true
                prev[maze[nRow][nCol]-1] = node-1;
            }
        }

    }

    if (!solved) {
        alert("There is no solution!");
        return;
    }

    let previous = 99;

    while (true) {
        
        let node = prev[previous];
        if (node === 0) break;

        try {
            await delay(300)
            document.getElementById('node'+(node+1)).style.backgroundColor = PATH;
        } catch(err) {
            break
        }

        
        previous = node;
    }
}

function inBounds(grid, row, col) {
    const rowInBound = row >= 0 && row < grid.length;
    const colInBound = col >= 0 && col < grid[0].length;
    return rowInBound && colInBound;
}

function delay(time) {
    return new Promise(res => {
      setTimeout(res,time)
    })
}
