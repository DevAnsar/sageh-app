import React from 'react';
import {useChannel, useSetChannel} from "../../providers/SocketProvider";


function Channel({id,channel}) {

    const setChannel=useSetChannel();
    const selected_channel=useChannel();


    const handleChannelSelect = () => {
        setChannel(channel);
        // console.log('selected channel:',channel);
        // socket.emit('channel-join', id, ack => {});
    }
    return (

        <div className={`channel-item ${selected_channel ? ( selected_channel.id === id ?'active':''):''}`} onClick={handleChannelSelect}>
            <div className='channel-img'>
                <img alt='#' src={channel.other_user_data[0].profile_img} />
            </div>
            <div className='channel-name'>{channel.other_user_data[0].name}</div>
        </div>

    )
}

export default Channel;