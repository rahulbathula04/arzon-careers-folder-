import { T as TSS_SERVER_FUNCTION, d as getServerFnById } from "./server-BKkhNWog.mjs";
var createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
export {
  createSsrRpc as c
};
