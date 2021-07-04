const Service = require("egg").Service;

class PostService extends Service {
  // create======================================================================================================>
  async create(payload) {
    const { ctx, service } = this;
    console.warn(payload);
    return ctx.model.Post.create(payload);
  }

  // destroy======================================================================================================>
  async destroy(_id) {
    const { ctx, service } = this;
    const post = await ctx.service.post.find(_id);
    if (!post) {
      ctx.throw(404, "post not found");
    }
    return ctx.model.Post.findByIdAndRemove(_id);
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this;
    const post = await ctx.service.post.find(_id);
    if (!post) {
      ctx.throw(404, "post not found");
    }
    return ctx.model.Post.findByIdAndUpdate(_id, payload);
  }

  // show======================================================================================================>
  async show(_id) {
    const post = await this.ctx.service.post.find(_id);
    if (!post) {
      this.ctx.throw(404, "post not found");
    }
    return this.ctx.model.Post.findById(_id).populate("role");
  }

  // index======================================================================================================>
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload;
    let res = [];
    let count = 0;
    let skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    if (isPaging) {
      if (search) {
        res = await this.ctx.model.Post.find({ mobile: { $regex: search } })
          .populate("role")
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec();
        count = res.length;
      } else {
        res = await this.ctx.model.Post.find({})
          .populate("role")
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec();
        count = await this.ctx.model.Post.count({}).exec();
      }
    } else {
      if (search) {
        res = await this.ctx.model.Post.find({ mobile: { $regex: search } })
          .populate("role")
          .sort({ createdAt: -1 })
          .exec();
        count = res.length;
      } else {
        res = await this.ctx.model.Post.find({})
          .populate("role")
          .sort({ createdAt: -1 })
          .exec();
        count = await this.ctx.model.Post.count({}).exec();
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc);
      jsonObject.key = i;
      jsonObject.password = "Are you ok?";
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
      return jsonObject;
    });

    return {
      count: count,
      list: data,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
    };
  }

  async removes(payload) {
    return this.ctx.model.Post.remove({ _id: { $in: payload } });
  }

  // Commons======================================================================================================>
  async findByMobile(mobile) {
    return this.ctx.model.Post.findOne({ mobile: mobile });
  }

  async findByName(postname) {
    return this.ctx.model.Post.findOne({ postname });
  }

  async find(id) {
    return this.ctx.model.Post.findById(id);
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.Post.findByIdAndUpdate(id, values);
  }
}

module.exports = PostService;
