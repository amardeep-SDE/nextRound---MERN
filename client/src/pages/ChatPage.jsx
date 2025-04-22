import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useChat from "../hooks/useChat";
// import { setMessages } from "../store/chatSlice";
import useOtherUsers from "../hooks/useOtherUsers";

const ChatPage = () => {
  // const dispatch = useDispatch();
  const { fetchMessages, sendMessage, loading, error } = useChat();
  const messagesEndRef = useRef(null);

  const [activeChatUser, setActiveChatUser] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useOtherUsers();
  const OtherUsersList = useSelector((state) => state.user.otherUsers);
  console.log(OtherUsersList);

  useChat();
  // const messages = useSelector((state) => state.chat.messages);
  const messages = useSelector(
    (state) => state.chat.messagesByUser[activeChatUser?.id] || []
  );
  

  const users = useSelector((state) => state.chat.conversations);
  console.log(users);

  useEffect(() => {
    if (activeChatUser) {
      fetchMessages(activeChatUser.id);
    }
  }, [activeChatUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (newMsg.trim() === "" && !selectedFile) return;

    const messageData = {
      message: newMsg.trim(),
      attachment: selectedFile,
    };

    await sendMessage(
      activeChatUser.id,
      messageData.message,
      messageData.attachment
    );
    console.log(messageData);
    console.log(activeChatUser.id);
    
    

    setNewMsg("");
    setSelectedFile(null);
    setIsTyping(false);
  };

  const handleTyping = (e) => {
    setNewMsg(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredUsers = OtherUsersList.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMessageContent = (msg) => (
    <div>
      {msg.message && <p>{msg.message}</p>}
      {msg.attachment && (
        <div className="mt-2">
          {msg.attachment.endsWith(".pdf") ? (
            <a
              href={msg.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 underline"
            >
              📄 {msg.attachment.split("/").pop()}
            </a>
          ) : (
            <img
              src={msg.attachment}
              alt="attachment"
              className="rounded-md max-w-[200px]"
            />
          )}
        </div>
      )}
      <p className="text-[10px] text-right mt-1 opacity-70">{msg.time}</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full sm:w-1/3 md:w-1/4 bg-white shadow-md border-r overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b">Chats</h2>
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer ${
              activeChatUser?.id === user.id ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveChatUser(user)}
          >
            <div className="relative w-10 h-10">
              <img
                src={user.profilePicture}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              {user.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div>
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-gray-500 truncate w-40">
                {user.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex flex-col w-full sm:w-2/3 md:w-3/4">
        {activeChatUser ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
              <div className="flex items-center gap-4">
                <img
                  src={activeChatUser.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-lg">{activeChatUser.name}</p>
                  <p className="text-sm text-gray-500">
                    {activeChatUser.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <button className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition">
                Logout
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {loading ? (
                <p className="text-gray-400">Loading messages...</p>
              ) : error ? (
                <p className="text-red-500">Error loading messages.</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.fromSelf ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
                        msg.fromSelf
                          ? "bg-green-500 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {renderMessageContent(msg)}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* File Preview */}
            {selectedFile && (
              <div className="flex items-center gap-4 bg-yellow-100 border border-yellow-300 p-3 mx-4 mb-2 rounded">
                {selectedFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="preview"
                    className="h-20 w-auto rounded shadow"
                  />
                ) : selectedFile.type === "application/pdf" ? (
                  <div
                    className="text-sm truncate max-w-xs"
                    title={selectedFile.name}
                  >
                    📄 {selectedFile.name}
                    <a
                      href={URL.createObjectURL(selectedFile)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 underline text-blue-600"
                    >
                      Preview
                    </a>
                  </div>
                ) : null}
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 font-bold text-xl hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="px-4 text-sm text-gray-500 italic">
                You are typing...
              </div>
            )}

            {/* Input */}
            <div className="flex items-center p-4 bg-white border-t gap-2">
              <input
                type="text"
                value={newMsg}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                📎
              </label>
              <button
                onClick={handleSend}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-400 text-xl">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
