import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const PORT = 8000;

app.use((ctx) => {
  ctx.response.body = `
 _   _    _    ____    _    
| \\ | |  / \\  / ___|  / \\   
|  \\| | / _ \\ \\___ \\ / _ \\  
| |\\  |/ ___ \\ ___) / ___ \\ 
|_| \\_/_/   \\_\\____/_/   \\_\\
`;
});

if (import.meta.main) {
  await app.listen({ port: PORT });
}
