import React, { Component } from 'react'
import {Field} from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'
import { DatePickerField } from '../shared/DatePickerField'
import moment from 'moment'


class FormStep1 extends Component {

    constructor(){
        super()
        this.state = {
           
        }
    }
    get ApplicableServiceProvider(){
        if (this.props.values.fundingSource === "ISET") {
            return (<div className="form-row">
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
                        <option value="ISET Service Provider">ISET Service Provider</option>
                    </Field>
                    {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderName")}
            </div>
        </div>
      )
        }
        else if (this.props.values.fundingSource === "AEST") {
            return( <div className="form-row">
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
                    </Field>
                    {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderName")}
            </div>
        </div>
      )
        }
        else if (this.props.values.fundingSource === "SDPR") {
            return (<div className="form-row">
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
                        <option value="SDPR Service Provider">SDPR Service Provider</option>
                    </Field>
                    {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderName")}
            </div>
        </div>
      )
        }
        else{
            return(<div>Please select a referring Ministry above to refine your applicable service providers</div>);
        }
    }
    get ApplicableProgramForm(){
        if (this.props.values.fundingSource === "ISET") {
            return (<div className="form-row">
                <div className="form-group col-md-6">
                    <label className="col-form-label control-label" htmlFor="trainingProgram">Eligible Skills Training Program<span
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
                    <label className="col-form-label control-label" htmlFor="trainingProgram">Eligible Skills Training Program<span
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
                        <option value="Indigenous Skills Training and">Indigenous Skills Training and Education</option>
                    </Field>
                    <small className="text-muted" id="trainingProgram"> This dropdown list here is determine by the funding source selected above</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
        }
        else if (this.props.values.fundingSource === "SDPR") {
            return (<div className="form-row">
                <div className="form-group col-md-6">
                    <label className="col-form-label control-label" htmlFor="trainingProgram">Eligible Skills Training Program<span
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
                    <small className="text-muted" id="trainingProgram">  This dropdown list here is determined by the referring ministry selected above.</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
        }
        else{
            return(<div>Please select a referring Ministry above</div>);
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
                If assistance is required in completing this application please refer to the A2T Service Provider Guide <a href="https://www.workbc.ca/Employment-Services/WorkBC-Centres/Find-Your-WorkBC-Centre.aspx" target="_blank" rel="noopener noreferrer">here</a>. 
                </p>
                <div className="form-group">
                    <h2 id="forms">Service Provider Information</h2>
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
                                    this.props.setFieldValue("serviceProviderName", "")
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

                {this.ApplicableServiceProvider}
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label className="col-form-label control-label" htmlFor="providerContractId">Contract Reference ID <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "providerContractId")}`} id="providerContractId" name="providerContractId" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"providerContractId")}
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
                            <label className="col-form-label control-label" htmlFor="serviceProviderContact">Staff Name <span
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
                <div className="form-group">
                    <h2 id="forms">Program Eligibility</h2>
                </div>
                {this.ApplicableProgramForm}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="periodStart1"> Training Program Start Date<span
                            style={{ color: "red" }}>*</span></label>
                        <DatePickerField
                            name="periodStart1"
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "periodStart1")}`}
                            minDate={new Date(2021,7,1)}
                            maxDate={new Date(2023,2,2)}
                        />
                        <small className="text-muted" id="periodStart1">  Note: Training program starts dates before August 1, 2021 or after March 3, 2023 do not qualify. ​</small>
                        {feedBackInvalid(this.props.errors, this.props.touched, "periodStart1")}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="periodEnd1"> Training Program End Date <span
                            style={{ color: "red" }}>*</span></label>
                        <DatePickerField
                            name="periodEnd1"
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "periodEnd1")}`}
                            minDate={new Date (moment(this.props.values['periodStart1']).add(28, 'days'))}
                            maxDate={new Date(2023,3,3)}
                        />
                        {feedBackInvalid(this.props.errors, this.props.touched, "periodEnd1")}
                    </div>
                </div>
                <div className="form-group">
                    <h2 id="forms">Client Eligibility</h2>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="unemployed">Client is unemployed or precariously employed
                        <span
                            style={{ color: "red" }}>*</span> </label>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "unemployed")}`}
                                type="radio"
                                name="unemployed"
                                value="yes"
                            />
                            <label className="form-check-label" htmlFor="unemployed">Yes</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "unemployed")}`}
                                type="radio"
                                name="unemployed"
                                value="no"
                            />
                            <label className="form-check-label" htmlFor="unemployed">No</label>
                        </div>
                        {feedBackInvalid(this.props.errors, this.props.touched, "unemployed")}
                    </div> 
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="BCEAorFederalOnReserve">Select which of the following form(s) of government assistance the client is receiving (choose all that apply):    
                        <span
                            style={{ color: "red" }}>*</span> </label>
                            
                            <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "BCEAorFederalOnReserve")}`}
                                type="checkbox"
                                name="BCEAorFederalOnReserve"
                                value="Income Assistance or hardship assistance under the Employment and Assistance Act (British Columbia);"
                            />
                            <label className="form-check-label" htmlFor="BCEAorFederalOnReserve">Income Assistance or hardship assistance under the Employment and Assistance Act (British Columbia);</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "BCEAorFederalOnReserve")}`}
                                type="checkbox"
                                name="BCEAorFederalOnReserve"
                                value="Disability Assistance or hardship assistance under the Employment and Assistance for Persons with Disabilities Act (British Columbia);"
                            />
                            <label className="form-check-label" htmlFor="BCEAorFederalOnReserve">Disability Assistance or hardship assistance under the Employment and Assistance for Persons with Disabilities Act (British Columbia);</label>
                            </div>
                        <div className="form-check">  
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "BCEAorFederalOnReserve")}`}
                                type="checkbox"
                                name="BCEAorFederalOnReserve"
                                value="Social Assistance provided by Indigenous Services Canada (ISC) for persons living on a First Nation Reserve;"
                            />
                            <label className="form-check-label" htmlFor="BCEAorFederalOnReserve">Social Assistance provided by Indigenous Services Canada (ISC) for persons living on a First Nation Reserve;</label>
                            </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "BCEAorFederalOnReserve")}`}
                                type="checkbox"
                                name="BCEAorFederalOnReserve"
                                value="An Affordable Childcare Benefit under the Childcare Subsidy Act (British Columbia);"
                            />
                            <label className="form-check-label" htmlFor="BCEAorFederalOnReserve">An Affordable Childcare Benefit under the Childcare Subsidy Act (British Columbia);</label>
                            </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "BCEAorFederalOnReserve")}`}
                                type="checkbox"
                                name="BCEAorFederalOnReserve"
                                value="Assistance from the British Columbia Ministry of Children and Family Development under an Agreement with a Young Adult."
                            />
                            <label className="form-check-label" htmlFor="BCEAorFederalOnReserve">Assistance from the British Columbia Ministry of Children and Family Development under an Agreement with a Young Adult.</label>
                        </div>
                        {feedBackInvalid(this.props.errors, this.props.touched, "BCEAorFederalOnReserve")}
                    </div> 
                </div>
            </div>
        )
    }


}

export default FormStep1