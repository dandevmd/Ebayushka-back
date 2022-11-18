import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import { CategoryModel } from "../models/CategoryModel";
import safe from "@mcrowe/safe-async-express-errors";

class CategoryController {
  create = safe(async (req: Request, res: Response) => {
    console.log(req.body);
    const { name } = req.body;
    if (!name) return res.status(400).send("Name was not provided");

    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    if (!category)
      return res.status(400).send("Was not able to create category");

    return res.status(201).json(category);
  });

  read = safe(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const category = await CategoryModel.findOne({ slug });
    if (!category) {
      return res.status(404).send("Category was not found");
    }
    return res.status(200).send(category);
  });

  

  update = safe(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { name, slug: newSlug } = req.body;

    const category = await CategoryModel.findOneAndUpdate(
      { slug },
      { name, slug: newSlug ? slugify(newSlug) : slug },
      {
        new: true,
      }
    );

    if (!category) {
      res.status(400).send("Failed to update category");
    }
    return res.status(200).send(category);
  });

  remove = safe(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const category = await CategoryModel.findOneAndDelete({ slug });
    if (!category) {
      return res.status(404).send("Removing category gone wrong");
    }
    return res.status(200).send(category);
  });

  list = safe(async (req: Request, res: Response) => {
    const allCategories = await CategoryModel.find({});

    if (!allCategories) {
      res.status(404).send("Cant retrieve category list");
      return;
    }
    return res.status(200).send(allCategories);
  });
}

export const categoryController = new CategoryController();
