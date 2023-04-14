import React from 'react'
import Logo from '../../assets/Frame 7154.png'
import styles from './logo.module.css'

const logo = () => {
  return (

    <div className={ styles.logo_div}>
       <img src={Logo} alt="pomodoro-app-logo" />
     </div>

  )
}

export default logo
