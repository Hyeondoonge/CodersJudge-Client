import React from "react";

class Testcases extends React.Component {
  constructor(props) {
    super(props)
  }

  onChangeInput = (e) => {
    const testcases = this.props.testcases.slice()
    testcases[e.target.parentNode.getAttribute('index')][e.target.className] = e.target.value

    this.props.updateTestcases(testcases)
  }

  onClickDeleteItem = (e) => {
    const testcases = this.props.testcases.slice()
    testcases.splice(e.target.parentNode.getAttribute('index'), 1)

    this.props.updateTestcases(testcases)
  }

  render() {
    return (
      <div>
        {this.props.testcases.map((testcase, index) => {
          return (
            <div key={index} index={index}>
              <div>
                테스트케이스 {index}
              </div>
              <textarea className='input' value={testcase.input} placeholder='input' onChange={this.onChangeInput}></textarea>
              <textarea className='output' value={testcase.output} placeholder='output' onChange={this.onChangeInput}></textarea>
              <button onClick={this.onClickDeleteItem}>삭제</button>
            </div>
          )
        })}

        <button onClick={() => {
          const testcases = this.props.testcases.slice()
          testcases.push({ input: '', output: '' })

          this.props.updateTestcases(testcases)
        }}>테스트케이스 추가</button>
      </div>
    )
  }
}

export default Testcases;