import React, { useEffect, useState, useCallback } from 'react'
import { useInterval } from '../../Hooks/useInterval'
import { Timer } from '../Timer'
import Button from '../Button'
import { secondsToTimes } from '../../utils/secondsToTimes'

interface Props {
  PomodoroTimer: number
  ShortRestTimer: number
  LongRestTimer: number
  Cycles: number
}
const PomodoroTimer = (props: Props): JSX.Element => {
  const [mainTime, setMainTime] = useState(props.PomodoroTimer)

  const [timeCount, setTimeCount] = useState(false)
  const [working, setWorking] = useState(false)
  const [resting, setResting] = useState(false)
  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.Cycles - 1).fill(true))

  const [completedCycles, setCompletedCycles] = useState(0)
  const [fullWorkTime, setFullWorkTime] = useState(0)
  const [pomodoroQtd, setPomodoroQtd] = useState(0)

  const audioStartWorking = new Audio('/sounds/start.mp3');
  const audioStopWorking = new Audio('/sounds/end.mp3');



  const configureWorking = useCallback(() => {
    setTimeCount(true)
    setWorking(true)
    setResting(false)
    setMainTime(props.PomodoroTimer)
    audioStartWorking.play()
  }, [setTimeCount, setWorking, setMainTime, setResting, props.PomodoroTimer])

  const configureRest = useCallback((long: boolean) => {
    setTimeCount(true)
    setWorking(false)
    setResting(true)
    audioStopWorking.play()

    if (long) {
      setMainTime(props.LongRestTimer)
    } else {
      setMainTime(props.ShortRestTimer)
    }
  }, [
    setTimeCount,
    setWorking,
    setResting,
    setMainTime,
    props.LongRestTimer,
    props.ShortRestTimer])

  useInterval(() => {
    setMainTime(mainTime - 1)

    if (working) setFullWorkTime(fullWorkTime + 1)
  }, timeCount ? 1000 : null)

  useEffect(() => {
    if (working) document.body.classList.add('working')
    if (resting) document.body.classList.remove('working')


    if (mainTime > 0) return



    if (working && cyclesQtdManager.length > 0) {

      configureRest(false)
      cyclesQtdManager.pop()
    } else if (working && cyclesQtdManager.length <= 0) {

      configureRest(true)
      setCyclesQtdManager(new Array(props.Cycles - 1).fill(true))
      setCompletedCycles(completedCycles + 1)
    }

    if (working) setPomodoroQtd(pomodoroQtd + 1)

    if (resting) configureWorking()

  }, [working,
    resting,
    mainTime,
    cyclesQtdManager,
    pomodoroQtd,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWorking
  ]
  )


  return (
    <div className='pomodoro'>
      <div className='button-container'>
        <Button text='Pomodoro' onClick={configureWorking}></Button>
        <Button text='Descanso' onClick={() => configureRest(false)}></Button>
        <Button text='Descanso Longo' onClick={() => configureRest(true)}></Button>
      </div>
      <Timer mainTime={mainTime} />
      <Button text={timeCount ? 'Pause' : 'Play'} className={!working && !resting ? 'hidden' : ''} onClick={() => setTimeCount(!timeCount)}></Button>

      <div className='details'>
        <p>Ciclos concluidos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTimes(fullWorkTime)}</p>
        <p>Pomodoros concluidos: {pomodoroQtd}</p>
      </div>
    </div>
  )
}

export default PomodoroTimer