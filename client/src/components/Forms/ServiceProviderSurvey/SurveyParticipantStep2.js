import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'

class SurveyParticipantStep2 extends Component {

    render() {
        if (this.props.currentStep !== 2) {
            return null
        }
        //else return step 2
        return (
            <div>
                <p>Thinking about the <b>work experience and the organization ,</b> please rate your level of agreement with the following statements:</p>
                <p>The rating scale used is as follows: 1 = strongly disagree, 2 = disagree, 3 = neither agree nor disagree, 4 = agree, 5 = strongly agree.</p>
                <hr />
                <div className="form-group">
                    <div className="row">
                        <div className="col-6"></div>
                        <div className="col d-none d-md-block">
                            Strongly <br /> Disagree
                        </div>
                        <div className="col">

                        </div>
                        <div className="col">

                        </div>
                        <div className="col">

                        </div>
                        <div className="col d-none d-md-block">
                            Strongly<br /> Agree
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <label className="control-label" htmlFor="overallExperienceWithOrganization">My overall experience with the organization has been positive.<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "overallExperienceWithOrganization")}`}
                                type="radio"
                                name="overallExperienceWithOrganization"
                                value="1stronglyDisagree"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "overallExperienceWithOrganization")}`}
                                type="radio"
                                name="overallExperienceWithOrganization"
                                value="2disagree"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "overallExperienceWithOrganization")}`}
                                type="radio"
                                name="overallExperienceWithOrganization"
                                value="3neitherAgreeNorDisagree"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "overallExperienceWithOrganization")}`}
                                type="radio"
                                name="overallExperienceWithOrganization"
                                value="4agree"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "overallExperienceWithOrganization")}`}
                                type="radio"
                                name="overallExperienceWithOrganization"
                                value="5stronglyAgree"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "overallExperienceWithOrganization")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <label className="control-label" htmlFor="levelOfSupportsReceived">I am satisfied with the  level of supports received from the organization.<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="1stronglyDisagree"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="2disagree"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="3neitherAgreeNorDisagree"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="4agree"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="5stronglyAgree"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "levelOfSupportsReceived")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <label className="control-label" htmlFor="increasedAbilityGettingAndKeepingJob">This experience has improved my abilities for getting and keeping a job.<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "increasedAbilityGettingAndKeepingJob")}`}
                                type="radio"
                                name="increasedAbilityGettingAndKeepingJob"
                                value="1stronglyDisagree"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "increasedAbilityGettingAndKeepingJob")}`}
                                type="radio"
                                name="increasedAbilityGettingAndKeepingJob"
                                value="2disagree"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "increasedAbilityGettingAndKeepingJob")}`}
                                type="radio"
                                name="increasedAbilityGettingAndKeepingJob"
                                value="3neitherAgreeNorDisagree"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "increasedAbilityGettingAndKeepingJob")}`}
                                type="radio"
                                name="increasedAbilityGettingAndKeepingJob"
                                value="4agree"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "increasedAbilityGettingAndKeepingJob")}`}
                                type="radio"
                                name="increasedAbilityGettingAndKeepingJob"
                                value="5stronglyAgree"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "increasedAbilityGettingAndKeepingJob")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="organizationAndExperienceComments">Please provide any additional details or comments about the organization and your work experience so far.
                </label>
                    <small className="text-muted" id="organizationAndExperienceComments"> (1000 characters max.)</small>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="organizationAndExperienceComments"
                        name="organizationAndExperienceComments"
                        rows="4"
                        maxLength="1000"
                    />
                    <small>{this.props.values.organizationAndExperienceComments.length}/1000</small>
                </div>
            </div>
        )
    }
}

export default SurveyParticipantStep2