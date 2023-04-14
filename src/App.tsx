import Logo from "./components/Logo/Logo"
import PomodoroTimer from "./components/Timer/PomodoroTimer"
function App() {


  return (
    <div className="App">
      <Logo />
      <PomodoroTimer defaultPomodoroTimer={1500} />





    </div>
  )
}

export default App
