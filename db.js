const mongoose = require('mongoose');

 mongoose.connect('mongodb://192.168.1.102/today', { useNewUrlParser: true });
 exports.client =mongoose.connection;
// const Tag = mongoose.model('Tag', new mongoose.Schema({
//     name: { type: String }
// }))
// const Post = mongoose.model('Post', new mongoose.Schema({
//     title: { type: String },
//     body: { type: String },
//     tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }]
// }));

// async function main() {
//     // await Post.insertMany([
//     //     {title:'post 1',body:'内容1'},
//     //     {title:'post 2',body:'内容2'},
//     // ])
//     // await Tag.insertMany([
//     //     {name:'生活'},
//     //     {name:'工作'}
//     // ]);

//     // console.log(await Tag.find());

//     // const posts = await Post.find();
//     const tags = await Tag.find();

//     // posts.forEach(post => {
//     //     post.tags=[];
//     //     tags.forEach(tag=>{
//     //         post.tags.push(tag);
//     //     })
//     //     post.save();
//     // });

//     const posts = await Post.find().populate('tags');
//     console.log(posts);
// }




