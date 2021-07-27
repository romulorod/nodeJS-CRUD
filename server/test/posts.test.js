const axios = require('axios');
const crypto = require('crypto');
const postsService = require('../service/postsService');

const generate = () => {
	return crypto.randomBytes(10).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data });
};

it('Should get posts', async () => {
	const post1 = await postsService.savePost({
		title: generate(),
		content: generate(),
	});
	const post2 = await postsService.savePost({
		title: generate(),
		content: generate(),
	});
	const post3 = await postsService.savePost({
		title: generate(),
		content: generate(),
	});
	const response = await request('http://localhost:3000/posts', 'get');
	const posts = response.data;
	expect(posts).toHaveLength(3);
	await postsService.deletePost(post1.id);
	await postsService.deletePost(post2.id);
	await postsService.deletePost(post3.id);
});

it('Should save a post', async () => {
	const data = { title: generate(), content: generate() };

	const response = await request('http://localhost:3000/posts', 'post', data);
	const post = response.data;
	expect(post.title).toBe(data.title);
	expect(post.content).toBe(data.content);
	await postsService.deletePost(post.id);
});

it('Should update a post', async () => {
	const post = await postsService.savePost({
		title: generate(),
		content: generate(),
	});
	post.title = generate();
	post.content = generate();
	await request(
		`http://localhost:3000/posts/${post.id}`,'put',	post);
	const updatedPost = await postsService.getPost(post.id);
	expect(updatedPost.title).toBe(post.title);
	expect(updatedPost.content).toBe(post.content);
	await postsService.deletePost(post.id);
});

it('Should delete a post', async () => {
	const post = await postsService.savePost({
		title: generate(),
		content: generate(),
	});
	await request(
		`http://localhost:3000/posts/${post.id}`,'delete');
        const posts = await postsService.getPosts();
        expect(posts.length).toBe(0);
});
