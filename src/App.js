import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login } from './features/userSlice';
import Login from './components/Login';
import { auth } from './firebase';
import Widgets from './components/Widgets';
// npm install @material-ui/core @material-ui/icons --legacy-peer-deps
// npm install firebase --force


function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }))
      }
    })
  }, [])

  return (
    <div className='app'>
      <Header />
      {!user ? (<Login />) : (
        <div className='app__body'>
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
