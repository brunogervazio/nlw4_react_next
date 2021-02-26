import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../contexts/CountdownContext'

export function Countdown(){
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext);
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return(
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
          Ciclo encerrado
         </button>
      ) : (
        <button
          type="button"
          className={!isActive ? styles.countdownButton : `${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={!isActive ? startCountdown : resetCountdown}>
          {isActive? 'Abandonar ciclo' : 'Iniciar um ciclo'}
        </button>
      )}
    </>
  );
}