import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Formik, Form } from 'formik'
import FormStep1 from './SendConsentFormStep1'
import { SendConsentValidationSchema } from './SendConsentValidationSchema'
import { FORM_URL } from '../../../constants/form'
import {customAlphabet} from 'nanoid'
import { generateAlert } from '../shared/Alert'
import '../../../utils/polyfills'




class SendConsentForm extends Component {

    constructor() {
        super()
        const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',10);
        const nanoid1 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',25);

        this.state = {
            _csrf: '',
            currentStep: 1,
            _id: nanoid(),
            _token: nanoid1(),
            hasError: false,
               
        }
       
    }
    componentDidMount() {
        fetch(FORM_URL.sendForm, {
            credentials: "include"
        }).then(res => res.json())
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
    }

   
  
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.history.push('/thankyouSendConsent')
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <h2> Access to Technology (A2T) Send Consent </h2>
                    <div className="col-md-12">
                    {this.state.hasError && (
                            generateAlert("alert-danger", "An error has occurred, please refresh the page. If the error persists, please try again later.")
                        )} 
                        <Formik
                            initialValues={{
                                _csrf: this.state._csrf,
                                _id: this.state._id,
                                _token: this.state._token,
                                serviceProviderName: "",
                                fundingSource: "",
                                serviceProviderEmail: "",
                                serviceProviderConfirmationEmail:"",
                                clientEmail: "",
                                
                            }}
                            enableReinitialize={true}
                            validationSchema={SendConsentValidationSchema}
                            onSubmit={(values,  {resetForm, setErrors, setStatus, setSubmitting }) => {
                                fetch(FORM_URL.sendForm, {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(values),
                                })
                                    .then(res => res.json())
                                    .then((
                                        resp => {
                                            console.log(resp)
                                            if (resp.err) {
                                                console.log(resp.err)
                                                alert("There has been an error sending your consent page, please contact your service Provider.")
                                                setSubmitting(false)
                                                setErrors(resp.err)

                                            } else if (resp.emailErr) {
                                                setSubmitting(false)
                                                this.setState({
                                                    hasError: true
                                                })
                                                alert("There has been an error sending your consent please contact your service Provider")
                                            }
                                            else if (resp.ok) {
                                                setSubmitting(false);
                                                this.props.history.push('/thankyouSendConsent',values)
                                            }
                                        }
                                    ));
                            }}
                        >
                        { props => ( 
                                <Form>
                                    {
                                        this.state.currentStep === 1
                                    }
                                    <FormStep1 
                                        currentStep={this.state.currentStep}
                                        {...props}
                                    />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(SendConsentForm);