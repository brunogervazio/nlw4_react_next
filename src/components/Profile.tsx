import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile(){

  const { level } = useContext(ChallengesContext)

  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/brunogervazio.png" alt="Bruno Gervazio"/>
      <div>
        <strong>Bruno Gervazio</strong>
        <p>
          <img src="icons/Level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  );
}