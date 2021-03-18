import React from "react";

class TimeLimit extends React.Component {
    componentDidMount() {
        document.querySelector('.timeLimit').value = this.props.value
        document.querySelector('.timeLimit').addEventListener('change', (e) => {
            let timeLimit = parseInt(e.target.value)

            if (!Number.isInteger(timeLimit)) {
                e.target.value = this.props.value
                return
            }

            if (timeLimit < 200) {
                timeLimit = 200
            }

            if (timeLimit > 5000) {
                timeLimit = 5000
            }

            e.target.value = this.props.updateTimeLimit(timeLimit)
        })
    }

    render() {
        return (
            <div>
                <input className='timeLimit'></input>
            </div>
        )
    }
}

export default TimeLimit;