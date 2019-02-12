// // requiring our Student module exported from student.js
// var Student = require("./student.js");

// // constructor function for creating classroom objects
// var Classroom = function(profName, roomNum) {
//   // this.students will hold all of our student objects
//   this.students = [];
//   this.profName = profName;
//   this.roomNum = roomNum;
//   // a method that creates a student using our Student constructor.
//   // It then pushes the new student object to this.students and updates this.numStudents
//   this.addStudent = function(name, favoriteSub, gpa) {
//     this.students.push(new Student(name, favoriteSub, gpa));
//   };
//   // this method will tell you how many students are in the class
//   this.studentCount = function() {
//     return this.students.length;
//   };
// };

// // exporting our Classroom constructor. We will require it in main.js
// module.exports = Classroom;

var Letter = require("./student.js");

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

module.export = Word;