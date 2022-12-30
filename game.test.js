const { countNeighbors, updateField, printField,saveOutput } = require('./conway_game_of_life')
const fs = require('fs');
test('neighbors returned after using countNeighbors', () => {
    //  no  neighbors
    field = [[0,0,0,0], [0,0,0,1], [0,0,0,1], [0,0,0,0]];
    expect(countNeighbors(field, 1, 1)).toBe(0);

    // two  neighbors
    field = [[0,0,0,0], [0,0,1,0], [0,1,0,0], [0,0,0,0]];
    expect(countNeighbors(field, 2, 2)).toBe(2);

    //three neighbors
    field = [[1,1,1,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
    expect(countNeighbors(field, 1, 1)).toBe(3);
});


test('updateField  updates  the field', () => {
    field = [[0, 1, 0, 0, 0], [0, 1, 0, 0, 1], [0, 0, 1, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 0]];
    expectedField = [[1, 0, 0, 0, 0], [1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    expect(updateField(field)).toEqual(expectedField);
});



test('0 , 1 field to "x", "." ', () => {
    field = [[1, 0, 0, 0, 0], [1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    expectedOutput = "x....\nxxx..\nx..x.\n.....\n.....";
    expect(printField(field)).toEqual(expectedOutput);
})

test('test if output file is written in correctly', () => {
    //test for case when input file has 2 generations
    field = [
        [ 1, 0, 0, 0, 0 ],
        [ 1, 0, 1, 0, 0 ],
        [ 1, 0, 1, 0, 1 ],
        [ 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0 ]
      ]
    expectedOutput = fs.readFileSync('output.txt', 'utf8');
    expect(printField(field)).toEqual(expectedOutput)
})