import { createContext, useContext, useEffect, useState } from "react";
// Import navigate from @reach/router
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children, navigateTo }) => {
    const [user, setUser] = useState();

    const [selectedChat, setSelectedChat] = useState();
    const [chats , setChats] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            // Navigate to the root "/" if user is not authenticated
            navigate("/"); // Use the navigateTo function to navigate
        }
    }, [navigate]);

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
