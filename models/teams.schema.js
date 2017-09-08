var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TeamSchema = mongoose.Schema({
  name: { type:String, required:true },
  type: { type:String, required:true },
  description: { type:String, required:true },
  team_members : {type : Array}
});

var Team = mongoose.model('Team', TeamSchema);

module.exports = Team;

// teams: [{
//     team_description : String,
//     team_logo : String,
//     team_name: String,
//     team_id: Schema.Types.Mixed,
// }],
// 
// db.teams.find().forEach(function (doc1) {
//     var doc2 = db.teams.findOne({ id: doc1.id }, { name: 1 });
//     if (doc2 != null) {
//         doc1.name = doc2.name;
//         db.coll01.save(doc1);
//     }
// });
