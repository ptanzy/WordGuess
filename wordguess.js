var fs = require("fs");
var inquirer = require("inquirer");
var Word = require("./Word");

inquirer
  .prompt([{
    type: "list",
    name: "gameType",
    message: "Would you like to play against a friend or the computer?",
    choices: ["Friend", "Computer"]
  },{
    type: "list",
    name: "wordAmount",
    message: "Number of words to guess...",
    choices: ["1", "2", "3", "4", "5"]
  },{
    type: "list",
    name: "chancesAmount",
    message: "Number of chances to guess...",
    choices: ["5", "6", "7", "8", "9", "10"]
  }])
  .then(function(user) {
    if(user && user.wordAmount){
      if(user.gameType === "Friend"){
        selectPlayerWords(user.wordAmount*2, user.chancesAmount);
      }else{
        fs.readFile('words.json', "utf8", async function(err, data){
          var obj = JSON.parse(data);
          var rndWords = obj.arrWords;
          for(var i = 0; i<user.wordAmount; i++){
            //randomly selected word spliced from the array
            var curWord = rndWords.splice(Math.floor(Math.random() * rndWords.length), 1);
            var word = new Word(curWord[0].trim());
            await guessPlayerWords(user.wordAmount, word, "Player1", []);
          } 
        });
      }
    }else{
      console.log("Make sure you choose the number of words to guess. Word Amount: "+wordAmount)
    }
  });

  async function guessPlayerWords(cnt, word, player, lettersGuessed){
    guessed = lettersGuessed;
    if(cnt>0){
      inquirer
      .prompt([{
        type: "input",
        name: "letter",
        message: player+", please enter a letter to make a guess.",
      }])
      .then(async function(user) {
        guessed.push(user.letter);
        if(guessed.length > 0){
          console.log("Guessed: "+guessed);
        }
        var correctGuess = word.guessLetter(user.letter);
        if(correctGuess){
          console.log(user.letter+" is a correct guess!");
          var isCorrect = word.isWordGuessed();
          if(isCorrect){
            console.log("You've guessed the word!");
            cnt = 0;
          }
        }else{
          cnt--;
          console.log("Sorry, "+user.letter+ " is an incorrect guess. Try again.");
        }
        await guessPlayerWords(cnt, word, player, lettersGuessed);
      });
    }else{
      return;
    }
    
  }

  async function selectPlayerWords(cnt, guesses){
    var current = "Player1";
    var other = "Player2";
    if(cnt%1 === 1){
      current = "Player2"
      other = "Player1";
    }
    if(cnt>0){
      inquirer
      .prompt([{
        type: "input",
        name: "word",
        message: current+", please enter a word for "+other+" to guess",
      }])
      .then(async function(user) {
        var word = new Word(user.word.trim());
        await guessPlayerWords(guesses, word, current, []);
        await selectPlayerWords(--cnt, guesses);
      });
    }else{
      return;
    }
    
  }
