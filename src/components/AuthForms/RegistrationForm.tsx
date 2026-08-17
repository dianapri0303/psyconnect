'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { register } from '@/lib/auth';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';
import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ErrorIcon,
} from '../icons/FormIcons';
import styles from './AuthForms.module.css';

const schema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore(state => state.setUser);
  const { closeModal, openLogin } = useModalStore();

  return (
    <>
      <div className={`${styles.header} ${styles.centered}`}>
        <h2 className={styles.title}>Create an Account</h2>
        <p className={styles.subtitle}>
          Join PsyConnect to save your favorite specialists and book sessions.
        </p>
      </div>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { user } = await register(values);
            setUser(user);
            closeModal();
            toast.success(`Welcome, ${user.name}!`);
          } catch (error) {
            const status = (error as AxiosError).response?.status;
            toast.error(
              status === 409
                ? 'An account with this email already exists.'
                : 'Something went wrong. Please try again.',
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={styles.form} noValidate>
            <div className={styles.field}>
              <label
                htmlFor="register-name"
                className={`${styles.label} ${errors.name && touched.name ? styles.labelError : ''}`}
              >
                Name
              </label>
              <div className={styles.inputWrapper}>
                <span
                  className={`${styles.inputIcon} ${errors.name && touched.name ? styles.inputIconError : ''}`}
                >
                  <UserIcon />
                </span>
                <Field
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
                />
              </div>
              <ErrorMessage name="name">
                {message => (
                  <span className={styles.error}>
                    <ErrorIcon />
                    {message}
                  </span>
                )}
              </ErrorMessage>
            </div>

            <div className={styles.field}>
              <label
                htmlFor="register-email"
                className={`${styles.label} ${errors.email && touched.email ? styles.labelError : ''}`}
              >
                Email
              </label>
              <div className={styles.inputWrapper}>
                <span
                  className={`${styles.inputIcon} ${errors.email && touched.email ? styles.inputIconError : ''}`}
                >
                  <MailIcon />
                </span>
                <Field
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
                />
              </div>
              <ErrorMessage name="email">
                {message => (
                  <span className={styles.error}>
                    <ErrorIcon />
                    {message}
                  </span>
                )}
              </ErrorMessage>
            </div>

            <div className={styles.field}>
              <label
                htmlFor="register-password"
                className={`${styles.label} ${errors.password && touched.password ? styles.labelError : ''}`}
              >
                Create a password
              </label>
              <div className={styles.inputWrapper}>
                <span
                  className={`${styles.inputIcon} ${errors.password && touched.password ? styles.inputIconError : ''}`}
                >
                  <LockIcon />
                </span>
                <Field
                  id="register-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`${styles.input} ${styles.inputWithToggle} ${errors.password && touched.password ? styles.inputError : ''}`}
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <ErrorMessage name="password">
                {message => (
                  <span className={styles.error}>
                    <ErrorIcon />
                    {message}
                  </span>
                )}
              </ErrorMessage>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>

      <p className={`${styles.switchText} ${styles.centered}`}>
        Already have an account?{' '}
        <button
          type="button"
          className={styles.switchButton}
          onClick={openLogin}
        >
          Log In
        </button>
      </p>
    </>
  );
}
