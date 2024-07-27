import Task from '../models/task.js';

export const getTasks = async (req, res) => {

  try {
    const user = req.user;
    console.log(user)
    if (user.role === 'Admin') {
      const tasks = await Task.find()
      console.log(tasks,"admin tas")
      res.json(tasks);
    } else if (user.role === 'User') {
      // Regular user can only view their own tasks
      const tasks = await Task.find({ user: user._id });
      console.log(tasks,"tasks")
      res.json(tasks);
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

export const addTask = async (req, res) => {
  const { title } = req.body;
  console.log(title,"title")
  try {
    const task = new Task({
      title,
      userId: req.user.id,
    });
    console.log(task)
    await task.save();

    res.status(201).json({ message: 'Task added successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Error adding task' });
  }
};

// export const updateTaskStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   console.log(status)
//   try {
//     const task = await Task.findById(id);
//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     task.status = status || task.status;
//     await task.save();

//     res.json({ message: 'Task status updated successfully', task });
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating task status' });
//   }
// };
