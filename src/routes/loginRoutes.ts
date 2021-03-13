import { Router, Request, Response, NextFunction } from 'express';

function requreAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }


    res.status(403);
    res.send('not permitted!');
}


const router = Router();
router.get('/login', (req: Request, res: Response) => {
    res.send(`
    <form method="POST">
        <div>
        <div>
        <label>Email</label>
        <input name="email"/>
        </div>
        
        <div>
        <label>Password</label>
            <input name="password" type="password" />
        </div>
            
            
            <button>Submit</button>
        </div>
    </form>
    `);
})

router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email && password && email === "hi@hi.com" && password === "password") {
        //they're logged in
        req.session = { loggedIn: true };
        //redirect them to root route
        res.redirect("/");
    } else {
        res.send('invalid email and password');
    }
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
})

router.get('/protected', requreAuth, (req: Request, res: Response) => {
    res.send("Welcome to protected route. Logged in gamer.")
});

export { router };