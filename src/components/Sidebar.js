import { Avatar } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    )

    const user = useSelector(selectUser);

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="background.jpg" alt="Background" />
                <Avatar src={user?.photoUrl} className="sidebar__avatar">
                    {user.email[0]}
                </Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <p>Who viewed you</p>
                    <p className="sidebar__statNumber">2,345</p>
                </div>
                <div className="sidebar__stat">
                    <p>Views on post</p>
                    <p className="sidebar__statNumber">3,456</p>
                </div>
            </div>
            <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem("reactjs")}
                {recentItem("programming")}
                {recentItem("developer")}
                {recentItem("javascript")}
                {recentItem("design")}
            </div>
        </div>
    )
}

export default Sidebar;