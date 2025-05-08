import barGraph from "./../../assets/bar-graph.png"
const Income = () => {
  return (
    <div className="income-container">
      <p className="heading">Income</p>
      <br />
      <p>Last <span id="days">30 days</span></p>
      <br />
      <p id="rate">$2,260</p>
      <br />
      <br />
      <img src={barGraph} id="bar-graph" alt="bar-graph" />
      <br />
      <br />
      <div className="transaction verti-center">
        <p className="heading">Your transactions (3)</p>
        <p>Last <span id="days">30 days</span></p>
      </div>
        <br />
      <div className="income-box  verti-center">
            <p>$720</p>
            <p>1/12/22</p>
      </div>
      <div className="income-box  verti-center">
            <p>$560</p>
            <p>10/11/22</p>
      </div>
      <div className="income-box  verti-center">
            <p>980</p>
            <p>23/11/22</p>
      </div>
    
    </div>
  )
}

export default Income