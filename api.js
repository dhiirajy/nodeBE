const express = require('express');
const cors = require('cors');
const authMiddleware = require('./authMiddleware');
const app = express();
const PORT = process.env.PORT || 3012;
const jwt = require('jsonwebtoken');

// Enable CORS
app.use(cors());

// Mock data for demonstration
const aboutData = {
  about: "About me",
  description: "I am Dhiraj Yadav, currently working with Kellton Tech Solutions as a Module Lead. In my role, I am responsible for a range of crucial tasks, including handling client calls, conducting technical discussions, and writing detailed technical documents. Additionally, I lead and manage a team of 10 skilled professionals, ensuring smooth collaboration and efficient project execution. Thank you !!",
  skills: [
    'JavaScript',
    'Laravel',
    'Python' ,
    'PHP',
    'AWS',
    'GIT',
  ]
};

const projectsData = [
  { id: 1, name: 'VCIP', image:'https://googlechrome.github.io/samples/intrinsic-size/cat.jpg', description: 'VCIP KYC is designed to streamline the KYC process for individuals.The process eliminates the need to provide KYC data to multiple service providers'},
  { id: 2, name: 'CRM', image:'https://i.stack.imgur.com/od6Ln.jpg', description: 'Customer relationship management (CRM) is a technology for managing all your company\'s relationships and interactions with customers and potential customers' },
  { id: 3, name: 'LMS', image: "https://images.unsplash.com/photo-1528263140907-8dc1a9d92bdf",description: 'A loan management system allows banks, credit unions, captives, and other lenders to streamline the management of all their lending processes, thus reducing operational (and other) expenses.' },
];

const achievementsData = [
  { id: 1, title: 'Achievement 1' },
  { id: 2, title: 'Achievement 2' },
];

const blogsData = [
  { id: 1, title: 'Blog Post 1', image: 'https://images.unsplash.com/photo-1484587658517-51c2ea232f9a', description:"Ironically, this change has brought about a sense of joy for many residents who relied on the previous schedule. The disruption to our daily routine has unexpectedly created a unique atmosphere, allowing us to appreciate the festival in a new light."},
  { id: 2, title: 'Blog Post 2', image: 'https://images.unsplash.com/photo-1484587658517-51c2ea232f9a', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. " },
  { id: 3, title: 'Blog Post 3', image: 'https://images.unsplash.com/photo-1566754365034-1e8385250ee4',  description: "Lorem Ipsum is a placeholder text commonly used in the printing and typesetting industry. It's often used to demonstrate the visual effects of different fonts, layouts, and designs without being distracted by meaningful content." },
];

// Routes
app.get('/api/token', (req, res) => {
  const jwt = require('jsonwebtoken');

  const generateToken = (payload, secretKey, expiresIn) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secretKey, { expiresIn }, (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      });
    });
  };

  // Example usage
  (async () => {
    const secretKey = 'ASDSDWEWE343433434';
    const payload = { userId: 123, username: 'exampleUser' };
    const expiresIn = '100d';

    try {
      const generatedToken = await generateToken(payload, secretKey, expiresIn);
      console.log('Generated Token:', generatedToken);
    } catch (error) {
      console.error('Error generating token:', error);
    }
  })();
});
app.get('/api/about', authMiddleware, (req, res) => {
  // Handle the response accordingly
  res.json(aboutData);
});

app.get('/api/projects', authMiddleware, (req, res) => {
  // Accessible only with a valid token
  res.json(projectsData);
});

app.get('/api/achievements', authMiddleware, (req, res) => {
  // Accessible only with a valid token
  res.json(achievementsData);
});

app.get('/api/blogs', authMiddleware, (req, res) => {
  // Accessible only with a valid token
  res.json(blogsData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});