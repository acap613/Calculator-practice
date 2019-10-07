class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

   // lets think about what needs to be done in order to make a calculater work
   //we have an all clear function
   //theres also a delete function
   //need a way to add the numbers to text
   //a function for equals
   //need a way to add the operations as well
   //lets define...
   //the first one is "all clear" to clear the whole screen
   clear() { 
    //converts to empty string
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined

  }

  //next we have delete for clearing a single number:
  delete() {
      //this will convert the number to a string and delete it from the currentOp position
      this.currentOperand = this.currentOperand.toString().slice(0, -1)

  }
  //how will we add numbers to teh screen when people click on a number?
  appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()

  }
  //we also need a way for the operatons buttons to do stuff
  chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
          this.compute()
      }
     this.operation = operation
     this.previousOperand = this.currentOperand
     this.currentOperand = '';

  }
  //getting there
  //we need a comupte  to take the input, calculate it, then display it on the screen
  compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
          case '+':
              computation = prev + current
              break
          case '-':
              computation = prev - current
              break
          case '*':
              computation = prev * current
              break
          case '÷':
              computation = prev / current
              break
          default:
              return //anytime NONE of the above values get executed, whatever is in the default gets executed
              //in this case RETURN, thus ending the computation
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''

  }
  //or maybe we need to update the screen everytime we do something
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand

 }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
//lets make the thing work
//start by creating a new calculator(for what reason im not sure), i think it makes more sense now,
//check the "equalsButton"...
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
// add an event listener to each button, sounds easy...
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    //this calls from the top the compute function inside of "calulator" which is defined as a constant variable
    //as new Calculator the class that contains all the fun functions
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    //this works the same as above but instead of calling "compute()", we're calling "clear()"
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    //this works the same as above but instead of calling "clear()", we're calling "delete()"
    calculator.delete()
    calculator.updateDisplay()
})