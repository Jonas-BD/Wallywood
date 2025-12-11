import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getRecords = async (req: Request, res: Response) => {
    try {
        const data = await prisma.genre.findMany()
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch genres' })
    }
}

export const getRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid genre ID' })
    }

    try {
        const data = await prisma.genre.findUnique({
            where: { id }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch genre' })
    }
}

export const createRecord = async (req: Request, res: Response) => {
    const { title, slug } = req.body

    if (!title || !slug) {
        return res.status(400).json({ error: 'Missing required fields'})
    }

    try {
        const data = await prisma.genre.create({
            data: {
                title,
                slug
            }
        })
        return res.status(201).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to create genre' })
    }
}

export const updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { title, slug } = req.body

    if (!id) {
        return res.status(500).json({ message: 'Invalid genre ID' })
    }

    try {
        const data = await prisma.genre.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(slug && { slug })
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update genre' })
    }
}

export const deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid genre ID' })
    }

    try {
        const data = await prisma.genre.delete({
            where: { id }
        })
        return res.status(200).json({ message: 'Genre deleted successfully', deletedId: id})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to delete genre' })
    }
}