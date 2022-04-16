import { ExtendedRoutesConfig, generateRoutes } from "tsoa";

(async ()=>{
    const routeOptions: ExtendedRoutesConfig = {
        basePath: "/",
        routesDir: "./controllers",
        entryFile: "./app.ts",
        noImplicitAdditionalProperties: "throw-on-extras"

    }
    await generateRoutes(routeOptions);
})()