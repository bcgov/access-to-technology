var strings = require("./strings")
var formatDate = require("../utils/formatDate")

module.exports = {

    generateNotification: function (values) {

        var html = "";
        for (var key in values) {
            html += `${key} ${strings.orEmpty(values[key])} `;
        }
        return html
    },

    generateListNotification: function(values) {
        var html = "";
        // loop through each property
        for (var key in values) {
            // add key/val to html
            html += `<p><b>${key}:</b> ${strings.orEmpty(values[key])}</p>`;
        }

        return html;
    },

    generateClaimNotification: function (values){
        const Date2Total = (typeof(values.total2) !== "undefined" && values.total2 !== null && values.total2 !== "" && values.total2 !== 0);
        const Date3Total = (typeof(values.total3) !== "undefined" && values.total3 !== null && values.total3 !== "" && values.total3 !== 0);
        const Date4Total = (typeof(values.total4) !== "undefined" && values.total4 !== null && values.total4 !== "" && values.total4 !== 0);
        const Date5Total = (typeof(values.total5) !== "undefined" && values.total5 !== null && values.total5 !== "" && values.total5 !== 0);
        var html = /*html*/`
        <h2>Wage Subsidy Claim application</h2>
        <p>CA:  ${strings.orEmpty(values.workbcCentre)}</p>
        <p><b>Period Claim Start (DD/MM/YYYY): </b> ${formatDate(values.periodStart1)}</p>
        <p><b>Period Claim End (DD/MM/YYYY): </b> ${formatDate(values.periodStart2)}</p>
        <p><b>Final Claim: </b>${strings.orEmpty(values.isFinalClaim)}</p>
        <p><b>Employer Business Name: </b>${strings.orEmpty(values.employerName)}</p>
        <p><b>Employer Contact: </b>${strings.orEmpty(values.employerContact)}</p>
        <p><b>Employer Phone Number: </b>${strings.orEmpty(values.employerPhone)}</p>
        <p><b>Address 1: </b>${strings.orEmpty(values.employerAddress1)}</p>
        <p><b>Address 2: </b>${strings.orEmpty(values.employerAddress2)}</p>
        <p><b>City: </b>${strings.orEmpty(values.employerCity)}</p>
        <p><b>Postal Code: </b>${strings.orEmpty(values.employerPostal)}</p>
        <p><b>Employee First Name: </b>${strings.orEmpty(values.employeeFirstName)}</p>
        <p><b>Employee Last Name: </b>${strings.orEmpty(values.employeeLastName)}</p>
        <h2>Work Period Information</h2>
        <h3>1st Date</h3>
        <p><b>Date From (DD/MM/YYYY): </b>${formatDate(values.dateFrom1)}</p>
        <p><b>Date To (DD/MM/YYYY):</b>${formatDate(values.dateTo1)}</p>
        <p><b>Hours Worked: </b>${strings.orEmpty(values.hoursWorked1)}</p>
        <p><b>Hourly Wage: </b>${strings.orEmpty(values.hourlyWage1)}</p>
        <p><b>Total: </b>${strings.orEmpty(values.total1)}</p>`
       if(Date2Total){ 
        html = html +
        `<h3>2nd Date</h3>
        <p><b>Date From (DD/MM/YYYY): </b>${formatDate(values.dateFrom2)}</p>
        <p><b>Date To (DD/MM/YYYY):</b>${formatDate(values.dateTo2)}</p>
        <p><b>Hours Worked: </b>${strings.orEmpty(values.hoursWorked2)}</p>
        <p><b>Hourly Wage: </b>${strings.orEmpty(values.hourlyWage2)}</p>
        <p><b>Total: </b>${strings.orEmpty(values.total2)}</p>`
       }
       if(Date3Total){ 
        html = html +
        `<h3>3rd Date</h3>
        <p><b>Date From (DD/MM/YYYY): </b>${formatDate(values.dateFrom3)}</p>
        <p><b>Date To (DD/MM/YYYY):</b>${formatDate(values.dateTo3)}</p>
        <p><b>Hours Worked: </b>${strings.orEmpty(values.hoursWorked3)}</p>
        <p><b>Hourly Wage: </b>${strings.orEmpty(values.hourlyWage3)}</p>
        <p><b>Total: </b>${strings.orEmpty(values.total3)}</p>`
       }
       if(Date4Total){ 
        html = html +
        `<h3>4th Date</h3>
        <p><b>Date To (DD/MM/YYYY):</b>${formatDate(values.dateTo4)}</p>
        <p><b>Date From (DD/MM/YYYY): </b>${formatDate(values.dateFrom4)}</p>
        <p><b>Hours Worked: </b>${strings.orEmpty(values.hoursWorked4)}</p>
        <p><b>Hourly Wage: </b>${strings.orEmpty(values.hourlyWage4)}</p>
        <p><b>Total: </b>${strings.orEmpty(values.total4)}</p>`
       }
       if(Date5Total){ 
        html = html +
        `<h3>5th Date</h3>
        <p><b>Date To (DD/MM/YYYY):</b>${formatDate(values.dateTo5)}</p>
        <p><b>Date From (DD/MM/YYYY): </b>${formatDate(values.dateFrom5)}</p>
        <p><b>Hours Worked: </b>${strings.orEmpty(values.hoursWorked5)}</p>
        <p><b>Hourly Wage: </b>${strings.orEmpty(values.hourlyWage5)}</p>
        <p><b>Total: </b>${strings.orEmpty(values.total5)}</p>`
       }
        html = html+ 
        `<p><b>Total MERCs for Claim Period:</b>${strings.orEmpty(values.totalMERCs)}</p>
        <p><b>Summary of job activities and client issues (if any)</b>:</p>
        <p>${strings.orEmpty(values.clientIssues1)}</p>
        <p><b>Signatory: </b> ${strings.orEmpty(values.signatory1)}</p>`
        return html       
    },

    generateProviderIntakeNotification: function(values){
        const alternativeAddress = values.altShippingAddress;
        const fundedISET = (strings.orEmpty(values.fundingSource) === "ISET");
        const fundedAEST = (strings.orEmpty(values.fundingSource) === "AEST");
        const fundedSDPR = (strings.orEmpty(values.fundingSource)=== "SDPR");
       
        var html = /*html*/`
        <h2>Access To Technology Application</h2>
        <p>Application ID:  ${strings.orEmpty(values._id)}</p>
        <p>Service Provider Name:  ${strings.orEmpty(values.serviceProviderName)}</p>
        <p>Funding Source:  ${strings.orEmpty(values.fundingSource)}</p>
        <p>Service Provider Postal:  ${strings.orEmpty(values.serviceProviderPostal)}</p>
        <p>Service Provider Contact:  ${strings.orEmpty(values.serviceProviderContact)}</p>
        <p>Service Provider Phone:  ${strings.orEmpty(values.serviceProviderPhone)}</p>
        <p>Service Provider Email:  ${strings.orEmpty(values.serviceProviderEmail)}</p>
        <p>Contract Reference ID:  ${strings.orEmpty(values.ProviderContractID)}</p>

        <hr />
        <h5>Eligible Training Program Information</h5>
        ${fundedISET ? (
            `<p>Eligible Training Program:  ${strings.orEmpty(values.trainingProgramISET)}</p>`
         ) : (``) 
         }
         ${fundedAEST ? (
            `<p>Eligible Training Program:  ${strings.orEmpty(values.trainingProgramAEST)}</p>`
         ) : (``) 
         }
         ${fundedSDPR ? (
            `<p>Eligible Training Program:  ${strings.orEmpty(values.trainingProgramSDPR)}</p>`
         ) : (``) 
         }
         <p>Training Start Date:  ${strings.orEmpty(values.periodStart1)}</p>
         <p>Training End Date:  ${strings.orEmpty(values.periodEnd1)}</p>
         <hr />]

        <h5>Client Information</h5>
        <p>Client name:  ${strings.orEmpty(values.clientAddress)}</p>
        <p>E-mail Address:  ${strings.orEmpty(values.clientEmail)}</p>
        <p>Phone Number:  ${strings.orEmpty(values.clientPhone)}</p>
        <p>Address:  ${strings.orEmpty(values.clientAddress)}</p>
        <p>City/Town:  ${strings.orEmpty(values.clientCity)}</p>
        <p>Province:  ${strings.orEmpty(values.clientProvince)}</p>
        <p>Postal Code:  ${strings.orEmpty(values.clientPostal)}</p>
        <p>Client Qualifies for Telus Internet for Good:  ${strings.orEmpty(values.telusInternetForGood)}</p>
        <hr />
        `
        if(alternativeAddress){
            html= html + `
            <h5>Shipping Address Information(only if different from Home Address)</h5>
            <p>Shipping Address:  ${strings.orEmpty(values.addressAlt)}</p>
            <p>City/Town:  ${strings.orEmpty(values.cityAlt)}</p>
            <p>Province:  ${strings.orEmpty(values.provinceAlt)}</p>
            <p>Postal Code:  ${strings.orEmpty(values.postalAlt)}</p>
            <hr />
            `
        }
        

        html = html +`
        <h5>Confirmation and Agreement</h5>
        <p>Client Eligibility Confirmation:  ${strings.orEmpty(values.clientEligibility)}</p>
        <p>Service Provider Responsibility Attestation:  ${strings.orEmpty(values.serviceProviderResponsibility)}</p>`
       
        return html
    },

    generateNeedEmployeeNotification: function(values){
        const alternativeAddress = values.otherWorkAddress;
        const WorkSafeBCNumber = (values.WSBCCoverage === "yes");
        const employeePositions = (values.numberOfPositions1 > 0);
        const wageSubsidizedAlready = (values.wageSubsidy === "yes");
        const businessFaxProvided = (typeof(values.businessFax) !== "undefined" && values.businessFax !== null && values.businessFax !== "");
        var html = /*html*/`
        <h2>Wage Subsidy application</h2>
        <p>Application ID:  ${strings.orEmpty(values._id)}</p>
        <p>Organization Name:  ${strings.orEmpty(values.operatingName)}</p>
        <p>CA:  ${strings.orEmpty(values._ca)}</p>
        <hr />
        <h5>Business Information</h5>
        <p>CRA Business Number:  ${strings.orEmpty(values.applicationId)}</p>
        <p>Address:  ${strings.orEmpty(values.businessAddress)}</p>
        <p>City/Town:  ${strings.orEmpty(values.businessCity)}</p>
        <p>Province:  ${strings.orEmpty(values.businessProvince)}</p>
        <p>Postal Code:  ${strings.orEmpty(values.businessPostal)}</p>
        <p>Employer E-mail Address:  ${strings.orEmpty(values.businessEmail)}</p>
        <p>Phone Number:  ${strings.orEmpty(values.businessPhone)}</p>
        `
        if(businessFaxProvided){
            html = html + `
            <p>Fax:  ${strings.orEmpty(values.businessFax)}</p>
            <hr />
            `
        }else{
            html = html + `
            <hr />
            `   
        }
        
        if(alternativeAddress){
            html= html + `
            <h5>Work Place Information(only if different from contact)</h5>
            <p>Work Address:  ${strings.orEmpty(values.addressAlt)}</p>
            <p>City/Town:  ${strings.orEmpty(values.cityAlt)}</p>
            <p>Province:  ${strings.orEmpty(values.provinceAlt)}</p>
            <p>Postal Code:  ${strings.orEmpty(values.postalAlt)}</p>
            <hr />
            `
        }

        html = html +`
        <h5>Business Questions</h5>
        <p>Type of Sector:  ${strings.orEmpty(values.sectorType)}</p>
        <p>Type of Industry:  ${strings.orEmpty(values.typeOfIndustry)}</p>
        <p>Size of Organization(number of employees):  ${strings.orEmpty(values.organizationSize)}</p>
        <p>Are you actively participating in the Canada Emergency Wage Subsidy program?  ${strings.orEmpty(values.cewsParticipation)}</p>
        <p>Will the subsidy result in the displacement of existing employees or volunteers?  ${strings.orEmpty(values.employeeDisplacement)}</p>
        <p>Is there a labour stoppage or labour - management dispute in progress?  ${strings.orEmpty(values.labourDispute)}</p>
        <p>Is there Union concurrence?  ${strings.orEmpty(values.unionConcurrence)}</p>
        <p>Does your organization have 3rd Party liability coverage?  ${strings.orEmpty(values.liabilityCoverage)}</p>
        <p>Is your organization currently receiving funding under a Access To Technology agreement?  ${strings.orEmpty(values.wageSubsidy)}</p>`
        if(wageSubsidizedAlready){
            html = html + `<p>How many employees is WorkBC currently subsidizing? ${strings.orEmpty(values.employeesClaimed)}</p>`
        }

        html = html + `<p>${strings.orEmpty(values.operatingName)} meets the eligibility criteria and acknowledges that all the obligations the employer owes to or has with 
        respect to its other employees under the various listed statutes and all other applicable laws apply equally 
        to an individual employed in a wage subsidy placement:      ${strings.orEmpty(values.eligibility)}</p>
        <p>${strings.orEmpty(values.operatingName)} certifies that it is in full compliance with all applicable laws, including the Employment Standards Act, 
        the Workers Compensation Act and the Human Rights Code:      ${strings.orEmpty(values.lawCompliance)}.</p>
        <hr />
        `
        if(WorkSafeBCNumber){
            html = html + `
            <h5>WorkBC Insurance Coverage (only if has coverage)</h5>
            <p>WorkSafe BC Number:  ${strings.orEmpty(values.WSBCNumber)}</p>
            <hr />
            `
        }
        
        html = html + `
        <h5>Employee Position 1 </h5>
        <p>Operating Name:  ${strings.orEmpty(values.operatingName0)}</p>
        <p>Number of Positions:  ${strings.orEmpty(values.numberOfPositions0)}</p>
        <p>StartDate (DD/MM/YYYY):  ${formatDate(values.startDate0)}</p>
        <p>Hours: ${strings.orEmpty(values.hours0)}</p>
        <p>Wage: ${strings.orEmpty(values.wage0)}</p>
        <p>Duties: ${strings.orEmpty(values.duties0)}</p>
        <p>Skills: ${strings.orEmpty(values.skills0)}</p>
        <p>Work Experience: ${strings.orEmpty(values.workExperience0)}</p>
        <hr />
        `
        if(employeePositions){
           html = html + `
            <h5>Employee Position 2 (only if different from above) </h5>
            <p>Operating Name:  ${strings.orEmpty(values.operatingName1)}</p>
            <p>Number of Positions:  ${strings.orEmpty(values.numberOfPositions1)}</p>
            <p>StartDate (DD/MM/YYYY):  ${formatDate(values.startDate1)}</p>
            <p>Hours: ${strings.orEmpty(values.hours1)}</p>
            <p>Wage: ${strings.orEmpty(values.wage1)}</p>
            <p>Duties: ${strings.orEmpty(values.duties1)}</p>
            <p>Skills: ${strings.orEmpty(values.skills1)}</p>
            <p>Work Experience: ${strings.orEmpty(values.workExperience1)}</p>
            <hr />  `
        }
        html = html + `                  
        <h5>Signatory names and Organization consent</h5>
        <p>Signing Authority Full Name:  ${strings.orEmpty(values.signatory1)}</p>
        <p>Signing Authority Title:  ${strings.orEmpty(values.signatoryTitle)}</p>
        <p>I acknowledge and understand that by clicking the "submit" I am attaching 
        my electronic signature to this form and that by doing so I acquire the same 
        rights, incur the same obligations and confer the same consent as I would by 
        manually signing a physical copy of this form:      ${strings.orEmpty(values.organizationConsent)}</p>        
        `
        return html
    },
    generateClaimListNotification: function(values){
        var html = `

        `
        return html
    }

}