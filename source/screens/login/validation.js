import * as Yup from "yup";
//
export default () => {
    return Yup.object().shape({
        emailId: Yup.string().trim().nonNullable()
            //.email('Please enter a valid email')
            .required('Please enter a valid email'),
        password: Yup.string().trim().nonNullable()
            .required('Password is required').min(2, "Minimum 2 character require"),
    })
}