import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'

class FormStep3 extends Component {

    get showErrors() {
        if (this.props.submitCount > 0) {
            return (
                <div>
                    <p>Please correct the following errors:</p>
                    <ul>
                        {Object.values(this.props.errors).map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return null
        }
    }

    render() {
        if (this.props.currentStep !== 3) {
            return null
        }


        //Else return step 3
        return (
            <div>
                <div className="form-group">
                    <br /><h2 id="forms">Declaration and Signature</h2>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <Field type="checkbox" className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "clientEligibility")}`} id="clientEligibility" name="clientEligibility" />
                        {feedBackInvalid(this.props.errors, this.props.touched, "clientEligibility")}
                        <label className="form-check-label" htmlFor="clientEligibility"><span style={{ color: "red" }}>*</span> {`${this.props.values.serviceProviderName}`} CONFIRMS that {`${this.props.values.clientName}`}:
                           <ol style={{listStyleType:"decimal"}}>
                                <li >Is a resident of British Columbia;</li>
                                <li >Is unemployed or precariously employed;</li>
                                <li >Has been approved to participate in the eligible skills training program indicated above; </li>
                                <li >Requires a laptop computer to participate the eligible skills training program indicated above;</li>
                                <li >Does not currently have access to the required laptop computer; </li>
                                <li >Does not have the personal resources and has not and will not receive funding from another individual or organization for the purchase of the required laptop computer; </li>
                                <li>Receives one or more of the following forms of government assistance:  </li>
                                    <ol style={{listStyleType:"lower-alpha"}}>
                                        <li >Income assistance or hardship assistance under the Employment and Assistance Act (British Columbia);</li>
                                        <li >Disability assistance or hardship assistance under the Employment and Assistance for Persons with Disabilities Act (British Columbia);</li>
                                        <li >Social assistance provided by Indigenous Services Canada (ISC) for persons living on a First Nation Reserve;</li>
                                        <li >An Affordable Childcare Benefit under the Childcare Subsidy Act (British Columbia);</li>
                                        <li >Assistance from the British Columbia Ministry of Children and Family Development under an Agreement with a Young Adult.</li>
                                    </ol>
                                <li >Has reviewed the Collection Notice and agreed to the collection of their personal information ; and</li>

                                <div className="col-lg-12 pad">
                                    <div className="card card-secondary">
                                        <div className="card-header">
                                            <h4 className="my-0">COLLECTION NOTICE</h4>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">Personal information collected in this application is collected under the authority of sections 26 (c) and (e) of the Freedom of Information and 
                                                Protection of Privacy Act and is subject to all the provisions of that Act. The personal information collected will be used by the Ministry of 
                                                Social Development and Poverty Reduction (“MSDPR”), and its contracted A2T service provider to administer the A2T program, and may also be used 
                                                to evaluate the effectiveness of the A2T program. If you have any questions about the collection of your personal information, please contact the 
                                                Records Clerk of the Employment and Labour Market Services Division, MSDPR at WorkBCOESprivacy@gov.bc.ca.</p>
                                        </div>
                                    </div>
                                </div>
                                <li key={9}>Has reviewed the Confirmation, Consent and Agreement and agreed to all associated terms.</li>
                                    <div className="col-lg-12 pad">
                                        <div className="card card-secondary">
                                            <div className="card-header">
                                                <h4 className="my-0">CONSENT AND AGREEMENT</h4>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">As a participating client, I  </p>
                                                <ol style={{listStyleType:"decimal"}}>
                                                    <li >CONFIRM that I need a laptop computer to participate in and complete the training program described above.</li>
                                                    <li >CONSENT to SDPR or its contracted A2T service provider collecting my personal information from and disclosing my personal information to {`${this.props.values.serviceProviderName}`} for the purposes of administering or evaluating the effectiveness of the A2T program.</li>
                                                    <li >ACKNOWLEDGE and AGREE that:</li>
                                                    <ol style={{listStyleType:"lower-alpha"}}>
                                                    <li>My receipt and use of a laptop computer provided to me through the A2T program is dependent on my participation in the training described above;</li>
                                                    <li>If I complete the training described above to the satisfaction of {`${this.props.values.serviceProviderName}`} I may keep the laptop computer provided to me through the A2T program;</li>
                                                    <li>If I do not complete the training above to the satisfaction of {`${this.props.values.serviceProviderName}`} I must return the laptop computer, in good working order, to the A2T contractor;</li>
                                                    <li>I may not and will not use any laptop computer provided to me through the A2T program for the purposes of:</li>
                                                    <ol style={{listStyleType:"lower-roman"}}>
                                                        <li> sexual exploitation;</li>
                                                         <li>promoting hate or discrimination; </li>
                                                         <li>any other illegal activity; or</li>
                                                         <li>promoting any illegal activity.</li>
                                                        </ol>
                                                    </ol>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                            </ol>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <Field type="checkbox" className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "serviceProviderResponsibility")}`} id="serviceProviderResponsibility" name="serviceProviderResponsibility" />
                        {feedBackInvalid(this.props.errors, this.props.touched, "serviceProviderResponsibility")}
                        <label className="form-check-label" htmlFor="serviceProviderResponsibility"><span style={{ color: "red" }}>*</span> {`${this.props.values.serviceProviderName}`} ACKNOWLEDGES AND AGREES:
                            <ol style={{listStyleType:"decimal"}}>
                                <li >To advise the {`${this.props.values.fundingSource}`}  of the outcome of the individual’s participation in the approved training described in this application, in the form and manner requested by the {`${this.props.values.fundingSource}`} ; </li>
                                <li >If {`${this.props.values.clientName}`}  does not complete the approved eligible training described in this application to the satisfaction of {`${this.props.values.serviceProviderName}`} ), to:</li>
                                    <ol style={{listStyleType:"lower-alpha"}}>
                                        <li >Advise the A2T contractor that the individual did not complete the training; and</li>
                                        <li >Exercise reasonable due diligence in notifying the individual of their obligation to return the laptop computer to the A2T contractor. </li>
                                    </ol>
                                <li>If requested to do so by {`${this.props.values.fundingSource}`} , to provide documentation to demonstrate {`${this.props.values.serviceProviderName}`}  has applied the criteria described in the confirmation above to assess the eligibility of {`${this.props.values.clientName}`}  for the A2T program; and</li>
                                <li>That by clicking the "submit" icon below, {`${this.props.values.serviceProviderContact}`} , an authorized signatory for {`${this.props.values.serviceProviderName}`}  is attaching their electronic signature to this form, which has the same effect as if {`${this.props.values.serviceProviderContact}`}  were to manually sign a physical copy of this form.</li>
                            </ol>
                        </label>
                    </div>
                </div>
                {/*
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="signatoryTitle">Signing Authority Title <span
                        style={{ color: "red" }}>*  </span></label>
                    <small className="text-muted" id="signatoryTitle">Please enter the title of the organization signatory</small>
                    <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "signatoryTitle")}`}id="signatoryTitle" name="signatoryTitle" />
                    {feedBackInvalid(this.props.errors,this.props.touched,"signatoryTitle")}
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="signatory1">Signing Authority Full Name <span
                        style={{ color: "red" }}>*  </span></label>
                    <small className="text-muted" id="signatory1">Please enter the full name of the organization signatory</small>
                    <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "signatory1")}`} id="signatory1" name="signatory1" />
                    {feedBackInvalid(this.props.errors,this.props.touched,"signatory1")}
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <Field type="checkbox" className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "organizationConsent")}`} id="organizationConsent" name="organizationConsent" />
                        {feedBackInvalid(this.props.errors, this.props.touched, "organizationConsent")}
                        <label className="form-check-label" htmlFor="organizationConsent"><span style={{ color: "red" }}>*</span> I acknowledge and understand that by clicking the "submit" I am attaching my electronic signature to this form and that by doing so I acquire the same rights, incur the same obligations and confer the same consent as I would by manually signing a physical copy of this form.</label>
                    </div>
                </div>
                */}
                <div className="form-group">
                    {this.showErrors}
                </div>

                <button
                    className="btn btn-success btn-block"
                    type="submit"
                    style={{ marginBottom: "2rem" }}
                    disabled={this.props.isSubmitting || this.props.hasError}
                >
                    {
                    this.props.isSubmitting ?
                        <div>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              Submitting...
                        </div>
                        :
                        "Submit"

                    }                      
                
                </button>
            </div>

        )
    }
}

export default FormStep3