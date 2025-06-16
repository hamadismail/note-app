import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();
app.use(express.json());

const noteSchema = new Schema({
  title: {type: String, required: true, trim: true},
  content: {type: String, default: ''},
  category: {
    type: String,
    enum: ['Personal', 'Work', 'Study', 'Othrers'],
    default: 'Study',
  },
  pinned: {type: Boolean, default: false},
  tags: {
    label: {type: String, required: true},
    color: {type: String, default: 'gray'}
  }
})

const Note = model("Note", noteSchema);

app.post('/notes/create-note', async (req: Request, res: Response) => {
  const body = req.body;
  // hard-coded approch
  // const myNote = new Note({
  //   title: "Learning Next Level Dev",
  //   content: "I'm learning next level web development",
  //   tags: {
  //     label: 'panding'
  //   }
  // });
  // await myNote.save();

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  })
})

app.get('/notes', async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "Get Notes",
    notes
  })
})

app.get('/notes/:noteId', async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  // const note = await Note.findOne({_id: noteId})

  res.status(201).json({
    success: true,
    message: "Get Single Note",
    note
  })
})

app.patch('/notes/:noteId', async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;

  const note = await Note.findByIdAndUpdate(noteId, updatedBody, {new: true})
  // const note = await Note.findOneAndUpdate({_id: noteId}, updatedBody, {new: true})
  // const note = await Note.updateOne({_id: noteId}, updatedBody, {new: true})

  res.status(201).json({
    success: true,
    message: "Note Updated Successfully",
    note
  })

})

app.delete('/notes/:noteId', async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const note = await Note.findByIdAndDelete(noteId);
  // const note = await Note.findOneAndDelete({_id: noteId});
  // const note = await Note.deleteOne({_id: noteId});

  res.status(201).json({
    success: true,
    message: "Note Deleted Successfully",
    note
  })
})

app.get('/', (req: Request, res:Response) => {
  res.send('Welcome to Note App')
})

export default app;
