import React from "react";
import Testcases from "./Testcases";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
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
        <h1>문제 생성</h1>

        <h2>문제 이름</h2>
        <input value={this.state.title} onChange={(e) => {
          this.setState({
            name: e.target.value
          })
        }}></input>

        <h2>테스트케이스</h2>
        <Testcases testcases={this.state.testcases} updateTestcases={this.updateTestcases} />

        <button onClick={() => {
          console.log(this.state)
        }}>문제 정보 콘솔에 출력</button>
      </div>
    )
  }
}

export default App;