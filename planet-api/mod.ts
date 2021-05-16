import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const PORT = 8000;

app.use(async (ctx, next) => {
  await next();
  const time = ctx.request.headers.get("x-response-time");
  console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;
  ctx.response.headers.set("x-response-time", `${delta}ms`);
});

app.use(async (ctx, next) => {
  ctx.response.body = `
 _   _    _    ____    _    
| \\ | |  / \\  / ___|  / \\   
|  \\| | / _ \\ \\___ \\ / _ \\  
| |\\  |/ ___ \\ ___) / ___ \\ 
|_| \\_/_/   \\_\\____/_/   \\_\\
`;
  await next();
});

if (import.meta.main) {
  await app.listen({ port: PORT });
}
