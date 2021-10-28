import React, { Component } from 'react'




class FormStep1 extends Component {

    render() {
        if (this.props.currentStep !== 1) {
            return null
        }
        else if( this.props.values.hasError === true){
            return (
                <div>
                    <p>Please follow the link provided to you in your survey email.</p>
                </div>
            )

        } 
        else if( this.props.values.resubmit === true){
            return (
                <div>
                    <p>Your survey has either expired or already been completed. Thank you for you time.</p>
                </div>
            )

        } 
        else if (this.props.currentStep === 1) {
            return (

                <div>
                    <h2> Welcome to the Access to Technology (A2T) program survey </h2>
                    <p>
                        We need your help! Please share your views and experience with the Access to Technology (A2T) program so far. Your feedback on the program is of great value. Providing this information will help improve the program for yourself and for future participants.<br /><br />

                        The survey will take approximately 2-3 minutes to complete and your feedback is greatly appreciated.<br /><br />

                        This survey is optional, and responses are confidential. Responses might be shared with the Ministry of Advanced Education and Skills Training (AEST) or Indigenous Skills and Employment Training (ISET) service delivery organizations for research purposes only to help improve the program. Responses will be reported in an aggregate form and in a manner that does not allow individual responses to be identified.

                        Please do not include personal or confidential information. If you do, we will not record this information.<br /><br />

                        How to complete the survey:</p>
                    <ol style={{ listStyleType: "disc" }}>
                        <li>Use the buttons at the bottom of the page to move through the survey. Using the Internet browser buttons will not work.</li>

                        <li>Complete the survey in one sitting. Your answers will not be saved if you close the survey.</li>

                        <li>When you’re done, click on the "Submit" button at the end of the survey.</li>
                    </ol>
                    <p>
                        Instructions if you are using assistive technology, such as JAWS or Dragon:
                    </p>
                    <ol style={{ listStyleType: "disc" }}>
                        <li>Use your navigation keys/commands to complete the survey – you can use the keyboard spacebar on the “Back”, “Next” and “Submit” buttons to navigate through the survey.</li>
                    </ol>
                    <p>
                        Please note that all information is being collected under the authority of the <a target="_blank" rel="noreferrer" href="https://www.bclaws.ca/civix/document/id/complete/statreg/96165_03#section26">Freedom of Information and Protection of Privacy Act, Section 26(e)</a>. If you have any questions about the collection or use of this information, please contact the <a href="mailto:WorkBCOESprivacy@gov.bc.ca">Ministry of Social Development and Poverty Reduction</a>.

                        Thank you for participating – your contribution will make a difference in shaping how the Access to Technology (A2T) program is offered in the future!
                    </p>
                </div>
            )
        }
    }


}

export default FormStep1