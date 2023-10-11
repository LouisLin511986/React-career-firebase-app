import { CalendarViewDay, Create, EventNote, Image, Subscriptions } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import './Feed.css';
import InputOption from "./InputOption";
import Post from "./Post";
import { db } from "../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Feed = () => {
    const user = useSelector(selectUser);

    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').
        onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    const sendPost = (e) => {
        e.preventDefault();
        // 这是一个事件处理程序，通常用于阻止表单提交的默认行为，以避免刷新整个页面。
        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            // 获取服务器的时间戳，表示文档的创建时间。
        })

        setInput('');
    }

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <Create />
                    <form>
                        <input value={input} onChange={e => setInput(e.target.value)} type="text" />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={Image} title="Photo" color="#70B5F9" />
                    <InputOption Icon={Subscriptions} title="Video" color="#E7A33E" />
                    <InputOption Icon={EventNote} title="Event" color="#C0CBCD" />
                    <InputOption Icon={CalendarViewDay} title="WriteArticle" color="#7FC15E" />
                </div>
            </div>
            {posts.map(({id, data}) => (
                <Post
                    key={id}
                    name={data.name}
                    description={data.description}
                    message={data.message}
                    photoUrl={data.photoUrl} />
            ))}
        </div>
    )
}

export default Feed;