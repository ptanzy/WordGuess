// constructor function for creating letter objects
var Letter = function(char) {
  this.char = char;
  this.holder = "_";
  this.guessed = false;
  this.retrieveSymbol = function(){
    if(guessed){
      return this.char;
    }
    return this.holder
  };
  this.guessChar = function(char){
    if(char && this.char === char.charAt(0)){
      this.guessed = true;
      return true;
    }
    return false;
  }
};

// exporting our Letter constructor
module.exports = Letter;


// // constructor function for creating student objects
// var Letter = function(char) {
//   this.char = char;
//   this.holder = "_";
//   this.guessed = false;
//   this.retrieveSymbol = function(){
//     if(guessed){
//       return this.char;
//     }
//     return this.holder
//   };
//   this.guessChar = function(char){
//     if(char && this.char === char.charAt(0)){
//       this.guessed = true;
//       return true;
//     }
//     return false;
//   }
// };

// // exporting our Student constructor
// module.exports = Letter;
