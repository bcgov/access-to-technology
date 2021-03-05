import React, { Component } from 'react'
import {Field} from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'
import { DatePickerField } from '../shared/DatePickerField'


class FormStep1 extends Component {

    constructor(){
        super()
        this.state = {
           
        }
    }
    get ApplicableProgramForm(){
        if (this.props.values.fundingSource === "ISET") {
            return (<div className="form-row">
                <div className="form-group col-md-6">
                    <label className="col-form-label control-label" htmlFor="trainingProgramISET">Approved Eligible Skills Training and Employment Program<span
                        style={{ color: "red" }}>*</span></label>
                    <Field
                        as="select"
                        className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "trainingProgramISET")}`}
                        id="trainingProgramISET"
                        name="trainingProgramISET"
                    >
                        <option value="">Please select</option>
                        <option value="Skills Training">Skills Training</option>
                        <option value="Essential Skills Training">Essential Skills Training</option>
                        <option value="Pre-Apprenticeship Training">Pre-Apprenticeship Training</option>
                        <option value="Other">Other</option>
                    </Field>
                    <small className="text-muted" id="trainingProgramISET">  This dropdown list here is determine by the funding source selected above</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgramISET")}
                </div>
            </div>)
        }
        else if (this.props.values.fundingSource === "AEST") {
            return (<div className="form-row">
                <div className="form-group col-md-6">
                    <label className="col-form-label control-label" htmlFor="trainingProgramAEST">Approved Eligible Skills Training and Employment Program<span
                        style={{ color: "red" }}>*</span></label>
                    <Field
                        as="select"
                        className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "trainingProgramAEST")}`}
                        id="trainingProgramAEST"
                        name="trainingProgramAEST"
                    >
                        <option value="">Please select</option>
                        <option value="Skills Training for Employment">Skills Training for Employment</option>
                        <option value="ITA Funded Pre-Apprenticeship Training">ITA Funded Pre-Apprenticeship Training</option>
                        <option value="Blade Runners">Blade Runners</option>
                        <option value="Indigenous Employment and Skills Training">Indigenous Employment and Skills Training</option>
                    </Field>
                    <small className="text-muted" id="trainingProgramAEST"> This dropdown list here is determine by the funding source selected above</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgramAEST")}
                </div>
            </div>)
        }
        else if (this.props.values.fundingSource === "SDPR") {
            return (<div className="form-row">
                <div className="form-group col-md-6">
                    <label className="col-form-label control-label" htmlFor="trainingProgramSDPR">Approved Eligible Skills Training and Employment Program<span
                        style={{ color: "red" }}>*</span></label>
                    <Field
                        as="select"
                        className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "trainingProgramSDPR")}`}
                        id="trainingProgramSDPR"
                        name="trainingProgramSDPR"
                    >
                        <option value="">Please select</option>
                        <option value="Skills Enhancement Training">Skills Enhancement Training</option>
                        <option value="Project Based Labour Market Training">Project Based Labour Market Training</option>
                        <option value="Self Employment Services">Self Employment Services</option>
                    </Field>
                    <small className="text-muted" id="trainingProgramSDPR">  This dropdown list here is determine by the funding source selected above</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgramSDPR")}
                </div>
            </div>)
        }
        else{
            return(<div>Please select a funding source above</div>);
        }
    }
  
   
    render() {
        if (this.props.currentStep !== 1) {
            return null
        }
        //Else return step 1
        return (

            <div>
                <p>
                    If you are having difficulty completing the application for Access to Technology, please contact your local <a href="https://www.workbc.ca/Employment-Services/WorkBC-Centres/Find-Your-WorkBC-Centre.aspx" target="_blank" rel="noopener noreferrer">WorkBC office</a>, 
                    an application guide is also available <a href="https://www.workbc.ca/getmedia/3532dbe8-f084-4022-bd3c-8f9ebe422fa4/WS-Guide.aspx" target="_blank" rel="noopener noreferrer">here</a>.
                </p>
                <div className="form-group">
                    <h2 id="forms">Application Tracking Information</h2>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="applicationId">Client Application ID <span
                        style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "applicationId")}`} id="applicationId" name="applicationId"/>
                        {feedBackInvalid(this.props.errors,this.props.touched,"applicationId")}
                        <small className="text-muted" id="applicationId">  Expected format: BCXXXXXXXXX</small>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="serviceProviderName">Service Provider Name <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "serviceProviderName")}`} id="serviceProviderName" name="serviceProviderName" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderName")}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label className="col-form-label control-label" htmlFor="providerContractId">Service Provider Contract Reference ID <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "providerContractId")}`} id="providerContractId" name="providerContractId" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"providerContractId")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="serviceProviderPostal">Postal Code <span
                            style={{ color: "red" }}>*  </span></label>
                        <small className="text-muted" id="serviceProviderPostal">  V0R2V5</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "serviceProviderPostal")}`} 
                            id="serviceProviderPostal" 
                            name="serviceProviderPostal"
                            onChange={e => {
                                this.props.handleChange(e)
                                this.props.setFieldValue("_ca","")
                            }}  
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderPostal")}
                    </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-8">
                        <label className="col-form-label control-label" htmlFor="serviceProviderContact">Contact Name <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "serviceProviderContact")}`} id="serviceProviderContact" name="serviceProviderContact" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderContact")}
                    </div>
                <div className="form-group col-md-4">
                            <label className="col-form-label control-label" htmlFor="serviceProviderPhone">Phone Number <span
                                style={{ color: "red" }}>*</span></label>
                            <small className="text-muted" id="serviceProviderPhone">  250-555-5555</small>
                            <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "serviceProviderPhone")}`} id="serviceProviderPhone" name="serviceProviderPhone" />
                            {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderPhone")}
                    </div>
                   
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                            <label className="col-form-label control-label" htmlFor="serviceProviderEmail">E-mail Address <span
                                    style={{ color: "red" }}>*</span></label>
                            <small className="text-muted" id="serviceProviderEmail">  someone@example.com</small>
                            <Field 
                                className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "serviceProviderEmail")}`} 
                                id="serviceProviderEmail" 
                                name="serviceProviderEmail" 
                                onBlur={e => {
                                    this.props.handleBlur(e)
                                    if(!this.props.errors.serviceProviderEmail) {
                                        this.props.setFieldValue("_bEmailDomain", this.props.values.serviceProviderEmail.substring(this.props.values.serviceProviderEmail.lastIndexOf("@") + 1))
                                    }
                                }}
                            />
                            {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderEmail")}
                    </div>
                    <div className="form-group col-md-6">
                            <label className="col-form-label control-label" htmlFor="fundingSource">Funding Source <span
                                style={{ color: "red" }}>*</span></label>
                            <Field
                                as="select"
                                className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "fundingSource")}`}
                                id="fundingSource" 
                                name="fundingSource" 
                            >
                                <option value="">Please select</option>
                                <option value="AEST">AEST</option>
                                <option value="ISET">ISET</option>
                                <option value="SDPR">SDPR</option>
                            </Field>
                            {feedBackInvalid(this.props.errors,this.props.touched,"fundingSource")}
                        </div>
                </div>
                <div className="form-group">
                    <h2 id="forms">Client Program Information</h2>
                </div>
                {this.ApplicableProgramForm}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="periodStart1">Program Start Date<span
                            style={{ color: "red" }}>*</span></label>
                        <DatePickerField
                            name="periodStart1"
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "periodStart1")}`}
                        />
                        <small className="text-muted" id="periodStart1">  Note: Application end dates after march of 2022 do not qualify.</small>
                        {feedBackInvalid(this.props.errors, this.props.touched, "periodStart1")}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="periodEnd1">Program End Date <span
                            style={{ color: "red" }}>*</span></label>
                        <DatePickerField
                            name="periodEnd1"
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "periodEnd1")}`}
                        />

                        {feedBackInvalid(this.props.errors, this.props.touched, "periodEnd1")}
                    </div>
                </div>
            </div>
        )
    }


}

export default FormStep1