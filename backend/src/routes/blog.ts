import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify } from "hono/jwt";


export const blogrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

blogrouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || " ";
  const user = await verify(authHeader, c.env.JWT_SECRET)

  if (!user) {
    return c.json({ message: "Your not logged in" });
  }
  (c.req as any).userId = user.id;
  await next()

})

blogrouter.post('/', async (c) => {
  const body = await c.req.json();
  const userId = (c.req as any).userId;
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId
    }
  })

  return c.json({ id: blog.id })
})

blogrouter.put('/', async (c) => {
  const body = await c.req.json();
  const userId = (c.req as any).userId;
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId
    },

    data: {
      title: body.title,
      content: body.content
    }
  })
  return c.json({ id: blog.id })

})

blogrouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  })

  if (!blogs) {
    return c.json({ message: "Error while fetching the blogs" })
  }
  return c.json(blogs);

})

blogrouter.get('/:id', async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.findFirst({
    where: {
      id: id
    },
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  })
  return c.json(blog);
})
