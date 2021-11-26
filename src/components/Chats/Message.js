import React from 'react';


const position = (message, my_id) => message.sender_userid === my_id ? 'right-side' : 'left-side';

function Message({message,my_id}) {
    return (
        <div className={`message-item ${position(message, my_id)}`}>

            <div className={`message-body`}>
                {/*<div className='sender-name'>{senderName}</div>*/}
                <span className='text'>{message.text}</span>
            </div>

        </div>
    )

}

export default Message;