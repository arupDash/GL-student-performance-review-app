import React from 'react';

export function StudentSummary(props) {

    const summary = getSummary(props.studentList) 
    return (

        <div>
            <div className="card border-dark mb-3" style={{maxWidth : '18rem'}}>
                <div className="card-header">Performance summary</div>
                <div className="card-body">
                    <p className="card-text">
                        <span className="font-italic badge badge-warning">Min score</span> : {summary.minScore}
                    </p>
                    <hr/>
                    <p className="card-text">
                    <span className="font-italic badge badge-info">Avg score</span> : {summary.avgScore}
                    </p>
                    <hr/>
                    <p className="card-text">
                    <span className="font-italic badge badge-primary">Max score</span> :  {summary.maxScore}
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