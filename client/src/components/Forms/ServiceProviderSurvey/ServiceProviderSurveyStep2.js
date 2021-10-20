import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'

class ServiceProviderSurveyStep2 extends Component {

    render() {
        if (this.props.currentStep !== 2) {
            return null
        }
        //else return step 2
        return (
            <div>
                <p>Please rate your level of agreement with the following statements:</p>
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
                            <label className="control-label" htmlFor="programsSupportOfClient">The Access to Technology (A2T) program is

significantly supporting my clients to complete their

training<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "programsSupportOfClient")}`}
                                type="radio"
                                name="programsSupportOfClient"
                                value="1"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "programsSupportOfClient")}`}
                                type="radio"
                                name="programsSupportOfClient"
                                value="2"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "programsSupportOfClient")}`}
                                type="radio"
                                name="programsSupportOfClient"
                                value="3"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "programsSupportOfClient")}`}
                                type="radio"
                                name="programsSupportOfClient"
                                value="4"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "programsSupportOfClient")}`}
                                type="radio"
                                name="programsSupportOfClient"
                                value="5"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "programsSupportOfClient")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <label className="control-label" htmlFor="levelOfSupportsReceived">My organization would recommend the Access to

Technology (A2T) program to other organizations.<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="1"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="2"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="3"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="4"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "levelOfSupportsReceived")}`}
                                type="radio"
                                name="levelOfSupportsReceived"
                                value="5"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "levelOfSupportsReceived")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="overallExperienceWithOrganization">How can we make the experience better for your

organization? Please feel free to include any comments,

suggestions, or feedback about the program.
                </label>
                    <small className="text-muted" id="overallExperienceWithOrganization"> (1000 characters max.)</small>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="overallExperienceWithOrganization"
                        name="overallExperienceWithOrganization"
                        rows="4"
                        maxLength="1000"
                    />
                    <small>{this.props.values.overallExperienceWithOrganization.length}/1000</small>
                </div>
                <div className="form-group">
                    {this.showErrors}
                </div>

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

        )
    }
}

export default ServiceProviderSurveyStep2