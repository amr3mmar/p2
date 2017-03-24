let Project = require('../models/Project');


let projectController = {
    
    
    getUserProjects:function(req, res){
       /* Project.find(function(err, projects){
            
            if(err)
                res.send(err.message);
            else{
                username: req.user.username;
                res.render('index', {projects});
            }
        }) */

        Project.find({ username: req.user.username }, function(err, projects){
            if (err)
                res.send(err.message)
            else{
                res.render('index', {userprojects: projects});
            }
        })

    },

    getAllProjects:function(req, res){
        Project.find(function(err, projects){
            
            if(err)
                res.send(err.message);
            else{
                res.render('guestview', {projects});
            }
        })
    },

    createProject:function(req, res){
        let project = new Project(req.body);

        if(req.files)
        {
            req.files.forEach(function(file){
                project.img = "public/uploads/"+file.filename;
            })
        }

        project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(project);
                res.redirect('/profile');
            }
        })
    }
}

module.exports = projectController;