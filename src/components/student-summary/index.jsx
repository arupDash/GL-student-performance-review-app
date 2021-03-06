import React, { Component } from 'react';
import { StudentTable } from './student-table/';
import { AddStudent } from './add-student/';
import { StudentSummary } from './student-summary';
import { StorageService } from '../../core/services/storage.service';

export class StudentDetails extends Component {

    constructor() {
        super();
        this.state = {
            studentExist: false,
            showForm: false,
            studentList: [],
            selectedStds: []
        }
        this.storageService = new StorageService();
    }

    componentWillMount() {
        const DB_ITEMS = this.storageService.getAllStudents();
        !DB_ITEMS ? this.storageService.initializeDB() : console.log(' DB : already intialized');
        this.setState({
            studentList: this.storageService.getAllStudents()
        })
    }
    onSelectTableRow = (student, selected) => {
        if (selected) {
            this.setState({ selectedStds: [...this.state.selectedStds, student] });
        } else {
            this.setState({
                selectedStds: this.state.selectedStds.filter(std => {
                    return student.id !== std.id
                })
            })
        }


    }

    onDelete = () => {
        this.storageService.removeItems(this.state.selectedStds)
        this.setState({
            studentList: this.storageService.getAllStudents(),
        })
    }

    checkForAvailabilityandAdd(student) {
        let ifExist = false;
        this.state.studentList.forEach(std => {
            if (std.name.trim() === student.name.trim()) ifExist = true;
        })

        if (!ifExist) {
            this.storageService.addItem(student);
            this.setState({
                studentList: this.storageService.getAllStudents(),
                studentExist: false
            })
        } else {
            this.setState({ studentExist: true })
        }
    }
    onChangeStudentList = (student, action) => {
        if (action === 'ADD') {
            this.checkForAvailabilityandAdd(student) 
        } else if (action === 'CHANGE') {
            this.storageService.changeItem(student);
            this.setState({
                studentList: this.storageService.getAllStudents()
            })
        }
    }
    render() {
        return (
            <div className="conatiner">
                <div className="jumbotron bg-white" style={{ padding: '1rem 2rem' }}>
                    <div className="row">
                        <div className="col-6">
                            <h1 style={{ fontSize: '2rem' }}>Student Performance Management</h1>
                            <p className="lead" style={{ fontSize: '1rem' }}>A test management application for teachers</p>
                        </div>
                        <div className="col-6">
                            <StudentSummary studentList={this.state.studentList} />
                        </div>
                    </div>
                    <hr className="my-1" />
                    <div className="row" >
                        <div className="col-md-3">
                            <button className="btn btn-info d-inline-block mr-3 px-3"
                                onClick={() => { this.setState({ showForm: !this.state.showForm }) }}>
                                {this.state.showForm ? 'Hide' : 'Add'}
                            </button>
                            <button className="btn btn-danger d-inline-block my-5" onClick={this.onDelete}>Delete</button>
                        </div>
                        {this.state.showForm ? <AddStudent onChangeStudentList={this.onChangeStudentList} studentExist={this.state.studentExist}/> : ''}
                    </div>

                    <StudentTable studentList={this.state.studentList}
                        changeStudentList={this.onChangeStudentList} onSelectTableRow={this.onSelectTableRow} />
                </div>
            </div>
        )
    }
}

