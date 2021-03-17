import React from "react";
import Testcases from "./Testcases";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testcases: []
    }
  }

  updateTestcases = (testcases) => {
    this.setState({
      testcases
    })
  }

  render() {
    return (
      <div>
        <h1>문제 제출</h1>

        <h2>테스트케이스</h2>
        <Testcases testcases={this.state.testcases} updateTestcases={this.updateTestcases} />

        <button onClick={() => {
          console.log(this.state.testcases)
        }}>문제 정보 콘솔에 출력</button>
      </div>
    )
  }
}

export default App;