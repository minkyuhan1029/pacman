/**
 * Write a file docstring here
 *
 * Author: Min Kyu Han
 */

/**
 * Use the function below to format your input/output arguments. Be sure not change the order of the elements in the output array.
 * Remember that code organization is very important to us, so we encourage the use of helper fuctions/separate files as you see fit.
 * Input:
 *      1. inputFile (String) = contains the name of a text file you need to read that is in the same directory, includes the ".txt" extension
 *         (ie. "input.txt")
 * Output:
 *      1. array containing the final x position of Pacman, final y position of Pacman, and total number of
 *         coins collected in that order (ie. [finalXPos, finalYPos, coinsCollected])
 */
const fs = require('fs');

function createMatrix(dimensions, initial, walls, matrix){
    // Creates a matrix with the dimensions given
    // If 10x10 dimensions, range of x,y is (0-9)

    // Edge case when initial coordinate is not within dimensions
    if(initial[0] > dimensions[0]-1 || initial[1] > dimensions[1]-1 || initial[0] < 0 || initial[1] < 0){
        return false;
    }

    for(let i = 0; i < dimensions[1]; i++){
        let row = [];
        for(let j = 0; j < dimensions[0]; j++){
            row.push(0)
        }
        matrix.push(row)
    }
    // Assign a "Start" value from the initial coordinates given
    // matrix[y][x]

    matrix[initial[1]][initial[0]] = 'Start'
    for(let i = 0; i < walls.length; i++){
        let wall = walls[i]
        if(wall === initial){
            // Edge case if wall is on the initial coordinates
            return false;
        }
        matrix[wall[1]][wall[0]] = "Wall";
    }
    return true;
}

function traverseMatrix(movement, initial, matrix){
    let coinsCollected = 0;
    let result = initial;
    for(let i = 0; i < movement.length; i++){
        let direction = movement[i];
        if(direction === 'N'){
            let north = result[1] + 1
            if(north > matrix.length-1 || matrix[north][result[0]] === "Wall"){
                continue
            }
            if(matrix[north][result[0]] === 0){
                coinsCollected++;
                matrix[north][result[0]] = 'Visited'
            }
            result[1]++
        }
        else if(direction === 'S'){
            let south = result[1] - 1
            if(south < 0 || matrix[south][result[0]] === "Wall"){
                continue
            }
            if(matrix[south][result[0]] === 0){
                coinsCollected++;
                matrix[south][result[0]] = 'Visited'
            }
            result[1]--
        }
        else if(direction === 'E'){
            let east = result[0] + 1
            if(east > matrix[0].length-1 || matrix[result[1]][east] === "Wall"){
                continue
            }
            if(matrix[result[1]][east] === 0){
                coinsCollected++;
                matrix[result[1]][east] = 'Visited'
            }
            result[0]++
        }
        else{
            let west = result[0] - 1
            if(west > matrix[0].length-1 || matrix[result[1]][west] === "Wall"){
                continue
            }
            if(matrix[result[1]][west] === 0){
                coinsCollected++;
                matrix[result[1]][west] = 'Visited'
            }
            result[0]--
        }
    }
    result.push(coinsCollected);
    return result
}


 function pacman(inputFile) {

    // Start writing your code here

    // Initial Data Structures
    let text = null;
    let dimensions = [0, 0];
    let initial = [0, 0];
    let movement = null;
    let walls = [];
    let matrix = [];
    text = fs.readFileSync(inputFile, {encoding:'utf8'}).toString().split('\n')
    for(let i = 0; i < text.length; i++){
        if(i === 2){
            movement = text[i]
            continue
        }
        if(!text[i]){
            // The purpose of this condition is for the case where the txt file has lines of blank space at the end
            // In the example txt files given, they have one blank line of space which will be read in my parse function as an empty string ''
            // This condition can prevent a case where there are multiple lines of blank space
            break
        }
        // Turns the string into an array of numbers [x,y]
        let coordinates = text[i].split(' ').map((val) => parseInt(val))
        if(i === 0){
            dimensions[0] = coordinates[0];
            dimensions[1] = coordinates[1];
        }
        else if(i === 1){
            initial[0] = coordinates[0];
            initial[1] = coordinates[1]
        }
        else{
            walls.push(coordinates)
        }
    }
        // If createMatrix runs without running into edge cases, run traverseMatrix. Else, return [-1, -1, 0]
        return createMatrix(dimensions, initial, walls, matrix) ? traverseMatrix(movement, initial, matrix) : [-1, -1, 0]
    // }
}

module.exports.pacman = pacman;
