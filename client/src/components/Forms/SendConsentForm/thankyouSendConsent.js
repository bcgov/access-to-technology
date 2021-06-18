import React, { Component } from 'react'


class thankyouSendConsent extends Component {
    
    render() {

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Thank you! The consent and agreement link has been sent to your client!</h1>
                        <h3>Application ID: {this.props.location.state !== undefined && this.props.location.state._id}</h3>
                        <p>Your client should receive their consent form in the next 5 - 10 minutes.</p>
                    </div>
                </div>
                <div className="row">
                <div className="col-lg-8">
                    <div>
                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="close" data-dismiss="alert">×</button>
                            <strong>Complete!</strong> <br/>Your submission Has been received.
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default thankyouSendConsent