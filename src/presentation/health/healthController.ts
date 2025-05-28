import { Request, Response } from "express";
import { httpResponse } from "../../infrastructure/utils/httpResponse";

export const healthController = (_req: Request, res: Response): void => {
    try {
        httpResponse.success(res, null, "Server is running");
    } catch (error) {
        httpResponse.internalServer(res);
        console.error(error);
    }
}