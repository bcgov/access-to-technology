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
                    <label className="col-form-label control-label" htmlFor="trainingProgram">Eligible Skill And Training Program<span
                        style={{ color: "red" }}>*</span></label>
                    <Field
                        as="select"
                        className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "trainingProgram")}`}
                        id="trainingProgram"
                        name="trainingProgram"
                    >
                        <option value="">Please select</option>
                        <option value="Skills Training">Skills Training</option>
                        <option value="Essential Skills Training">Essential Skills Training</option>
                        <option value="Pre-Apprenticeship Training">Pre-Apprenticeship Training</option>
                        <option value="Other">Other</option>
                    </Field>
                    <small className="text-muted" id="trainingProgram">  This dropdown list here is determine by the funding source selected above</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
        }
        else if (this.props.values.fundingSource === "AEST") {
            return (<div className="form-row">
                <div className="form-group col-md-6">
                    <label className="col-form-label control-label" htmlFor="trainingProgram">Eligible Skill And Training Program<span
                        style={{ color: "red" }}>*</span></label>
                    <Field
                        as="select"
                        className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "trainingProgram")}`}
                        id="trainingProgram"
                        name="trainingProgram"
                    >
                        <option value="">Please select</option>
                        <option value="Skills Training for Employment">Skills Training for Employment</option>
                        <option value="ITA Funded Pre-Apprenticeship Training">ITA Funded Pre-Apprenticeship Training</option>
                        <option value="Blade Runners">Blade Runners</option>
                        <option value="Indigenous Employment and Skills Training">Indigenous Employment and Skills Training</option>
                    </Field>
                    <small className="text-muted" id="trainingProgram"> This dropdown list here is determine by the funding source selected above</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
        }
        else if (this.props.values.fundingSource === "SDPR") {
            return (<div className="form-row">
                <div className="form-group col-md-6">
                    <label className="col-form-label control-label" htmlFor="trainingProgram">Eligible Skill And Training Program<span
                        style={{ color: "red" }}>*</span></label>
                    <Field
                        as="select"
                        className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "trainingProgram")}`}
                        id="trainingProgram"
                        name="trainingProgram"
                    >
                        <option value="">Please select</option>
                        <option value="Short Duration Training">Short Duration Training</option>
                        <option value="Occupational Skills Training">Occupational Skills Training</option>
                        <option value="BC Adult Graduation Diploma">BC Adult Graduation Diploma</option>
                    </Field>
                    <small className="text-muted" id="trainingProgram">  This dropdown list here is determine by the funding source selected above</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
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
                    <h2 id="forms">Service Provider Information</h2>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="serviceProviderName">Service Provider Name <span
                            style={{ color: "red" }}>*</span></label>
                         <Field
                                as="select"
                                className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "serviceProviderName")}`}
                                id="serviceProviderName" 
                                name="serviceProviderName" 
                            >
                                <option value="">Please select</option>
                                <option value="AEST Service Provider">AEST Service Provider</option>
                                <option value="ISET Service Provider">ISET Service Provider</option>
                                <option value="SDPR Service Provider">SDPR Service Provider</option>
                            </Field>
                            {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderName")}
                    </div>
                </div>
                <div className="form-row">
                 <div className="form-group col-md-6">
                            <label className="col-form-label control-label" htmlFor="fundingSource">Referring Ministry <span
                                style={{ color: "red" }}>*</span></label>
                            <Field
                                as="select"
                                className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "fundingSource")}`}
                                id="fundingSource" 
                                name="fundingSource" 
                                onChange={e => {
                                    this.props.handleChange(e)
                                    this.props.setFieldValue("trainingProgram", "")
                                }}
                            >
                                <option value="">Please select</option>
                                <option value="AEST">AEST</option>
                                <option value="ISET">ISET</option>
                                <option value="SDPR">SDPR</option>
                            </Field>
                            {feedBackInvalid(this.props.errors,this.props.touched,"fundingSource")}
                    </div>
                </div>
                <div className="form-row"> 
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
                                }}  
                            />
                            {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderPostal")}
                    </div>
                </div>
               
                <div className="form-row">
                    <div className="form-group col-md-4">
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
                    <div className="form-group col-md-4">
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
                </div>  
                 <div className="form-row">
                    <div className="form-group col-md-8">
                        <label className="col-form-label control-label" htmlFor="providerContractId">Contract Reference ID <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "providerContractId")}`} id="providerContractId" name="providerContractId" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"providerContractId")}
                    </div>
                </div>
                <div className="form-group">
                    <h2 id="forms">Eligibility</h2>
                </div>
                {this.ApplicableProgramForm}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="periodStart1">Program Start Date<span
                            style={{ color: "red" }}>*</span></label>
                        <DatePickerField
                            name="periodStart1"
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "periodStart1")}`}
                            minDate={new Date()}
                            maxDate={new Date(2022,4,1)}
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
                            minDate={new Date(this.props.values['periodStart1'])}
                            maxDate={new Date(2022,4,1)}
                        />
                        {feedBackInvalid(this.props.errors, this.props.touched, "periodEnd1")}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="BCEAorFederalOnReserve">Client is a <b>BCEA</b> or <b>Federal on Reserve Individual</b><span
                            style={{ color: "red" }}>*</span> </label>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "BCEAorFederalOnReserve")}`}
                                type="radio"
                                name="BCEAorFederalOnReserve"
                                value="yes"
                            />
                            <label className="form-check-label" htmlFor="BCEAorFederalOnReserve">Yes</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "BCEAorFederalOnReserve")}`}
                                type="radio"
                                name="BCEAorFederalOnReserve"
                                value="no"
                            />
                            <label className="form-check-label" htmlFor="BCEAorFederalOnReserve">No</label>
                        </div>
                        {feedBackInvalid(this.props.errors, this.props.touched, "BCEAorFederalOnReserve")}
                    </div> 
                </div>
            </div>
        )
    }


}

export default FormStep1