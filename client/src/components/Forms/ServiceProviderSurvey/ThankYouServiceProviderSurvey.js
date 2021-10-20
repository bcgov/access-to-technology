import React, { Component } from 'react'


class ThankyouServiceProviderSurvey extends Component {
    get handleThankYouPage(){
        if (this.props.location.state !== undefined){
            if (this.props.location.state.hasStartedWorkExperience === "yes"){
                return (
                    <div>
                        <p>Thank you for providing your feedback and taking the time to help make the Work Experience Opportunities Grant program better. As a participant in the program, your views are very valuable and your contribution is much appreciated.</p>
                        <p>To find out more about WorkBC programs and services, check out these links below highlighting some of our great programs for both employers and jobseekers:</p>
                    </div>
                )
            } else if (this.props.location.state.hasStartedWorkExperience === "no"){
                return (
                    <div>
                        <p>You do not meet the qualifications for this survey. We sincerely thank you and appreciate your time, dedication, and continued interest in our programs and services.</p>
                        <p>You might be eligible for some of our other great programs for jobseekers. To find out more, please check out these links below:</p>
                    </div>
                )
            }
        }
        return null
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Thank you, your information has been received.</h1>
                        
                        <p>Thank you for taking the time to help make the Access to Technology (A2T) program better. As a Service Provider participating in the program, your views are very valuable and your contribution is much appreciated.</p>
                        
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

export default ThankyouServiceProviderSurvey