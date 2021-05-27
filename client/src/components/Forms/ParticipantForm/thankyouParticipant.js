import React, { Component } from 'react'


class thankyouParticipant extends Component {
    
    render() {

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Thank you, your consent has been received!</h1>
                        <h3>Application ID: {this.props.location.state !== undefined && this.props.location.state._id}</h3>
                        <p>Thank you for your interest in Access to Technology services. You should receive an email when your application has been approved. Your laptop will ship within 4 weeks of your program start date </p>
                    </div>
                </div>
                <div className="row">
                <div class="col-lg-8">
                    <div>
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">×</button>
                            <strong>Well done!</strong> <br/>Your Consent Was Successfully Received
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default thankyouParticipant