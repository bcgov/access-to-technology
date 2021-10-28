import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'

class FormStep2 extends Component {

    get showErrors() {
        if (this.props.submitCount > 0) {
            return (
                <div>
                    <p>Please correct the following errors:</p>
                    <ul>
                        {Object.values(this.props.errors).map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return null
        }
    }

    render() {
        if (this.props.currentStep !== 2) {
            return null
        }


        //Else return step 3
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
                            <label className="control-label" htmlFor="laptopWasNeeded">I would have faced significant barriers in completing

the training without the laptop provided through the

Access to Technology (A2T) program.<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "laptopWasNeeded")}`}
                                type="radio"
                                name="laptopWasNeeded"
                                value="1"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "laptopWasNeeded")}`}
                                type="radio"
                                name="laptopWasNeeded"
                                value="2"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "laptopWasNeeded")}`}
                                type="radio"
                                name="laptopWasNeeded"
                                value="3"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "laptopWasNeeded")}`}
                                type="radio"
                                name="laptopWasNeeded"
                                value="4"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "laptopWasNeeded")}`}
                                type="radio"
                                name="laptopWasNeeded"
                                value="5"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "laptopWasNeeded")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <label className="control-label" htmlFor="technicalSupportSatisfaction">I am satisfied with the level of technical support

received on how to set up and use the laptop under the

Access to Technology (A2T) program.<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "technicalSupportSatisfaction")}`}
                                type="radio"
                                name="technicalSupportSatisfaction"
                                value="1"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "technicalSupportSatisfaction")}`}
                                type="radio"
                                name="technicalSupportSatisfaction"
                                value="2"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "technicalSupportSatisfaction")}`}
                                type="radio"
                                name="technicalSupportSatisfaction"
                                value="3"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "technicalSupportSatisfaction")}`}
                                type="radio"
                                name="technicalSupportSatisfaction"
                                value="4"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "technicalSupportSatisfaction")}`}
                                type="radio"
                                name="technicalSupportSatisfaction"
                                value="5"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "technicalSupportSatisfaction")}
                        </div>
                    </div>
                </div>
                <div className="form-row">
            <div className="form-group col-md-6">
                <label className="col-form-label control-label" htmlFor="hoursPerWeek">Approximately how many hours per week did you

use the laptop for your training? </label>
                 <Field
                        as="select"
                        className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "hoursPerWeek")}`}
                        id="hoursPerWeek" 
                        name="hoursPerWeek" 
                        onChange={e => {
                            this.props.handleChange(e)
                            
                        }}
                    >
                        <option value="">Please select</option>
                        <option value="0-5">0-5</option>
                        <option value="6-10">6-10</option>
                        <option value="11-15">11-15</option>
                        <option value="16-20">16-20</option>
                        <option value="21-25">21-25</option>
                        <option value="26-30">26-30</option>
                        <option value="31-35">31-35</option>
                        <option value="36-40">36-40</option>
                        <option value="40+">40+</option>
                       

                    </Field>
                    {feedBackInvalid(this.props.errors,this.props.touched,"hoursPerWeek")}
            </div>
        </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="certificateProgram">What certificate or qualification did you obtain

through your skills training program?
                </label>
                    <small className="text-muted" id="certificateProgram"> (200 characters max.)</small>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="certificateProgram"
                        name="certificateProgram"
                        rows="2"
                        maxLength="200"
                    />
                    <small>{this.props.values.certificateProgram.length}/200</small>
                </div>
                <div className="form-group">
                    {this.showErrors}
                </div>
                <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="postTrainingPlans">What do you plan to do after you have completed

your training? 
                        </label>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touch, "postTrainingPlans")}`}
                                type="radio"
                                name="postTrainingPlans"
                                value="Look for a job"
                            />
                            <label className="form-check-label" htmlFor="postTrainingPlansLookForAJob">Look for a job</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touch, "postTrainingPlans")}`}
                                type="radio"
                                name="postTrainingPlans"
                                value="Start my own business"
                            />
                            <label className="form-check-label" htmlFor="postTrainingPlansStartMyOwnBusiness">Start my own business</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touch, "postTrainingPlans")}`}
                                type="radio"
                                name="postTrainingPlans"
                                value="Enroll in more training and education"
                            />
                            <label className="form-check-label" htmlFor="postTrainingPlansEnrollInMoreTrainingAndEducation">Enroll in more training and education</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touch, "postTrainingPlans")}`}
                                type="radio"
                                name="postTrainingPlans"
                                value="Volunteer"
                            />
                            <label className="form-check-label" htmlFor="postTrainingPlansVolunteering">Volunteering</label>
                        </div>
    
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touch, "postTrainingPlans")}`}
                                type="radio"
                                name="postTrainingPlans"
                                value="Other"
                            />
                            <label className="form-check-label" htmlFor="postTrainingPlansOther">Other (not listed above)</label>
                            {feedBackInvalid(this.props.errors, this.props.touch, "postTrainingPlans")}
                        </div>
                    </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="feedBackAndExperienceComments">How can we make the experience better for you?

Please feel free to include any comments, suggestions,

or feedback about the program.
                </label>
                    <small className="text-muted" id="feedBackAndExperienceComments"> (1000 characters max.)</small>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="feedBackAndExperienceComments"
                        name="feedBackAndExperienceComments"
                        rows="4"
                        maxLength="1000"
                    />
                    <small>{this.props.values.feedBackAndExperienceComments.length}/1000</small>
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

export default FormStep2