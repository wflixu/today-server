// {app_root}/app/controller/user.js
exports.index = function* (ctx) {
    ctx.body = yield ctx.model.User.find({});
}