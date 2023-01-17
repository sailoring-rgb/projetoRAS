// import { createContext, useEffect, useRef } from "react";
// import { useStateValue } from "../state";
// // import { login, register, registerAdmin, registerSpecialist } from '../utils/authApi'
// import { io } from 'socket.io-client';
import { createContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
// import { clearSession } from '@helpers/api';
import { useStateValue } from '../state';

export const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
    const { state, dispatch } = useStateValue();
    const { socket, authUser } = state;

    const newMessage = (newMessageStringified) => {
        // const newMessageData = JSON.parse(newMessageStringified);
        console.log(newMessageStringified)
        // dispatch({ type: 'addNewChatMessage', value: newMessageData });
        // dispatch({
        //     type: 'changeChatDataPreviewChat',
        //     value: { previewChat: null, roomId: newMessageData.roomId },
        // });
    };

    const errorEvent = (data) => {
        console.log('rtm error', data);
        switch (data) {
            case 'token_invalid':
                // clearSession();
                break;
            default:
        }
    };

    const createSocket = useRef(() => {});

    createSocket.current = () => {
        console.log("CREATING SOCKET CONN")
        const newSocket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
            reconnectionDelayMax: 10000,
            auth: {
                id: authUser.id,
            }
        });

        newSocket.on('new_message', newMessage);

        newSocket.on('error', errorEvent);

        dispatch({ type: 'setSocket', value: newSocket });
    };

    useEffect(() => {
        const socketIsNotCreated = socket === null || socket === undefined;
        if (socketIsNotCreated && authUser) createSocket.current();
    }, [authUser, socket]);

    return (
        <SocketContext.Provider>
            {children}
        </SocketContext.Provider>
    )
}