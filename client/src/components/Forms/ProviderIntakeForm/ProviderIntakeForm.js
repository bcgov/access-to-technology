import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Formik, Form } from 'formik'

import '../../../utils/polyfills'
import {customAlphabet} from 'nanoid'
import FormStep1 from './ProviderIntakeFormStep1'
import FormStep3 from './ProviderIntakeFormStep3'
import ProviderIntakeStep2 from './ProviderIntakeFormStep2'
import ProgressTracker from '../shared/ProgressTracker'
import {ProviderIntakeValidationSchema} from './ProviderIntakeValidationSchema'
import { FORM_URL } from '../../../constants/form'
import { generateAlert } from '../shared/Alert'
import {pathToRegexp} from 'path-to-regexp'

class ProviderIntakeForm extends Component {
    constructor(){
        super()
        var key = []
        var re = pathToRegexp('/:id/:token', key)
        var sample = window.location.href.split("/providerIntake")[1]
        var content = re.exec(sample) //[/id/token/, id, token]]
        console.log("content"+ content);
        const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',10);
        const nanoid1 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',25);
        
        this.state={
            _csrf: '',
            currentStep: 1,
            _id: (content != null) ? content[1] : nanoid(),
            _token: (content != null) ? content[2] :nanoid1(),
            serviceProviderName: '',
            fundingSource: '',
            serviceProviderEmail: '',
            clientName: '',
            clientLastName:'',
            inDB: (content != null) ? true : false,
            hasError: false,
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
                    console.log("Getting Token");
                    console.log(result);
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
        if(values.inDB){
            fetch(FORM_URL.ProviderIntakeForm+"/getData/"+values._id+"/"+values._token,  {
                credentials: "include",
            }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    if(result.err === "Not Found"){
                        this.setState({
                            hasError: true
                        })
                    }else{
                        this.setState({
                            serviceProviderName: result.serviceProviderName,
                            fundingSource: result.fundingSource,
                            serviceProviderEmail: result.serviceProviderEmail,
                            clientName: result.clientName,
                            clientLastName: result.clientLastName,
                            pdfFile:result.pdfFile,
                        })
                    }
                },
                (error) => {
                    console.log(error)
                    this.setState({
                            hasError: true
                    })
                }
            )
        }
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

    nextButton(touched, errors){
        let currentStep = this.state.currentStep;
        var nextFlag = true;
        console.log(parseInt(Object.keys(touched).length));
        console.log(parseInt(Object.keys(errors).length));
        console.log(this.state);
        console.log(errors);
        console.log(errors['workBCCaseNumber']);
        if(currentStep === 1){
            if('workBCCaseNumber' in errors){
                nextFlag = ((parseInt(Object.keys(errors).length) > 11 || (parseInt(Object.keys(errors).length) === 0 && parseInt(Object.keys(touched).length) === 0)));
             }else{
                nextFlag = ((parseInt(Object.keys(errors).length) > 10 || (parseInt(Object.keys(errors).length) === 0 && parseInt(Object.keys(touched).length) === 0)));
             }
        }
        else if(currentStep === 2){
            nextFlag = (parseInt(Object.keys(errors).length) > 2 );
        }
        if(currentStep !== 3){
          return (
            <button 
              className="btn btn-primary float-right" 
              type="button" 
              onClick={this._next}
              disabled={nextFlag}
            
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
                    <h2> Access to Technology (A2T) Application </h2>
                    <div className="col-md-12">
                        <ProgressTracker currentStep={this.state.currentStep}/>
                        {this.state.hasError && (
                            generateAlert("alert-danger","An error has occurred, please refresh the page. If the error persists, please try again later.")
                        )}
                        <Formik
                            initialValues= {{
                                    _csrf: this.state._csrf,
                                    _id: this.state._id,
                                    _token: this.state._token,
                                    inDB: this.state.inDB,
                                    
                                    consent: this.state.inDB,
                                    fileName:"",
                                    fileSize:0,
                                    fileType:"",
                                    fileData: null,
                                          
                                    //step 1
                                    serviceProviderName: this.state.serviceProviderName,
                                    serviceProviderPostal:"",
                                    serviceProviderContact:"",
                                    serviceProviderPhone:"",
                                    serviceProviderEmail: this.state.serviceProviderEmail,
                                    serviceProviderConfirmationEmail: this.state.serviceProviderEmail,
                                    fundingSource: this.state.fundingSource,
                                    trainingProgram:"",
                                    periodStart1:"",
                                    periodEnd1:"",
                                    BCEAorFederalOnReserve:[],
                                    //step2
                                    workBCCaseNumber:"",
                                    clientName: this.state.clientName,
                                    clientLastName: this.state.clientLastName,
                                    clientMiddleName:"",
                                    clientAddress:"",
                                    clientAddress2:"",
                                    clientCity:"",
                                    clientProvince:"British Columbia",
                                    clientPostal:"",
                                    clientPhone:"",
                                    clientEmail:"",
                                    clientConfirmationEmail:"",
                                    altShippingAddress: false,

                                    //step 2:pop-up fields
                                    recipientName:"",
                                    /*clientResidesInBC:"",
                                    clientUnemployed:"",
                                    registeredInApprovedProgram:"",
                                    accessToComputerCurrently:"",
                                    receivingAlternateFunding:"",
                                    financialNeed:"",*/
                                    //step 3
                                    //signatoryTitle:"",
                                    //signatory1:"",
                                    clientEligibility:false,
                                    serviceProviderResponsibility:false,
                                    //organizationConsent: false,
    


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
                                                    You will need to submit client information in step 2.
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
                                    <ProviderIntakeStep2
                                        currentStep={this.state.currentStep}
                                        {...props}
                                    />
                                     <FormStep3
                                        currentStep={this.state.currentStep}
                                        {...props}
                                    />
                                    {this.previousButton}
                                    {this.nextButton(props.touched, props.errors)}

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