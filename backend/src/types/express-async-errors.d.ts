declare module "express-async-errors" {
  import { RequestHandler } from "express";
  export default function (fn: RequestHandler): RequestHandler;
}
