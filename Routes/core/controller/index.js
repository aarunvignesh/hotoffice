var User = require("./../../../models/user.schema"),
Team = require("./../../../models/teams.schema");

module.exports = {
    serveIndex: (req, res)=>{
        res.render("index");
    },

    status: (req, res)=>{
        if(req.isAuthenticated()){
            res.json({
                code: 200,
                user: req.user
            })
        }
        else{
            res.status(401)
                .json({
                    code: 401,
                    message:"Unauthenticated User!!!"
                })
        }
    },

    authenticated: (req, res)=>{
        res.json({
            code: 200,
            message: "Authenticated Successfully",
            user: req.user
        });
    },

    notauthenticated: (req, res)=>{
        res.status(401)
        .json({
            code:401,
            message: "(Username/Password) is incorrect!!! "
        });
    },

    createUser: (req, res)=>{
        if(req.isAuthenticated()){
            var user = new User(req.body);
            user.save((err, result)=>{
                if(err){
                    console.log(err);
                    res.status(500)
                    .json({
                        code: 500,
                        message: "Unable to store the data.."
                    });
                }
                else{
                    res.json({
                        code: 200,
                        message:"Successfully Stored the data!!"
                    })
                }
            });
        }
        else{
            res.redirect("/notauthenticated");
        }
    },
    getUsers: (req, res) =>{
            User.find(req.query,{
                _id: 1,
                emp_id:1,
                team_details: 1,
                first_name: 1,
                last_name: 1,
                role: 1,
                description: 1,
                reporting_manager:1,
                current_projects:1,
                projects_worked:1,
                key_skills:1,
                skype: 1,
                slack: 1,
                phone: 1,
                email: 1,
                designation:1
            },(err,result)=>{
                if(err){
                    res.status(500)
                        .json({
                            code: 500,
                            message: "Unable to fetch the data"
                        });
                }
                else{
                    res.json(result);
                }
            });
    },


    getUsersById:(req, res) =>{
            User.findById(req.params.id,{
                _id: 1,
                emp_id:1,
                team_details: 1,
                first_name: 1,
                last_name: 1,
                role: 1,
                description: 1,
                reporting_manager:1,
                current_projects:1,
                projects_worked:1,
                key_skills:1,
                skype: 1,
                slack: 1,
                phone: 1,
                email: 1,
                designation:1
            },(err,result)=>{
                if(err){
                    res.status(500)
                        .json({
                            code: 500,
                            message: "Unable to fetch the data"
                        });
                }
                else{
                    res.json(result);
                }
            });
        },

        getProfileImage:(req, res) =>{
            User.findById(req.params.id,{
               profile_image:1
            },(err,result)=>{
                if(err){
                    res.status(500)
                        .json({
                            code: 500,
                            message: "Unable to fetch the data"
                        });
                }
                else if(result){
                    var img = new Buffer(result.profile_image.split("base64")[1], 'base64');
                    res.writeHead(200, {
                        'Content-Type': 'image/jpeg',
                        'Content-Length': img.length
                    });
                    res.end(img); 
                    //res.send();
                }
                else{
                    res.status(500)
                        .json({
                            code: 500,
                            message: "Unable to fetch the data"
                        });
                }
            });
        },

        createTeam: (req, res)=>{
            if(req.isAuthenticated()){
                var team = new Team(req.body);
                team.save((err, result)=>{
                    if(err){
                        console.log(err);
                        res.status(500)
                        .json({
                            code: 500,
                            message: "Unable to store the data.."
                        });
                    }
                    else{
                        res.json({
                            code: 200,
                            message:"Successfully Stored the data!!"
                        })
                    }
                });
            }
            else{
                res.redirect("/notauthenticated");
            }
        },
        getTeams: (req, res) =>{
                Team.find(req.query,(err,result)=>{
                    if(err){
                        res.status(500)
                            .json({
                                code: 500,
                                message: "Unable to fetch the data"
                            });
                    }
                    else{
                        res.json(result);
                    }
                });
        },
    
    
        getTeamById:(req, res) =>{
                Team.findById(req.params.id,(err,result)=>{
                    if(err){
                        res.status(500)
                            .json({
                                code: 500,
                                message: "Unable to fetch the data"
                            });
                    }
                    else{
                        res.json(result);
                    }
                });
            },
        logout:(req, res) => {
            req.logout();
            res.json({
                code: 200,
                message:"Logged Out Successfully"
            });
        }
};