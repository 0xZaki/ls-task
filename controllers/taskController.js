const Task = require('../models/Task')



const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id })
        res.json(tasks)
    } catch (err) {
        next(err)
    }
}

const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        const task = new Task({
            title,
            description,
            user: req.user.id
        })
        await task.save()
        res.json(task)
    } catch (err) {
        next(err)
    }
}

const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' })
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }
        res.json(task)
    } catch (err) {
        next(err)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' })
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }
        task.is_done = req.body.is_done ?? task.is_done
        task.title = req.body.title ?? task.title
        task.description = req.body.description ?? task.description
        await task.save()
        res.json(task)
    } catch (err) {
        next(err)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' })
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }
        await task.remove()
        res.json({ msg: 'Task removed' })
    } catch (err) {
        next(err)
    }
}



module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
