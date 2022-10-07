import './App.css'

export default function App() {
  return (
    <main>
      <div className='wrapper'>
        <div className='result'>
          <div className='old-input'></div>
          <div className='new-input'></div>
        </div>

        <button className='span'>CLEAR</button>
        <button>DEL</button>
        <button>/</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button className='span'>=</button>
      </div>
    </main>
  )
}
