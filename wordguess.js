var fs = require("fs");
var inquirer = require("inquirer");
var word = require("./Word");

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
        selectPlayerWords(user.wordAmount*2);
      }else{
        fs.readFile('words.json', "utf8", function(err, data){
          var obj = JSON.parse(data);
          var rndWords = obj.arrWords;
          var guessWords = [];
          for(var i = 0; i<user.wordAmount; i++){
            //randomly selected word spliced from the array
            var word = rndWords.splice(Math.floor(Math.random() * rndWords.length), 1);
          } 
        });
      }
    }else{
      console.log("Make sure you choose the number of words to guess. Word Amount: "+wordAmount)
    }
  });

  function guessPlayerWords(cnt, word, player){
    if(cnt>0){
      inquirer
      .prompt([{
        type: "input",
        name: "letter",
        message: player+", please enter a letter to make a guess.",
      }])
      .then(function(user) {
        var correctGuess = word.guessLetter(user.letter);
        if(correctGuess){
          console.log("")
        }
        guessPlayerWords(--cnt);
      });
    }
    
  }

  function selectPlayerWords(cnt){
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
      .then(function(user) {
        console.log(user.word);
        selectPlayerWords(--cnt);
      });
    }
    
  }