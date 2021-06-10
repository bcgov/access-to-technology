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
                        onChange={e => {
                            this.props.handleChange(e)
                            this.props.setFieldValue("trainingProgram", "")
                        }}
                    >
                        <option value="">Please select</option>
                        <option value="LTC - Lillooet Tribal Council">LTC - Lillooet Tribal Council</option>
                        <option value="MNBC - Métis Nation of British Columbia">MNBC - Métis Nation of British Columbia</option>
                        <option value="NENAS - North-East Native Advancing Society">NENAS - North-East Native Advancing Society</option>
                        <option value="NETP - Nuu-chah-nulth Employment and Training Program">NETP - Nuu-chah-nulth Employment and Training Program</option>
                        <option value="NVIATS - North Vancouver Island Aboriginal Training Society">NVIATS - North Vancouver Island Aboriginal Training Society</option>
                        <option value="PGNAETA - Prince George Nechako Aboriginal Employment and Training Association">PGNAETA - Prince George Nechako Aboriginal Employment and Training Association</option>
                        <option value="SNTC - Shuswap Nation Tribal Council (formerly Central Interior Partners in Human Resource Development)">SNTC - Shuswap Nation Tribal Council (formerly Central Interior Partners in Human Resource Development)</option>
                        <option value="TRICORP - Tribal Resources Investment Corporation">TRICORP - Tribal Resources Investment Corporation</option>
                        <option value="KNC - Ktunaxa Nation Council">KNC - Ktunaxa Nation Council</option>

                        
                        {/* WHEN EDITING THESE OPTIONS ENSURE YOU UPDATE THEIR ELIGIBLE PROGRAM REFERENCES BELOW (COPY-PASTE)
                        <option value="ACCESS - Aboriginal Community Career Employment Services Society">ACCESS - Aboriginal Community Career Employment Services Society</option>
                        <option value="CCATEC - Cariboo Chilcotin Aboriginal Training Employment Centre">CCATEC - Cariboo Chilcotin Aboriginal Training Employment Centre</option>
                        <option value="CSETS - Coast Salish Employment and Training Society">CSETS - Coast Salish Employment and Training Society</option>
                        <option value="Lil'wat Nation - Lil'wat Nation">Lil'wat Nation - Lil'wat Nation</option>
                        <option value="MCFNTS - Mid Coast First Nations Training Society">MCFNTS - Mid Coast First Nations Training Society</option>
                        <option value="MSTETS - Musqueam, Squamish, Tsleil-Waututh Training Society">MSTETS - Musqueam, Squamish, Tsleil-Waututh Training Society</option>
                        <option value="NLG - Nisga'a Lisims Government">NLG - Nisga'a Lisims Government</option>
                        <option value="OTDC - Okanagan Training and Development Council">OTDC - Okanagan Training and Development Council</option>
                        <option value="SASET - Sto:lo Aboriginal Skills and Employment Training">SASET - Sto:lo Aboriginal Skills and Employment Training</option>
                        <option value="TFN - Tsawwassen First Nation">TFN - Tsawwassen First Nation</option>
                        */}
                       

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
                        onChange={e => {
                            this.props.handleChange(e)
                            this.props.setFieldValue("trainingProgram", "")
                        }}
                    >
                        <option value="">Please select</option>
                                                <option value="ACCESS Trades">ACCESS Trades</option>
                        <option value="ACCESS">ACCESS</option>
                        <option value="BC Federation of Labour">BC Federation of Labour</option>
                        <option value="British Columbia Regional Council of Carpenters">British Columbia Regional Council of Carpenters</option>
                        <option value="Camosun College">Camosun College</option>
                        <option value="Camosun College/Vancouver Island University">Camosun College/Vancouver Island University</option>
                        <option value="Camosun College/Vancouver Island University">Camosun College/Vancouver Island University</option>
                        <option value="Cariboo Chilcotin Aboriginal Training Employment Centre (CCATEC)">Cariboo Chilcotin Aboriginal Training Employment Centre (CCATEC)</option>
                        <option value="Coast Mountain College">Coast Mountain College</option>
                        <option value="College of New Caledonia">College of New Caledonia</option>
                        <option value="Construction Foundation of BC">Construction Foundation of BC</option>
                        <option value="Dan's Legacy Foundation">Dan's Legacy Foundation</option>
                        <option value="DCCSSS">DCCSSS</option>
                        <option value="EMBERS (Eastside Movement for Business and Economic Renewal Society)">EMBERS (Eastside Movement for Business and Economic Renewal Society)</option>
                        <option value="Greater Trail Community Skills Centre (Skills Centre)">Greater Trail Community Skills Centre (Skills Centre)</option>
                        <option value="Hecate Straight Employment Development Society">Hecate Straight Employment Development Society</option>
                        <option value="JHSP">JHSP</option>
                        <option value="Kitselas First Nation">Kitselas First Nation</option>
                        <option value="Kitselas Five Tier System LP">Kitselas Five Tier System LP</option>
                        <option value="Kopar Administration Ltd">Kopar Administration Ltd</option>
                        <option value="Kopar Administration Ltd.">Kopar Administration Ltd.</option>
                        <option value="Ktunaxa">Ktunaxa</option>
                        <option value="NIC (Auto Collision program)">NIC (Auto Collision program)</option>
                        <option value="North Island College (Heavy Mechanical program)">North Island College (Heavy Mechanical program)</option>
                        <option value="Okanagan College (Culinary-Lillooet)">Okanagan College (Culinary-Lillooet)</option>
                        <option value="Okanagan College">Okanagan College</option>
                        <option value="Prince George Nechako Aboriginal Employment and Training Association (PGNAETA)">Prince George Nechako Aboriginal Employment and Training Association (PGNAETA)</option>
                        <option value="Skill Source Group Training Organization Society">Skill Source Group Training Organization Society</option>
                        <option value="Thompson Rivers University (Construction Craft Worker Program)">Thompson Rivers University (Construction Craft Worker Program)</option>
                        <option value="Thompson Rivers University (Kamloops)">Thompson Rivers University (Kamloops)</option>
                        <option value="Thompson Rivers University (Williams Lake)">Thompson Rivers University (Williams Lake)</option>
                        <option value="Vancouver Coastal Health Authority DBA- Gastown Vocational Services">Vancouver Coastal Health Authority DBA- Gastown Vocational Services</option>
                        <option value="Vancouver Island Construction Association">Vancouver Island Construction Association</option>
                        <option value="Workforce Development Consulting Services of Northern BC">Workforce Development Consulting Services of Northern BC</option>
                        <option value="YWCA Metro Vancouver (Young Women's Christian Association)">YWCA Metro Vancouver (Young Women's Christian Association)</option>
                        <option value="YWCA Metro Vancouver">YWCA Metro Vancouver</option>
                        <option value="Thompson Rivers University">Thompson Rivers University</option>


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
                        onChange={e => {
                            this.props.handleChange(e)
                            this.props.setFieldValue("trainingProgram", "")
                        }}
                    >
                        <option value="">Please select</option>
                        <option value="1 - ES  - Vancouver Island North ">1 - ES  - Vancouver Island North </option>
                        <option value="2 - ES  - Comox Valley - Powell River ">2 - ES  - Comox Valley - Powell River </option>
                        <option value="3 - ES  - Parksville - Alberni">3 - ES  - Parksville - Alberni</option>
                        <option value="4 - ES  - Nanaimo">4 - ES  - Nanaimo</option>
                        <option value="5 - ES  - Cowichan Valley">5 - ES  - Cowichan Valley</option>
                        <option value="6 - ES  - Langford - Sooke">6 - ES  - Langford - Sooke</option>
                        <option value="7 - ES  - Greater Victoria">7 - ES  - Greater Victoria</option>
                        <option value="8 - ES  - Saanich - Gulf Islands">8 - ES  - Saanich - Gulf Islands</option>
                        <option value="9 - ES  - Sea to Sky">9 - ES  - Sea to Sky</option>
                        <option value="10 - ES  - North Vancouver">10 - ES  - North Vancouver</option>
                        <option value="11 - ES  - Vancvouer City Centre">11 - ES  - Vancvouer City Centre</option>
                        <option value="12 - ES  - Vancvouer Midtown">12 - ES  - Vancvouer Midtown</option>
                        <option value="13 - ES  - Vancouver Northeast">13 - ES  - Vancouver Northeast</option>
                        <option value="14 - ES  - Vancouver South">14 - ES  - Vancouver South</option>
                        <option value="15 - ES  - Richmond">15 - ES  - Richmond</option>
                        <option value="16 - ES  - Maple Ridge">16 - ES  - Maple Ridge</option>
                        <option value="17 - ES  - Tri-Cities">17 - ES  - Tri-Cities</option>
                        <option value="18 - ES  - Delta ">18 - ES  - Delta </option>
                        <option value="19 - ES  - North Surrey">19 - ES  - North Surrey</option>
                        <option value="20 - ES  - Surrey Cloverdale">20 - ES  - Surrey Cloverdale</option>
                        <option value="21 - ES  - Surrey Newton">21 - ES  - Surrey Newton</option>
                        <option value="22 - ES  - South Surrey - White Rock">22 - ES  - South Surrey - White Rock</option>
                        <option value="23 - ES  - Langley">23 - ES  - Langley</option>
                        <option value="24 - ES  - Burnaby">24 - ES  - Burnaby</option>
                        <option value="25 - ES  - New Westminster">25 - ES  - New Westminster</option>
                        <option value="26 - ES  - Mission">26 - ES  - Mission</option>
                        <option value="27 - ES  - Abbotsford">27 - ES  - Abbotsford</option>
                        <option value="28 - ES  - Fraser Northeast">28 - ES  - Fraser Northeast</option>
                        <option value="29 - ES  - Cariboo">29 - ES  - Cariboo</option>
                        <option value="30 - ES  - Thompson - Nicola">30 - ES  - Thompson - Nicola</option>
                        <option value="31 - ES  - Kamloops Thompson">31 - ES  - Kamloops Thompson</option>
                        <option value="32 - ES  - Southern Okanagan">32 - ES  - Southern Okanagan</option>
                        <option value="33 - ES  - Central Okanagan">33 - ES  - Central Okanagan</option>
                        <option value="34 - ES  - Shuswap - Columbia">34 - ES  - Shuswap - Columbia</option>
                        <option value="35 - ES  - West Kootenay - Boundary">35 - ES  - West Kootenay - Boundary</option>
                        <option value="36 - ES  - Central Kootenay ">36 - ES  - Central Kootenay </option>
                        <option value="37 - ES  - East Kootenay">37 - ES  - East Kootenay</option>
                        <option value="38 - ES  - North Okanagan">38 - ES  - North Okanagan</option>
                        <option value="39 - ES  - North Coast">39 - ES  - North Coast</option>
                        <option value="40 - ES  - Northwest">40 - ES  - Northwest</option>
                        <option value="41 - ES  - Bulkley - Upper Skeena">41 - ES  - Bulkley - Upper Skeena</option>
                        <option value="42 - ES  - Lakes District">42 - ES  - Lakes District</option>
                        <option value="43 - ES  - Prince George">43 - ES  - Prince George</option>
                        <option value="44 - ES  - Northeast">44 - ES  - Northeast</option>
                        <option value="45 - ES  - Peace River South">45 - ES  - Peace River South</option>

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
            console.log(this.props.values.serviceProviderName)
            if(this.props.values.serviceProviderName === "NENAS - North-East Native Advancing Society"){
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
                        <option value="Cohort-Based: (CERT) Career Employment and Readiness Training">Cohort-Based:  (CERT) Career Employment and Readiness Training</option>
                        <option value="Cohort-Based: (OLES) Essential Skills Training">Cohort-Based:  (OLES) Essential Skills Training</option>
                        <option value="Cohort-Based: Industry-Specific and/or Trades Training ">Cohort-Based:  Industry-Specific and/or Trades Training </option>
                        <option value="Individualized Training">Individualized Training</option>


                    </Field>
                    <small className="text-muted" id="trainingProgram">  This dropdown list is determined by the Referring Ministry and Service Provider Name selected above.</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
            }
            else if(this.props.values.serviceProviderName === "MNBC - Métis Nation of British Columbia"){
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
                        <option value="Cohort-Based: Microsoft Office and Accounting/Bookkeeping Training">Cohort-Based: Microsoft Office and Accounting/Bookkeeping Training</option>
                        <option value="Individualized Training">Individualized Training</option>
                    </Field>
                    <small className="text-muted" id="trainingProgram">  This dropdown list is determined by the Referring Ministry and Service Provider Name selected above.</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
            }
            else if(this.props.values.serviceProviderName === "NETP - Nuu-chah-nulth Employment and Training Program"){
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
                        <option value="Cohort-Based: In-House Training">Cohort-Based: In-House Training</option>
                        <option value="Cohort-Based: Trades Training">Cohort-Based: Trades Training</option>
                        <option value="Individualized Training">Individualized Training</option>

                    </Field>
                    <small className="text-muted" id="trainingProgram">  This dropdown list is determined by the Referring Ministry and Service Provider Name selected above.</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
            }
            else if(this.props.values.serviceProviderName === "NVIATS - North Vancouver Island Aboriginal Training Society"){
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
                        <option value="Cohort-Based: Fishing Master IV Program">Cohort-Based: Fishing Master IV Program</option>
                        <option value="Cohort-Based: Health Care Assistant Program">Cohort-Based: Health Care Assistant Program</option>
                        <option value="Individualized Training">Individualized Training</option>


                    </Field>
                    <small className="text-muted" id="trainingProgram">  This dropdown list is determined by the Referring Ministry and Service Provider Name selected above.</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
            }
            else if(this.props.values.serviceProviderName === "PGNAETA - Prince George Nechako Aboriginal Employment and Training Association"){
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
                        <option value="Cohort-Based: Aboriginal Employment Gateway">Cohort-Based: Aboriginal Employment Gateway</option>
                        <option value="Cohort-Based: Aboriginal Gateway Training Centre Trades">Cohort-Based: Aboriginal Gateway Training Centre Trades</option>
                        <option value="Cohort-Based: Urban Aboriginal Working Group ">Cohort-Based: Urban Aboriginal Working Group </option>
                        <option value="Cohort-Based: 18 First Nations Labour Market Training Programs ">Cohort-Based: 18 First Nations Labour Market Training Programs </option>
                        <option value="Individualized Training">Individualized Training</option>

                    </Field>
                    <small className="text-muted" id="trainingProgram">  This dropdown list is determined by the Referring Ministry and Service Provider Name selected above.</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
            }
            else if(this.props.values.serviceProviderName === "TRICORP - Tribal Resources Investment Corporation"){
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
                        <option value="Cohort-Based: Long Term Training Courses">Cohort-Based: Long Term Training Courses</option>
                        <option value="Cohort-Based: Short Term Training Courses">Cohort-Based: Short Term Training Courses</option>
                        <option value="Individualized Training">Individualized Training</option>



                    </Field>
                    <small className="text-muted" id="trainingProgram">  This dropdown list is determined by the Referring Ministry and Service Provider Name selected above.</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
            }
            else if(this.props.values.serviceProviderName === "SNTC - Shuswap Nation Tribal Council (formerly Central Interior Partners in Human Resource Development)" || this.props.values.serviceProviderName === "LTC - Lillooet Tribal Council" || this.props.values.serviceProviderName === "KNC - Ktunaxa Nation Council"){
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
                        <option value="Individualized Training">Individualized Training</option>

                    </Field>
                    <small className="text-muted" id="trainingProgram">  This dropdown list is determined by the Referring Ministry and Service Provider Name selected above.</small>
                    {feedBackInvalid(this.props.errors, this.props.touched, "trainingProgram")}
                </div>
            </div>)
            }
            else{
                return(<div>Please select a referring Ministry above to refine your applicable service providers</div>);
            }
           
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
                        <option value="BladeRunners">BladeRunners</option>
                    </Field>
                    <small className="text-muted" id="trainingProgram"> This dropdown list is determined by the Referring Ministry selected above.</small>
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
                    <small className="text-muted" id="trainingProgram">  This dropdown list is determined by the Referring Ministry selected above.</small>
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
                If assistance is required in completing this application please refer to the <a href="https://www.workbc.ca/Employment-Services/WorkBC-Centres/Find-Your-WorkBC-Centre.aspx" target="_blank" rel="noopener noreferrer">A2T Service Provider Guide</a>. 
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
                            <small className="text-muted" id="trainingProgram">The Ministry who is funding the majority share of the eligible skills training program</small>
                            {feedBackInvalid(this.props.errors,this.props.touched,"fundingSource")}
                    </div>
                </div>

                {this.ApplicableServiceProvider}
                <div className="form-row"> 
                    <div className="form-group col-md-4">
                            <label className="col-form-label control-label" htmlFor="serviceProviderPostal">Service Provider Postal Code <span
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
                </div>
                <div className="form-row">
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
                    <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="serviceProviderConfirmationEmail">Confirm E-mail Address <span
                                style={{ color: "red" }}>*</span></label>
                        <small className="text-muted" id="serviceProviderConfirmationEmail">  someone@example.com</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "serviceProviderConfirmationEmail")}`} 
                            id="serviceProviderConfirmationEmail" 
                            name="serviceProviderConfirmationEmail" 
                            onBlur={e => {
                                this.props.handleBlur(e)
                            }}
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"serviceProviderConfirmationEmail")}
                       
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
                            minDate={new Date(2021,7,15)}
                            maxDate={new Date(2023,2,2)}
                        />
                        <small className="text-muted" id="periodStart1"> Note: Training program starts dates before August 15, 2021 do not qualify.</small>
                        {feedBackInvalid(this.props.errors, this.props.touched, "periodStart1")}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="col-form-label control-label" htmlFor="periodEnd1"> Training Program End Date <span
                            style={{ color: "red" }}>*</span></label>
                        <DatePickerField
                            name="periodEnd1"
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "periodEnd1")}`}
                            minDate={new Date (moment(this.props.values['periodStart1']).add(28, 'days'))}
                        />
                        {feedBackInvalid(this.props.errors, this.props.touched, "periodEnd1")}
                    </div>
                </div>
                <div className="form-group">
                    <h2 id="forms">Client Eligibility</h2>
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