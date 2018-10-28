import React, { Component } from 'react';

export class StudentInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            student: props.student,
            action: 'CHANGE'
        }
        this.onStudentNameChange = this.onStudentNameChange.bind(this);
        this.onStudentScoreChange = this.onStudentScoreChange.bind(this);
    }

    onStudentNameChange(e) {
        this.setState({
            student: { ...this.state.student, name: e.target.value }
        }, () => {
            this.props.changeStudentList(this.state.student, this.state.action);
        })
    }

    onStudentScoreChange(e) {
        this.setState({
            student: { ...this.state.student, score: e.target.value }
        }, () => {
            this.props.changeStudentList(this.state.student, this.state.action);
        })
    }

    render() {
        const grade = calcGradeFrmScore(this.state.student.score);

        return (
            <tr className={grade.bgColor}>
                <th scope="row">{this.props.id + 1}</th>
                <td>
                    <input type="text"
                        aria-label="name"
                        className="form-control"
                        value={this.state.student.name}
                        onChange={this.onStudentNameChange} />
                </td>
                <td>
                    <input type="text"
                        aria-label="score"
                        className="form-control w-50 mx-auto"
                        onChange={this.onStudentScoreChange}
                        value={this.state.student.score} />
                </td>
                <td>
                    <span className="w-75">{grade.value}</span>
                </td>
            </tr>
        )
    }
}

let calcGradeFrmScore = (score) => {
    if (parseInt(score) < 65) {
        return { value: 'Min', bgColor: 'table-danger' }
    } else if (score >= 65 && score <= 80) {
        return { value: 'Avg', bgColor: 'table-warning' }
    } else if (score > 80) {
        return { value: 'Max', bgColor: 'table-success' }
    } else {
        return { value: 'Min', bgColor: 'table-danger' }
    }
}