import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import safe from "@mcrowe/safe-async-express-errors";
import { SubCategoryModel } from "../models/SubCategoryModel";
import mongoose from "mongoose";

class SubCategoryController {
  create = safe(async (req: Request, res: Response) => {
    const { name, parent } = req.body;
    if (!name) return res.status(400).send("Name was not provided");

    const sub = await new SubCategoryModel({
      name,
      slug: slugify(name),
      parent: parent as mongoose.Schema.Types.ObjectId,
    }).save();

    if (!sub)
      return res.status(400).send("Was not able to create sub-category");

    return res.status(201).json(sub);
  });

  read = safe(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const sub = await SubCategoryModel.findOne({ slug });
    if (!sub) {
      return res.status(404).send("Sub-category was not found");
    }
    return res.status(200).send(sub);
  });

  update = safe(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { name, slug: newSlug, parent: newParent } = req.body;

    const sub = await SubCategoryModel.findOneAndUpdate(
      { slug },
      {
        name,
        slug: newSlug ? slugify(newSlug) : slug,
        parent: newParent ? newParent : parent,
      },

      {
        new: true,
      }
    );

    if (!sub) {
      res.status(400).send("Failed to update sub-category");
    }
    return res.status(200).send(sub);
  });

  remove = safe(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const sub = await SubCategoryModel.findOneAndDelete({ slug });
    if (!sub) {
      return res.status(404).send("Removing sub-category gone wrong");
    }
    return res.status(200).send(sub);
  });

  list = safe(async (req: Request, res: Response) => {
    const allSub = await SubCategoryModel.find({});

    if (!allSub) {
      res.status(404).send("Cant retrieve category list");
      return;
    }
    return res.status(200).send(allSub);
  });
}

export const subCategoryController = new SubCategoryController();
