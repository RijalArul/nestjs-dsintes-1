import { response, Response } from "express";
// import { Interface } from "readline";

export function ProductResponse(res: Response, code: number, msg: string, data: any) {
    res.status(code).json({
        msg: msg,
        data: data
    })
}