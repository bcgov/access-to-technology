import React, { Component } from 'react'
import {Field} from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'


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

                        
                        {/*  WHEN EDITING THESE OPTIONS ENSURE YOU UPDATE THEIR ELIGIBLE PROGRAMS IN SHAREPOINT and IN SEND CONSENT FORM STEP 1 */}
                       

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
                            <option value="Ace Community College">Ace Community College</option>	
                            <option value="ANHBC (Association of Neighbourhood Houses of BC)- Frog Hollow Neighbourhood House">ANHBC (Association of Neighbourhood Houses of BC)- Frog Hollow Neighbourhood House</option>	
                            <option value="Archway Community Services">Archway Community Services</option>	
                            <option value="Aunt Leah's">Aunt Leah's</option>	
                            <option value="Back in Motion Rehab Inc">Back in Motion Rehab Inc</option>	
                            <option value="Back in Motion">Back in Motion</option>	
                            <option value="BC Federation of Labour">BC Federation of Labour</option>	
                            <option value="Blue Collar">Blue Collar</option>	
                            <option value="Bowman Employment Services Inc.">Bowman Employment Services Inc.</option>		

                            <option value="Boys and Girls Clubs of South Coast BC ">Boys and Girls Clubs of South Coast BC </option>
                            <option value="Bridges for Women Society">Bridges for Women Society</option>

                            <option value="British Columbia Regional Council of Carpenters">British Columbia Regional Council of Carpenters</option>
                            <option value="Buxton Consultant Ltd.">Buxton Consultant Ltd.</option>
                            <option value="Camosun College">Camosun College</option>

                            <option value="Camosun College/Vancouver Island University">Camosun College/Vancouver Island University</option>
                            <option value="Canadian Vocational Training Centre">Canadian Vocational Training Centre</option>
                            <option value="Cariboo Chilcotin Aboriginal Training Employment Centre (CCATEC)">Cariboo Chilcotin Aboriginal Training Employment Centre (CCATEC)</option>
                            <option value="Chilliwack  Community Services">Chilliwack  Community Services</option>
                            <option value="Coast Mountain College">Coast Mountain College</option>
                            <option value="College of New Caledonia">College of New Caledonia</option>
                            <option value="Community Futures BC">Community Futures BC</option>
                            <option value="Community Futures Central Okanagan (CFDCCO)">Community Futures Central Okanagan (CFDCCO)</option>
                            <option value="Community Futures Development Corporation of the North Okanagan">Community Futures Development Corporation of the North Okanagan</option>
                            <option value="Community Futures North Okanagan (CFNO)">Community Futures North Okanagan (CFNO)</option>
                            <option value="Construction Foundation of BC">Construction Foundation of BC</option>
                            <option value="Creative Employment Access Society">Creative Employment Access Society</option>
                            <option value="CVI Jobs Opps">CVI Jobs Opps</option>
                            <option value="Dan's Legacy Foundation">Dan's Legacy Foundation</option>
                            <option value="Dawson Creek Catholic Social Services Society (DCCSSS)">Dawson Creek Catholic Social Services Society (DCCSSS)</option>
                            <option value="DCCSSS">DCCSSS</option>
                            <option value="DIVERSEcity Community Resources Society">DIVERSEcity Community Resources Society</option>

                            <option value="Douglas College">Douglas College</option>
                            <option value="EMBERS (Eastside Movement for Business and Economic Renewal Society)">EMBERS (Eastside Movement for Business and Economic Renewal Society)</option>
                            <option value="ETHOS Career Management Group">ETHOS Career Management Group</option>
                            <option value="Free Rein Associates Training LTD">Free Rein Associates Training LTD</option>
                            <option value="Frog Hollow Neighbourhood House The Association of Neighbourhood Houses of British Columbia (FHNC )">Frog Hollow Neighbourhood House The Association of Neighbourhood Houses of British Columbia (FHNC )</option>


                            <option value="Greater Trail Community Skills Centre (Skills Centre)">Greater Trail Community Skills Centre (Skills Centre)</option>
                            <option value="Hecate Straight Employment Development Society">Hecate Straight Employment Development Society</option>
                            <option value="Hope Action Values Ethics Culinary Training Society">Hope Action Values Ethics Culinary Training Society</option>
                            <option value="Horton Ventures">Horton Ventures</option>
                            <option value="INEO Employment Counseling Inc.">INEO Employment Counseling Inc.</option>

                            <option value="Inter-Cultural Association of Greater Victoria">Inter-Cultural Association of Greater Victoria</option>
                            <option value="Island Work Transitions Inc">Island Work Transitions Inc</option>
                            <option value="JHSP">JHSP</option>
                            <option value="John Howard Society of British Columbia">John Howard Society of British Columbia</option>
                            <option value="John Howard Society of the Pacific Region">John Howard Society of the Pacific Region</option>
                            <option value="Kelowna Community Resources Society">Kelowna Community Resources Society</option>
                            <option value="Kitselas First Nation">Kitselas First Nation</option>
                            <option value="Kitselas Five Tier System LP">Kitselas Five Tier System LP</option>
                            <option value="Kootenay Career Development Society (KCDS)">Kootenay Career Development Society (KCDS)</option>
                            <option value="Kootenay Employment Services Society (KES)">Kootenay Employment Services Society (KES)</option>
                            <option value="Kopar Administration Ltd.">Kopar Administration Ltd.</option>
                            <option value="Ktunaxa">Ktunaxa</option>
                            <option value="Langara College">Langara College</option>
                            <option value="MCC Mennonite Central Committee">MCC Mennonite Central Committee</option>
                            <option value="Mission Community Skills Centre Society">Mission Community Skills Centre Society</option>
                            <option value="MOSAIC (Multilingual Orientation Services Assocationfor Immigrant Communities">MOSAIC (Multilingual Orientation Services Assocationfor Immigrant Communities</option>
                            <option value="NexusBC Community Resource Centre Society">NexusBC Community Resource Centre Society</option>

                            <option value="NIC (Auto Collision program)">NIC (Auto Collision program)</option>
                            <option value="North Island College (Heavy Mechanical program)">North Island College (Heavy Mechanical program)</option>
                            <option value="Obair Economic Society">Obair Economic Society</option>

                            <option value="Okanagan College (Culinary-Lillooet)">Okanagan College (Culinary-Lillooet)</option>
                            <option value="Okanagan College">Okanagan College</option>
                            <option value="Open Door Social Services Society">Open Door Social Services Society</option>
                            <option value="Options for Community Serivce">Options for Community Serivce</option>
                            <option value="Pacific Community Resources Society">Pacific Community Resources Society</option>
                            <option value="Partners In Resources Inc. (Piers)">Partners In Resources Inc. (Piers)</option>
                            <option value="PGNFCS (Prince George Native friendship Centre Society">PGNFCS (Prince George Native friendship Centre Society</option>
                            <option value="Port Alberni Friendship Center">Port Alberni Friendship Center</option>
                            <option value="Prince George Nechako Aboriginal Employment and Training Association (PGNAETA)">Prince George Nechako Aboriginal Employment and Training Association (PGNAETA)</option>
                            <option value="Progressive Intercultural Community Services (PICS)">Progressive Intercultural Community Services (PICS)</option>
                            
                            <option value="Service Provider">Service Provider</option>
                            <option value="Skill Source Group Training Organization Society">Skill Source Group Training Organization Society</option>
                            <option value="Sources Community Resources Society">Sources Community Resources Society</option>
                            <option value="Stillwater Consulting Ltd.">Stillwater Consulting Ltd.</option>
                            <option value="S.U.C.C.E.S.S.">S.U.C.C.E.S.S.</option>
                            
                            <option value="The Immigrant Services Society of British Columbia (ISSBC)">The Immigrant Services Society of British Columbia (ISSBC)</option>
                            <option value="Thompson Rivers University (Construction Craft Worker Program)">Thompson Rivers University (Construction Craft Worker Program)</option>
                            <option value="Thompson Rivers University (Kamloops)">Thompson Rivers University (Kamloops)</option>
                            <option value="Thompson Rivers University (Williams Lake)">Thompson Rivers University (Williams Lake)</option>
                            <option value="Thompson Rivers University">Thompson Rivers University</option>
                            <option value="Triangle Community Resources Inc.">Triangle Community Resources Inc.</option>
                            <option value="Vancouver Community College">Vancouver Community College</option>
                            <option value="Vancouver Coastal Health Authority DBA- Gastown Vocational Services">Vancouver Coastal Health Authority DBA- Gastown Vocational Services</option>
                            <option value="Vancouver Island Construction Association">Vancouver Island Construction Association</option>
                            <option value="Workforce Development Consulting Services of Northern BC">Workforce Development Consulting Services of Northern BC</option>
                            <option value="YWCA Metro Vancouver">YWCA Metro Vancouver</option>
                            <option value="YMCA Greater Vancouver">YMCA Greater Vancouver</option>
                            <option value="YMCA of NBC">YMCA of NBC</option>
                            <option value="YMCA of Okanagan Association">YMCA of Okanagan Association</option>
                            <option value="Zero Ceiling Society">Zero Ceiling Society</option>


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
   
  
   
    render() {
        if (this.props.currentStep !== 1) {
            return null
        }
        //Else return step 1
        return (

            <div>
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
                                    this.props.setFieldValue("serviceProviderName", "")
                                }}
                            >
                                <option value="">Please select</option>
                                <option value="AEST">AEST</option>
                                <option value="ISET">ISET</option>
                                <option value="SDPR">SDPR</option>
                            </Field>
                            <small className="text-muted" id="trainingProgram">The primary funding source for the majority share of the eligible skills training program</small>
                            {feedBackInvalid(this.props.errors,this.props.touched,"fundingSource")}
                    </div>
                </div>

                {this.ApplicableServiceProvider}
                
               
                
                <div className="form-row">
                    <div className="form-group col-md-4">
                            <label className="col-form-label control-label" htmlFor="serviceProviderEmail">Service Provider E-mail Address <span
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
                        <label className="col-form-label control-label" htmlFor="serviceProviderConfirmationEmail">Service Provider Confirm E-mail Address <span
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
                <div className="form-row">
                <div className="form-group col-md-4">
                        <label className="col-form-label control-label" htmlFor="clientEmail">Client E-mail Address <span
                                style={{ color: "red" }}>*</span></label>
                        <small className="text-muted" id="clientEmail">  someone@example.com</small>
                        <Field 
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "clientEmail")}`} 
                            id="clientEmail" 
                            name="clientEmail" 
                        />
                        {feedBackInvalid(this.props.errors,this.props.touched,"clientEmail")}
                       
                    </div></div>  
                <div className="form-row">
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
            </div>
        )
    }


}

export default FormStep1