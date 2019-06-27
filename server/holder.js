app.post('/users', (req, res) => {
    if(req.body.username !== "" && req.body.password !== "" && req.body.email !== "")
    {let userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {username: req.body.username} || {email: req.body.email}
    })
    .then(user => {
      if(!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
          .then(user => {
            res.json({status: user.username + ' registered'})
          })
          .catch(err => {
            res.send('error: ' + err)
          })
        })
      } else {
        res.json({error: "User already exists."})
      }
    })}else{res.json({error: "Please enter valid Username Email and Password"})}
})