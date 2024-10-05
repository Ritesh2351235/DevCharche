import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { blogrouter } from './routes/blog';
import { userrouter } from './routes/user';
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET :string
  }
}>();
app.use('/api/*', cors());
app.route('/api/v1/blog', blogrouter);
app.route('/api/v1/user',userrouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})



export default app
