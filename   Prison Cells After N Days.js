// There are 8 prison cells in a row, and each cell is either occupied or vacant.

// Each day, whether the cell is occupied or vacant changes according to the following rules:

// If a cell has two adjacent neighbors that are both occupied or both vacant, then the cell becomes occupied.
// Otherwise, it becomes vacant.
// (Note that because the prison is a row, the first and the last cells in the row can't have two adjacent neighbors.)

// We describe the current state of the prison in the following way: cells[i] == 1 if the i-th cell is occupied, else cells[i] == 0.

// Given the initial state of the prison, return the state of the prison after N days (and N such changes described above.)

//naive
var prisonAfterNDays = function(cells, N) {
    for (let i = 0; i < N; i++) {
        cells = cells.map((d, i) => {
            if (i == 0 || i == cells.length - 1) return 0;
            return cells[i - 1] === cells[i + 1];
        });
    }
    return cells;
};
//bitwise
var prisonAfterNDays = function(cells, N) {
    cells = cells.reduce(
        (acc, curr, i) => acc + curr * 2 ** (cells.length - 1 - i)
    );
    let ones=(2 ** 6 - 1) << 1
    for (let i = 0; i <= N; i++) {
        // cells = (cells >>> 1) ^ (cells << 1) ^ ones
        // cells&=ones

        cells=( ~((cells>>1 )^ (cells <<1) ))&ones
        if(i>N-2)console.log(cells.toString(2))
    }

    cells = cells
        .toString(2)
        .split('')
        .map(d => Number(d));
        
    while (cells.length < 8) cells.unshift(0);

    return cells;
};
console.log(prisonAfterNDays([1, 0, 0, 1, 0, 0, 1, 0], 1000000000));
