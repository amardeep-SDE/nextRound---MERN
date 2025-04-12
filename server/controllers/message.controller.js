import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// Send a message (text + optional attachment)
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message, attachment } = req.body;

    // Find or create conversation
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: []
      });
    }

    // Create message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      attachment
    });

    // Add message to conversation
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      gotConversation.lastMessage = newMessage._id;
    }

    await Promise.all([gotConversation.save(), newMessage.save()]);

    // Real-time socket emit
    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    return res.status(201).json({ success: true, newMessage });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

// Get all messages in a conversation
export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate({
      path: "messages",
      options: { sort: { createdAt: 1 } } // oldest to newest
    });

    if (!conversation) {
      return res.status(200).json({success: true, message: "No conversation found.", conversation});
    }

    return res.status(200).json({ success: true, messages: "Messages fetched successfully.", conversation });
  } catch (error) {
    console.error("Error in getMessage:", error);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};
