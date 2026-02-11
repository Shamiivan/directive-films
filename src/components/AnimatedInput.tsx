'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AnimatedInput.module.css';

interface AnimatedInputProps {
  type?: 'text' | 'email' | 'tel' | 'textarea';
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * Premium Input Field with Focus Animations
 * Features:
 * - Floating label on focus
 * - Border glow effect
 * - Smooth transitions
 */
export default function AnimatedInput({
  type = 'text',
  label,
  name,
  placeholder,
  required = false,
  value,
  onChange,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasValue(e.target.value.length > 0);
    if (onChange) onChange(e);
  };

  const isLabelFloating = isFocused || hasValue;

  return (
    <div className={styles.inputWrapper}>
      <motion.label
        htmlFor={name}
        className={styles.label}
        animate={{
          y: isLabelFloating ? -24 : 0,
          scale: isLabelFloating ? 0.85 : 1,
          color: isFocused ? '#FDB714' : '#999',
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {label}
        {required && <span className={styles.required}>*</span>}
      </motion.label>

      {type === 'textarea' ? (
        <motion.textarea
          id={name}
          name={name}
          className={styles.textarea}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          animate={{
            borderColor: isFocused ? '#FDB714' : '#333',
            boxShadow: isFocused
              ? '0 0 0 2px rgba(253, 183, 20, 0.2)'
              : '0 0 0 0px rgba(253, 183, 20, 0)',
          }}
          transition={{ duration: 0.2 }}
        />
      ) : (
        <motion.input
          type={type}
          id={name}
          name={name}
          className={styles.input}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          animate={{
            borderColor: isFocused ? '#FDB714' : '#333',
            boxShadow: isFocused
              ? '0 0 0 2px rgba(253, 183, 20, 0.2)'
              : '0 0 0 0px rgba(253, 183, 20, 0)',
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Validation Checkmark (shows when field has value and not focused) */}
      <motion.div
        className={styles.checkmark}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: hasValue && !isFocused ? 1 : 0,
          scale: hasValue && !isFocused ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      >
        ✓
      </motion.div>
    </div>
  );
}
