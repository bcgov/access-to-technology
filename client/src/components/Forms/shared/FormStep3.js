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
                */}
                <div className="form-group">
                    <div className="form-check">
                        <Field type="checkbox" className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "clientEligibility")}`} id="clientEligibility" name="clientEligibility" />
                        {feedBackInvalid(this.props.errors, this.props.touched, "clientEligibility")}
                        <label className="form-check-label" htmlFor="organizationConsent"><span style={{ color: "red" }}>*</span> I confirm that, the client requires an A2T laptop to participate in an approved eligible skills training and employment program and the client indeed:
                            <ul><li>Requires a laptop to participate in online training.</li>
                                <li>Does not currently have access to the required technology to participate in the online training;</li>
                                <li>And is not receiving funding from another individual or organization for the purchase of the required technology such as those listed below:</li>
                                <b>Not-for Profit:</b>
                                <ul>
                                    <li>Aboriginal not-for-profit groups Not-for-profit Band Councils</li>
                                    <li>Associations of workers and/or of employers</li>
                                    <li>Local community, charitable and voluntary organizations Provincial non-governmental organizations (NGOs) Sector councils</li>
                                    <li>Unions</li>
                                    <li>National NGOs related to activities in BC International NGOs, related to activities in BC</li>
                                </ul>
                                    <b>For Profit:</b>
                                    <ul>
                                    <li>Businesses, bodies incorporated or unincorporated Industry and professional associations</li>
                                    <li>Indian Band corporations (profit basis) Private Band Councils</li>
                                    <li>Private universities, colleges and career training institutions International Sector, related to activities in BC</li>
                                </ul>
                                    <b>Public Sector:</b>
                                <ul>
                                    <li>Municipal governments and agencies</li>
                                    <li>Public community colleges, provincial institutes and universities School Board/Other educational institutions not elsewhere classified Crown agencies</li>
                                    <li>International governmental organizations, related to activities in BC</li>
                                </ul>
                            </ul>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <Field type="checkbox" className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "clientEligibility")}`} id="clientEligibility" name="clientEligibility" />
                        {feedBackInvalid(this.props.errors, this.props.touched, "clientEligibility")}
                        <label className="form-check-label" htmlFor="organizationConsent"><span style={{ color: "red" }}>*</span> I confirm that, I will:
                            <ul><li>Advise the A2T contractor of the outcome of the individual’s participation in the approved training described in this application, in the form and manner requested by the A2T contractor ; and</li>
                                <li>If the individual named on this application does not complete the approved training described in this application to the satisfaction of </li>
                                <ul>
                                    <li>Advise the A2T contractor of the reason, if known, that the individual did not complete the training;</li>
                                    <li>Collect the laptop from the individual; and</li>
                                    <li>In consultation with the A2T contractor, submit the collected laptop to the A2T contractor.</li>
                                </ul>
                                <li>Upon request of the applicable funder (SDPR/AEST/ISET), provide documentation as required to demonstrate you have exercised due diligence in the assessment of client applications for an A2T laptop.</li></ul>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <Field type="checkbox" className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "organizationConsent")}`} id="organizationConsent" name="organizationConsent" />
                        {feedBackInvalid(this.props.errors, this.props.touched, "organizationConsent")}
                        <label className="form-check-label" htmlFor="organizationConsent"><span style={{ color: "red" }}>*</span> I acknowledge and understand that by clicking the "submit" I am attaching my electronic signature to this form and that by doing so I acquire the same rights, incur the same obligations and confer the same consent as I would by manually signing a physical copy of this form.</label>
                    </div>
                </div>
                <div className="form-group">
                    {this.showErrors}
                    <div className="alert alert-primary" role="alert">
                            This is a placeholder for any information you'd like to provide the user
                    </div>
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