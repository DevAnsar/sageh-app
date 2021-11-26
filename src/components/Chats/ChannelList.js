import React from 'react';
import {Col} from 'react-bootstrap';
import Channel from "./Channel";
import {useChannels} from "../../providers/SocketProvider";


function ChannelList() {
    const {channels}=useChannels();

    let list = `تا کنون هیچ مکالمه ای نداشته اید`;
    if (channels) {
        list = channels.map(c => <Channel key={c.id} id={c.id} channel={c} />);
    }
    return (

        <Col  xs={12} md={4} lg={3} className='channel-list p-0 m-0'>
            {
                list
            }
        </Col>
    )
}

export default ChannelList;