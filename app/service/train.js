const Service = require("egg").Service;

class TrainService extends Service {
  // create======================================================================================================>
  async create(payload) {
    const { ctx, service } = this;
    console.warn(payload);
    return ctx.model.Train.create(payload);
  }

  // destroy======================================================================================================>
  async destroy(_id) {
    const { ctx, service } = this;
    const train = await ctx.service.train.find(_id);
    if (!train) {
      ctx.throw(404, "train not found");
    }
    return ctx.model.Train.findByIdAndRemove(_id);
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this;
    const train = await ctx.service.train.find(_id);
    if (!train) {
      ctx.throw(404, "train not found");
    }
    return ctx.model.Train.findByIdAndUpdate(_id, payload);
  }

  // show======================================================================================================>
  async show(_id) {
    const train = await this.ctx.service.train.find(_id);
    if (!train) {
      this.ctx.throw(404, "train not found");
    }
    return this.ctx.model.Train.findById(_id).populate("role");
  }

  // index======================================================================================================>
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload;
    let res = [];
    let count = 0;
    let skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    if (isPaging) {
      if (search) {
        res = await this.ctx.model.Train.find({ mobile: { $regex: search } })
          .populate("role")
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec();
        count = res.length;
      } else {
        res = await this.ctx.model.Train.find({})
          .populate("role")
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec();
        count = await this.ctx.model.Train.count({}).exec();
      }
    } else {
      if (search) {
        res = await this.ctx.model.Train.find({ mobile: { $regex: search } })
          .populate("role")
          .sort({ createdAt: -1 })
          .exec();
        count = res.length;
      } else {
        res = await this.ctx.model.Train.find({})
          .populate("role")
          .sort({ createdAt: -1 })
          .exec();
        count = await this.ctx.model.Train.count({}).exec();
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
    return this.ctx.model.Train.remove({ _id: { $in: payload } });
  }

  // Commons======================================================================================================>
  async findByMobile(mobile) {
    return this.ctx.model.Train.findOne({ mobile: mobile });
  }

  async findByName(trainname) {
    return this.ctx.model.Train.findOne({ name: trainname });
  }

  async find(id) {
    return this.ctx.model.Train.findById(id);
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.Train.findByIdAndUpdate(id, values);
  }
}

module.exports = TrainService;
