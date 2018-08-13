const Clarifai= require('clarifai');
const app = new Clarifai.App({
 apiKey: '8b65ad8a268344429c98ab93c7bec257'
});
const handleApiCall=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{data.json(data);})
	.catch(err=>res.status(400).json('Unable to handle API Call'))
}

const handleImage=(req,res,db)=>{
	const {name}=req.body;
	db('users').where({name})
	.increment('entries',1)
	.returning('entries')
	.then((entries)=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('error getting'))
}
module.exports={handleImage, handleApiCall};