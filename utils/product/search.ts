import { Request, Response } from "express";
import safe from "@mcrowe/safe-async-express-errors";
import { ProductModel } from "../../models/ProductModel";

export const handleQuery = safe(
  async (req: Request, res: Response, query: any) => {
    const product = await ProductModel.find({ $text: { $search: query } });
    return product;
  }
);

export const handlePrice = safe(
  async (req: Request, res: Response, price: any) => {
    const product = await ProductModel.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    });
    return product;
  }
);
export const handleCategory = safe(
  async (req: Request, res: Response, categories: any) => {
    const product = await ProductModel.find({
      category: categories,
    });
    return product;
  }
);
export const handleRating = safe(
  async (req: Request, res: Response, rating: any) => {
   
    const match = await ProductModel.aggregate([
      {
        $project: {
          document: "$$ROOT",
          floorAverage: {
            $floor: { $avg: "$ratings.rating" },
          },
        },
      },
      { $match: { floorAverage: rating } },
    ])
      .exec();

    return match
  }
);
