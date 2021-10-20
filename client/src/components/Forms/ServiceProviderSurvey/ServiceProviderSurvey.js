import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Formik, Form} from 'formik'
import {generateAlert} from '../shared/Alert'
import {customAlphabet} from 'nanoid'
import ServiceProviderSurveyStep0 from './ServiceProviderSurveyStep0'
import ServiceProviderSurveyStep1 from './ServiceProviderSurveyStep1'
import ServiceProviderSurveyStep2 from './ServiceProviderSurveyStep2'
import ProgressTracker from './ProgressTracker'
import { ServiceProviderSurveyValidationSchema } from './ServiceProviderSurveyValidation'
import { FORM_URL } from '../../../constants/form'
import {pathToRegexp} from 'path-to-regexp'

class ServiceProviderSurvey extends Component {
    constructor(){
        super()
        var key = []
        const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',5)
        var re = pathToRegexp('/:id', key)
        var sample = window.location.href.split("/ServiceProviderSurvey")[1]
        var content = re.exec(sample) //[/id/token/, id, token]]
        this.state={
            currentStep: 0,
            _csrf: '',
            _id: nanoid(),
            _uid: '',
            _intake:'',
            completed: false,
            firstName:'',
            cohort:'',
            referral_wid: content[1],
            hasError: false,
            invalidLink: false,
        }
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
    }

    componentDidMount() {
        fetch(FORM_URL.serviceProviderSurvey, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        _csrf: result.csrfToken,
                    })
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        hasError: true
                    })
                }
            )
        this.getContext(this.state);
    }

    getContext(values){
        fetch(FORM_URL.serviceProviderSurvey+"/getData/"+values.referral_wid,  {
            credentials: "include",
        }).then(res => res.json())
        .then(
            (result) => {
                if(result.err === "Not Found"){
                    this.setState({
                        hasError: true,
                        invalidLink:true,
                    })
                }else{
                    console.log(result);
                    this.setState({
                        firstName:result.firstName,
                        cohort:result.cohort,
                        completed:result.completed,
                    })
                }
            },
            (error) => {
                console.log(error)
                //set to true to enforces
                this.setState({
                        hasError: false
                })
            }
        )
    }

    _next() {
        this.setState( prevState => {
            return {
                currentStep: prevState.currentStep >= 1 ? 2 : prevState.currentStep + 1
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

    get nextButton(){
        let currentStep = this.state.currentStep;

        if( currentStep < 2 && !this.state.invalidLink && !this.state.completed){
          return (
            <button 
              className="btn btn-primary float-right" 
              type="button" onClick={this._next}
            >
            {(currentStep === 0)? "Start": "Next"}
            </button>        
          )
        } else{
            return (
                <div>
                </div>     )   
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        { (this.state.currentStep > 0) &&
                        <ProgressTracker currentStep={this.state.currentStep}/>
                        }
                        {this.state.hasError && (
                            generateAlert("alert-danger","An error has occurred, please refresh the page. If the error persists, please try again later.")
                        )}
                        {this.state.invalidLink && (
                            generateAlert("alert-danger","Invalid link, please use the link that was sent to you through email.")
                        )}
                          {this.state.completed && (
                            generateAlert("alert-danger","Your Survey has already been submitted. Thank you.")
                        )}
                        <Formik
                            initialValues={{
                                _csrf: this.state._csrf,
                                _id: this.state._id,
                                _uid: this.state._uid,
                                _intake: this.state._intake,
                                referral_wid: this.state.referral_wid,
                                cohort: this.state.cohort,
                                //step 1
                                easeOfApplicationCompletion: '',
                                applicationProcessingSpeed: '',
                                otherTrainingProgramsSuggestions: '',
                                overallExperienceWithOnlineApplicationProcess: '',
                                //step 2
                                programsSupportOfClient: '',
                                levelOfSupportsReceived: '',
                                overallExperienceWithOrganization: '',

                            }}
                            enableReinitialize={true}
                            validationSchema={ServiceProviderSurveyValidationSchema}
                            onSubmit={(values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                                fetch(FORM_URL.serviceProviderSurvey, {
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
                                                this.props.history.push('/thankYouServiceProviderSurvey', values)
                                            }
                                        }
                                    )
                            }}
                        >
                        {props => (
                            
                            <Form>
                                <ServiceProviderSurveyStep0
                                    currentStep={this.state.currentStep}
                                    {...props}
                                />
                                <ServiceProviderSurveyStep1
                                    currentStep={this.state.currentStep}
                                    {...props}
                                />
                                <ServiceProviderSurveyStep2
                                    currentStep={this.state.currentStep}
                                    {...props}
                                />
                               

                                {this.previousButton}
                                {this.nextButton}
                            </Form>
                        )}

                        </Formik>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(ServiceProviderSurvey);

