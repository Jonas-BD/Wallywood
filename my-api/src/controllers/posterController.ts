import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getRecords = async (req: Request, res: Response) => {
    try {
        const data = await prisma.posters.findMany()
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch posters' })
    }
}

export const getRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid poster ID'})
    }

    try {
        const data = await prisma.posters.findUnique({
            where: { id }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch poster'})
    }
}

export const createRecord = async (req: Request, res: Response) => {
    const { name, slug, description, image, width, height, price, stock } = req.body

    if (!name || !slug || !description || !image || !width || !height || !price || !stock) {
        return res.status(400).json({ error: 'Missing required fields'})
    }

    try {
        const data = await prisma.posters.create({
            data: {
                name,
                slug,
                description,
                image,
                width: Number(width),
                height: Number(height),
                price: Number(price),
                stock: Number(stock),
            }
        })
        return res.status(201).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to create poster'})
    }
}

export const updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { name, slug, description, image, width, height, price, stock } = req.body

    if (!id) {
        return res.status(400).json({ error: 'Invalid poster ID'})
    }

    try {
        const data = await prisma.posters.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(slug && { slug }),
                ...(description && { description }),
                ...(image && { image }),
                ...(width && { width: Number(width) }),
                ...(height && { height: Number(height) }),
                ...(price && { price: Number(price) }),
                ...(stock && { stock: Number(stock) })
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to update poster' })
    }
}

export const deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid poster ID' })
    }

    try {
        const data = await prisma.posters.delete({
            where: { id }
        })
        return res.status(200).json({ message: 'Poster deleted successfully', deletedId: id})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to delete poster'})
    }
}