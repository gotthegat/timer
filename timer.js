class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      //use if statement for optional params
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    //setup event listeners
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  //start() { -- change this to an arrow function to solve the 'this' problem
  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.intervalTimer = setInterval(this.tick, 50); //setInterval returns integer that is an ID of the internal timer
  };

  pause = () => {
    clearInterval(this.intervalTimer);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      /* 
      const timeRemaining = this.timeRemaining; //invokes getter; treat getter return like an instance variable
      this.timeRemaining = timeRemaining - 1; //invokes setter
      */
      this.timeRemaining = this.timeRemaining - 0.05; //this should be the same as the milliseconds in the setInterval
      if (this.onTick) {
        this.onTick(this.timeRemaining); //pass this.timeRemaining to callback function
      }
    }
  };

  //getter method using keyword get
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  //setter method using keyword set
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2); // use toFixed to round to two digits
  }
}
/*
DETERMINE THE VALUE OF this
did we define function with arrow function?: 
    write console.log('this') on first valid line above the arrow function to see value of 'this' in arrow function
did we call 'bind', 'call', or 'apply' on the function when invoking it?:
    'this' equals the first argument of 'bind', 'call', or 'apply'
all other cases:
    'this' equals whatever is to the left of the period in the method call

to get consistent results when using this in a class, make sure we always use the first or second method
*/
