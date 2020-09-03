document.getElementById('date').innerHTML = new Date().toDateString();


// this textBlock is from Gormenghast, a very weird cool old gothic fantasy novel about a giant castle and the weirdos who live there. The writing itself is already very poetic, so I figured poems made from an exercept may actually sound nice.
let gormenBlock = "Gormenghast, that is, the main massing of the original stone, taken by itself would have displayed a certain ponderous architectural quality were it possible to have ignored the circumfusion of those mean dwellings that swarmed like an epidemic around its outer walls. They sprawled over the sloping earth, each one half way over its neighbour until, held back by the castle ramparts, the innermost of these hovels laid hold on the great walls, clamping themselves thereto like limpets to a rock. These dwellings, by ancient law, were granted this chill intimacy with the stronghold that loomed above them. Over their irregular roofs would fall throughout the seasons, the shadows of time-eaten buttresses, of broken and lofty turrets, and, most enormous of all, the shadow of the Tower of Flints. This tower, patched unevenly with black ivy, arose like a mutilated finger from among the fists of knuckled masonry and pointed blasphemously at heaven. At night the owls made of it an echoing throat; by day it stood voiceless and cast its long shadow. Withdrawn and runinous it broods in umbra: the immemorial masonry: the towers, the tracks. Is all corroding? No. Through an avenue off spires a zephyr floats; a bird whistles; a freshet bears away from a choked river. Deep in a fist of stone a doll's hand wriggles, warm rebellious on the frozen palm. A shadow shifts its length. A spider stirs. And darkness winds bewteen the characters."


function parser (textString){
  let textArr = textString.split(" ")

  textArr.forEach(function (word,index){
    word = word.toLowerCase();
    word = word.replace(".","");
    word = word.replace(",","");
    word = word.replace(";","");
    word = word.replace(":","");
    word = word.replace("?","");
    textArr[index] = word;
    })
  return textArr;
}

function markovMaker (textArr){

  let markovChain = {};
  for (let i=0;i<textArr.length;i++){
    let currentWord = textArr[i];
    let nextWord = textArr[i+1];

    if (i===textArr.length-1){
      markovChain[currentWord] = [];
    }
    if (currentWord in markovChain){
      markovChain[currentWord].push(nextWord);
    }
    else{
      markovChain[currentWord] = [nextWord];
    }
  }
  return markovChain;
}

function randomChoice (wordArr){
  let randomValue = wordArr[Math.floor(Math.random() * wordArr.length)];
  return randomValue;
}

function prepositionCheck(prepArr,word){
  let checker = false;
  prepArr.forEach(function (element){
    if (word===element){
      checker = true;
    }
  })
  return checker;
}

function writeLine(markovObject,wordNum){
  
  //chooses a random line length each time it's invoked
  let lineLength = randomChoice([1,2,3,4,5,6,7]);
  let poemLine = "";

  let initialWord = randomChoice(Object.keys(markovObject)); 
  poemLine +=`${initialWord} `;

  //loops for two less than length, since line starts with an initial word, and we're looking at index
  for (let i=0;i<=lineLength-2;i++){

    let newWord = randomChoice(markovObject[initialWord])

    if(markovObject[newWord]===undefined){
      newWord = randomChoice(Object.keys(markovObject));
    }
    //checks if the last word is a preposition, if so, cuts it off to increase readability
    let prepositions =["of","a","the","to","at"]
    if (i===lineLength-2){
      if (prepositionCheck(prepositions, newWord)){
        continue
      }
    }

    poemLine+=newWord+ " "

    initialWord = newWord; 
  }

  return poemLine
}

function generatePoem(wordCorpus,numberOfLines){
  let poem = ""
  let poemMarkov = markovMaker((parser(wordCorpus)))
  for (let i=0;i<numberOfLines;i++){
    let newLine = writeLine(poemMarkov)
    poem+=`${newLine}\n`
    
  }
  return poem

}

let gormenPoem = generatePoem(gormenBlock,10)
console.log(gormenPoem)
