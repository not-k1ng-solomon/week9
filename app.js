export default (express, puppeteer, Zombie) => {
    
    const app = express();
    const author = 'davlet'

    app
    .use(function (req, res, next) {
        res.setHeader('Content-Type', 'text/plain')
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
        next()
    })

    .get('/login/', (req, res) => {
        res.send(author)
    })
    .get('/test/', async r => {
        const { URL } = r.query;
        const page = new Zombie();
        await page.visit(URL);
        await page.pressButton('#bt');
        const got = await page.document.querySelector('#inp').value;
        r.res.send(got);
    })
    
    // .get('/test/', async (req, res) => {
    //     const { URL } = req.query
    //     const browser = await puppeteer.launch({
    //         headless: true,
    //         args: [
    //             '--no-sandbox',
    //             '--disable-setuid-sandbox',
    //         ],
    //     })
    //     const page = await browser.newPage()
    //     await page.goto(URL)
    //     await page.click('#bt')
    //     const value = await page.evaluate(async () => {
    //         const input = document.getElementById('inp')
    //         return input.value
    //     })
    //     res.send(value)
    // })

    .all('*', (req, res) => {
        res.send(author)
    })

    return app;
}