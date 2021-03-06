import 'reflect-metadata'

import express from 'express'
import cors from 'cors'
import { routes } from './routes'

export const app = express()

app.use(cors({
    origin: 'http://localhos:3000',
}))

app.use(express.json())
app.use(routes)