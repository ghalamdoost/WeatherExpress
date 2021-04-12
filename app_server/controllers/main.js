/* Get home page */
const index = function(req, res){
    res.render('index', {title: 'weatherexpress group project'});
};

module.exports = {
    index
};