app.patch('/category', (req, res) => {
  Category.findOne({
    where: {
      name: req.body.name
    }
  })
  .then(category => {
    category.description = req.body.description
    category.save()
    res.json({status: 'You\'ve successfully updated the description'})
  })
})

app.delete('/post', (req, res) => {
  Post.destroy({
    where: {
      id: req.body.post_id
    }
  })
  .then(res.json({status: 'Post has been deleted'}))
})