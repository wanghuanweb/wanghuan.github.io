(function() {


    function Person(name){
     this.nickname = name;
     this.distractedGreeting = function() {

       setTimeout(function(){
         console.log("Hello, my name is " + this.nickname);
       }.bind(this), 500);
     }
    }
     
    var alice = new Person('Alice');
    alice.distractedGreeting();


}());
