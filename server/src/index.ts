import Koa from 'koa';
import serve from 'koa-static';

const app = new Koa();
const port = 80;

const home = serve(__dirname);

app.use(home);

app.listen(port, () => {
    console.clear();
    console.log(`Listening: http://127.0.0.1:${port}/`);
});
