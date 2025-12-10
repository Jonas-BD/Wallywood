import e, { Request, Response } from "express"
import { prisma } from "../prisma"
import bcrypt from "bcrypt"

export const getRecords = async (req: Request, res: Response) => {
    try {
        const data = await prisma.user.findMany()
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json( { error: 'Failed to fetch users' })
    }
}

export const getRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { firstname, lastname, email, password, role, isActive } = req.body
    if (!id) {
        return res.status(400).json({ error: 'Invalid user ID'})
    }

    try {
        const data = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                role: true,
                isActive: Boolean(isActive)
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user'})
    }
}

export const createRecord = async (req: Request, res: Response) => {
    const { firstname, lastname, email, password, role, isActive, createdAt } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    if (!firstname || !lastname || !email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields'})
    }

    try {
        const data = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                role,
                isActive: Boolean(isActive),
                createdAt
            }
        })
        return res.status(201).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create user' })
    }
}

export const updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { firstname, lastname, email, password, role, isActive } = req.body

    if (!id) {
        return res.status(400).json({ error: 'Invalid user ID'})
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    if (!firstname || !lastname || !email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields'})
    }

    try {
        const data = await prisma.user.update({
            where: { id },
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                role,
                isActive: Boolean(isActive)
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update user'})
    }
}

export const deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid user ID'})
    }

    try {
        const data = await prisma.user.delete({
            where: { id }
        })
        return res.status(200).json({ message: 'User deleted successfulle', deletedId: id})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete user'})
    }
}