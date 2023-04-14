import React from 'react'
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
  useInterval(() => {
    setMainTime(mainTime - 1)
  }, 1000)

  return (
    <div className='pomodoro'>
      <div className='button-container'>
        <Button text='Pomodoro' onClick={()=> console.log('cliquei')}></Button>
        <Button text='Descanso' onClick={()=> console.log('cliquei')}></Button>
        <Button text='Longo Descanso' onClick={()=> console.log('cliquei')}></Button>
    </div>
      <Timer mainTime={mainTime} />
      <Button text='clicas' onClick={()=> console.log('cliquei')}></Button>
    </div>
  )
}

export default PomodoroTimer