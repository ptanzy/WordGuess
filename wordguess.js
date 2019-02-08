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
  }])
  .then(function(user) {
    if(user && user.wordAmount){
      if(user.gameType === "Friend"){
        guessPlayerWords(user.wordAmount*2);
      }else{
        fs.readFile('words.json', "utf8", function(err, data){
          var obj = JSON.parse(data);
          var rndWords = [];
          for(var i = 0; i<user.wordAmount; i++){
            //pushes a randomly selected word spliced from the array
            rndWords.push(obj.arrWords.splice(Math.floor(Math.random() * obj.arrWords.length), 1)[0]);
          } 
        });
      }
    }else{
      console.log("Make sure you choose the number of words to guess. Word Amount: "+wordAmount)
    }
  });

  function guessPlayerWords(cnt){
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
        guessPlayerWords(--cnt);
      });
    }
    
  }