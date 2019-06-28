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
