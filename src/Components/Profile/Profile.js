import React from 'react';
import { useSelector } from 'react-redux';

function Profile(props) {
    const user = useSelector(state=>state.user.user);
    console.log(user);
    return (
        <div>
            {user.name};
        </div>
    );
}

export default Profile;