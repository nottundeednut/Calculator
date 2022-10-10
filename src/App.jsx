import { useReducer } from 'react'
import DigitButton from './DigitButton'
import OperandButton from './OperandButton'
import './App.css'


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  ADD_OPERAND: 'add-operand',
  CLEAR: 'clear',
  REMOVE_DIGIT: 'remove-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          newInput: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.newInput === "0") {
        return state
      }
      if (payload.digit === "." && state.newInput.includes(".")) {
        return state
      }
      return {
        ...state,
        newInput: `${state.newInput || ""}${payload.digit}`,
      }

    case ACTIONS.ADD_OPERAND:
      if (state.newInput == null && state.oldInput == null) {
        return state
      }
      if (state.newInput == null) {
        return {
          ...state,
          operand: payload.operand,
        }
      }
      if (state.oldInput == null) {
        return {
          ...state,
          operand: payload.operand,
          oldInput: state.newInput,
          newInput: null,
        }
      }
      return {
        ...state,
        oldInput: evaluate(state),
        operand: payload.operand,
        newInput: null,
      }


    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.REMOVE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          newInput: null,
        }
      }
      if (state.newInput == null) return state
      if (state.newInput.length === 1) {
        return { ...state, newInput: null }
      }

      return {
        ...state,
        newInput: state.newInput.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (
        state.operand == null ||
        state.newInput == null ||
        state.oldInput == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        oldInput: null,
        operand: null,
        newInput: evaluate(state),
      }
  }

}

function evaluate({ newInput, oldInput, operand }) {
  const old = parseFloat(oldInput)
  const current = parseFloat(newInput)
  if (isNaN(old) || isNaN(current)) return ""
  let computation = ""
  switch (operand) {
    case "/":
      computation = old / current
      break
    case "*":
      computation = old * current
      break
    case "+":
      computation = old + current
      break
    case "-":
     computation= old - current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatInput(input) {
  if (input == null) return
  const [integer, decimal] = input.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

export default function App() {
  const [{ newInput, oldInput, operand }, dispatch] = useReducer(reducer, {})


  return (
    <main>
      <div className='wrapper'>
        <div className='result'>
          <div className='old-input'>{formatInput(oldInput)} {operand}</div>
          <div className='new-input'>{formatInput(newInput)}</div>
        </div>

        <button className='span' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>CLEAR</button>
        <button onClick={() => dispatch({ type: ACTIONS.REMOVE_DIGIT })}>DEL</button>

        <OperandButton operand="/" dispatch={dispatch} />

        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />

        <OperandButton operand="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />


        <OperandButton operand="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />


        <OperandButton operand="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />

        <button className='span' onClick={() => dispatch({ type: ACTIONS.EVALUATE})} > = </button>
      </div>
    </main>
  )
}
