import { Request, Response } from "express";

export const signIn = (req: Request, res: Response) => {
    res.render("home", {
        title: "Home"
    });
};

export const signUp = (req: Request, res: Response) => {
    res.render("home", {
        title: "Home"
    });
};