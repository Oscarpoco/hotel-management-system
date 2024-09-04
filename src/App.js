import { useSelector } from 'react-redux';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import SignIn from './components/pages/SignIn';

function App() {

  const isSignedIn = useSelector((state)=> state.userInterface.isSignedIn)
  return (
    <div className="App">
        <main>
          {!isSignedIn ? <Dashboard />: <SignIn />}
        </main>
    </div>
  );
}

export default App;
