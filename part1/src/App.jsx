import { useState } from 'react'

const DisplayKeyValue = ({name, value}) => <div>{name} {value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calculateAll = () => good + neutral + bad;
  const calculateAverage = () => ((good - bad) /calculateAll()).toFixed(2)
  const calculatePositive = () => (good/calculateAll()*100).toFixed(1) + ' %'
  
  return (
    <div>
      <h1> give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral +1 )} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1> statistics</h1>
      <DisplayKeyValue name = "good" value = {good} />
      <DisplayKeyValue name = "neutral" value = {neutral} />
      <DisplayKeyValue name = "bad" value = {bad} />
      <DisplayKeyValue name = "all" value = {calculateAll()} />
      <DisplayKeyValue name = "average" value = {calculateAverage()} />
      <DisplayKeyValue name = "positive" value = {calculatePositive()} />
    </div>
  )
}

export default App
