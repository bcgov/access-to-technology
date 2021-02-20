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

    get shippingAddressForm(){
        if(this.props.values.otherWorkAddress){
            return(<div>
                <div className="form-group">
                    <br /><h2 id="forms">Shipping Address(If different from address above)</h2>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="addressAlt">Shipping Address <span
                        style={{ color: "red" }}>*  </span></label>
                    <small className="text-muted" id="address-alt">  123 Main St.</small>
                    <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "addressAlt")}`} id="addressAlt" name="addressAlt" />
                    {feedBackInvalid(this.props.errors,this.props.touched,"address-alt")}
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="cityAlt">City / Town <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "cityAlt")}`} id="cityAlt" name="cityAlt" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"cityAlt")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="provinceAlt">Province <span
                            style={{ color: "red" }}>*</span></label>
                        <Field
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "provinceAlt")}`}
                            id="provinceAlt" 
                            name="provinceAlt" 
                            disabled
                        >
                        </Field>
                        {feedBackInvalid(this.props.errors,this.props.touched,"provinceAlt")}
                        
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="postalAlt">Postal Code <span
                            style={{ color: "red" }}>*  </span></label>
                        <small className="text-muted" id="postalAlt">  V0R2V5</small>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "postalAlt")}`} id="postalAlt" name="postalAlt" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"postalAlt")}
                    </div>
                </div>
            </div>)
        }
        return null;
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
                        <label className="col-form-label control-label" htmlFor="WSBCNumber">Client Application ID <span
                        style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "WSBCNumber")}`} id="WSBCNumber" name="WSBCNumber"/>
                        {feedBackInvalid(this.props.errors,this.props.touched,"WSBCNumber")}
                        <small className="text-muted" id="WSBCNumber">  Expected format: BCXXXXXXXXX</small>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="operatingName">Service Provider Name <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "operatingName")}`} id="operatingName" name="operatingName" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"operatingName")}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label className="col-form-label control-label" htmlFor="operatingName">Service Provider Contract Reference ID <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "operatingName")}`} id="operatingName" name="operatingName" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"operatingName")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="businessPostal">Postal Code <span
                            style={{ color: "red" }}>*  </span></label>
                        <small className="text-muted" id="businessPostal">  V0R2V5</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "businessPostal")}`} 
                            id="businessPostal" 
                            name="businessPostal"
                            onChange={e => {
                                this.props.handleChange(e)
                                this.props.setFieldValue("_ca","")
                            }}  
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"businessPostal")}
                    </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-8">
                        <label className="col-form-label control-label" htmlFor="operatingName">Contact Name <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "operatingName")}`} id="operatingName" name="operatingName" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"operatingName")}
                    </div>
                <div className="form-group col-md-4">
                            <label className="col-form-label control-label" htmlFor="businessPhone">Phone Number <span
                                style={{ color: "red" }}>*</span></label>
                            <small className="text-muted" id="businessPhone">  250-555-5555</small>
                            <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "businessPhone")}`} id="businessPhone" name="businessPhone" />
                            {feedBackInvalid(this.props.errors,this.props.touched,"businessPhone")}
                    </div>
                   
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                            <label className="col-form-label control-label" htmlFor="businessEmail">E-mail Address <span
                                    style={{ color: "red" }}>*</span></label>
                            <small className="text-muted" id="businessEmail">  someone@example.com</small>
                            <Field 
                                className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "businessEmail")}`} 
                                id="businessEmail" 
                                name="businessEmail" 
                                onBlur={e => {
                                    this.props.handleBlur(e)
                                    if(!this.props.errors.businessEmail) {
                                        this.props.setFieldValue("_bEmailDomain", this.props.values.businessEmail.substring(this.props.values.businessEmail.lastIndexOf("@") + 1))
                                    }
                                }}
                            />
                            {feedBackInvalid(this.props.errors,this.props.touched,"businessEmail")}
                    </div>
                    <div className="form-group col-md-6">
                            <label className="col-form-label control-label" htmlFor="typeOfIndustry">Funding Source <span
                                style={{ color: "red" }}>*</span></label>
                            <Field
                                as="select"
                                className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "typeOfIndustry")}`}
                                id="typeOfIndustry" 
                                name="typeOfIndustry" 
                            >
                                <option value="">Please select</option>
                                <option value="AEST">AEST</option>
                                <option value="ISET">ISET</option>
                                <option value="SDPR">SDPR</option>
                            </Field>
                            {feedBackInvalid(this.props.errors,this.props.touched,"typeOfIndustry")}
                        </div>
                </div>
                <div className="form-group">
                    <h2 id="forms">Client Program Information</h2>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                            <label className="col-form-label control-label" htmlFor="typeOfIndustry">Approved Eligible Skils Training and Employment Program<span
                                style={{ color: "red" }}>*</span></label>
                            <Field
                                as="select"
                                className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "typeOfIndustry")}`}
                                id="typeOfIndustry" 
                                name="typeOfIndustry" 
                            >
                                <option value="">Please select</option>
                                <option value="AEST">Skills Training for Employment</option>
                                <option value="ISET">Project Based Labour Market Training</option>
                                <option value="SDPR">ITA Funded Pre Apprenticeship Training</option>
                                <option value="AEST">Blade Runners</option>
                                <option value="ISET">Indigenous Employment and Skills Training</option>
                                <option value="SDPR">Other</option>
                            </Field>
                            <small className="text-muted" id="WSBCNumber"> This dropdown list will be determine by the funding source selected above</small>
                            {feedBackInvalid(this.props.errors,this.props.touched,"typeOfIndustry")}
                        </div>
                </div>
                <div className="form-row">
                 <div className="form-group col-md-6">
                                            <label className="col-form-label control-label" htmlFor="periodStart1">Program Start Date<span
                                                style={{ color: "red" }}>*</span></label>
                                            <DatePickerField
                                                name="periodStart1"
                                                className={`form-control ${feedBackClassName(this.props.errors,this.props.touched, "periodStart1")}`}
                                            />
                                            <small className="text-muted" id="WSBCNumber">  Note: Application end dates after march of 2022 do not qualify.</small>
                                            {feedBackInvalid(this.props.errors,this.props.touched, "periodStart1")}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="col-form-label control-label" htmlFor="periodStart2">Program End Date <span
                                                style={{ color: "red" }}>*</span></label>
                                            <DatePickerField
                                                name="periodStart2"
                                                className={`form-control ${feedBackClassName(this.props.errors,this.props.touched, "periodStart2")}`}
                                            />
                                            
                                         {feedBackInvalid(this.props.errors,this.props.touched, "periodStart2")}
                                        </div>    
                </div>

                <div className="form-group">
                    <h2 id="forms">Client Information</h2>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label className="col-form-label control-label" htmlFor="operatingName">Full Name <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "operatingName")}`} id="operatingName" name="operatingName" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"operatingName")}
                    </div>
                    <div className="form-group col-md-4">
                            <label className="col-form-label control-label" htmlFor="businessPhone">Phone Number <span
                                style={{ color: "red" }}>*</span></label>
                            <small className="text-muted" id="businessPhone">  250-555-5555</small>
                            <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "businessPhone")}`} id="businessPhone" name="businessPhone" />
                            {feedBackInvalid(this.props.errors,this.props.touched,"businessPhone")}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="businessEmail">E-mail Address <span
                                style={{ color: "red" }}>*</span></label>
                        <small className="text-muted" id="businessEmail">  someone@example.com</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "businessEmail")}`} 
                            id="businessEmail" 
                            name="businessEmail" 
                            onBlur={e => {
                                this.props.handleBlur(e)
                                if(!this.props.errors.businessEmail) {
                                    this.props.setFieldValue("_bEmailDomain", this.props.values.businessEmail.substring(this.props.values.businessEmail.lastIndexOf("@") + 1))
                                }
                            }}
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"businessEmail")}
                    </div>
                
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label className="col-form-label control-label" htmlFor="businessAddress">Home Address <span
                            style={{ color: "red" }}>*  </span></label>
                        <small className="text-muted" id="businessAddress">  123 Main St.</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "businessAddress")}`} 
                            id="businessAddress" 
                            name="businessAddress"
                            onChange={e => {
                                this.props.handleChange(e)
                                this.props.setFieldValue("_ca","")
                            }} 
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"businessAddress")}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="businessCity">City / Town <span
                            style={{ color: "red" }}>*</span></label>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "businessCity")}`} 
                            id="businessCity" 
                            name="businessCity"
                            onChange={e => {
                                this.props.handleChange(e)
                                this.props.setFieldValue("_ca","")
                            }} 
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"businessCity")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="businessProvince">Province <span
                            style={{ color: "red" }}>*</span></label>
                        <Field
                            as="select"
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "businessProvince")}`}
                            id="businessProvince" 
                            name="businessProvince"
                            onChange={e => {
                                this.props.handleChange(e)
                                this.props.setFieldValue("_ca","")
                            }} 
                        >
                            <option value="BC">British Columbia</option>
                        </Field>
                        {feedBackInvalid(this.props.errors,this.props.touched,"businessProvince")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="businessPostal">Postal Code <span
                            style={{ color: "red" }}>*  </span></label>
                        <small className="text-muted" id="businessPostal">  V0R2V5</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "businessPostal")}`} 
                            id="businessPostal" 
                            name="businessPostal"
                            onChange={e => {
                                this.props.handleChange(e)
                                this.props.setFieldValue("_ca","")
                            }}  
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"businessPostal")}
                    </div>
                </div>
               
                <p className="small text-muted">Please note that the shipping address must be located in BC, in order to be eligible.</p>
    
                
                <div className="form-group">
                    <div className="form-check">
                        <Field type="checkbox" className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "otherWorkAddress")}`} id="otherWorkAddress" name="otherWorkAddress"/>
                        {feedBackInvalid(this.props.errors,this.props.touched,"otherWorkAddress")}
                        <label 
                            className="form-check-label" 
                            htmlFor="otherWorkAddress"
                        >
                      The clients shipping address is different from their Street address.
                        </label>
                    </div>
                </div>
                {this.shippingAddressForm}
                <div className="form-group">
                    <h2 id="forms">Client Eligibility Questions</h2>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="cewsParticipation">Is the Client a Resident of BC? <span
                        style={{ color: "red" }}>*</span> </label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "cewsParticipation")}`}
                            type="radio"
                            name="cewsParticipation"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="cewsParticipation">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "cewsParticipation")}`}
                            type="radio"
                            name="cewsParticipation"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="cewsParticipation">No</label>
                    </div>
                    {
                            this.props.cewsParticipation === "yes" &&
                            <small className="text-danger">An employee may only be subsidized by WorkBC if that employee is not subsidized under CEWS. Employees subsidized by CEWS are not eligible for WorkBC Wage Subsidy.</small>
                    }
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="employeeDisplacement">Is the client Unemployed or Precariously employed? <span
                        style={{ color: "red" }}>*</span> </label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "employeeDisplacement")}`}
                            type="radio"
                            name="employeeDisplacement"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="employeeDisplacement">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "employeeDisplacement")}`}
                            type="radio"
                            name="employeeDisplacement"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="employeeDisplacement">No</label>
                        {feedBackInvalid(this.props.errors,this.props.touched,"employeeDisplacement")}
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="labourDispute">Is the client participating in an approved eligible skills training and employment program <span
                        style={{ color: "red" }}>*</span></label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "labourDispute")}`}
                            type="radio"
                            name="labourDispute"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="labourDispute">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "labourDispute")}`}
                            type="radio"
                            name="labourDispute"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="labourDispute">No</label>
                        {feedBackInvalid(this.props.errors,this.props.touched,"labourDispute")}
                    </div>
                </div>
                <div className="form-group">
                    <h2 id="forms">Client Need Assessment Questions</h2>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="unionConcurrence">Does the client not have access to a suitable computer and requires a computer to participate in online training? <span
                        style={{ color: "red" }}>*</span></label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "unionConcurrence")}`}
                            type="radio"
                            name="unionConcurrence"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="unionConcurrence">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "unionConcurrence")}`}
                            type="radio"
                            name="unionConcurrence"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="unionConcurrence">No</label>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="liabilityCoverage">Is the client not receiving funding from another source for the purchase of the required technology? <span
                        style={{ color: "red" }}>*</span></label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "liabilityCoverage")}`}
                            type="radio"
                            name="liabilityCoverage"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="liabilityCoverage">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "liabilityCoverage")}`}
                            type="radio"
                            name="liabilityCoverage"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="liabilityCoverage">No</label>
                        {feedBackInvalid(this.props.errors,this.props.touched,"liabilityCoverage")}
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="wageSubsidy">The service provider has confirmed the client has a demonstrated financial need <span
                        style={{ color: "red" }}>*</span> </label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "wageSubsidy")}`}
                            type="radio"
                            name="wageSubsidy"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="wageSubsidy">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "wageSubsidy")}`}
                            type="radio"
                            name="wageSubsidy"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="wageSubsidy">No</label>
                        {feedBackInvalid(this.props.errors,this.props.touched,"wageSubsidy")}
                    </div>
                </div>
            </div>
        )
    }


}

export default FormStep1