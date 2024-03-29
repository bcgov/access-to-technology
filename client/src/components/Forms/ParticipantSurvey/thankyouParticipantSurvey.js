import React, { Component } from 'react'


class thankyouProviderIntake extends Component {
    
    render() {

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Your survey has been received.</h1>
                        
                        <p>Thank you for taking the time to help make the Access to Technology (A2T) program better. As a participant in the program, your views are very valuable and your contribution is much appreciated.</p>
                        
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

export default thankyouProviderIntake