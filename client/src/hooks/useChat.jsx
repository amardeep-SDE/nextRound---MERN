import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setConversations,
  setMessages,
  addMessage,
} from '../store/chatSlice';

const API_URL = 'http://localhost:8000/api/v1/message';

const useChat = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/${userId}`, { withCredentials: true });
      console.log(response);
      // dispatch(setConversations(response.data.conversations || []));
      
      // dispatch(setMessages({ userId, messages: response.data.conversation || [] }));
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (receiverId, message, attachment ) => {
    setLoading(true);
    setError(null);
    try {
      const payload = { message };
      if (attachment) {
        payload.attachment = attachment;
      }
      const response = await axios.post(`${API_URL}/${receiverId}`, payload, { withCredentials: true });
      dispatch(addMessage({ userId: receiverId, message: response.data.newMessage }));
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchMessages,
    sendMessage,
    loading,
    error,
  };
};

export default useChat;
