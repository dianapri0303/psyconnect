'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { login, getCurrentUser } from '@/lib/auth';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useModalStore } from '@/store/modalStore';
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ErrorIcon,
} from '../icons/FormIcons';
import styles from './AuthForms.module.css';

const schema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore(state => state.setUser);
  const setIds = useFavoritesStore(state => state.setIds);
  const { closeModal, openRegister } = useModalStore();

  return (
    <>
      <div className={`${styles.header} ${styles.headerWide}`}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>
          Log in to access your favorites and bookings.
        </p>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { user } = await login(values);
            setUser(user);

            const profile = await getCurrentUser();
            setIds(profile.favorites.map(item => item._id));

            closeModal();
            toast.success(`Welcome back, ${user.name}!`);
          } catch (error) {
            const status = (error as AxiosError).response?.status;
            toast.error(
              status === 401
                ? 'Invalid email or password.'
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
                htmlFor="login-email"
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
                  id="login-email"
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
                htmlFor="login-password"
                className={`${styles.label} ${errors.password && touched.password ? styles.labelError : ''}`}
              >
                Enter your password
              </label>
              <div className={styles.inputWrapper}>
                <span
                  className={`${styles.inputIcon} ${errors.password && touched.password ? styles.inputIconError : ''}`}
                >
                  <LockIcon />
                </span>
                <Field
                  id="login-password"
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
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </Form>
        )}
      </Formik>

      <p className={`${styles.switchText} ${styles.centered}`}>
        Don&apos;t have an account?{' '}
        <button
          type="button"
          className={styles.switchButton}
          onClick={openRegister}
        >
          Sign Up
        </button>
      </p>
    </>
  );
}
