const User = require('../models/User')

const { FullName, Email, Phone, Password } = req.body;

try {
  const newUser = new User({ FullName, Email, Phone, Password });
  await newUser.save();
  
  res.status(201).json({ 
    success: true,
    message: 'Form submitted successfully!',
    data: { FullName, Email, Phone, Password }
  });
} catch (error) {
  console.error('Error submitting contact form:', error);
  res.status(500).json({ 
    success: false,
    error: 'Server error. Please try again later.' 
  });
}
};

