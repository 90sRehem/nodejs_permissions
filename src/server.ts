import 'reflect-metadata'
import { app } from "./app";
import './database';

app.listen(process.env.PORT || 3333, () => {
    console.log('🚀 Server started!')
});