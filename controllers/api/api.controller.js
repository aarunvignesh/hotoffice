
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var path = require('path');
var jwt = require('jsonwebtoken');
var User = require('../../models/testSchema');
var Employee = require('../../models/user.schema.js');
var Teams = require('../../models/teams.schema');
var config = require('../../config');

var multer = require('multer');
var DIR = 'test-app/dist/assets/images';
var upload = multer({dest: DIR}).single('photo');


router.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3040/api/employees");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/upload', function (req, res, next) {
     var path = '';
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }
       // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+path);
  });
});


router.use('/', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
        jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
          if (err) {
            return res.status(403).json({ err, success: false, message: 'Failed to authenticate token.' });
          } else {
            req.decoded = decoded;
            next();
          }
        });

  } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.coming here.'
        });

  }
});

// users
router.get('/', getAllUsers);

// employees
router.get('/employees', getAllEmployees);
router.get('/employees/id=:id', getEmployeesById);
router.get('/employees/teamId=:teamId/domainId=:domainId', getEmployeesByTeamId);
router.get('/employees/teamId=:teamId', filterEmployeesByTeams);
router.post('/employees', addNewEmployee);
router.put('/employees/id=:id', updateEmployeeById);
router.delete('/employees/id=:id', deleteEmployee);

// teams
router.get('/teams', getAllTeams)
router.get('/teams/:id', getTeamById)
router.get('/teams/:id/:teamId', getSpecificTeamById);

/** 1 **/
function getAllEmployees(req, res) {
  Employee.find({}, function(err, users) {
    res.json(users);
  });
}

/** 2 **/
function getEmployeesById(req, res) {
  var reqId = JSON.parse(req.params.id);

  var query = Employee.findOne({ emp_id: reqId });

  query.exec(function(err, emp) {
    if(err) {
      return handleError(err);
    }
    res.json(emp);
  });

}

/** 3 **/
function getEmployeesByTeamId(req, res) {

  var reqTeamId = JSON.parse(req.params.teamId);
  var reqDomainId = JSON.parse(req.params.domainId);
  let TeamEmpIds = [];

  Teams.findOne({ id: reqTeamId })
      .select({ teams: { $elemMatch: {team_id: reqDomainId }}})
      .exec(function (err, doc) {
        if(err) {
          res.json(err);
        }

        doc.teams.forEach(function(team) {
          if(team.team_id == reqDomainId) {
            TeamEmpIds = team.emp_ids;
          }
        })

        // res.json(TeamEmpIds);

        Employee.find({
          "$or": TeamEmpIds,
        }, function(err, docs){
             res.json(docs);
        });
      });
}

/** 4 **/
function filterEmployeesByTeams(req, res) {
  var reqTeamId = JSON.parse(req.params.teamId);

  var query = Employee.find({ "team_ids": { "$in": [ reqTeamId ] } });

  query.exec(function(err, empId) {
    if(err) {
      res.json(err);
    }
    res.json(empId);
  })

}

/** 5 **/
function addNewEmployee(req, res) {
  var requestObj = req.body;
  var employee = new Employee(requestObj);

  Employee.find({ emp_id: requestObj.emp_id, email: requestObj.email }, function(err, emp) {
    if(err) {
      res.json({ success: false, message: err });
    }
    if(emp.length) {
      res.json({ success: false, message: 'Employee already exist with same email id' })
    } else {

      employee.save(function(err, newData) {
        if (err)
          res.json({ success: false, message: err });

          /** add encrypt login here - if needed **/
          res.json({ success: true, message: 'Employee Added Successfully' })
      })
    }
  });
}

/** 6 **/
function updateEmployeeById(req, res) {

  var reqId = JSON.parse(req.params.id);
  var request = req.body;

  var updateValue = {
    first_name: request.first_name,
    last_name: request.last_name,
    role: request.role,
    profile_image: request.profile_image,
    description: request.description,
    reporting_manager: request.reporting_manager,
    key_skills: request.key_skills,
  };

  Employee.update({ emp_id: reqId }, updateValue, {}, function(err, updatedEmployee) {
    if (err)
      res.json({ success: false, message: err });

    res.json({ success: true, message: "Employee detail updated successfully" });
  })
}

/** 7 **/
function deleteEmployee(req, res) {
  var reqId = JSON.parse(req.params.id);
  Employee.find({ emp_id: reqId }).remove(function(err, deletedEmp) {
    if (err) {
      res.json({ success: false, message: err });
    }
    res.json({ success: true, message: "Employee removed successfully" })
  })
}

/** 8 **/

function getAllTeams(req, res) {

  const findQuery = [
    {$match: {}},
    {$unwind: "$teams" },
    {$group: {_id: "$_id", id: {$first: '$id'}, type : { $last: '$type' }, count: {$sum: 1}, teams: {$push: {team_name: "$teams.team_name",team_id: "$teams.team_id"} } } },
    { $project: {
        id: "$id",
        type: "$type",
        teams: "$teams",
        no_of_teams: {$size: '$teams'},
      }
    }
  ];

  var query = Teams.aggregate(findQuery)
  query.exec(function(err, teams) {
    if(err) {
      return res.json({success: "false", error: err});
    }

    res.json(teams);
  })

}

/** 9 **/
function getTeamById(req, res) {

  var reqId = JSON.parse(req.params.id);

  const findQuery = [
    { $match: {id: reqId} },
    { $unwind: "$teams" },
    { $group: {
          _id: "$_id",
          id: {$first: '$id'},
          teams: {
            $push: {
              team_name: "$teams.team_name",
              team_id: "$teams.team_id",
              team_description: "$teams.team_description",
              team_logo: "$teams.team_logo",
              emp_ids: "$teams.emp_ids",
              no_of_employees: { $size: "$teams.emp_ids" },
              limit : 2,
            }
          }
      }
    },
    { $project: {
        id: "$id",
        no_of_teams: {$size: '$teams'},
        limit : 2,
        teams: "$teams"
      }
    }
  ];

  var query = Teams.aggregate(findQuery)

  query.exec(function(err, team) {
    if(err) {
      res.json(err);
    }
    res.json(team[0]);
  });

}


/** 10 **/
function getSpecificTeamById(req, res) {

  var reqId = JSON.parse(req.params.id);
  var teamId = req.params.teamId;

  var query = Teams.findOne({ id: reqId });

  query.exec(function(err, team) {
    if(err) {
      return handleError(err);
    }

    if(team.teams) {
      team.teams.forEach(function(subteam) {
        if(subteam.team_id == teamId) {
          res.json(subteam);
        }
      })
    }
  });

}


function getAllUsers(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
}

module.exports = router;
