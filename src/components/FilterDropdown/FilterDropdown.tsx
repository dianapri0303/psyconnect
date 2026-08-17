'use client';

import { useEffect, useRef, useState } from 'react';
import { SelectArrowIcon, CheckIcon } from '../icons/FilterIcons';
import styles from './FilterDropdown.module.css';

interface Props {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterDropdown({
  placeholder,
  options,
  value,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option === 'All' ? '' : option);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={value ? styles.valueActive : styles.value}>
          {value || placeholder}
        </span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          <SelectArrowIcon />
        </span>
      </button>

      {isOpen && (
        <ul className={styles.list}>
          {['All', ...options].map(option => {
            const isSelected = option === 'All' ? !value : value === option;
            return (
              <li key={option}>
                <button
                  type="button"
                  className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                  {isSelected && <CheckIcon />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
