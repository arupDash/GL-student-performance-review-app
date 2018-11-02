import React, { Component } from 'react';

export class AddStudent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errMsg: false,
            studentProperties: {
                name: '',
                score: ''
            },
            action: 'ADD'
        }
    }

    onScoreChange = (e) => {
        const testVal = /^[0-9\b]+$/;
        if (e.target.value === '' || testVal.test(e.target.value)) {
            this.setState({ studentProperties: { ...this.state.studentProperties, score: e.target.value } })
        }
    }
    onNameChhange = (e) => {
        this.setState({ studentProperties: { ...this.state.studentProperties, name: e.target.value } })
    }

    addStudent = () => {
        if (this.state.studentProperties.name && this.state.studentProperties.score) {
            this.setState({ errMsg: false });
            this.props.onChangeStudentList(this.state.studentProperties, this.state.action)
        } else {
            this.setState({ errMsg: true });
        }
    }
    render() {
        return (
            <div className="col-md-9">
                {this.state.errMsg ? <p className="mx-auto text-danger font-weight-bold" style={{fontSize : '1rem'}}>* Enter all the required fields</p> : ''}
                <form className='form-inline my-4'>
                    <div className="input-group mb-2 mr-sm-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Name</div>
                        </div>
                        <input type="text" className="form-control"
                            value={this.state.studentProperties.name}
                            onChange={this.onNameChhange} />
                    </div>
                    <div className="input-group mb-2 mr-sm-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">score</div>
                        </div>
                        <input type="text" className="form-control"
                            value={this.state.studentProperties.score}
                            onChange={this.onScoreChange} />
                    </div>
                    <button type="button" className="btn btn-success mb-2" onClick={this.addStudent}>Submit</button>
                </form>
            </div>
        )
    }
}