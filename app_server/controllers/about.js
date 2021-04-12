/* Get home page */
const about = function (req, res) {
    res.render('about', { title: 'About weatherexpress website' });
};

module.exports = {
    about
};