import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.status(201).json({ success: true, message: "Message saved successfully." });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
