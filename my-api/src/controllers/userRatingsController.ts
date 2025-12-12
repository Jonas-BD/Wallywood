import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getRecords = async (req: Request, res: Response) => {
    try {
        const data = await prisma.userRatings.findMany()
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch user ratings' })
    }
}

export const getRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid user rating ID' })
    }

    try {
        const data = await prisma.userRatings.findUnique({
            where: { id }
        })
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch user rating' })
    }
}

export const createRecord = async (req: Request, res: Response) => {
    const { userId, posterId, numStars  } = req.body

    if (!userId || !posterId || !numStars) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    try {
        const data = await prisma.userRatings.create({
            data: {
                userId: Number(userId),
                posterId: Number(posterId),
                numStars: Number(numStars),
            }
        })
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to create user rating' })
    }
}

export const updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { userId, posterId, numStars } = req.body

    if (!id) {
        return res.status(500).json({ message: 'Invalid user rating ID' })
    }

    try {
        const data = await prisma.userRatings.update({
            where: { id },
            data: {
                ...(userId && { userId: Number(userId) }),
                ...(posterId && { posterId: Number(posterId) }),
                ...(numStars && { numStars: Number(numStars) }),
            }
        })
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to update user rating' })
    }
}

export const deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid user rating ID' })
    }

    try {
        const data = await prisma.userRatings.delete({
            where: { id }
        })
        return res.status(200).json({ message: 'User deleted successfulle', deletedId: id})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete user rating' })
    }
}