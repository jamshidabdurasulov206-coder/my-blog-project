const post = require('../models/post');

const createpost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: "Title va content majburiy ❌"
            });
        }
        const newpost = await post.create({
            title,
            content,
            author: req.user.id
        });
        res.status(201).json(newpost);
    }
    catch (err) {
        res.status(501).json({ error: err.message });

    }
};
const getposts = async (req, res) => {
    try {
        const posts = await post.find().populate('author', "name email");
        res.json(posts);
    } catch (err) {
        res.status(501).json({ error: err.message })
    }
};
const getpostById = async (req, res) => {
    try {
        const Post = await post.findById(req.params.id).populate('author', 'name email')
        if (!Post) return res.status(404).json({ message: "post topilmadi" })
        res.json(Post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updatepost = async (req, res) => {
    try {
        const Post = await post.findById(req.params.id);
        if (!Post) return res.status(404).json({ message: 'post topilmadi' });

        if (Post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'siz bu postni tahrirlashga ruxsat yur' })

        }
        Post.title = req.body.Post || Post.title;
        post.content = req.body.content || post.content;

        await post.save();
        res.json({ message: 'post yangilandi', Post });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const Post = await post.findById(req.params.id);
        if (!Post) return res.status(404).json({ message: 'post topilmadi' });

        if (Post.author.toString() !== req.user.id); {
            return res.status(403).json({ message: 'siz bu postni uchira olmaysiz' })
        }
        await post.deleteOne();
        res.json({ message: "post uchirildi" });

    } catch (err) {
        res.status(404).json({ error: err.message })
    }
};

module.exports = { createpost, getposts, getpostById, updatepost, deletePost };
