const faker = require('faker')

const User = require('./models/user')
const Category = require('./models/category')
const Comment = require('./models/comment')
const FollowCategory = require('./models/follow_category')
const FollowUser = require('./models/follow_user')
const PostSave = require('./models/post_save')
const Post = require('./models/post')
const Vote = require('./models/vote')
const CommentSave = require('./models/comment_save')
const bcrypt = require('bcrypt')



// For creating users
// for (let i = 0; i < 20; i ++) {
//     let userData = {
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: 'password'
//     }
//     bcrypt.hash('password', 10, (err, hash) => {
//         userData.password = hash
//         User.create(userData)
//     })
// }


// Create Categories
// Category.create({name: 'Cats', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Dogs', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Movies', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Books', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Jokes', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Photography', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Art', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Sports', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Politics', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Fashion', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Health', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Nature', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})
// Category.create({name: 'Food', description: "Ex minus corporis necessitatibus maxime aut odio cumque harum. Corrupti deleniti rerum ratione quasi aliquid. Facere est sint sed velit mollitia vel aut consequatur corrupti."})

// // Create posts
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
// Post.create({userId: 36, image: faker.image.cats(), title: faker.lorem.words(), description: faker.lorem.paragraph(), categoryId: 1})
