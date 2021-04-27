var main = require(process.argv[3]);
// process.argv are the arguments you write in the CLI in an array
// when you run jasmine spec/PacmanSpec.js <filepath to pacman.js>
// output: ['/filepath/node', '/filepath/jasmine', 'spec/PacmanSpec.js', '/filepath/pacman.js']
// process.argv[3] is the connection to the main Pacman.js file

describe( "pacman", function () {
    var arrayEquality = function(first, second){
        count = 0;
        for (i = 0; i < second.length; i++) {
            if(parseInt(second[i]) == parseInt(first[i])){
                count = count + 1;
            }
        }
        return (count == 3);
    }
    beforeEach(function () {
        jasmine.addCustomEqualityTester(arrayEquality);
    });

    it("traverses generic.txt", function () {
        expect(main.pacman("generic.txt")).toEqual([6,1,27]);
    });

    it("doesn't run for edge.txt", function () {
        expect(main.pacman("edge.txt")).toEqual([-1,-1,0]);
    });

    it("traverses runtime.txt", function () {
        expect(main.pacman("runtime.txt")).toEqual([2142,147,148]);
    });
});
