import app from './app.js';

const port: string | number = process.env.PORT || 3000;

app.listen(port, (): void => {
  console.log(`app running on port ${port}`);
});
