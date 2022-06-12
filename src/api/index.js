import authenticate from './controllers/authenticate'
import gate from './controllers/gate'
import project from './controllers/project'
import projects from './controllers/projects'

const allowCors = fn => async (req, res) => {
	res.setHeader('Access-Control-Allow-Credentials', true)
	res.setHeader('Access-Control-Allow-Origin', '*')
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'*'
	)
	if (req.method === 'OPTIONS') {
		res.status(200).end()
		return
	}
	return await fn(req, res)
}

export default {
	controllers: {
		authenticate,
		gate,
		project,
		projects,
	},
	allowCors,
}