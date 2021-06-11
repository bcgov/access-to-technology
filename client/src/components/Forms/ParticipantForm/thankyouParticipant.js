import React, { Component } from 'react'


class thankyouParticipant extends Component {
    
    render() {

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Thank you for submitting your consent and agreement!</h1>
                        <h3>Application ID: {this.props.location.state !== undefined && this.props.location.state._id}</h3>
                        <p>Thank you for completing your consent and agreement to receive a laptop from the Access to Technology Program. You will receive an email with a Canada Post tracking number when your laptop has been shipped. </p>
                    </div>
                </div>
                <div className="row">
                <div className="col-lg-8">
                    <div>
                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="close" data-dismiss="alert">×</button>
                            <strong>Complete!</strong> <br/>Your consent and agreement have been received. You will receive an email copy shortly.
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default thankyouParticipant