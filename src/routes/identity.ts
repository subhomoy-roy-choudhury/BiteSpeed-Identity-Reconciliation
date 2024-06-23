import { Router, Request, Response, NextFunction } from "express";
import Contact from "../models";

const router = Router();

router.post(
  "/identity",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, phoneNumber } = req.body;
      const newContact = new Contact({
        phoneNumber,
        email,
        linkPrecedence: "primary",
      });
      newContact
        .save()
        .then((doc: any) => console.log("New contact created:", doc))
        .catch((err: Error) => console.error("Error creating contact:", err));
      res.json({ status: 1 });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
