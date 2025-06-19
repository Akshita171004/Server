import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors(
  {
    origin: "https://client-drab-eight-20.vercel.app",
    methods: ["GET", "POST","PUT", "DELETE", "PATCH"],
  }
));
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => 
{
  res.send("Hello, World!");
});
app.post("/register", (req, res) =>
    {
        try {
            const usersDir = path.join(__dirname, 'users');
            
            const files = fs.readdirSync(usersDir);
            
            const userFiles = files.filter(file => /^user\d+\.json$/.test(file));
            const userNumber = userFiles.length + 1;
            const filename = `user${userNumber}.txt`;
            const filepath = path.join(usersDir, filename);

            fs.writeFileSync(filepath, JSON.stringify(req.body, null, 2));
            res.json({ message: `User saved as ${filename}` });
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    });


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
