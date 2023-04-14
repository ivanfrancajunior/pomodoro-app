import React, { useEffect } from 'react'
import { useInterval } from '../../Hooks/useInterval'
import { Timer } from '../Timer'
import Button from '../Button'

interface Props {
  PomodoroTimer: number
  ShortRestTimer: number
  LongRestTimer: number
  Cycles: number
}
const PomodoroTimer = (props: Props): JSX.Element => {
  const [mainTime, setMainTime] = React.useState(props.PomodoroTimer)

  const [timeCount, setTimeCount] = React.useState(false)
  const [working, setWorking] = React.useState(false)
  const [resting, setResting] = React.useState(false)

  const audioStartWorking = new Audio('/sounds/start.mp3');
  const audioStopWorking = new Audio('/sounds/end.mp3');

  useEffect(() => {
    if (working) document.body.classList.add('working')
    if (resting) document.body.classList.remove('working')

  }, [working, resting])

  const configureWorking = () => {
    setTimeCount(true)
    setWorking(true)
    setResting(false)
    setMainTime(props.PomodoroTimer)
    audioStartWorking.play()
  }
  const configureRest = (long:boolean) => {
    setTimeCount(true)
    setWorking(false)
    setResting(true)
    audioStopWorking.play()

    if (long) {
      setMainTime(props.LongRestTimer)
    } else {
      setMainTime(props.ShortRestTimer)
    }
  }

  useInterval(() => {
    setMainTime(mainTime - 1)
  }, timeCount ? 1000 : null)



  return (
    <div className='pomodoro'>
      <div className='button-container'>
        <Button text='Pomodoro' onClick={configureWorking}></Button>
        <Button text='Descanso' onClick={()=>configureRest(false)}></Button>
        <Button text='Longo Descanso' onClick={() => configureRest(true)}></Button>
      </div>
      <Timer mainTime={mainTime} />
      <Button text={timeCount ? 'Pause': 'Play'} className={!working && !resting? 'hidden' : ''} onClick={() => setTimeCount(!timeCount)}></Button>
    </div>
  )
}

export default PomodoroTimer