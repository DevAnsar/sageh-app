import React, {useState, useEffect} from "react";
import {Col} from "react-bootstrap";
import Message from './Message';
import {TextField, Button} from '@material-ui/core'
import {useChannel, useSocket,useChannels,useUpdateScroll} from "../../providers/SocketProvider";
import Loading from "../Loading";

function MessagePanel() {
    const channel=useChannel();
    const {channels,loading}=useChannels();
    const socket=useSocket();
    const updateScroll=useUpdateScroll();
    const [input_value, setInput_value] = useState('');
    const my_userId=1;

    console.log('<MessagePanel /> rendered!',channels,channel)
    useEffect(() => {
        setInput_value('');
        updateScroll();
    }, [channel])
    const handleInput = value => {
        setInput_value(value);
    }

    const handleSendMessage = (channel_id, text) => {
        socket.emit('send-message', { channel_id, text, sender_userid: my_userId, id: Date.now() },channels);
    }

    const send = () => {

        if (input_value && input_value !== '') {
            handleSendMessage(channel.id, input_value);
            setInput_value('');
            updateScroll();
        }
    }
    const noContentMessage = () => {
        return (
            <div className="no-content-message">
                هیچ گفتگویی تاکنون نداشته اید
            </div>
        )
    }
    const emptyChannel = () => {
        return (
            <div className="no-content-message">
                برای نماش پیام ها ابتدا گفتگویی را انتخاب کنید
            </div>
        )
    }

    let list = emptyChannel();
    if (channel) {
        list = noContentMessage();
        channels.map(c =>{
            if(channel.id === c.id){
                if (c.messages) {
                    return list = c.messages.map(m => <Message key={m.id} id={m.id} message={m} my_id={my_userId} />);
                }
            }
        });
    }

    return (

        <Col xs={12} md={8} lg={9} className='messages-panel p-0 m-0'>

            {
                channel &&
                <div className="user-info px-2">
                    <div className='channel-img'>
                        <img alt={channel.other_user_data[0].name} src={channel.other_user_data[0].profile_img}/>
                    </div>
                    <div className='channel-name'>{channel.other_user_data[0].name}</div>
                </div>
            }
            {
                loading && <Loading/>
            }
            <div className="messages-list" id='messages'>{list}</div>
            {
                channel && <div className="messages-input">
                    <TextField
                        className='send-text'
                        id="outlined-full-width"
                        label="متن گفتگو"
                        style={{margin: 8}}
                        placeholder="متن گفتگوی خود را برای ارسال تایپ کنید"
                        // helperText="Full width!"
                        // fullWidth
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={(e) => handleInput(e.target.value)} value={input_value}

                    />

                    <Button className='send-button mt-2' onClick={send} variant="contained" color="primary">
                        ارسال
                    </Button>

                </div>
            }
        </Col>
    )
}

export default MessagePanel;