function createBoard(n) {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < n; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell ' + ((i + j) % 2 === 0 ? 'white' : 'black');
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function placeQueens(solution) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    solution.forEach((col, row) => {
        const index = row * solution.length + col;
        cells[index].innerHTML = 'Q';
    });
}

function solveNQueens() {
    const n = parseInt(document.getElementById('nInput').value);
    if (isNaN(n) || n < 4 || n > 12) {
        alert('Please enter a valid number between 4 and 12.');
        return;
    }

    createBoard(n);

    const solutions = [];
    const board = Array(n).fill(0).map(() => Array(n).fill(false));

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col]) return false;
            if (col - (row - i) >= 0 && board[i][col - (row - i)]) return false;
            if (col + (row - i) < n && board[i][col + (row - i)]) return false;
        }
        return true;
    }

    function solve(row) {
        if (row === n) {
            solutions.push(board.map(row => row.indexOf(true)));
            return true;
        }
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = true;
                solve(row + 1);
                board[row][col] = false;
            }
        }
        return false;
    }

    solve(0);

    if (solutions.length > 0) {
        placeQueens(solutions[0]);
    } else {
        alert('No solutions found.');
    }
}
