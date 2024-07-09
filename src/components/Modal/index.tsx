/* https://github.com/akmamun/react-modal-overlay */
import styles from './styles.module.css';
import type { FCWithChildren } from '../../typings/react';

export const Modal: FCWithChildren<{
  className?: string;
  show: boolean;
  closeModal: () => void;
}> = ({ children, className, show, closeModal }) => (
  <div
    className={`${styles.modal} ${className}`}
    style={{ display: show ? 'block' : 'none' }}
  >
    <div className={styles.overlay} onClick={closeModal} />
    <div className={styles.modalContent}>
      <span className={styles.close} onClick={closeModal}>
        &times;
      </span>
      {children}
    </div>
  </div>
);
