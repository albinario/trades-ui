import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000 // Choose a port for your proxy server

// Middleware to handle CORS headers for your proxy server
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

// Route to proxy the request to the remote server
app.get('/nhle-standings', async (req, res) => {
	try {
		// Make a request to the remote server
		const response = await axios.get(
			'https://api-web.nhle.com/v1/standings/2023-11-07'
		)

		// Send the remote server's response to the client
		res.json(response.data)
	} catch (error) {
		// Handle any errors
		res
			.status(500)
			.json({ error: 'Failed to retrieve data from the remote server.' })
	}
})

// Start the proxy server
app.listen(port, () => {
	console.log(`Proxy server is running on port ${port}`)
})
