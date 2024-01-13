const Filter = ({filterValue, filterChangeFunction}) => {
    return(
      <form>
        <div>
          name: <input 
            value={filterValue}
            onChange={filterChangeFunction}
          />
        </div>
      </form>
    )
  }

  export default Filter