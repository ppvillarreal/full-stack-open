import { useState } from 'react'

const DisplayKeyValue = ({name, value}) => {
  return(
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  const calculateAll = () => good + neutral + bad;
  const calculateAverage = () => ((good - bad) /calculateAll()).toFixed(2);
  const calculatePositive = () => (good/calculateAll()*100).toFixed(1) + ' %';

  if (good + neutral + bad == 0){
    return(
      <div>
        <h1> statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
  <>
  <h1> statistics</h1>
  <table>
    <tbody>
      <DisplayKeyValue name = "good" value = {good} />
      <DisplayKeyValue name = "neutral" value = {neutral} />
      <DisplayKeyValue name = "bad" value = {bad} />
      <DisplayKeyValue name = "all" value = {calculateAll()} />
      <DisplayKeyValue name = "average" value = {calculateAverage()} />
      <DisplayKeyValue name = "positive" value = {calculatePositive()} />
    </tbody>
  </table>
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  return (
    <div>
      <h1> give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral +1 )} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
