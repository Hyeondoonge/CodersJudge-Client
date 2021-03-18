import React from "react";
import Testcases from "./Testcases";
import TimeLimit from "./TimeLimit";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      timeLimit: 2000,
      memoryLimit: 128,
      testcases: [{
        input: '',
        output: ''
      }]
    }
  }

  updateTestcases = (testcases) => {
    if (testcases.length === 0) {
      alert('최소 한 개의 테스트케이스가 필요합니다.')
      return
    }

    this.setState({
      testcases
    })
  }

  updateTimeLimit = (timeLimit) => {
    this.setState({
      timeLimit
    })

    return timeLimit
  }

  render() {
    return (
      <div>
        <h1>문제 생성</h1>
        <hr></hr>




        <h2>문제 이름</h2>
        <input value={this.state.title} onChange={(e) => {
          this.setState({
            name: e.target.value
          })
        }}></input>




        <h2>문제 설명</h2>
        <textarea value={this.state.description} onChange={(e) => {
          this.setState({
            description: e.target.value
          })
        }}></textarea>




        <h2>시간 제한(ms)</h2>
        <TimeLimit value={this.state.timeLimit} updateTimeLimit={this.updateTimeLimit}></TimeLimit>




        <h2>테스트케이스</h2>
        <Testcases testcases={this.state.testcases} updateTestcases={this.updateTestcases} />



        <hr></hr>
        <button onClick={() => {
          console.log(this.state)
        }}><h1>문제 생성 (콘솔에 출력)</h1></button>




      </div>
    )
  }
}

export default App;