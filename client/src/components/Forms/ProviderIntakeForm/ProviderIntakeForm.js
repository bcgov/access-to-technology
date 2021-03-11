import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Formik, Form} from 'formik'
import '../../../utils/polyfills'
import {customAlphabet} from 'nanoid'
import FormStep1 from '../shared/FormStep1'
import FormStep2 from '../shared/FormStep2'
import FormStep3 from '../shared/FormStep3'
import ProviderIntakeStep2 from './ProviderIntakeStep2'
import ProgressTracker from '../shared/ProgressTracker'
import {ProviderIntakeValidationSchema} from './ProviderIntakeValidationSchema'
import { FORM_URL } from '../../../constants/form'
import { generateAlert } from '../shared/Alert'

class ProviderIntakeForm extends Component {
    constructor(){
        super()
        const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',10)
        this.state={
            _csrf: '',
            currentStep: 1,
            _id: nanoid(),
            hasError: false
        }
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
    }

    componentDidMount() {
        fetch(FORM_URL.ProviderIntakeForm, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(
                (result) => {
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
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.history.push('/thankyou')
    }

    _next() {
        this.setState( prevState => {
            return {
                currentStep: prevState.currentStep >= 2 ? 3 : prevState.currentStep + 1
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
            Previous
            </button>
          )
        }
        return null;
    }

    get nextButton(){
        let currentStep = this.state.currentStep;

        if(currentStep < 3){
          return (
            <button 
              className="btn btn-primary float-right" 
              type="button" 
              onClick={this._next}
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
                    <h2>Identified Employee Form</h2>
                    <div className="col-md-12">
                        <ProgressTracker currentStep={this.state.currentStep}/>
                        {this.state.hasError && (
                            generateAlert("alert-danger","An error has occurred, please refresh the page. If the error persists, please try again later.")
                        )}
                        <Formik
                            initialValues= {{
                                    _csrf: this.state._csrf,
                                    _id: this.state._id,
                                    _bEmailDomain: "",
                                    //step 1
                                    serviceProviderName:"",
                                    providerContractId:"",
                                    serviceProviderPostal:"",
                                    serviceProviderContact:"",
                                    serviceProviderPhone:"",
                                    serviceProviderEmail:"",
                                    fundingSource:"",
                                    trainingProgramISET:"",
                                    trainingProgramAEST:"",
                                    trainingProgramSDPR:"",
                                    periodStart1:"",
                                    periodEnd1:"",
                                    clientAddress:"",
                                    clientCity:"",
                                    clientProvince:"British Columbia",
                                    clientPostal:"",
                                    clientPhone:"",
                                    clientFax:"",
                                    clientEmail:"",
                                    altShippingAddress: false,

                                    //step 1:pop-up fields
                                    addressAlt:"",
                                    cityAlt:"",
                                    provinceAlt:"BC",
                                    postalAlt:"",
                                    //step 2
                                    clientResidesInBC:"",
                                    clientUnemployed:"",
                                    registeredInApprovedProgram:"",
                                    accessToComputerCurrently:"",
                                    receivingAlternateFunding:"",
                                    financialNeed:"",
                                    //step 3
                                    signatoryTitle:"",
                                    signatory1:"",
                                    clientEligibility:false,
                                    serviceProviderResponsibility:false,
                                    organizationConsent: false,
    


                            }}
                            enableReinitialize={true}
                            validationSchema={ProviderIntakeValidationSchema}
                            onSubmit={(values, {resetForm, setErrors, setStatus, setSubmitting }) => {
                                fetch(FORM_URL.ProviderIntakeForm, {
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
                                            } 
                                            else if (resp.ok){
                                                setSubmitting(false)
                                                this.props.history.push('/thankYouProviderIntake',values)
                                            }
                                        }
                                    )
                                
                                
                            }}
                        
                        >
                            { props => ( 
                                <Form>
                                    {
                                        this.state.currentStep === 1 && (
                                            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                                    You will need to submit your clients information in step 2.
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            )
                                    }
                                    <FormStep1 
                                        currentStep={this.state.currentStep}
                                        {...props}
                                    />
                                    <FormStep2
                                        currentStep={this.state.currentStep}
                                        {...props}
                                    />
                                    <ProviderIntakeStep2
                                        currentStep={this.state.currentStep}
                                        {...props}
                                    />
                                     <FormStep3
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
export default withRouter(ProviderIntakeForm);