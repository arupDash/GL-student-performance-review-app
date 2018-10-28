import React, { Component } from 'react';
import { StudentTable } from './student-table/';
import { AddStudent } from './add-student/';
import uuid4 from 'uuid4';
import StudentDesc from '../../core/models/student-desc';

export class StudentSummary extends Component {

    constructor() {
        super();
        this.state = {
            showForm : false,
            studentList: []
        }
    }

    componentWillMount() {
        this.setState({
            studentList: [
                new StudentDesc(uuid4(), 'Arup', 23),
                new StudentDesc(uuid4(), 'Arup', 64),
                new StudentDesc(uuid4(), 'Arup', 99),
            ]
        })
    }

    onChangeStudentList = (student, action) => {
        if(action === 'ADD') {
            let newStudent = new StudentDesc(uuid4(), student.name, student.score); 
            this.setState({
                studentList : [...this.state.studentList, newStudent]
            }, ()=>{console.log(this.state.studentList)})
        } else if(action === 'CHANGE') {
            this.setState({
                studentList: this.state.studentList.map(std => {
                    let {id,  name, score } = student;
                    return std.id === student.id ? new StudentDesc(id, name, parseInt(score)): std
                })
            },  () => { console.log(this.state.studentList) })
        }
    }
    render() {
        return (
            <div className="jumbotron bg-white">
                <h1 className="display-5">Student Performance Review</h1>
                <p className="lead">A test review application for teachers for a perticular subject</p>
                <hr className="my-1" />
                <div className="row">
                    <div className="col-md-3">
                    <button className="btn btn-info d-inline-block mr-3 px-3" 
                    onClick={() => { this.setState({ showForm: !this.state.showForm }) }}>
                    {this.state.showForm ? 'Hide' : 'Add'}
                    </button>
                    <button className="btn btn-danger d-inline-block my-5">Delete</button>
                    </div>
                    {this.state.showForm ? <AddStudent onChangeStudentList={this.onChangeStudentList}/> : ''}
                </div>
                <div>
                    <StudentTable studentList={this.state.studentList}
                        changeStudentList={this.onChangeStudentList} />
                </div>
            </div>
        )
    }
}