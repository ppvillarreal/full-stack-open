const Total = ({ parts }) => {
    const sum = parts.reduce((accumulator, currentValue) => {
        console.log('what is happening', accumulator, currentValue)
        return accumulator + currentValue.exercises}, 0)
    return (
        <p><strong>total of {sum} exercises</strong></p>
    )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Course = ({ course }) => 
  <>
    <h1>{course.name}</h1>
    {course.parts.map(part => 
        <Part
        key={part.id}
        part={part} 
        />
    )}
    <Total parts={course.parts} />
  </>

export default Course