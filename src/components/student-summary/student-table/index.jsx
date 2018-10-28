import React from 'react';

import { StudentInfo } from './student-info';

export function StudentTable(props) {

    return (
        <div className="mx-auto" style={{ width: '720px' }}>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                        <th scope="col">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {getStudentRecords(props.studentList, props.changeStudentList)}
                </tbody>
            </table>
        </div>
    )
}

let getStudentRecords = (studentList, changeStudentList) =>
    studentList.map((student, index) =>
        <StudentInfo key={index} student={student} id={index} changeStudentList={changeStudentList}/>
    );
