import { auth } from './../middlewares/auth'
import { queryParser } from './../middlewares/queryParser'
import { update, destroy, findUnique } from './../services/project'

export default async (req, res) => {

	// Authenticate user
	const user = await auth(req, res)

	// Retrieve resource id
	const projectId = req.query.id;

	// Since Vercel attaches route parameters as query parameters I'm removing id to avoid issues with services
	delete req.query.id

	// Check user authorization
	// Get user projects id to determine if projectId belongs to authenticated user
	const userProjects = user.projects.reduce((projects, { id }) => [...projects, id], [])

	console.log(userProjects, projectId);

	// If it doesn't belong, return 401
	if (!userProjects.includes(projectId)) {
		res.status(401).send("Authenticated user does not have access to requested resource")
		return null
	}

	// Parse query before passing to services
	const query = queryParser(req.query)

	if (req.method === 'GET') {
		const results = await findUnique(projectId, query);
		res.send(results)
	} else if (req.method === 'PUT') {
		const results = await update(projectId, req.body);
		res.send(results)
	} else if (req.method === 'DELETE') {
		const results = await destroy(projectId, req.body);
		res.send(results)
	} else {
		res.send('this method is not supported');
	}
}