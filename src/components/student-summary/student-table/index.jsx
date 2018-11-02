import React from 'react';

import { StudentInfo } from './student-info';

export function StudentTable(props) {

    return (
            <table className="table table-bordered border-dark mx-auto" style={{width : '720px'}}>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                        {/* <th scope="col">Grade</th> */}
                    </tr>
                </thead>
                <tbody>
                    {getStudentRecords(props.studentList, props.changeStudentList, props.onSelectTableRow)}
                </tbody>
            </table>
    )
}

let getStudentRecords = (studentList, changeStudentList, onSelectTableRow) =>
changeStudentList ? studentList.map((student, index) =>
        <StudentInfo onSelectTableRow={onSelectTableRow} key={index} student={student} id={index} changeStudentList={changeStudentList}/>
    ) : null;
