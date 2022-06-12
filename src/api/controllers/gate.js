import gate from '../services/gate'

export default async (req, res)=>{
	if(req.method === 'POST'){
		const { address, message, signature, profileId } = req.body;
		if(!address || !message || !signature || !profileId) throw new Error("Unauthorized");
		const result = await gate(address, message, signature, profileId)
		res.send(result);
	}else{
		res.send('this method is not supported');
	}
}