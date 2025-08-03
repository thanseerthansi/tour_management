import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/InputComponents";
import { Form, Button, Row } from "react-bootstrap";
import { PATH } from "../../constants/Path";
import { ApiEndpoints } from "../../constants/Urls";
import { useCustomMutation } from "../../services/useCustomMutation";
import { useNavigate } from "react-router-dom";
import { ContextDatas } from "../../services/Context";


const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("username is required"),
  password: Yup.string()
    .required("Password is required"),
});

function PageLogin() {
    const {setuser} = useContext(ContextDatas)
    const {mutation} = useCustomMutation();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (values, actions) => {
        mutation.mutate(
        {
            method: "post",
            url:ApiEndpoints.LOGIN, 
            values: { ...values },
            next: () => {
            actions.resetForm();
            actions.setSubmitting(false);
            },
            
        },
        {
            onSuccess: (data) => {
            // Access the response data here
            console.log("Response Data:", data);
            if(data.token){
                setuser(data.token)
                localStorage.setItem("token",data.token)
                navigate(PATH.HOME)
            }
            // actions.resetForm();
            // actions.setSubmitting(false);
            },
            onError: (error) => {
            actions.setSubmitting(false);
            },
        }
        );
        
    };

  return (
    <div>
      <main className="main-content" style={{ marginTop: "-20px"}}>
        <div className="admin">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xxl-3 col-xl-6 col-md-6 col-sm-8">
                <div className="edit-profile">
                  <div className="card border-0">
                    <div className="card-header">
                      <div className="edit-profile__title">
                        <h6>Sign in to Tour Admin</h6>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="edit-profile__body">
                        <Formik
                          initialValues={{ username: "", password: "" }}
                          validationSchema={loginValidationSchema}
                          onSubmit={handleSubmit}
                        >
                          {({
                            handleSubmit,
                            isSubmitting,
                            handleBlur,
                            values,
                            errors,
                            touched,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                              <Row>
                                <FormikField
                                  name="username"
                                  label="username"
                                  placeholder="username"
                                  type="text"
                                  colWidth={12}
                                //   onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.username}
                                  isInvalid={touched.username && errors.username}
                                  error={errors.username}
                                />
                              </Row>
                              <Row>
                                <FormikField
                                  name="password"
                                  label="password"
                                  placeholder="password"
                                  type="password"
                                  colWidth={12}
                                //   onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                                  isInvalid={touched.password && errors.password}
                                  error={errors.password}
                                />
                               
                              </Row>
                              <Row>
                                <div>
                                  <Button
                                    type="submit"
                                    className="btn- w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn btndefault"
                                    disabled={isSubmitting}
                                  >
                                    Sign in
                                  </Button>
                                </div>
                              </Row>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PageLogin;
