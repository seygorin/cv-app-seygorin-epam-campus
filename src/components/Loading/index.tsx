import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <FontAwesomeIcon icon={faCircleNotch} className={styles.loadingIcon} />
    </div>
  );
};

export default Loading;
