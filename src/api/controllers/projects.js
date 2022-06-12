import { auth } from './../middlewares/auth'
import { queryParser } from './../middlewares/queryParser'
import { findMany, create } from './../services/project'

export default async (req, res)=>{

	// Authenticate user
	const user = await auth(req, res)

	// Parse query before passing to services
	const query = {
		where: {
			ownerId: user.id,
		}
	}
	
	if(req.method === 'GET'){
		res.send(await findMany(query))
	}else if(req.method === 'POST'){
		// Attach user to request body
		req.body.owner = user
		res.send(await create(req.body))
	}else{
		res.send('this method is not supported')
	}
}