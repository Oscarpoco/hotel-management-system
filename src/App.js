import { useSelector } from 'react-redux';
import './App.css';

// COMPONENTS
import Dashboard from './components/pages/Dashboard';
import SignIn from './components/pages/SignIn';
import Profile from './components/pages/Profile';
import Loader from './components/pages/Loader';


function App() {

  const isSignedIn = useSelector((state)=> state.userInterface.isSignedIn);
  const isProfileOpened = useSelector((state) => state.userInterface.isProfileOpened);
  const isLoading = useSelector((state) => state.userInterface.isLoading);
  
  return (
    <div className="App">
        <main>
          {isSignedIn ? <Dashboard />: <SignIn />}
        </main>
        
        {/* POPUPs */}

        {/* PROFILE */}
        {isProfileOpened && (
          <Profile />
        )}

        {/* LOADER */}
        {isLoading && (
          <Loader />
        )}


    </div>
  );
}

export default App;
