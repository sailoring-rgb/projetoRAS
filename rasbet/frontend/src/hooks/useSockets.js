import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
// import { clearSession } from '@helpers/api';
import { useStateValue } from '../state';

export const useUserAuth = () => {
    const context = useContext(AuthContext)
    return context
}

function useSocket() {
    const { state, dispatch } = useStateValue();
    const { socket } = state;

    const newMessage = (newMessageStringified) => {
        const newMessageData = JSON.parse(newMessageStringified);
        dispatch({ type: 'addNewChatMessage', value: newMessageData });
        dispatch({
            type: 'changeChatDataPreviewChat',
            value: { previewChat: null, roomId: newMessageData.roomId },
        });
    };

    const errorEvent = (data) => {
        console.log('rtm error', data);
        switch (data) {
            case 'token_invalid':
                clearSession();
                break;
            default:
        }
    };

    const createSocket = useRef(() => {});
    createSocket.current = () => {
        const newSocket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
            reconnectionDelayMax: 10000,
            // query: {
            //     uid: authUser.id,
            // },
        });

        newSocket.on('new_message', newMessage);

        newSocket.on('error', errorEvent);

        dispatch({ type: 'changeSocket', value: newSocket });
    };

    useEffect(() => {
        const socketIsNotCreated = socket === null || socket === undefined;
        if (socketIsNotCreated /* && authUser.id !== '' */) createSocket.current();
    }, [socket]);

    return socket;
}

export default useSocket;