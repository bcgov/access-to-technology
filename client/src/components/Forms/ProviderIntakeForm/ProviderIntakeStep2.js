import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid} from '../shared/ValidationMessages'


class ProviderIntakeStep2 extends Component {
    constructor(){
        super()
        this.state = {
           
        }
    }

    get shippingAddressForm(){
        if(this.props.values.altShippingAddress){
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
        if (this.props.currentStep !== 2) {
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
                    <h2 id="forms">Client Information</h2>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientName">Client Name <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientName")}`} id="clientName" name="clientName" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientName")}
                    </div>
                    <div className="form-group col-md-4">
                            <label className="col-form-label control-label" htmlFor="clientPhone">Phone Number <span
                                style={{ color: "red" }}>*</span></label>
                            <small className="text-muted" id="clientPhone">  250-555-5555</small>
                            <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientPhone")}`} id="clientPhone" name="clientPhone" />
                            {feedBackInvalid(this.props.errors,this.props.touched,"clientPhone")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientEmail">E-mail Address <span
                                style={{ color: "red" }}>*</span></label>
                        <small className="text-muted" id="clientEmail">  someone@example.com</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientEmail")}`} 
                            id="clientEmail" 
                            name="clientEmail" 
                            onBlur={e => {
                                this.props.handleBlur(e)
                                if(!this.props.errors.clientEmail) {
                                    this.props.setFieldValue("_bEmailDomain", this.props.values.clientEmail.substring(this.props.values.clientEmail.lastIndexOf("@") + 1))
                                }
                            }}
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientEmail")}
                    </div>
                
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label className="col-form-label control-label" htmlFor="clientAddress">Street Address 1 <span
                            style={{ color: "red" }}>*  </span></label>
                        <small className="text-muted" id="clientAddress">  123 Main St.</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientAddress")}`} 
                            id="clientAddress" 
                            name="clientAddress"
                            onChange={e => {
                                this.props.handleChange(e)
                            }} 
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientAddress")}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label className="col-form-label control-label" htmlFor="clientAddress2">Street Address 2 </label>
                        <small className="text-muted" id="clientAddress2">   Apartment 207</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientAddress2")}`} 
                            id="clientAddress2" 
                            name="clientAddress2"
                            onChange={e => {
                                this.props.handleChange(e)
                            }} 
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientAddress")}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientCity">City / Town <span
                            style={{ color: "red" }}>*</span></label>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientCity")}`} 
                            id="clientCity" 
                            name="clientCity"
                            onChange={e => {
                                this.props.handleChange(e)
                            }} 
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientCity")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientProvince">Province <span
                            style={{ color: "red" }}>*</span></label>
                        <Field
                            as="select"
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientProvince")}`}
                            id="clientProvince" 
                            name="clientProvince"
                            onChange={e => {
                                this.props.handleChange(e)
                            }} 
                        >
                            <option value="BC">British Columbia</option>
                        </Field>
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientProvince")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientPostal">Postal Code <span
                            style={{ color: "red" }}>*  </span></label>
                        <small className="text-muted" id="clientPostal">  V0R2V5</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientPostal")}`} 
                            id="clientPostal" 
                            name="clientPostal"
                            onChange={e => {
                                this.props.handleChange(e)
                            }}  
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientPostal")}
                    </div>
                </div>
    
                <div className="form-group">
                    <div className="form-check">
                        <Field type="checkbox" className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "altShippingAddress")}`} id="altShippingAddress" name="altShippingAddress"/>
                        {feedBackInvalid(this.props.errors,this.props.touched,"altShippingAddress")}
                        <label 
                            className="form-check-label" 
                            htmlFor="altShippingAddress"
                        >
                      The clients shipping address is different from their Street address.
                        </label>
                    </div>
                </div>
                {this.shippingAddressForm}

                <div className="form-row">
                    <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="telusInternetForGood">Client is a candidate for <b>Telus Internet for Good</b> and would like to be considered for low income internet options <span
                            style={{ color: "red" }}>*</span> </label>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "telusInternetForGood")}`}
                                type="radio"
                                name="telusInternetForGood"
                                value="yes"
                            />
                            <label className="form-check-label" htmlFor="telusInternetForGood">Yes</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "telusInternetForGood")}`}
                                type="radio"
                                name="telusInternetForGood"
                                value="no"
                            />
                            <label className="form-check-label" htmlFor="telusInternetForGood">No</label>
                        </div>
                    </div>
                </div>
                {/*
                <div className="form-group">
                    <h2 id="forms">Client Eligibility Questions</h2>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="clientResidesInBC">Is the Client a Resident of BC? <span
                        style={{ color: "red" }}>*</span> </label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "clientResidesInBC")}`}
                            type="radio"
                            name="clientResidesInBC"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="clientResidesInBC">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "clientResidesInBC")}`}
                            type="radio"
                            name="clientResidesInBC"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="clientResidesInBC">No</label>
                    </div>
                    {
                            this.props.clientResidesInBC === "no" &&
                            <small className="text-danger">A client is only eligible for this program if they reside in BC</small>
                    }
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="clientUnemployed">Is the client Unemployed or Precariously employed? <span
                        style={{ color: "red" }}>*</span> </label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "clientUnemployed")}`}
                            type="radio"
                            name="clientUnemployed"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="clientUnemployed">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "clientUnemployed")}`}
                            type="radio"
                            name="clientUnemployed"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="clientUnemployed">No</label>
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientUnemployed")}
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="registeredInApprovedProgram">Is the client participating in an approved eligible skills training and employment program <span
                        style={{ color: "red" }}>*</span></label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "registeredInApprovedProgram")}`}
                            type="radio"
                            name="registeredInApprovedProgram"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="registeredInApprovedProgram">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "registeredInApprovedProgram")}`}
                            type="radio"
                            name="registeredInApprovedProgram"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="registeredInApprovedProgram">No</label>
                        {feedBackInvalid(this.props.errors,this.props.touched,"registeredInApprovedProgram")}
                    </div>
                </div>
                <div className="form-group">
                    <h2 id="forms">Client Need Assessment Questions</h2>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="accessToComputerCurrently">Does the client not have access to a suitable computer and requires a computer to participate in online training? <span
                        style={{ color: "red" }}>*</span></label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "accessToComputerCurrently")}`}
                            type="radio"
                            name="accessToComputerCurrently"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="accessToComputerCurrently">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "accessToComputerCurrently")}`}
                            type="radio"
                            name="accessToComputerCurrently"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="accessToComputerCurrently">No</label>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="receivingAlternateFunding">Is the client not receiving funding from another source for the purchase of the required technology? <span
                        style={{ color: "red" }}>*</span></label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "receivingAlternateFunding")}`}
                            type="radio"
                            name="receivingAlternateFunding"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="receivingAlternateFunding">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "receivingAlternateFunding")}`}
                            type="radio"
                            name="receivingAlternateFunding"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="receivingAlternateFunding">No</label>
                        {feedBackInvalid(this.props.errors,this.props.touched,"receivingAlternateFunding")}
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="financialNeed">The service provider has confirmed the client has a demonstrated a financial need to take part in this program <span
                        style={{ color: "red" }}>*</span> </label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "financialNeed")}`}
                            type="radio"
                            name="financialNeed"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="financialNeed">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "financialNeed")}`}
                            type="radio"
                            name="financialNeed"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="financialNeed">No</label>
                        {feedBackInvalid(this.props.errors,this.props.touched,"financialNeed")}
                    </div>
                </div>
                */}
            </div>
        )
    }

}
export default ProviderIntakeStep2