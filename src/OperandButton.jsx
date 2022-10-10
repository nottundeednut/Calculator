import { ACTIONS } from './App.jsx'


export default function OperandButton({ dispatch, operand }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.ADD_OPERAND, payload: { operand } })}
    >
      {operand}
    </button>
  )
}