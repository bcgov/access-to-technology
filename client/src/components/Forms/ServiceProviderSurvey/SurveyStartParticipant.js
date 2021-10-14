import React, { Component } from 'react'
import qs from 'qs'
import { generateAlert } from '../shared/Alert'

class SurveyStartParticipant extends Component {
    constructor() {
        super()
        this.state = {
            _uid: '',
            invalidLink: false,
        }
    }

    componentDidMount() {
        console.log(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).uid || "")
        console.log(this.props.location.search)
        console.log(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).uid )
        let uid = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).uid || ""
        if (uid === "") {
            this.setState({ invalidLink: true })
        } else {
            this.setState({ "_uid": uid })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Work Experience Opportunities Grant Participant Survey</h1>
                        {(this.state.invalidLink || typeof this.props.match.params.intake === 'undefined') && (
                            generateAlert("alert-danger", "Invalid link, please use the link that was sent to you through email.")
                        )}
                        <p>
                            Welcome to the Work Experience Opportunities Grant survey.
                        </p>
                        <p>
                            We need your help! Please share your views and experiences on the work experience so far. Feedback on the application process, the organization, the work experience, and any contribution the program has made to your skills and abilities is of great value. Providing this information will help improve the program for yourself and for future participants.
                        </p>
                        <p>
                            The survey will take approximately 5-7 minutes to complete and your feedback is greatly appreciated.
                        </p>
                        <p>
                            This survey is optional, and responses are confidential. Your responses will not be shared with anyone outside the Ministry and are for research purposes only to help improve the program.
                        </p>
                        <p>
                            Please don’t include personal or confidential information. If you do, we will not record this information.
                        </p>
                        <p>
                            How to complete the survey:
                        </p>
                        <ul>
                            <li>Use the buttons at the bottom of the page to move through the survey. Using the Internet browser buttons will not work.</li>
                            <li>Complete the survey in one sitting. Your answers will not be saved if you close the survey.</li>
                            <li>When you’re done, click on the "Submit" button at the end of the survey.</li>
                        </ul>
                        <p>Using assistive technology likes JAWS or Dragon?</p>
                        <ul>
                            <li>Use your navigation keys/commands to complete the survey – you can use the keyboard spacebar on the “Back”, “Next” and “Submit” buttons to navigate through the survey.</li>
                        </ul>
                        <p>Please note that all information is being collected under the authority of the <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96165_03#section26" target="_blank" rel="noopener noreferrer">Freedom of Information and Protection of Privacy Act, Section 26(e).</a> If you have any questions about the collection or use of this information, please contact the <a href="mailto:workexperiencegrants@gov.bc.ca">Ministry of Social Development and Poverty Reduction.</a></p>
                        <p>Thank you for participating – your contribution will make a difference in shaping how the Work Experience Opportunities Grant program is offered in the future!</p>
                        <p>
                            <a
                                href={`/surveyParticipant/${(typeof this.props.match.params.intake !== 'undefined') ? this.props.match.params.intake : ''}${this.state._uid !== "" ? `?uid=${this.state._uid}` : ''}`}
                                className={`btn btn-lg btn-primary ${(this.state.invalidLink || typeof this.props.match.params.intake === 'undefined') && "disabled"}`}
                            >Start
                            </a><br /></p>
                    </div>
                </div>

            </div>
        )
    }
}

export default SurveyStartParticipant