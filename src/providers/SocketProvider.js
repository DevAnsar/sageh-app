import React, {useEffect, useState, createContext, useContext} from 'react';
import {io} from "socket.io-client";
import {sagehNodeServerAxios} from "../apis/CustomAxios";
import {NodeServerUrl} from '../config';

export const ChannelsContext = createContext();
export const ChannelContext = createContext();
export const LoadingContext = createContext();
export const SocketContext = createContext();
export const ChannelContextDispatch = createContext();
export const ScrollUpdateContext = createContext();


const LOADING = () => false;
const CHANNELS = () => null;
const CHANNEL = () => null;

function SocketProvider({children}) {


    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(LOADING);
    const [channels, setChannels] = useState(CHANNELS);
    const [channel, setChannel] = useState(CHANNEL);

    console.log('<SocketProvider /> rendered!');


    useEffect(() => {
        let SocketIo = io(NodeServerUrl,{withCredentials: true,transports: ['websocket', 'polling', 'flashsocket']});
        // console.log('<SocketProvider /> useEffect rendered!');

        setLoading(true);

        sagehNodeServerAxios({
            method: 'get',
            url: '/channels',
        }).then(response => {
            setLoading(false);

            let {channels} = response.data;
            console.log('channels response from /channels endpoint:', channels)
            setChannels(channels);

        }).catch(err => {
            console.log(err.message)
        });

        SocketIo.on('message', ({message, channels}) => {

            console.log('client-side message on', channels)
            if (channels) {
                console.log('client-side message in if', channels)
                channels.forEach(c => {
                    if (c.id === message.channel_id) {
                        if (!c.messages) {
                            c.messages = [message];
                        } else {
                            console.log('client-side message in if push', channels)
                            c.messages.push(message);
                        }
                    }
                });
                setChannels(channels);
                // updateScroll();
            }

        });

        SocketIo.on('channel', channel => {

            channels.forEach(c => {
                if (c.id === channel.id) {
                    // c.participants = channel.participants;
                }
            });
            setChannels(channels);
        });

        setSocket(SocketIo);
    }, []);

    function updateScroll() {
        let element = document.getElementById("messages");
        console.log('scroll element:', element)
        element.scrollTop = element.scrollHeight;
    }

    return (
        <SocketContext.Provider value={socket}>
            <ScrollUpdateContext.Provider value={updateScroll}>
                <LoadingContext.Provider value={loading}>
                    <ChannelsContext.Provider value={channels}>
                        <ChannelContext.Provider value={channel}>
                            <ChannelContextDispatch.Provider value={setChannel}>
                                {children}
                            </ChannelContextDispatch.Provider>
                        </ChannelContext.Provider>
                    </ChannelsContext.Provider>
                </LoadingContext.Provider>
            </ScrollUpdateContext.Provider>
        </SocketContext.Provider>
    );


}

function useSocket() {
    return useContext(SocketContext);

}

function useChannels() {
    let channels = useContext(ChannelsContext);
    let loading = useContext(LoadingContext);
    return {channels, loading}
}

function useChannel() {
    return useContext(ChannelContext);
}

let useSetChannel = channel => {
    return useContext(ChannelContextDispatch);
}

let useUpdateScroll = () => {
    return useContext(ScrollUpdateContext);
}

export {useSocket, useChannels, useChannel, useSetChannel,useUpdateScroll}
export default SocketProvider;