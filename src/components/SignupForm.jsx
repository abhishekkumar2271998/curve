import { useState } from 'react';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email';
  }

  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'Password must contain a number';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms';
  }

  return errors;
}

export default function SignupForm({ onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, password: true, confirmPassword: true, acceptTerms: true });
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit?.(values);
      setValues(initialValues);
      setTouched({});
    } finally {
      setSubmitting(false);
    }
  };

  const field = (name, label, type = 'text') => (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={Boolean(touched[name] && errors[name])}
      />
      {touched[name] && errors[name] && <span className="form-error">{errors[name]}</span>}
    </div>
  );

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      {field('name', 'Name')}
      {field('email', 'Email', 'email')}
      {field('password', 'Password', 'password')}
      {field('confirmPassword', 'Confirm password', 'password')}

      <div className="form-field">
        <label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={values.acceptTerms}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          I accept the terms and conditions
        </label>
        {touched.acceptTerms && errors.acceptTerms && (
          <span className="form-error">{errors.acceptTerms}</span>
        )}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
}
