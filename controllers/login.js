const handleLogin=(req,res,db,bcrypt)=>{
	const{email,password}=req.body;
	if(! email || ! password){
		return res.status(400).json("Improper Data");
	}
	db.select('email','hash').from('login')
	.where({email})
		.then(data=>{
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid){
				return db.select('*').from('users')
				.where({email})
				.then(user=>{
					res.json(user[0]);
				})
				.catch(err=>res.status(400).json("Can't get User"));
			} else{
				res.status(400).json("Wrong Credentials");
			}
		})
		.catch(err=>res.status(400).json("Wrong Credentials"))
}
module.exports={handleLogin};