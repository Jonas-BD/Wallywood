import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getRecords = async (req: Request, res: Response) => {
    try {
        const data = await prisma.cartLines.findMany()
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch cart lines' })
    }
}

export const getRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid cart line ID' })
    }

    try {
        const data = await prisma.cartLines.findUnique({
            where: { id }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch cart line' })
    }
}

export const createRecord = async (req: Request, res: Response) => {
    const { userId, posterId, quantity } = req.body

    if (!userId || !posterId || !quantity) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    try {
        const data = await prisma.cartLines.create({
            data: {
                userId: Number(userId),
                posterId: Number(posterId),
                quantity: Number(quantity),
            }
        })
        return res.status(201).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to create cart line'})
    }
}

export const updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { userId, posterId, quantity } = req.body

    if (!id) {
        return res.status(500).json({ message: 'Invalid cart line ID' })
    }

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
    }

    try {
        const data = await prisma.cartLines.update({
            where: { id },
            data: {
                userId: Number(userId),
                ...(posterId && { posterId: Number(posterId) }),
                ...(quantity && { quantity: Number(quantity) }),
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to update cart line' })
    }
}

export const deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid cart line ID' })
    }

    try {
        const data = await prisma.cartLines.delete({
            where: { id }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to delete cart line' })
    }
}