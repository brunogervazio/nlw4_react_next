import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengeContextData {
  level: number, 
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: () => number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChalegeProviderProps {
  children: ReactNode;
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({
  children,
  ...rest
}: ChalegeProviderProps) {

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setcurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  useEffect(()=> {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  };

  const closeLevelUpModal = () => setIsLevelUpModalOpen(false);

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3')

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio'), {
        body: `valendo ${challenge.amount}xp`
      }
    }
  };

  const resetChallenge = () => {
    setActiveChallenge(null)
  };

  const completeChallenge = () => {
    console.log('entrou')
    if(!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel()){
      finalExperience = finalExperience - experienceToNextLevel();
      levelUp();
    }

    setcurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1)
  }

  const experienceToNextLevel = () => Math.pow((level + 1) * 4 , 2)

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return(
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted,
        experienceToNextLevel,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}>
        {children}
        
        { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  );
}