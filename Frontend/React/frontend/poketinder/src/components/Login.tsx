import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setIsSubmitting(true);

    try {
      setIsSubmitting(false);
      console.log(values);
      const response = await axios.post("http://localhost:8092/login", {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const id = await axios.post("http://localhost:8092/loginUser", {
          email: values.email,
        });
        localStorage.setItem("id", id.data);
        navigate("/poketinder");
      }
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
            <button
              className="btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Autentificare
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
