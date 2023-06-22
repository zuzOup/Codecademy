console.log(
  `
👒-👒-👒-👒-👒-👒-👒-👒-👒-👒-👒-👒-👒!!FIND YOUR HAT!!👒-👒-👒-👒-👒-👒-👒-👒-👒-👒-👒-👒-👒

Find your hat! Use W,A,S,D keys to navigate the field. Whatch out for holes, don't stray away and don't turn back!
    `
);

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

const promptHeight = require("prompt-sync")({ sigint: true });
const height = Number(promptHeight("Field height:"));

const promptWidth = require("prompt-sync")({ sigint: true });
const width = Number(promptWidth("Field width:"));

//Function to creat a field with given dimensions -> returns an array with nested arrays (each nested array representing a row in a field)

function fieldMaker() {
  const size = width * height;
  const hatPozition = Math.floor(Math.random() * (size - 1)) + 1;
  const arr = [pathCharacter];

  for (let i = 1; i < size; i++) {
    if (i !== hatPozition) {
      const holeOrField = Math.floor(Math.random() * 100);
      if (holeOrField < 25) {
        arr.push(hole);
      } else arr.push(fieldCharacter);
    } else arr.push(hat);
  }

  const arrFinal = [];
  for (let i = 0; i < arr.length; i += width) {
    const arrWidth = arr.slice(i, i + width);
    arrFinal.push(arrWidth);
  }
  return arrFinal;
}

// Playing field

class Field {
  constructor(field) {
    this.field = field;
  }
  print() {
    console.log(``);
    this.field.forEach((element) => {
      console.log(element.join(""));
    });
    console.log(``);
  }

  didIFindHat() {
    const hatPosition = Array.prototype.concat(...this.field);
    return hatPosition.includes(hat);
  }
}

//Functions for the game movement

function validImput(imput) {
  if (
    imput === "A" ||
    imput === "a" ||
    imput === "S" ||
    imput === "s" ||
    imput === "W" ||
    imput === "w" ||
    imput === "D" ||
    imput === "d"
  ) {
    return true;
  } else console.log("Invalid imput, try A,S,D,W!");
}

function whereToMovemove(input) {
  if (input === "A" || input === "a") {
    x--;
  } else if (input === "S" || input === "s") {
    y++;
  } else if (input === "W" || input === "w") {
    y--;
  } else if (input === "D" || input === "d") {
    x++;
  }
}

// !!!!!!

// tady jsem skon4ila -> nějakou logiku na asdw. asi přes modula ???

// Game itself

const playingField = new Field(fieldMaker());

let x = 0;
let y = 0;
playingField.print();

while (playingField.didIFindHat()) {
  const promptDirection = require("prompt-sync")({ sigint: true });
  const direction = promptDirection("Which way?");

  if (validImput(direction)) {
    whereToMovemove(direction);

    if (x < 0 || y < 0 || x > width - 1 || y > height - 1) {
      playingField.print();
      console.log(`Running away? Be better next time!`);
      break;
    } else if (playingField.field[y][x] === fieldCharacter) {
      playingField.field[y][x] = pathCharacter;
      playingField.print();
    } else if (playingField.field[y][x] === hat) {
      playingField.field[y][x] = `Î`;
      playingField.print();
      console.log(`🎉🎉 Congratulations!! You found your hat!! 👒 

`);
      break;
    } else if (playingField.field[y][x] === hole) {
      playingField.field[y][x] = "●";
      playingField.print();
      console.log(
        `🕳️ Oh no! You fell down the hole! Next time try avoiding it!`
      );
      break;
    } else if (playingField.field[y][x] === pathCharacter) {
      playingField.print();
      console.log(
        `You can't go back, how else would you find your hat? Try again!`
      );
      break;
    }
  }
}

if (playingField.didIFindHat()) {
  console.log(`


PS: Did you find the game unsolvable? Well, maybe that wasn't your hat! Try again :)
`);
}
