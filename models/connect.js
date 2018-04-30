const mongoose = require("mongoose");

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};
switch (app.get("env")) {
  case "development":
    mongoose.connect(credentials.mongo.development.connectionString, opts);
    break;
  case "production":
    mongoose.connect(credentials.mongo.production.connectionString, opts);
    break;
  default:
    throw new Error("Unknow execution environment" + app.get("env"));
}


var vacationSchema = mongoose.Schema({
  name: String,
  slug: String,
  category: String,
  sku: String,
  description: String,
  priceInCents: Number,
  tags: [String],
  inSeason: Boolean,
  available: Boolean,
  requiresWaiver: Boolean,
  maximumGuests: Number,
  notes: String,
  packagesSold: Number
});
vacationSchema.methods.getDisplayPrice = function() {
  return "$" + (this.priceInCents / 100).toFixed(2);
};
var Vacation = mongoose.model("Vacation", vacationSchema);

Vacation.find(function(err,vacation){
  if(vacation.length) return;
  
})