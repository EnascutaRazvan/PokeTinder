import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import axios from "axios";

function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setIsSubmitting(true);
    try {
      setIsSubmitting(false);
      console.log(values);
      const response = await axios.post("http://localhost:8092/signup", {
        email: values.email,
        password: values.password,
      });

      console.log(response);
      navigate("/login");
    } catch (error: any) {
      setIsSubmitting(false);
      if (error.response && error.response.status === 409) {
        setFieldError("email", error.response.data.message);
      }
    }
    setSubmitting(false);
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email invalid").required("Email obligatoriu"),
    password: Yup.string().required("Parola obligatorie"),
  });

  return (
    <div className="login-container">
      <div className="pokemon-background" />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }: { errors: any; touched: any }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                className={
                  errors.email && touched.email ? "is-invalid" : "form-control"
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Parola:</label>
              <Field
                type="password"
                id="password"
                name="password"
                className={
                  errors.password && touched.password
                    ? "is-invalid"
                    : "form-control"
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <button className="btn" type="submit" disabled={isSubmitting}>
              Autentificare
            </button>
          </Form>
        )}
      </Formik>
      <span className="already-registered">
        <strong>Already registered ? </strong>
      </span>
      <a href="/login">
        <button className="btn login" type="submit" disabled={isSubmitting}>
          Login
        </button>
      </a>
    </div>
  );
}

export default SignUp;
