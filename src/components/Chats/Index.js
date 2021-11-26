import React from 'react';
import CustomTheme from '../Theme/Theme';
import ChannelList from "./ChannelList";
import MessagePanel from "./MessagesPanel";
import './style.css'

function Index() {
    console.log('Message <Index /> rendered')
    return (
        <CustomTheme>
            <div className="container-fluid ">
                <div className="row pb-3">
                    <div className="container">
                        <div className="row">

                        </div>
                        <div className="chat-app row mt-5">
                                <ChannelList  />
                                <MessagePanel   />
                        </div>
                    </div>
                </div>
            </div>
        </CustomTheme>
    )
}
export default Index;