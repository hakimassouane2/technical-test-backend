import * as express from "express";
import { Request, Response } from "express";
import { Product } from "./entity/Product";
import { myDataSource } from "./app-data-source";
import * as cors from "cors";

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app
const app = express();
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(express.json());
app.use(cors(options));

// register routes
app.get("/products", async function (req: Request, res: Response) {
  const products = await myDataSource.getRepository(Product).find();
  res.json(products);
});

app.post("/products", async function (req: Request, res: Response) {
  const product = await myDataSource.getRepository(Product).create(req.body);
  const results = await myDataSource.getRepository(Product).save(product);
  return res.send(results);
});

app.put("/products/:id", async function (req: Request, res: Response) {
  const product = await myDataSource.getRepository(Product).findOneBy({
    id: parseInt(req.params.id),
  });
  myDataSource.getRepository(Product).merge(product, req.body);
  const results = await myDataSource.getRepository(Product).save(product);
  return res.send(results);
});

app.delete("/products/:id", async function (req: Request, res: Response) {
  const results = await myDataSource
    .getRepository(Product)
    .delete(req.params.id);
  return res.send(results);
});

// start express server
app.listen(8080);
