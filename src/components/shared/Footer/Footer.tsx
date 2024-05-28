import styles from './Footer.module.sass';

export const Footer = () => {
  return(
    <footer className={styles.Footer}>
      <p>Payment App © {new Date().getFullYear()}</p>
    </footer>
  )
};