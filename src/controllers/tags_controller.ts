import { Request, Response, NextFunction } from "express";
import { getIo } from "../socket";
import Tag from "../models/tag_model";

export const getTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Tag.find({}).sort('-created_at');
        res.json({
            status: "200",
            message: "All data",
            data: data
        })
    }
    catch (err) {
        next(err)
    }
}

export const createTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Tag.create(req.body);
        res.json({
            status: "200",
            message: "Tag created",
            data
        });
        getIo().sockets.emit("ADD_TAG", data);
    }
    catch (err) {
        next(err);
    }
}

export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            status: "200",
            message: "Tag updated",
            data
        })
        getIo().sockets.emit("MODIFY_TAG", data);
    }
    catch (err) {
        next(err)
    }
}

export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Tag.findByIdAndDelete(req.params.id)
        res.json({
            status: "200",
            message: "Tag deleted",
            data
        })
        getIo().sockets.emit("REMOVE_TAG", req.params.id);
    }
    catch (err) {
        next(err)
    }
}