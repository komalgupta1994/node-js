exports.getLogin = (req, res, next) => {
    console.log('reqq', req.session.isLoggedIn)
    // const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1];
        res.render('auth/login', {
            path: '/login',
            docTitle: 'Login',
            isAutheticated: false
        })
}

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    req.session.isLoggedIn = true
    res.redirect('/');
}

exports.logout = (req, res, next) => {
   req.session.destroy(() => {
        res.redirect('/');
   });
}

