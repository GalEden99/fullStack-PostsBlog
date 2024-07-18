import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

morgan.token('body', (req) => JSON.stringify(req.body));
const logFormat = ':date :method :url :body';
app.use(morgan(logFormat, { stream: logStream }));

dotenv.config();
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    MONGODB_CONNECTION_URL
  );
}

const authorSchema = new mongoose.Schema({
  name: String,
  email: String
}, { _id: false });

const noteSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: {
    type: authorSchema,
    default: null
  },
  content: String,
});

const Note = mongoose.model("Note", noteSchema);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Went Wrong!'); 
});

app.get("/notes", async (req, res) => {
  const _page = parseInt(req.query._page) || 1;
  const _per_page = parseInt(req.query._per_page) || 10;

  try {
    const notes = await Note.find()
      .skip((_page - 1) * _per_page)
      .limit(_per_page);

    const totalNotes = await Note.countDocuments();

    res.status(200).json({notes, totalNotes});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

app.get("/notes/:id", async (req, res) => {
  try {
    const notes = await Note.find();
    const currentNote = notes[req.params.id - 1];
    if (!currentNote) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }
    res.status(200).json(currentNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

const notes = await Note.find();
let lastPostId = notes.length; 

app.post("/notes", async (req, res) => {
  try{
    lastPostId++;
  
    const newNote = new Note({
      id: lastPostId,
      title: req.body.title,
      author: (req.body.author.name || req.body.author.email)? { name: req.body.author.name || "", email: req.body.author.email || "" } : null,
      content: req.body.content,
    });
    
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);

  } catch (err){
    console.error(err);
    res.status(400).json({ error: 'Missing fields in the request' });
  }
});

app.put("/notes/:id", async (req, res) => {

  try {
    const notes = await Note.find();
    const currentNote = notes[req.params.id - 1];
    currentNote.content = req.body.content;
    const updatedNote = await currentNote.save();

    if (!updatedNote){
      res.status(404).json({error: 'Note not found'});
      return;
    }

    res.status(200).json(updatedNote);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: 'Failed to update note' });
  }

});

app.delete("/notes/:id", async (req, res) => {

  try {
    const notes = await Note.find();
    const mongoId = notes[req.params.id - 1]._id;
    const deletedNote = await Note.findByIdAndDelete(mongoId);
    
    if (!deletedNote) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    res.status(204).json({ message: `Note ${req.params.id} deleted` });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: 'Failed to delete note' });
  }

});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
