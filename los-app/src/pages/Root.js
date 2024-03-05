import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import NavigationBar from "../components/NavigationBar";

function  Root() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            navigate('/game');
        } else {
            navigate('/signin');
        }
    }, [navigate, token]);

    return (
        <div>
            <NavigationBar token={token}/>
            <Outlet />
        </div>
    );
}

export default Root;