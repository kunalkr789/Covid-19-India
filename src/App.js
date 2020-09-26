import React from "react";

import { Cards, StatePicker, Chart } from "./components/index";
import { fetchData, fetchStates } from "./api";

class App extends React.Component {
  state = {
    data: {},
    state: "",
  };

  handleStateChange = async (state) => {
    const fetchedData = await fetchStates(state);
    this.setState({ data: fetchedData, state: state });
    console.log(fetchedData);
  };

  async componentDidMount() {
    const fetcheddata = await fetchData();
    this.setState({ data: fetcheddata });
  }

  render() {
    const { data, state } = this.state;
    console.log(this.state.data);
    return (
      <div className="container">
        <header class="header column">
          <h3>{this.state.data.lastupdatedtime}</h3>
          <h4>COVID-19 India</h4>
        </header>
        <aside class="sidebar column">
          <StatePicker handleStateChange={this.handleStateChange} />
        </aside>
        <main class="content column">
          <Cards data={data} />
          <Chart data={data} state={state} />
        </main>
      </div>
    );
  }
}

export default App;
