import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signupInput, SignupInput } from "@riteshhiremath/medium-common";
export const userrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userrouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const users = await prisma.user.findMany({
    select: {
      name: true,
      password: true,
      email: true,
    }
  })

  if (!users) {
    return c.json({ message: "Error while fetching the users" })
  }
  return c.json(users);
})


userrouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const parsed = signupInput.safeParse(body);

    // Check if input is valid
    if (!parsed.success) {
      console.error('Validation errors:', parsed.error);
      return c.json({
        status: 400,
        message: "Invalid input values",
        errors: parsed.error,
      });
    }

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,  // Make sure you hash the password before saving!
      }
    });

    // Generate JWT
    const secret = c.env.JWT_SECRET;
    const jwt = await sign({ id: user.id }, secret);

    // Return JWT to client
    return c.json({
      status: 201,
      jwt,
    });

  } catch (error) {
    console.error('Error in signup process:', error);
    return c.json({
      status: 500,
      message: 'Internal server error',
    });
  }
});


userrouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    // Find user by email first
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    // Handle if user does not exist or incorrect password
    if (!user || user.password !== body.password) {
      return c.json({
        status: 404,
        error: "User not found or invalid credentials"
      });
    }

    // Generate JWT
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    // Return JWT token
    return c.json({
      status: 200,
      jwt
    });

  } catch (error) {
    console.error('Error in signin process:', error);
    return c.json({
      status: 500,
      message: 'Internal server error'
    });
  }
});

