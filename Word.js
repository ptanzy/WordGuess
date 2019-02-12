// requiring our Letter module exported from letter.js
var Letter = require("./Letter.js");

//constructor function for creating word objects
var Word = function(word){
  this.word = constructWord(word);
  this.getWord = function(){
    return this.word.join(" ");
  };
  this.guessLetter = function(letter){
    var correctGuess = false;
    for(var i = 0; i<this.word.length; i++){
      var guessed = this.word[i].guessChar(letter);
      if(guessed){
        correctGuess = true;
      }
    }
    return correctGuess;
  };
  this.isWordGuessed = function(){
    for(var i = 0; i<this.word.length; i++){
      if(!this.word[i].guessed){
        return false;
      }
    }
    return true;
  }
};

function constructWord(word){
  var arrWord = [];
  for(var i = 0; i<word.length; i++){
    arrWord.push(new Letter(word.charAt(i)));
  }
  return arrWord;
}

// exporting our Word constructor. We will require it in main.js
module.exports = Word;


// var Letter = require("./Letter.js");

// var Word = function(word){
//   this.word = constructWord(word);
//   this.getWord = function(){
//     return this.word.join(" ");
//   };
//   this.guessLetter = function(letter){
//     var correctGuess = false;
//     for(var i = 0; i<this.word.length; i++){
//       var guessed = this.word[i].guessChar(letter);
//       if(guessed){
//         correctGuess = true;
//       }
//     }
//     return correctGuess;
//   };
//   this.isWordGuessed = function(){
//     for(var i = 0; i<this.word.length; i++){
//       if(!this.word[i].guessed){
//         return false;
//       }
//     }
//     return true;
//   }
// };

// function constructWord(word){
//   var arrWord = [];
//   for(var i = 0; i<word.length; i++){
//     arrWord.push(new Letter(word.charAt(i)));
//   }
//   return arrWord;
// }

// module.export = Word;