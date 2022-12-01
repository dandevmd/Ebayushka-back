import { Request, Response } from "express";
import safe from "@mcrowe/safe-async-express-errors";
import slugify from "slugify";
import { IProduct, ProductModel } from "../models/ProductModel";
import { CategoryModel } from "../models/CategoryModel";
import { SubCategoryModel } from "../models/SubCategoryModel";
import mongoose from "mongoose";

interface IMatch {
  _id: mongoose.Schema.Types.ObjectId;
  document: IProduct;
  floorAverage: number;
}

class ProductsController {
  list = safe(async (req: Request, res: Response) => {
    const count = Number(req.params.count) || 10;
    const allProducts = await ProductModel.find({})
      .limit(count)
      .populate("category")
      .populate("subs")
      .sort([["createdAt", "desc"]])
      .exec();
    !allProducts && res.status(404).send("No products was found");
    return res.status(200).send(allProducts);
  });
  read = safe(async (req: Request, res: Response) => {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    });

    product
      ? res.status(200).send(product)
      : res.status(404).send("Did not find the product");
  });

  create = safe(async (req: Request, res: Response) => {
    const {
      title,
      slug,
      description,
      price,
      category,
      subs,
      quantity,
      sold,
      shipping,
      color,
      brand,
      images,
    } = req.body;

    if (!title || !description || !price || !category || !subs) {
      return res.status(400).send("Required field are not provided");
    }

    const product = {
      title,
      slug: slug ? slug : slugify(title),
      description,
      price,
      category,
      subs,
      quantity: quantity ? quantity : 1,
      sold,
      shipping: shipping ? shipping : "No",
      color: color ? color : "Silver",
      brand: brand ? brand : "Lenovo",
      images: images ? images : null,
    };

    const itExists = await ProductModel.findOne({
      slug: slug ? slug : slugify(title),
    });

    if (itExists) {
      return res.status(400).send("This product already exist.");
    }

    const newProduct = await new ProductModel(product).save();

    newProduct
      ? res.status(201).send(newProduct)
      : res.status(500).send("Error posting new product.");
  });

  update = safe(async (req: Request, res: Response) => {
    const {
      title,
      slug,
      description,
      price,
      category,
      subs,
      quantity,
      sold,
      shipping,
      color,
      brand,
      images,
    } = req.body;

    const product = {
      title: title && title,
      slug: slug ? slug : req.params?.slug,
      description: description && description,
      price: price && price,
      category: category && category,
      subs: subs && subs,
      quantity: quantity && quantity,
      sold: sold && sold,
      shipping: shipping && shipping,
      color: color && color,
      brand: brand && brand,
      images: images && images,
    };

    const updatedProduct = await ProductModel.findOneAndUpdate(
      { slug: req.params?.slug },
      product,
      { new: true }
    );

    updatedProduct
      ? res.status(201).send(updatedProduct)
      : res.status(500).send("Error posting new product.");
  });

  remove = safe(async (req: Request, res: Response) => {
    const { _id } = req.params;

    const deletedItem = await ProductModel.findOneAndDelete({
      _id,
    });

    deletedItem
      ? res.status(200).send(deletedItem)
      : res.status(404).send("Item meant to be deleted was not found");
  });

  filteredBySellerAndArrivals = safe(async (req: Request, res: Response) => {
    const { sort, order, page, perPage } = req.body;
    const sortParam = sort || "createdAt";
    const orderParam = order || "desc";
    const pageParam = page || 1;
    const limitPerPageParam = perPage || 3;

    const countDocuments = await ProductModel.countDocuments();

    const sortedProducts = await ProductModel.find()
      .skip((pageParam - 1) * limitPerPageParam)
      .sort([[sortParam, orderParam]])
      .limit(limitPerPageParam)
      .exec();

    sortedProducts
      ? res.status(200).send({ sortedProducts, countDocuments })
      : res.status(404).send("No products was found by this filter");
  });

  createReview = safe(async (req: Request, res: Response) => {
    const { rating, user_id, productId } = req.body;

    const product =
      productId && (await ProductModel.findById({ _id: productId }));

    const existingReview =
      product &&
      product.ratings &&
      (await product.ratings.find(
        (ele: { rating: number; postedBy: mongoose.Schema.Types.ObjectId }) =>
          ele.postedBy.toString() === user_id.toString()
      ));

    if (existingReview) {
      const ratingUpdated = await ProductModel.updateOne(
        {
          ratings: { $elemMatch: existingReview },
        },
        { $set: { "ratings.$.rating": rating } },
        { new: true }
      ).exec();
      return res.status(200).send(ratingUpdated);
    }
    const ratingAdded = await ProductModel.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { rating, postedBy: user_id } },
      },
      { new: true }
    ).exec();
    return res.status(201).send(ratingAdded);
  });

  getRelated = safe(async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.productId);

    const related = await ProductModel.find({
      _id: { $ne: product && product._id },
      category: product && product.category,
    })
      .limit(3)
      .populate("category")
      .populate("subs")
      .exec();

    return related
      ? res.status(200).send(related)
      : res.status(200).send("No related products found");
  });
  byCategory = safe(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const category = await CategoryModel.findOne({ slug }).exec();
    const productByCategory =
      category &&
      (await ProductModel.find({
        category: category?._id as mongoose.Types.ObjectId,
      }));

    return productByCategory
      ? res.status(200).send(productByCategory)
      : res.status(200).send("By this category no products was found");
  });
  bySub = safe(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const sub = await SubCategoryModel.findOne({ slug }).exec();
    const productsBySub =
      sub &&
      (await ProductModel.find({
        subs: sub?._id as mongoose.Types.ObjectId,
      }));

    return productsBySub
      ? res.status(200).send(productsBySub)
      : res.status(200).send("By this category no products was found");
  });

  bySearchFilters = safe(async (req: Request, res: Response) => {
    const { query, category, rating, price, color } = req.body;
    const queryFilter =
      query && query !== ""
        ? {
            title: {
              $regex: query,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category ? { category } : {};

    const priceFilter = price
      ? {
          price: {
            $gte: Number(price[0]),
            $lte: Number(price[1]),
          },
        }
      : {};

    const colorFilter = color && color !== 'Select color...' ? {color} : {}

    const match:IMatch[] = await ProductModel.aggregate([
      {
        $project: {
          document: "$$ROOT",
          floorAverage: {
            $floor: { $avg: "$ratings.rating" },
          },
        },
      },
      { $match: { floorAverage: rating } },
    ]);

    const product: IProduct[] = await ProductModel.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...colorFilter
    });

    const matchID = match.map((m) => m._id.toString());
    const filterResult = product.filter((el) =>
      matchID.includes(el._id.toString())
    );

    if (rating) {
      return res.send(filterResult);
    }
    return res.send(product);

  
  });
}

export const productsController = new ProductsController();
