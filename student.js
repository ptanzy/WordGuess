// // constructor function for creating student objects
// var Student = function(name, favoriteSub, gpa) {
//   this.name = name;
//   this.favoriteSub = favoriteSub;
//   this.gpa = gpa;
// };

// // exporting our Student constructor
// module.exports = Student;

// constructor function for creating student objects
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

// exporting our Student constructor
module.exports = Letter;