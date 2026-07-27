import nodeCrypto from "node:crypto";
const subtle = nodeCrypto.webcrypto?.subtle || {};
export {
  subtle as s
};
