import React from 'react'
import { useInterval } from '../../Hooks/useInterval'
import { secondsToTime } from '../../utils/secondsToTime'

interface Props{
  defaultPomodoroTimer:number
}
const PomodoroTimer = (props: Props):JSX.Element => {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer)
  useInterval(() => {
    setMainTime(mainTime - 1)
  },1000)

  return (
    <div>{secondsToTime (mainTime)}</div>
  )
}

export default PomodoroTimer