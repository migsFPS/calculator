import { useState } from 'react'
import './App.css'


function CalcDisplay({ dispValue }) {
  return (
    <div className='CalcDisplay'>
      {dispValue}
    </div>
  )
}


function CalcButtons({
  label,
  buttonClassName = 'CalcButton',
  onClick
}) {
  return (
    <button
      className={buttonClassName}
      onClick={onClick}
    >
      {label}
    </button>
  )
}


function App() {

  const [display, setDisplay] = useState('0')
  const [firstNumber, setFirstNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForNumber, setWaitingForNumber] = useState(false)


  // NUMBER BUTTON
  const onNumberClick = (e) => {
    e.preventDefault()

    const value = e.currentTarget.innerHTML

    if (display === 'Error') {
      setDisplay(value)
      setFirstNumber(null)
      setOperator(null)
      setWaitingForNumber(false)
      return
    }

    // If an operator was clicked,
    // start entering the second number
    if (waitingForNumber) {

      const secondNumber = Number(value)

      const result = calculate(
        firstNumber,
        operator,
        secondNumber
      )

      if (result === 'Error') {
        setDisplay('Error')
        return
      }

      // Show automatic answer
      setDisplay(result)

      // Keep result as the first number
      setFirstNumber(Number(result))

      setWaitingForNumber(false)

      return
    }

    // Enter normal number
    setDisplay(
      display === '0'
        ? value
        : display + value
    )
  }


  // OPERATOR BUTTON
  const onOperatorClick = (e) => {
    e.preventDefault()

    const value = e.currentTarget.innerHTML

    const currentNumber = Number(display)

    // If there is already an operation,
    // calculate it first
    if (
      firstNumber !== null &&
      operator !== null
    ) {

      const result = calculate(
        firstNumber,
        operator,
        currentNumber
      )

      if (result === 'Error') {
        setDisplay('Error')
        return
      }

      setDisplay(result)
      setFirstNumber(Number(result))
    }

    else {
      setFirstNumber(currentNumber)
    }

    setOperator(value)
    setWaitingForNumber(true)
  }


  // CLEAR BUTTON
  const onClearClick = (e) => {
    e.preventDefault()

    setDisplay('0')
    setFirstNumber(null)
    setOperator(null)
    setWaitingForNumber(false)
  }


  // CALCULATION
  const calculate = (
    first,
    operation,
    second
  ) => {

    let result

    if (operation === '+') {
      result = first + second
    }

    else if (operation === '-') {
      result = first - second
    }

    else if (operation === '*') {
      result = first * second
    }

    else if (operation === '÷') {

      if (second === 0) {
        return 'Error'
      }

      result = first / second
    }

    return Number(
      result.toFixed(10)
    ).toString()
  }


  return (
    <div className='App'>

      <div className='Header'>
        Calculator of Joefer Miguel  Tulabut - IT3A-DA
      </div>


      <div className='Calculator'>

        <CalcDisplay
          dispValue={display}
        />


        <div className='CalcButtons'>

          {/* 7 8 9 ÷ */}

          <CalcButtons
            label={'7'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'8'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'9'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'÷'}
            onClick={onOperatorClick}
          />


          {/* 4 5 6 x */}

          <CalcButtons
            label={'4'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'5'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'6'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'*'}
            onClick={onOperatorClick}
          />


          {/* 1 2 3 - */}

          <CalcButtons
            label={'1'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'2'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'3'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'-'}
            onClick={onOperatorClick}
          />


          {/* C 0 + */}

          <CalcButtons
            label={'C'}
            onClick={onClearClick}
          />

          <CalcButtons
            label={'0'}
            onClick={onNumberClick}
          />

          <CalcButtons
            label={'+'}
            onClick={onOperatorClick}
          />

        </div>

      </div>

    </div>
  )
}


export default App