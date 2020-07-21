import app from './app';

app.listen(process.env.PORT);

console.log(`\nApi Running - ${process.env.BASE_URL}\n`);
