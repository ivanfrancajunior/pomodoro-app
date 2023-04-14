import Logo from "./components/Logo/Logo"
import PomodoroTimer from "./components/Timer/PomodoroTimer"
function App() {


  return (
    <div className="App">
      <Logo />
      <PomodoroTimer
        PomodoroTimer={1800}
        ShortRestTimer={300}
        LongRestTimer={900}
        Cycles={4}
      />





    </div>
  )
}

export default App
