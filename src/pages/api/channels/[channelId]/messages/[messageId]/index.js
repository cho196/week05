import {
  getMessageById,
  updateMessageById,
  deleteMessageById,
} from "@/database";

export default async function handler(req, res) {
  const { messageId } = req.query;

  switch (req.method) {
    case "GET":
      // Get a message by ID
      const message = await getMessageById(messageId);
      if (!message) {
        res.status(404).json({ message: "Message not found" });
        break;
      }
    case "PUT":
      // Update a message by ID
      const { text } = req.body;
      if (!text) {
        res.status(400).json({ message: "Missing message text" });
        break;
      }
    case "DELETE":
      // Delete a message by ID
      await deleteMessageById(messageId);
      res.status(204).end();
      break;
    default:
      res.status(405).end();
  }
}
