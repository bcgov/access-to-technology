import * as yup from 'yup'
import 'core-js/stable';

export const CourseCompletionValidationSchema = yup.object().shape({
    _id: yup.string()
        .required("Please enter the application ID.")
        .min(10, "Must be 10 characters")
        .max(10, "Must be 10 characters"),
    _token:yup.string().required("Please enter the application token.")
        .min(25, "Must be 25 characters")
        .max(25, "Must be 25 characters"),
    completedTraining: yup.string()
        .required("Please select whether your client has completed their training."),
    minimallyCompleted: yup.string()
        .when("completedTraining", {
            is: (value) => value === "no",
            then: yup.string()
                .required("Please select if your client meet any of the requirements above.")
        }),
   
})