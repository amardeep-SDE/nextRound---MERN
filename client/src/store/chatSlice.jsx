import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],       // list of users
  messagesByUser: {},      // { [userId]: [ msg, msg, … ] }
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setMessages: (state, action) => {
      const { userId, messages } = action.payload;
      state.messagesByUser[userId] = messages;
    },
    addMessage: (state, action) => {
      const { userId, message } = action.payload;
      if (!state.messagesByUser[userId]) {
        state.messagesByUser[userId] = [];
      }
      state.messagesByUser[userId].push(message);
    },
  },
});

export const { setConversations, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
