exports.errorMessage = (req, res) => {
    // res.send('<h1>Page Not Found</h1>')
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { docTitle: 'Page Not Found from EJS', path: '', isAutheticated: req.session.isLoggedIn });
};