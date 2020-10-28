let citiesNum = 6; // Should have to be odd
let numOfPopulation = 200;
let generationNum = 100;
let citiesDistance = {
    AtoB: 2,
    AtoC: 4,
    AtoD: 6,
    AtoE: 9,
    AtoF: 13,

    BtoA: 2,
    BtoC: 3,
    BtoD: 5,
    BtoE: 6,
    BtoF: 8,

    CtoB: 3,
    CtoA: 4,
    CtoD: 8,
    CtoE: 5,
    CtoF: 9,

    DtoA: 6,
    DtoB: 5,
    DtoC: 8,
    DtoE: 3,
    DtoF: 8,

    EtoA: 9,
    EtoB: 6,
    EtoC: 5,
    EtoD: 3,
    EtoF: 10,

    FtoA: 13,
    FtoB: 8,
    FtoC: 9,
    FtoD: 8,
    FtoE: 10,



}


function getRandomSolution() {
    // generate randomize solution

    let randomArr = ['A', 'B', 'C', 'D', 'E', 'F'];
    let result = [];

    for (r = 0; r < citiesNum; r++) {
        const random = Math.floor(Math.random() * randomArr.length);
        result.push(randomArr[random]);
        randomArr.splice(random, 1);
    }
    let score = 0;

    //Calculate the Score values;
    for (z = 0; z < result.length; z++) {
        if (z < result.length - 1) {
            score += citiesDistance[result[z] + "to" + result[z + 1]]
        }
        else {
            score += citiesDistance[result[z] + "to" + result[0]]
        }
    }

    return { solution: result, score: score };
}

function eleminate(count) {

    for (var _count = 0; _count < count; _count++) {
        // total = 0;
        // population.map((item) => total += item.score);
        // // population.map((item) => item.probability = Math.floor((item.score / total )* 100)  );


        // var array = []; // Just Checking...
        // for (var item in population) {
        //     if (population.hasOwnProperty(item)) { // Safety
        //         for (var i = 0; i < population[item].score; i++) {
        //             array.push(population[item].id);
        //         }
        //     }
        // }
        // // Probability Fun
        // population.splice(array[Math.floor(Math.random() * array.length)], 1);

        population.splice(population.reduce((prev, curr) => prev.score > curr.score ? prev : curr).id, 1);

        //SIKINTI VAR
    }



}
function crossOver(min1, min2) {
    let ort = citiesNum / 2;
    let solutionArr = [];

    for (var first = 0; first < ort; first++) {
        solutionArr.push(min1[first])
    }

    for (var second = ort; second < citiesNum; second++) {
        solutionArr.push(min2[second])
    }


    let score = 0;

    //Calculate the Score values;
    for (z = 0; z < solutionArr.length; z++) {
        if (z < solutionArr.length - 1) {
            score += citiesDistance[solutionArr[z] + "to" + solutionArr[z + 1]]
        }
        else {
            score += citiesDistance[solutionArr[z] + "to" + solutionArr[0]]
        }
    }

    return { solution: solutionArr, score: score }

}
function nextGeneration(numOfGenerate, min1, min2) {
    let props = crossOver(min1, min2);
    population.push({ ...props, id: population.length });




    for (var _numOfGenerate = 0; _numOfGenerate < numOfGenerate - 1; _numOfGenerate++) {
        population.push({ ...getRandomSolution(), id: population.length });
    }
}

// STEP 1 Generate Random Population

let population = [];

for (i = 0; i < numOfPopulation; i++) {
    population.push({ ...getRandomSolution(), id: i });
}

// STEP 2
for (let generation = 0; generation < generationNum; generation++) {



    population.sort((a, b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0));


    let min1 = population[0]
    let min2 = population[1]


    eleminate(2);
    nextGeneration(2, min1, min2);
    console.log(min1, min2)

}




population.sort((a, b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0));

console.log("Best One", population[0])



