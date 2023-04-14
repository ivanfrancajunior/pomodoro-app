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

  useEffect(() => {
    if (working) document.body.classList.add('working')
  }, [working])

  const configureWorking = () => {
    setTimeCount(true)
    setWorking(true)
  }

  useInterval(() => {
    setMainTime(mainTime - 1)
  }, timeCount ? 1000 : null)



  return (
    <div className='pomodoro'>
      <div className='button-container'>
        <Button text='Pomodoro' onClick={configureWorking}></Button>
        <Button text='Descanso' onClick={() => console.log('cliquei')}></Button>
        <Button text='Longo Descanso' onClick={() => console.log('cliquei')}></Button>
      </div>
      <Timer mainTime={mainTime} />
      <Button text={timeCount ? 'Pause': 'Play'} onClick={() => setTimeCount(!timeCount)}></Button>
    </div>
  )
}

export default PomodoroTimer