export const BASE_URL =
    import.meta.env.VITE_MODE === "local" ?
            import.meta.env.VITE_NODE_API_LOCAL_BASE_URL
            : import.meta.env.VITE_NODE_API_PROD_BASE_URL;



const app_configs = {
    BASE_URL,
   
}
export default app_configs;