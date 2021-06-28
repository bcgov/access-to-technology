import React, { Component } from 'react'


class thankyouSendConsent extends Component {
    
    render() {

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>The Client Consent and Agreement form has been sent to your client.</h1>
                        <h3>Application ID: {this.props.location.state !== undefined && this.props.location.state._id}</h3>
                        <p>Please ask your client to complete and submit the form as soon as possible.</p>
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