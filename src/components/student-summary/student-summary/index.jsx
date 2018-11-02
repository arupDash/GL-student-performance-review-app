import React from 'react';

export function StudentSummary(props) {

    const summary = getSummary(props.studentList) 
    return (

        <div>
            <div className="card border-dark mb-2" style={{maxWidth : '30rem'}}>
                <div className="card-header">Performance summary</div>
                <div className="card-body">
                    <p className="card-text float-left mr-1 px-1" style={{borderRight : '1px solid black'}}>
                        <span className="font-italic badge badge-warning">Min score</span> <span className="px-2">{summary.minScore}</span> 
                    </p>
                    {/* <hr/> */}
                    <p className="card-text float-left px-2" style={{borderRight : '1px solid black'}}>
                    <span className="font-italic badge badge-info">Avg score</span>  <span className="px-2">{summary.avgScore}</span> 
                    </p>
                    {/* <hr/> */}
                    <p className="card-text float-left mx-4">
                    <span className="font-italic badge badge-primary">Max score</span>  <span className="px-2">{summary.maxScore}</span> 
                    </p>
                </div>
            </div>
        </div>
    )
}

function getSummary (studentList) {

    let summaryObj = {}

    if (studentList.length > 0) {
        
        const stdList = [...studentList]
        const sortedStudentsByScore = stdList.sort(
            (a, b) => parseFloat(a.score) - parseFloat(b.score)
            );
        const minScore = parseFloat(sortedStudentsByScore[0].score) || 0;
        const maxScore = parseFloat(sortedStudentsByScore[sortedStudentsByScore.length - 1].score);
        
        
        let avgScore = 0;
        (function () {
            sortedStudentsByScore.forEach(std => {
                avgScore = parseFloat(avgScore || 0) + parseFloat(std.score || 0)
            })

            avgScore = (avgScore / sortedStudentsByScore.length).toFixed(2);
        })();
        
        summaryObj = {minScore, maxScore, avgScore}
        // summaryObj = {minScore : '', maxScore : '', avgScore : ''}

    } else {
        summaryObj = {minScore : '', maxScore : '', avgScore : ''}
    }

    return summaryObj;
}