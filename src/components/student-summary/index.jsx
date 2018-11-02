import React, { Component } from 'react';
import { StudentTable } from './student-table/';
import { AddStudent } from './add-student/';
import { StorageService } from '../../core/services/storage.service';

export class StudentSummary extends Component {

    constructor() {
        super();
        this.state = {
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
            this.setState({ selectedStds: [...this.state.selectedStds, student] }, ()=> {
                // console.log(this.state.selectedStds)
            });
        } else {
            this.setState({
                selectedStds: this.state.selectedStds.filter(std => {
                    return student.id !== std.id
                })
            }, ()=> {
                // console.log(this.state.selectedStds)
            })
        }

        
    }

    onDelete = ()=> {
        this.storageService.removeItems(this.state.selectedStds)
        console.log( this.storageService.getAllStudents())
        this.setState({
            studentList : this.storageService.getAllStudents(),
        })
    } 
    onChangeStudentList = (student, action) => {
        if (action === 'ADD') {
            this.storageService.addItem(student);
            this.setState({
                studentList: this.storageService.getAllStudents()
            })
        } else if (action === 'CHANGE') {
            this.storageService.changeItem(student);
            this.setState({
                studentList: this.storageService.getAllStudents()
            })
        }
    }
    render() {
        return (
            <div className="jumbotron bg-white">
                <h1 className="display-5">Student Performance Review</h1>
                <p className="lead">A test review application for teachers</p>
                <hr className="my-1" />
                <div className="row">
                    <div className="col-md-3">
                        <button className="btn btn-info d-inline-block mr-3 px-3"
                            onClick={() => { this.setState({ showForm: !this.state.showForm }) }}>
                            {this.state.showForm ? 'Hide' : 'Add'}
                        </button>
                        <button className="btn btn-danger d-inline-block my-5" onClick={this.onDelete}>Delete</button>
                    </div>
                    {this.state.showForm ? <AddStudent onChangeStudentList={this.onChangeStudentList} /> : ''}
                </div>
                <div>
                    <StudentTable studentList={this.state.studentList}
                        changeStudentList={this.onChangeStudentList} onSelectTableRow={this.onSelectTableRow} />
                </div>
            </div>
        )
    }

    ifExist = (student) => {
        let exist;
        this.state.studentList.forEach((std) => {
            if (student.id === std.id) exist = true;
        })
        return exist;
    }
}

