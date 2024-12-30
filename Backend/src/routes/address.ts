// src/routes/address.ts
import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';

export const addressRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    Variables: {
        userId: string;
    }
}>();

// Middleware to verify authentication
addressRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            //@ts-ignore
            c.set("userId", user.id)
            await next();
        } else {
            c.status(403)
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

// Create new address
addressRouter.post('/', async (c) => {
    const body = await c.req.json();
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        if (body.isDefault) {
            await prisma.address.updateMany({
                where: {
                    userId: userId,
                    isDefault: true
                },
                data: {
                    isDefault: false
                }
            });
        }

        const address = await prisma.address.create({
            data: {
                label: body.label,
                street: body.street,
                city: body.city,
                state: body.state,
                country: body.country,
                postalCode: body.postalCode,
                latitude: body.latitude,
                longitude: body.longitude,
                isDefault: body.isDefault || false,
                userId: userId
            }
        });

        return c.json({
            id: address.id,
            message: "Address created successfully"
        });
    } catch (error: any) {
        console.error('Error creating address:', error);
        return c.json({
            message: "Error creating address",
            error: error.message
        }, { status: 500 });
    }
});

addressRouter.get('/all', async (c) => {
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const addresses = await prisma.address.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                isDefault: 'desc'
            }
        });

        return c.json({
            addresses
        });
    } catch (error: any) {
        console.error('Error fetching addresses:', error);
        return c.json({
            message: "Error fetching addresses",
            error: error.message
        }, { status: 500 });
    }
});

// Get single address
addressRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const address = await prisma.address.findFirst({
            where: {
                id: id,
                userId: userId
            }
        });

        if (!address) {
            return c.json({
                message: "Address not found"
            }, { status: 404 });
        }

        return c.json({
            address
        });
    } catch (error: any) {
        console.error('Error fetching address:', error);
        return c.json({
            message: "Error fetching address",
            error: error.message
        }, { status: 500 });
    }
});

// Update address
addressRouter.put('/:id', async (c) => {
    const id = c.req.param("id");
    const userId = c.get("userId");
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        // If setting as default, remove default from other addresses
        if (body.isDefault) {
            await prisma.address.updateMany({
                where: {
                    userId: userId,
                    isDefault: true
                },
                data: {
                    isDefault: false
                }
            });
        }

        const address = await prisma.address.updateMany({
            where: {
                id: id,
                userId: userId
            },
            data: {
                label: body.label,
                street: body.street,
                city: body.city,
                state: body.state,
                country: body.country,
                postalCode: body.postalCode,
                latitude: body.latitude,
                longitude: body.longitude,
                isDefault: body.isDefault
            }
        });

        return c.json({
            message: "Address updated successfully"
        });
    } catch (error: any) {
        console.error('Error updating address:', error);
        return c.json({
            message: "Error updating address",
            error: error.message
        }, { status: 500 });
    }
});

// Delete address
addressRouter.delete('/:id', async (c) => {
    const id = c.req.param("id");
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        await prisma.address.deleteMany({
            where: {
                id: id,
                userId: userId
            }
        });

        return c.json({
            message: "Address deleted successfully"
        });
    } catch (error: any) {
        console.error('Error deleting address:', error);
        return c.json({
            message: "Error deleting address",
            error: error.message
        }, { status: 500 });
    }
});

// Set address as default
addressRouter.put('/:id/default', async (c) => {
    const id = c.req.param("id");
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        // Remove default status from all addresses
        await prisma.address.updateMany({
            where: {
                userId: userId,
                isDefault: true
            },
            data: {
                isDefault: false
            }
        });

        // Set new default address
        await prisma.address.updateMany({
            where: {
                id: id,
                userId: userId
            },
            data: {
                isDefault: true
            }
        });

        return c.json({
            message: "Default address updated successfully"
        });
    } catch (error: any) {
        console.error('Error setting default address:', error);
        return c.json({
            message: "Error setting default address",
            error: error.message
        }, { status: 500 });
    }
});