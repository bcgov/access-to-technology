import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Formik, Form } from 'formik'

import '../../../utils/polyfills'
import FormStep1 from './ParticipantSurveyFormStep1'
import FormStep2 from './ParticipantSurveyFormStep2'

import {ParticipantSurveyValidationSchema} from './ParticipantSurveyValidationSchema'
import { FORM_URL } from '../../../constants/form'
import { generateAlert } from '../shared/Alert'
import {customAlphabet} from 'nanoid'
import {pathToRegexp} from 'path-to-regexp'

class ParticipantSurvey extends Component {
    constructor(){
        super()
        var key = []
        const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',10)
        var re = pathToRegexp('/:id/:token', key)
        var sample = window.location.href.split("/ParticipantSurvey")[1]
        var content = re.exec(sample) //[/id/token/, id, token]]
        console.log("content"+ content);
        
        this.state={
            _csrf: '',
            currentStep: 1,
            _id:  content[1],
            _token: content[2],
            new_id: nanoid(),
            hasIdError:false,
            resubmit:false,
            results:[],
            inDB: (content != null) ? true : false,
            hasError: ( content[1] === "" ||  content[1].length !== 10 ||content[2] === "" || content[2].length !== 25 ),
        }
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
    }
   
    componentDidMount() {
        fetch(FORM_URL.participantSurvey, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Getting Token");
                    console.log(result.csrfToken);
                   // console.log(result.csrfToken)
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
           this.getContext(this.state)
    }

    getContext(values){
        fetch(FORM_URL.participantSurvey+"/getData/"+values._id+"/"+values._token,  {
            credentials: "include",
        }).then(res => res.json())
        .then(
            (result) => {
                if(result.err === "Not Found"){
                    this.setState({
                        hasError: true
                    })
                }else{
                    console.log(result);
                    this.setState({
                        results:result.results,
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
        ).then(
            (result) => {
                console.log(result)
            if (Object.getOwnPropertyNames(this.state.results).length > 8){
                var clientData = this.state.results;
                this.setState({
                    clientName:clientData.clientName,
                    clientLastName:clientData.clientLastName,
                    resubmit: clientData.clientSurveyCompleted,
                })
            }
            })
    }
   

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.history.push('/thankyou')
    }

    _next() {
        this.setState( prevState => {
            return {
                currentStep: prevState.currentStep >=  2 ? 3 : prevState.currentStep + 1
            }
        })
    }

    _prev() {
        this.setState( prevState => {
            return {
                currentStep: prevState.currentStep <= 1 ? 1 : prevState.currentStep - 1 
            } 
        })
    }


    get previousButton(){
        let currentStep = this.state.currentStep;
        if(currentStep !== 1){
          return (
            <button 
              className="btn btn-secondary" 
              type="button" onClick={this._prev}>
            Back to Landing Page
            </button>
          )
        }
        return null;
    }

    nextButton(touched, errors){
        let currentStep = this.state.currentStep;
        var nextFlag = false;
        console.log(this.state.currentStep);
        if(currentStep !== 2){
          return (
            <button 
              className="btn btn-primary float-right" 
              type="button" 
              onClick={this._next}
              disabled={nextFlag}
            
            >
            Proceed To Survey
            </button>        
          )
        }

        return null;
    }
  

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2> Access to Technology (A2T) Client Survey </h2>
                    <div className="col-md-12">
                        {this.state.hasError && (
                            generateAlert("alert-danger","An error has occurred, please refresh the page. If the error persists, please try again later.")
                        )}

                        <Formik
                            initialValues= {{
                                    _csrf: this.state._csrf,
                                    _id: this.state._id,
                                    _token: this.state._token,
                                    new_id:this.state.new_id,
                                    resubmit:this.state.resubmit,
                                    hasIdError:this.state.hasIdError,
                                    hasError:this.state.hasError,
                                    //step 1
                                    laptopWasNeeded:"",
                                    technicalSupportSatisfaction:"",
                                    feedBackAndExperienceComments:"",
                                    certificateProgram:"",
                                    hoursPerWeek:"",
                                    postTrainingPlans:"",

    


                            }}
                            enableReinitialize={true}
                            validationSchema={ParticipantSurveyValidationSchema}
                            onSubmit={(values, {resetForm, setErrors, setStatus, setSubmitting }) => {
                                fetch(FORM_URL.participantSurvey, {
                                    method: "POST",
                                    credentials: 'include',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type':'application/json',
                                    },
                                    body: JSON.stringify(values),
                                })
                                
                                    .then(res => res.json())
                                    .then(
                                        resp => {
                                            //console.log(resp)

                                            if (resp.err){
                                                //console.log("errors", resp)
                                                alert("Please review your form, a field is incomplete.")
                                                setSubmitting(false)
                                                setErrors(resp.err)

                                            } else if(resp.emailErr){
                                                //console.log("emailError", resp)
                                                setSubmitting(false)
                                                this.setState({
                                                    hasError: true
                                                })
                                                alert("There has been an error submitting your survey, please contact your Service Provider.")
                                                
                                            } 
                                            else if (resp.ok){
                                                setSubmitting(true)
                                                this.props.history.push('/thankYouParticipantSurvey',values)
                                            }
                                        }
                                    )
                                
                                
                            }}
                        
                        >
                            { props => ( 
                                <Form>
                                    <FormStep1 
                                        currentStep={this.state.currentStep}
                                        {...props}
                                    />
                                     <FormStep2
                                        currentStep={this.state.currentStep}
                                        {...props}
                                    />
                                    {this.state.hasError ===false && !this.state.resubmit && this.previousButton}
                                    {this.state.hasError ===false && !this.state.resubmit && this.nextButton(props.touched, props.errors)}

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>


            )
        }
}
export default withRouter(ParticipantSurvey);