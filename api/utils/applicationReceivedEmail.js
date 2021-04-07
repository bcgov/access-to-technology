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
        <p>Contract Reference ID:  ${strings.orEmpty(values.providerContractId)}</p>

        <hr />
        <h5>Eligible Training Program Information</h5>
         <p>Eligible Training Program:  ${strings.orEmpty(values.trainingProgram)}</p>
         <p>Training Start Date:  ${strings.orEmpty(values.periodStart1)}</p>
         <p>Training End Date:  ${strings.orEmpty(values.periodEnd1)}</p>
         <hr />

        <h5>Client Information</h5>
        ${fundedSDPR ? (
            `<p>WorkBC Case Number:  ${strings.orEmpty(values.workBCCaseNumber)}</p>`
         ) : (``) 
         }
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


}