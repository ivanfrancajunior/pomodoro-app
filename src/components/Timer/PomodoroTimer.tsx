import React from 'react'
import { useInterval } from '../../Hooks/useInterval'
interface Props{
  defaultPomodoroTimer:number
}
const PomodoroTimer = (props: Props):JSX.Element => {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer)
  useInterval(() => {
    setMainTime(mainTime - 1)
  },1000)

  return (
    <div>{mainTime}</div>
  )
}

export default PomodoroTimer