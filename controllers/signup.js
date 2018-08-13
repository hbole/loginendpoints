const handleSignup=(req,res,db,bcrypt)=>{
	const {name, email, password}=req.body;
	if(!name|| !email || !password){
		return res.status(400).json("Improper Data");
	}else {
		const hash= bcrypt.hashSync(password);
		db.transaction(trx=>{
			trx.insert({
				hash:hash,
				email:email
			}).into('login')
			.returning('email')
			.then(loginEmail=>{
			 return	trx('users')
					.insert({
						email:loginEmail[0],
						name:name,
						joined:new Date()
					})
				.then(()=>res.json('registered'))
			})
			.then(trx.commit)
			.then(trx.rollback)
			.catch(err=> res.status(400).json('Unable to register'))	
		})
		.catch(err=> res.status(400).json('Unable to register'));
	}
	
}
module.exports={handleSignup};