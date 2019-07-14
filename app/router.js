module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/news', controller.news.list);
    router.get('/content/:id', controller.news.content);
    router.get('/user', controller.user.index);
    router.post('/user/login', controller.user.login);
    router.post('/user/sign', controller.user.sign);
    router.get('/user/login', controller.user.login);
    router.get('/api/user', controller.api.user);
    router.get('/api/users/:count', controller.api.users);
    router.get('/api/repos/:count', controller.api.getUserRepos);
    // 获取仓库详情
    router.get('/api/repo/:id', controller.api.getRepoDetail);
    //获取仓库得文档列表
    router.get('/api/docs/:id', controller.api.getRepoDocsList);

    router.get('/api/repos/:repo_id/docs/:id', controller.api.getDocsDetail);
    router.get('/yueque', controller.yuque.index);
};
