import React, {useState} from "react";
import './Login.css';
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { login } from "../features/userSlice";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [ProfilePic, setProfilePic] = useState('');
    const dispatch = useDispatch();

    const register = () => {
        if(!name) {
            return alert("Please enter a full name!");
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then(userAuth => userAuth.user.updateProfile({
            displayName: name, 
            photoURL: ProfilePic
        })
        .then(() => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: ProfilePic
            }))
        }))
    }
    const loginToApp = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
            dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoURL: userAuth.user.photoURL
                    }))
        })
    }

    return (
        <div className="login">
            <img src="logo512.png" alt="logo" />
            <form>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Full name (required if registering)" />
                <input
                    value={ProfilePic}
                    onChange={e => setProfilePic(e => setProfilePic(e.target.value))}
                    type="text"
                    placeholder="Profile pic URL (optional)" />
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email" />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password" />
                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>
            <p>
                Not a member?{' '}
                <span onClick={register} className="login__register">Register Now</span>
            </p>
        </div>
    )
}

export default Login;