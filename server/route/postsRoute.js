const express = require('express');

const router = express.Router();
const postsService = require('../service/postsService');

router.get('/posts', async (req, res) => {
	const posts = await postsService.getPosts();
	res.json(posts);
});

router.get('/posts/:id', (req, res) => {});

router.post('/posts', async (req, res) => {});

router.put('/posts/:id', async (req, res) => {});

router.delete('/posts/:id', async (req, res) => {});

module.exports = router;
