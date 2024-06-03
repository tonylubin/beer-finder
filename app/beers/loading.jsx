import React from 'react';
import styles from './styles.module.scss';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

const Loading = () => {
  return (
    <div className={styles.mainContainer}>
      <LoadingSpinner />
    </div>
  )
}

export default Loading