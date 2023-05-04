import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

const productos = [
  { id: 1, nombre: "Producto 1" },
  { id: 2, nombre: "Producto 2" },
  { id: 3, nombre: "Producto 3" },
];

// Ruta para crear un producto (POST)
router.post("/productos", (ctx) => {
  const producto = ctx.request.body;
  productos.push(producto);
  ctx.response.status = 201;
  ctx.response.body = producto;
});

// Ruta para buscar todos los productos (GET)
router.get("/productos", (ctx) => {
  ctx.response.body = productos;
});

// Ruta para buscar un producto por id (GET)
router.get("/productos/:id", (ctx) => {
  const id = Number(ctx.params.id);
  const producto = productos.find((producto) => producto.id === id);
  if (producto) {
    ctx.response.body = producto;
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Producto no encontrado" };
  }
});

// Ruta para borrar un producto por id (DELETE)
router.delete("/productos/:id", (ctx) => {
  const id = Number(ctx.params.id);
  const index = productos.findIndex((producto) => producto.id === id);
  if (index !== -1) {
    productos.splice(index, 1);
    ctx.response.status = 204;
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Producto no encontrado" };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
