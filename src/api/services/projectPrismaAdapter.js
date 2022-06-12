export default (data)=>{

	if(data.projectId){
		data.project = {
			connect : {
				id : data.projectId
			}
		}
		delete data.projectId
	}

	if(data.owner){
		data.owner = {
			connect : {
				id : data.owner.id
			}
		}
	}

	return data
	
}