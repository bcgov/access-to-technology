import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Formik, Form} from 'formik'
import {generateAlert} from '../shared/Alert'
import {customAlphabet} from 'nanoid'
import SurveyParticipantStep0 from './SurveyParticipantStep0'
import SurveyParticipantStep1 from './SurveyParticipantStep1'
import SurveyParticipantStep2 from './SurveyParticipantStep2'
import SurveyParticipantStep3 from './SurveyParticipantStep3'
import SurveyParticipantStep4 from './SurveyParticipantStep4'
import ProgressTracker from './ProgressTracker'
import { SurveyParticipantValidationSchema } from './SurveyParticipantValidation'
import { FORM_URL } from '../../../constants/form'
import qs from 'qs'

class SurveyParticipant extends Component {
    constructor(){
        super()
        const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',5)
        this.state={
            currentStep: 0,
            _csrf: '',
            _id: nanoid(),
            _uid: '',
            _intake: '',
            hasError: false,
            invalidLink: false,
        }
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
    }

    componentDidMount() {
        fetch(FORM_URL.surveyParticipant, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result)
                    this.setState({
                        _csrf: result.csrfToken,
                    })
                },
                (error) => {
                    //console.log(error)
                    this.setState({
                        hasError: true
                    })
                }
            )
        let uid = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).uid || ""
        if (uid === ""){
            this.setState({invalidLink: false})
        }
        this.setState({"_uid": uid})
        if (this.props.match.path === "/surveyParticipant/2"){
            this.setState({_intake: '2'})
        } else if (this.props.match.path === "/surveyParticipant/3"){
            this.setState({_intake: '3'})
        }
    }

    _next() {
        this.setState( prevState => {
            return {
                currentStep: prevState.currentStep >= 3 ? 4 : prevState.currentStep + 1
            }
        })
    }

    _prev() {
        this.setState( prevState => {
            return {
                currentStep: prevState.currentStep <= 0 ? 0 : prevState.currentStep - 1 
            } 
        })
    }    

    get previousButton(){
        let currentStep = this.state.currentStep;
        if(currentStep !== 0){
          return (
            <button 
              className="btn btn-secondary" 
              type="button" onClick={this._prev}
            >
            Previous
            </button>
          )
        }
        return null;
    }

    nextButton(hasStartedWorkExperience){
        let currentStep = this.state.currentStep;

        if(currentStep < 4 && hasStartedWorkExperience === "yes" && !this.state.invalidLink){
          return (
            <button 
              className="btn btn-primary float-right" 
              type="button" onClick={this._next}
            >
            Next
            </button>        
          )
        }
        return null;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ProgressTracker currentStep={this.state.currentStep}/>
                        {this.state.hasError && (
                            generateAlert("alert-danger","An error has occurred, please refresh the page. If the error persists, please try again later.")
                        )}
                        {this.state.invalidLink && (
                            generateAlert("alert-danger","Invalid link, please use the link that was sent to you through email.")
                        )}
                        <Formik
                            initialValues={{
                                _csrf: this.state._csrf,
                                _id: this.state._id,
                                _uid: this.state._uid,
                                _intake: this.state._intake,
                                hasStartedWorkExperience: '',
                                workExperienceStartDate: '',
                                //step 1
                                easeOfApplicationCompletion: '',
                                experienceOnlineApplicationComments: '',
                                //step 2
                                overallExperienceWithOrganization: '',
                                levelOfSupportsReceived: '',
                                increasedAbilityGettingAndKeepingJob: '',
                                organizationAndExperienceComments: '',
                                //step 3
                                receivedOtherWorkBCServicesOrPrograms: '',
                                likelyToParticipateInSimilarProgram: '',
                                likelyToRecommendGrant: '',
                                //step 4
                                bestPartOfTheProgramComments: '',
                                experienceBetterComments: '',
                            }}
                            enableReinitialize={true}
                            validationSchema={SurveyParticipantValidationSchema}
                            onSubmit={(values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                                fetch(FORM_URL.surveyParticipant, {
                                    method: "POST",
                                    credentials: 'include',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(values),
                                })
                                    .then(res => res.json())
                                    .then(
                                        (resp) => {
                                            if (resp.err) {
                                                setErrors(resp.err)
                                                setSubmitting(false)
                                            } else if(resp.emailErr){
                                                setSubmitting(false)
                                                this.setState({
                                                    hasError: true
                                                })
                                            } else if (resp.ok) {
                                                setSubmitting(false)
                                                this.props.history.push('/thankYouSurveyParticipant', values)
                                            }
                                        }
                                    )
                            }}
                        >
                        {props => (
                            
                            <Form>
                                <SurveyParticipantStep0
                                    currentStep={this.state.currentStep}
                                    {...props}
                                />
                                <SurveyParticipantStep1
                                    currentStep={this.state.currentStep}
                                    {...props}
                                />
                                <SurveyParticipantStep2
                                    currentStep={this.state.currentStep}
                                    {...props}
                                />
                                <SurveyParticipantStep3
                                    currentStep={this.state.currentStep}
                                    {...props}
                                />
                                <SurveyParticipantStep4
                                    currentStep={this.state.currentStep}
                                    {...props}
                                />

                                {this.previousButton}
                                {this.nextButton(props.values.hasStartedWorkExperience)}
                            </Form>
                        )}

                        </Formik>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(SurveyParticipant);

