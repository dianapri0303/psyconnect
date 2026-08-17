'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Psychologist } from '@/types/psychologist';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useToggleFavorite } from '@/hooks/useFavorites';
import { useBookingStore } from '@/store/bookingStore';
import {
  HeartIcon,
  StarSmallIcon,
  BriefcaseIcon,
  GlobeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FreeSessionIcon,
} from '../icons/CardIcons';
import SignInToast from '../SignInToast/SignInToast';
import styles from './PsychologistCard.module.css';

interface Props {
  psychologist: Psychologist;
}

export default function PsychologistCard({ psychologist }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const ids = useFavoritesStore(state => state.ids);
  const { mutate: toggleFavorite } = useToggleFavorite();
  const openBooking = useBookingStore(state => state.openBooking);
  const {
    _id,
    name,
    avatar_url,
    specialization,
    approaches,
    languages,
    price_per_hour,
    experience_years,
    rating,
    reviews,
    about,
    conditions,
    initial_consultation,
  } = psychologist;

  const isFavorite = ids.includes(_id);

  const handleHeartClick = () => {
    if (!isLoggedIn) {
      toast.custom(t => <SignInToast t={t} />, { duration: 4000 });
      return;
    }
    toggleFavorite({ id: _id, isFavorite });
  };

  const handleBookClick = () => {
    if (!isLoggedIn) {
      toast.custom(
        t => (
          <SignInToast
            t={t}
            title="Login required"
            text="Please log in or create an account to book a session with this specialist."
          />
        ),
        { duration: 4000 },
      );
      return;
    }

    openBooking({ id: _id, name, avatar_url });
  };

  return (
    <li
      className={`${styles.card} ${isExpanded ? styles.cardExpanded : styles.cardCollapsed} ${initial_consultation ? styles.cardWithBadge : ''}`}
    >
      {initial_consultation && (
        <span className={styles.freeBadge}>
          <FreeSessionIcon />
          Free first session
        </span>
      )}

      <button
        type="button"
        className={`${styles.heartButton} ${isFavorite ? styles.heartActive : ''}`}
        onClick={handleHeartClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon filled={isFavorite} />
      </button>

      <div className={styles.header}>
        <Image
          src={avatar_url}
          alt={name}
          width={80}
          height={80}
          className={styles.avatar}
        />

        <div className={styles.headerInfo}>
          <h3 className={styles.name}>{name}</h3>

          <ul className={styles.meta}>
            <li className={styles.metaItem}>
              <span className={styles.star}>
                <StarSmallIcon />
              </span>
              {rating}
            </li>
            <li className={styles.divider} aria-hidden="true" />
            <li className={styles.metaItem}>
              <span className={styles.metaIcon}>
                <BriefcaseIcon />
              </span>
              {experience_years} yrs exp.
            </li>
            <li className={styles.divider} aria-hidden="true" />
            <li className={styles.metaItem}>
              <span className={styles.metaIcon}>
                <GlobeIcon />
              </span>
              {languages.join('/')}
            </li>
          </ul>

          <ul className={styles.tags}>
            {specialization.map(item => (
              <li key={item} className={styles.tag}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className={isExpanded ? styles.aboutFull : styles.about}>{about}</p>

      <ul className={styles.conditions}>
        {conditions.map(item => (
          <li key={item} className={styles.condition}>
            {item}
          </li>
        ))}
      </ul>

      {isExpanded && (
        <>
          <div className={styles.section}>
            <p className={styles.sectionLabel}>Therapeutic Approaches</p>
            <ul className={styles.tags}>
              {approaches.map(item => (
                <li key={item} className={styles.tag}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {reviews.length > 0 && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Client Reviews</p>
              <ul className={styles.reviews}>
                {reviews.map((review, index) => (
                  <li key={index} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewAvatar}>
                        {review.reviewer.charAt(0)}
                      </span>
                      <div>
                        <p className={styles.reviewerName}>{review.reviewer}</p>
                        <span className={styles.reviewStars}>
                          {Array.from({
                            length: Math.round(review.rating),
                          }).map((_, i) => (
                            <StarSmallIcon key={i} />
                          ))}
                        </span>
                      </div>
                    </div>
                    <p className={styles.reviewText}>
                      &quot;{review.comment}&quot;
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <div className={styles.footer}>
        <p className={styles.price}>
          ${price_per_hour}
          <span className={styles.priceLabel}>/ session</span>
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.readMore}
            onClick={() => setIsExpanded(prev => !prev)}
          >
            {isExpanded ? 'Read less' : 'Read more'}
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>

          <button
            type="button"
            className={styles.bookButton}
            onClick={handleBookClick}
          >
            Book a session
          </button>
        </div>
      </div>
    </li>
  );
}
