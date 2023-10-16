
const Note = require('../models/NotesModel.js');
const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a new note
app.post('/notes', async (req, res) => {
    try {
        const { noteTitle, noteDescription, priority } = req.body;

        const newNote = new Note({
            noteTitle,
            noteDescription,
            priority,
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve all Notes =
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve a note through id
app.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(200).json(note);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a note
app.put('/notes/:noteId', async (req, res) => {
    try {
        const { noteTitle, noteDescription, priority } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.noteId, {
            noteTitle,
            noteDescription,
            priority,
        }, { new: true });

        if (!updatedNote) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(200).json({ message: 'Note updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a note
app.delete('/notes/:noteId', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndRemove(req.params.noteId);
        if (!deletedNote) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;

