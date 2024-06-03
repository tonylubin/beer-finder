import React from 'react';
import styles from './styles.module.scss';
import Header from '@/components/Header/Header';
import NavBar from '@/containers/NavBar/NavBar';
import Options from '@/components/Options/Options';

const BeersLayout = ({ children }) => {

  return (
    <div className={styles.appContainer}>
      <Header />
      <NavBar />
      <Options />
      { children }
    </div>
  )
}

export default BeersLayout;