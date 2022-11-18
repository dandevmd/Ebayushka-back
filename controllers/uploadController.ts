import { Request, Response } from "express";
import safe from "@mcrowe/safe-async-express-errors";
import { v2 as cloudinary } from "cloudinary";

class UploadController {
  create = safe(async (req: Request, res: Response) => {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto", //jpeg, png,
    });
    result
      ? res.status(201).send(result)
      : res.status(400).send("Error uploading image");
  });

  read = safe(async (req: Request, res: Response) => {});
  update = safe(async (req: Request, res: Response) => {});

  remove = safe(async (req: Request, res: Response) => {
    const {id:public_id} = req.params
    console.log(req.params)

   await cloudinary.uploader.destroy(public_id);

    res.status(200).send("ok");
  });
}

export const uploadController = new UploadController();
