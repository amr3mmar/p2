let Portfolio = require('../models/portfolio');
let Project = require('../models/Project');

let portfolioController = {

    createPortfolio:function(req, res){
        let portfolio = new Portfolio(req.body);

        

        portfolio.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(project);
                req.flash('success_msg', 'Succesfuly created Portfolio');
                res.redirect('/profile');
            }
        })
    },
    
    getAllPortfolios:function(req, res){
        Portfolio.find(function(err, portfolios){
            
            if(err)
                res.send(err.message);
            else{
                res.render('guestview', {portfolios});
            }
        })
    }
    
}

module.exports = portfolioController;