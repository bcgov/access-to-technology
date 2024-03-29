import React, { Component } from 'react'


class thankyouCourseCompletion extends Component {
    
    render() {

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Thank you for submitting your client's course completion survey!</h1>
                        <h3>Application ID: {this.props.location.state !== undefined && this.props.location.state._id}</h3>
                        <p>You'll receive another survey in 2 months regarding your client's employment status</p>
                    </div>
                </div>
                <div className="row">
                <div className="col-lg-8">
                    <div>
                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="close" data-dismiss="alert">×</button>
                            <strong>Complete!</strong> <br/>Your submission has been received.
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default thankyouCourseCompletion