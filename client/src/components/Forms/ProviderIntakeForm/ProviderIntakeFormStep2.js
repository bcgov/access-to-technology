import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid} from '../shared/ValidationMessages'


class ProviderIntakeStep2 extends Component {
    constructor(){
        super()
        this.state = {
           
        }
    }
    get WorkBCCaseNumber(){
        if (this.props.values.fundingSource === "SDPR"){
            return (<div className="form-row">
             <div className="form-group col-md-4">
                            <label className="col-form-label control-label" htmlFor="workBCCaseNumber">WorkBC Case Number <span
                                style={{ color: "red" }}>*</span></label>
                                <small className="text-muted" id="workBCCaseNumber">1-XXXXXX-XXXXXX or 1-XXXXXXXXXXX</small>
                            <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "workBCCaseNumber")}`} id="workBCCaseNumber" name="workBCCaseNumber" />
                            {feedBackInvalid(this.props.errors,this.props.touched,"workBCCaseNumber")}
            </div>
        </div>)
        }
        else{
            return(<div></div>)
        }
    }
    get careOfField(){
        if(this.props.values.altShippingAddress){
            return(<div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="recipientName">Recipient Name<span
                        style={{ color: "red" }}>*  </span></label>

                    <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "recipientName")}`} id="recipientName" name="recipientName" />
                    {feedBackInvalid(this.props.errors,this.props.touched,"recipientName")}
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
                <p>If assistance is required in completing this application please refer to the <a href="/PDF/A2TServiceProviderGuide.pdf" target="_blank" rel="noopener noreferrer">A2T Service Provider Guide</a>.</p>
                <div className="form-group">
                    <h2 id="forms">Client Information</h2>
                </div>
                {this.WorkBCCaseNumber}
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientName">Client First Name <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientName")}`} id="clientName" name="clientName" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientName")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientLastName">Client Last Name <span
                            style={{ color: "red" }}>*</span></label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientLastName")}`} id="clientLastName" name="clientLastName" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientLastName")}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientMiddleName">Client Middle Name(s)</label>
                        <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientMiddleName")}`} id="clientMiddleName" name="clientMiddleName" />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientMiddleName")}
                    </div>
                    <div className="form-group col-md-4">
                            <label className="col-form-label control-label" htmlFor="clientPhone">Phone Number <span
                                style={{ color: "red" }}>*</span></label>
                            <small className="text-muted" id="clientPhone">  250-555-5555</small>
                            <Field className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientPhone")}`} id="clientPhone" name="clientPhone" />
                            {feedBackInvalid(this.props.errors,this.props.touched,"clientPhone")}
                    </div>
                </div>
                <div className="form-row">
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
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientConfirmationEmail">Confirm E-mail Address <span
                                style={{ color: "red" }}>*</span></label>
                        <small className="text-muted" id="clientConfirmationEmail">  someone@example.com</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientConfirmationEmail")}`} 
                            id="clientConfirmationEmail" 
                            name="clientConfirmationEmail" 
                            onBlur={e => {
                                this.props.handleBlur(e)
                                if(!this.props.errors.clientConfirmationEmail) {
                                    this.props.setFieldValue("_bEmailDomain", this.props.values.clientConfirmationEmail.substring(this.props.values.clientEmail.lastIndexOf("@") + 1))
                                }
                            }}
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientConfirmationEmail")}
                       
                    </div>
                
                </div>
                <div className="form-group">
                    <h2 id="forms">Shipping Information</h2>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <div className="form-check">
                            <Field type="checkbox" className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "altShippingAddress")}`} id="altShippingAddress" name="altShippingAddress"/>
                            {feedBackInvalid(this.props.errors,this.props.touched,"altShippingAddress")}
                            <label 
                                className="form-check-label" 
                                htmlFor="altShippingAddress"
                            >
                               The address below is in "care of" another individual other than the client.
                            </label>
                        </div>
                    </div>
                </div>
                {this.careOfField}
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
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientAddress2")}
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
            </div>
        )
    }

}
export default ProviderIntakeStep2