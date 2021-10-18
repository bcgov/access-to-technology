import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'

class SurveyParticipantStep3 extends Component {

    render() {
        if (this.props.currentStep !== 3) {
            return null
        }
        //else return step 3
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
                            <label className="col-form-label control-label" htmlFor="receivedOtherWorkBCServicesOrPrograms">Prior to this experience, I have received WorkBC services or participated in WorkBC programs.<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "receivedOtherWorkBCServicesOrPrograms")}`}
                                type="radio"
                                name="receivedOtherWorkBCServicesOrPrograms"
                                value="1stronglyDisagree"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "receivedOtherWorkBCServicesOrPrograms")}`}
                                type="radio"
                                name="receivedOtherWorkBCServicesOrPrograms"
                                value="2disagree"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "receivedOtherWorkBCServicesOrPrograms")}`}
                                type="radio"
                                name="receivedOtherWorkBCServicesOrPrograms"
                                value="3neitherAgreeNorDisagree"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "receivedOtherWorkBCServicesOrPrograms")}`}
                                type="radio"
                                name="receivedOtherWorkBCServicesOrPrograms"
                                value="4agree"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "receivedOtherWorkBCServicesOrPrograms")}`}
                                type="radio"
                                name="receivedOtherWorkBCServicesOrPrograms"
                                value="5stronglyAgree"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "receivedOtherWorkBCServicesOrPrograms")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <label className="col-form-label control-label" htmlFor="likelyToParticipateInSimilarProgram">I am likely to participate in similar programs with WorkBC in the future.<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToParticipateInSimilarProgram")}`}
                                type="radio"
                                name="likelyToParticipateInSimilarProgram"
                                value="1stronglyDisagree"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToParticipateInSimilarProgram")}`}
                                type="radio"
                                name="likelyToParticipateInSimilarProgram"
                                value="2disagree"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToParticipateInSimilarProgram")}`}
                                type="radio"
                                name="likelyToParticipateInSimilarProgram"
                                value="3neitherAgreeNorDisagree"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToParticipateInSimilarProgram")}`}
                                type="radio"
                                name="likelyToParticipateInSimilarProgram"
                                value="4agree"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToParticipateInSimilarProgram")}`}
                                type="radio"
                                name="likelyToParticipateInSimilarProgram"
                                value="5stronglyAgree"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "likelyToParticipateInSimilarProgram")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <label className="col-form-label control-label" htmlFor="likelyToRecommendGrant">I would recommend this opportunity to other individuals when it becomes available again.<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToRecommendGrant")}`}
                                type="radio"
                                name="likelyToRecommendGrant"
                                value="1stronglyDisagree"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToRecommendGrant")}`}
                                type="radio"
                                name="likelyToRecommendGrant"
                                value="2disagree"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToRecommendGrant")}`}
                                type="radio"
                                name="likelyToRecommendGrant"
                                value="3neitherAgreeNorDisagree"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToRecommendGrant")}`}
                                type="radio"
                                name="likelyToRecommendGrant"
                                value="4agree"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "likelyToRecommendGrant")}`}
                                type="radio"
                                name="likelyToRecommendGrant"
                                value="5stronglyAgree"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "likelyToRecommendGrant")}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SurveyParticipantStep3