import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: ["asdf"]}))
app.use(router);

app.get('/', (req: Request, res: Response) => {
    let html;
    //check if logged in
    if (req.session && req.session.loggedIn) {
        html = `
        <div>
        <h1>
        You are logged in!
        </h1>
        
        <a href="/logout">Logout</a>
        
        </div>
        `
    } else {
        html = `
        <div>
        <h1>Hi there!</h1>
        <a href="/login">Login</a>
        </div>
        `;
        
    }
    //else
    
    res.send(html);
});


app.listen(3000, () => {
    console.log("Listening at http://localhost:3000");
    
})


