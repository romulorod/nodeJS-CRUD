const axios = require('axios');

test('Should get posts', async () => {
	const response = await axios({
		url: 'http://localhost:3000/posts',
		method: 'get',
	});
    const posts = response.data;
    expect(posts).toBeDefined();
    expect(posts).toHaveLength(3);
});
