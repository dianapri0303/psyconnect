'use client';

import FilterDropdown from '../FilterDropdown/FilterDropdown';
import { FiltersIcon } from '../icons/FilterIcons';
import specializations from '@/data/specializations.json';
import approaches from '@/data/approaches.json';
import styles from './FilterBar.module.css';

export interface Filters {
  specialization: string;
  approach: string;
  price: string;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const priceOptions = ['Under $50', 'Under $100'];

export default function FilterBar({ filters, onChange }: Props) {
  const hasActiveFilters =
    Boolean(filters.specialization) ||
    Boolean(filters.approach) ||
    Boolean(filters.price);

  return (
    <div className={styles.bar}>
      <p className={styles.label}>
        <FiltersIcon />
        Filters
      </p>

      <div className={styles.dropdowns}>
        <FilterDropdown
          placeholder="Specialization"
          options={specializations}
          value={filters.specialization}
          onChange={value => onChange({ ...filters, specialization: value })}
        />
        <FilterDropdown
          placeholder="Therapeutic Approach"
          options={approaches}
          value={filters.approach}
          onChange={value => onChange({ ...filters, approach: value })}
        />
        <FilterDropdown
          placeholder="Price per Session"
          options={priceOptions}
          value={filters.price}
          onChange={value => onChange({ ...filters, price: value })}
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          className={styles.clear}
          onClick={() =>
            onChange({ specialization: '', approach: '', price: '' })
          }
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
