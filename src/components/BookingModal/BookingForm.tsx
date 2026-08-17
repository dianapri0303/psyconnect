'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { createAppointment } from '@/lib/appointments';
import { UserIcon, MailIcon, PhoneIcon, ErrorIcon } from '../icons/FormIcons';
import { ChevronDownIcon } from '../icons/CardIcons';
import formStyles from '../AuthForms/AuthForms.module.css';
import styles from './BookingModal.module.css';

const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
];

const schema = Yup.object({
  name: Yup.string()
    .min(2, 'Please enter your complete full name.')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format.')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+\d{10,15}$/, 'Phone number is too short.')
    .required('Phone number is required'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Please select time'),
});

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateKey: string) => {
  if (!dateKey) return 'Select date';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${dateKey}T00:00:00`));
};

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const getCalendarDays = (viewDate: Date) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (Date | null)[] = Array.from(
    { length: firstWeekday },
    () => null,
  );
  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, month, day));
  }
  return days;
};

const toIsoDate = (date: string, time: string) => {
  const [rawTime, meridiem] = time.split(' ');
  const [rawHours, minutes] = rawTime.split(':').map(Number);

  let hours = rawHours;
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result.toISOString();
};

interface Props {
  psychologistId: string;
  psychologistName: string;
  psychologistAvatar: string;
  onClose: () => void;
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM2 6V4V6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function BookingForm({
  psychologistId,
  psychologistName,
  psychologistAvatar,
  onClose,
}: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => new Date());
  const timeDropdownRef = useRef<HTMLDivElement | null>(null);
  const dateDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isTimeOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        timeDropdownRef.current &&
        !timeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTimeOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsTimeOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isTimeOpen]);

  useEffect(() => {
    if (!isDateOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDateOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsDateOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDateOpen]);

  if (isSuccess) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M17.2 29.2L31.3 15.1L28.5 12.3L17.2 23.6L11.5 17.9L8.7 20.7L17.2 29.2ZM20 40C17.2333 40 14.6333 39.475 12.2 38.425C9.76667 37.375 7.65 35.95 5.85 34.15C4.05 32.35 2.625 30.2333 1.575 27.8C0.525 25.3667 0 22.7667 0 20C0 17.2333 0.525 14.6333 1.575 12.2C2.625 9.76667 4.05 7.65 5.85 5.85C7.65 4.05 9.76667 2.625 12.2 1.575C14.6333 0.525 17.2333 0 20 0C22.7667 0 25.3667 0.525 27.8 1.575C30.2333 2.625 32.35 4.05 34.15 5.85C35.95 7.65 37.375 9.76667 38.425 12.2C39.475 14.6333 40 17.2333 40 20C40 22.7667 39.475 25.3667 38.425 27.8C37.375 30.2333 35.95 32.35 34.15 34.15C32.35 35.95 30.2333 37.375 27.8 38.425C25.3667 39.475 22.7667 40 20 40Z"
              fill="#19724F"
            />
          </svg>
        </span>

        <h3 className={styles.successTitle}>Your session has been booked!</h3>
        <p className={styles.successText}>
          We&apos;ll send a confirmation to your email.
          <br />
          {psychologistName} will contact you shortly.
        </p>

        <button
          type="button"
          className={styles.closeSuccessButton}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', date: '', time: '' }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await createAppointment({
            name: values.name,
            email: values.email,
            phone: values.phone,
            date: toIsoDate(values.date, values.time),
            psychologistId,
          });
          setIsSuccess(true);
        } catch (error) {
          const message =
            (error as AxiosError<{ message?: string }>).response?.data
              ?.message ?? 'Could not book the session. Please try again.';
          toast.error(message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched, values, setFieldValue, setFieldTouched }) => (
        <Form className={styles.form} noValidate>
          <div className={styles.header}>
            <h2 className={styles.title}>Book a Session</h2>
          </div>

          <div className={styles.body}>
            <div className={styles.psychologist}>
              <Image
                src={psychologistAvatar}
                alt={psychologistName}
                width={80}
                height={80}
                className={styles.avatar}
              />
              <p className={styles.name}>{psychologistName}</p>
            </div>

            <div className={styles.fields}>
              <div className={formStyles.field}>
                <label
                  htmlFor="booking-name"
                  className={`${formStyles.label} ${errors.name && touched.name ? formStyles.labelError : ''}`}
                >
                  Name
                </label>
                <div className={formStyles.inputWrapper}>
                  <span
                    className={`${formStyles.inputIcon} ${errors.name && touched.name ? formStyles.inputIconError : ''}`}
                  >
                    <UserIcon />
                  </span>
                  <Field
                    id="booking-name"
                    name="name"
                    type="text"
                    placeholder="Jane"
                    className={`${formStyles.input} ${errors.name && touched.name ? formStyles.inputError : ''}`}
                  />
                </div>
                <ErrorMessage name="name">
                  {message => (
                    <span className={formStyles.error}>
                      <ErrorIcon />
                      {message}
                    </span>
                  )}
                </ErrorMessage>
              </div>

              <div className={formStyles.field}>
                <label
                  htmlFor="booking-email"
                  className={`${formStyles.label} ${errors.email && touched.email ? formStyles.labelError : ''}`}
                >
                  Email
                </label>
                <div className={formStyles.inputWrapper}>
                  <span
                    className={`${formStyles.inputIcon} ${errors.email && touched.email ? formStyles.inputIconError : ''}`}
                  >
                    <MailIcon />
                  </span>
                  <Field
                    id="booking-email"
                    name="email"
                    type="email"
                    placeholder="jane@gmail.com"
                    className={`${formStyles.input} ${errors.email && touched.email ? formStyles.inputError : ''}`}
                  />
                </div>
                <ErrorMessage name="email">
                  {message => (
                    <span className={formStyles.error}>
                      <ErrorIcon />
                      {message}
                    </span>
                  )}
                </ErrorMessage>
              </div>

              <div className={formStyles.field}>
                <label
                  htmlFor="booking-phone"
                  className={`${formStyles.label} ${errors.phone && touched.phone ? formStyles.labelError : ''}`}
                >
                  Phone Number
                </label>
                <div className={formStyles.inputWrapper}>
                  <span
                    className={`${formStyles.inputIcon} ${errors.phone && touched.phone ? formStyles.inputIconError : ''}`}
                  >
                    <PhoneIcon />
                  </span>
                  <Field
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    placeholder="+380991234567"
                    className={`${formStyles.input} ${errors.phone && touched.phone ? formStyles.inputError : ''}`}
                  />
                </div>
                <ErrorMessage name="phone">
                  {message => (
                    <span className={formStyles.error}>
                      <ErrorIcon />
                      {message}
                    </span>
                  )}
                </ErrorMessage>
              </div>
            </div>

            <div className={styles.row}>
              <div className={`${formStyles.field} ${styles.rowItem}`}>
                <label
                  id="booking-date-label"
                  className={`${formStyles.label} ${errors.date && touched.date ? formStyles.labelError : ''}`}
                >
                  Date
                </label>
                <div
                  ref={dateDropdownRef}
                  className={`${styles.dateField} ${errors.date && touched.date ? styles.dateFieldError : ''}`}
                >
                  <button
                    type="button"
                    id="booking-date"
                    aria-labelledby="booking-date-label"
                    className={styles.dateButton}
                    onClick={() => {
                      setViewDate(
                        values.date
                          ? new Date(`${values.date}T00:00:00`)
                          : new Date(),
                      );
                      setIsDateOpen(prev => !prev);
                    }}
                    aria-haspopup="dialog"
                    aria-expanded={isDateOpen}
                  >
                    <span>{formatDisplayDate(values.date)}</span>
                    <span className={styles.dateIcon} aria-hidden="true">
                      <CalendarIcon />
                    </span>
                  </button>

                  {isDateOpen && (
                    <div
                      className={styles.dateMenu}
                      role="dialog"
                      aria-label="Choose date"
                    >
                      <div className={styles.dateMenuHeader}>
                        <button
                          type="button"
                          className={styles.dateNavButton}
                          onClick={() =>
                            setViewDate(
                              prev =>
                                new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                            )
                          }
                          aria-label="Previous month"
                        >
                          ‹
                        </button>
                        <span>
                          {viewDate.toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        <button
                          type="button"
                          className={styles.dateNavButton}
                          onClick={() =>
                            setViewDate(
                              prev =>
                                new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                            )
                          }
                          aria-label="Next month"
                        >
                          ›
                        </button>
                      </div>

                      <div className={styles.dateMenuWeekdays}>
                        {WEEKDAY_LABELS.map(label => (
                          <span key={label}>{label}</span>
                        ))}
                      </div>

                      <div className={styles.dateMenuGrid}>
                        {getCalendarDays(viewDate).map((day, index) => {
                          if (!day) {
                            return <span key={`empty-${index}`} />;
                          }

                          const dateKey = toDateKey(day);
                          const isPast = dateKey < toDateKey(new Date());
                          const isSelected = values.date === dateKey;

                          return (
                            <button
                              key={dateKey}
                              type="button"
                              disabled={isPast}
                              className={`${styles.dateDay} ${isSelected ? styles.dateDayActive : ''}`}
                              onClick={() => {
                                setFieldValue('date', dateKey);
                                setFieldTouched('date', true, false);
                                setIsDateOpen(false);
                              }}
                            >
                              {day.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <input
                    type="hidden"
                    name="date"
                    value={values.date}
                    onChange={() => undefined}
                  />
                </div>
                <ErrorMessage name="date">
                  {message => (
                    <span className={formStyles.error}>
                      <ErrorIcon />
                      {message}
                    </span>
                  )}
                </ErrorMessage>
              </div>

              <div className={`${formStyles.field} ${styles.rowItem}`}>
                <label
                  id="booking-time-label"
                  className={`${formStyles.label} ${errors.time && touched.time ? formStyles.labelError : ''}`}
                >
                  Time
                </label>
                <div
                  ref={timeDropdownRef}
                  className={styles.timeDropdown}
                >
                  <button
                    id="booking-time"
                    type="button"
                    aria-labelledby="booking-time-label"
                    className={`${styles.timeButton} ${errors.time && touched.time ? styles.timeButtonError : ''}`}
                    onClick={() => setIsTimeOpen(prev => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isTimeOpen}
                  >
                    <span>{values.time || 'Select time'}</span>
                    <span
                      className={`${styles.timeChevron} ${isTimeOpen ? styles.timeChevronOpen : ''}`}
                      aria-hidden="true"
                    >
                      <ChevronDownIcon />
                    </span>
                  </button>

                  {isTimeOpen && (
                    <ul className={styles.timeMenu} role="listbox">
                      {TIME_SLOTS.map(slot => (
                        <li key={slot}>
                          <button
                            type="button"
                            className={`${styles.timeOption} ${values.time === slot ? styles.timeOptionActive : ''}`}
                            onClick={() => {
                              setFieldValue('time', slot);
                              setFieldTouched('time', true, false);
                              setIsTimeOpen(false);
                            }}
                          >
                            {slot}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <input
                    type="hidden"
                    name="time"
                    value={values.time}
                    onChange={() => undefined}
                  />
                </div>
                <ErrorMessage name="time">
                  {message => (
                    <span className={formStyles.error}>
                      <ErrorIcon />
                      {message}
                    </span>
                  )}
                </ErrorMessage>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
              <ChevronDownIcon />
            </button>

            <button
              type="submit"
              className={styles.confirmButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
