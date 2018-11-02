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
        this.onMouseLeaveEvnt = this.onMouseLeaveEvnt.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            student: nextProps.student
        })
    }

    onStudentNameChange(e) {
        this.setState({
            student: { ...this.state.student, name: e.target.value }
        })
    }

    onStudentScoreChange(e) {
        const testVal = /^[0-9\b]+$/;
        if (e.target.value === '' || testVal.test(e.target.value)) {
            this.setState({
                student: { ...this.state.student, score: e.target.value }
            })
        }
    }

    onMouseLeaveEvnt() {
        this.props.changeStudentList(this.state.student, this.state.action);
    }
    render() {
        const grade = calcGradeFrmScore(this.state.student.score);

        return (
            <tr className={grade.bgColor}>
                <td>
                    <input className="form-check-input" type="checkbox" style={{marginLeft : '0'}}
                    onChange={(e) => {this.props.onSelectTableRow(this.state.student, e.target.checked)}} />
                </td>
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
                        onBlur={this.onMouseLeaveEvnt}
                        value={this.state.student.score} style={{float : 'left'}}/>
                       
            {grade.bgColor ?  <span class="badge badge-light d-inline-block" style={{marginLeft : '20px'}}>failed</span> : ''}
                </td>
                {/* <td>
                    <span className="w-75">{grade.value}</span>
                </td> */}
            </tr>
        )
    }
}

let calcGradeFrmScore = (score) => {
    if (parseInt(score) < 65) {
        return { bgColor: 'table-danger' }
    } else{
        return { bgColor: '' }
    }
}