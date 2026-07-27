import { J as Jn, h as html } from "./prettier.mjs";
import { c as convert } from "./html-to-text.mjs";
import { j as jsxRuntimeExports, r as reactExports, R as React } from "./react.mjs";
import { Writable } from "node:stream";
function getHtmlNode(path) {
  const topNode = path.node;
  if (topNode) return topNode;
  return path.stack?.[path.stack.length - 1];
}
function recursivelyMapDoc(doc, callback) {
  if (Array.isArray(doc)) return doc.map((innerDoc) => recursivelyMapDoc(innerDoc, callback));
  if (typeof doc === "object") {
    if (doc.type === "line") return callback(doc.soft ? "" : " ");
    if (doc.type === "group") return {
      ...doc,
      contents: recursivelyMapDoc(doc.contents, callback),
      expandedStates: recursivelyMapDoc(doc.expandedStates, callback)
    };
    if ("contents" in doc) return {
      ...doc,
      contents: recursivelyMapDoc(doc.contents, callback)
    };
    if ("parts" in doc) return {
      ...doc,
      parts: recursivelyMapDoc(doc.parts, callback)
    };
    if (doc.type === "if-break") return {
      ...doc,
      breakContents: recursivelyMapDoc(doc.breakContents, callback),
      flatContents: recursivelyMapDoc(doc.flatContents, callback)
    };
    const nextDoc = { ...doc };
    for (const [key, value] of Object.entries(nextDoc)) if (value && typeof value === "object") nextDoc[key] = recursivelyMapDoc(value, callback);
    return nextDoc;
  }
  return callback(doc);
}
const modifiedHtml = { ...html };
if (modifiedHtml.printers) {
  const previousPrint = modifiedHtml.printers.html.print;
  modifiedHtml.printers.html.print = (path, options, print, args) => {
    const node = getHtmlNode(path);
    const rawPrintingResult = previousPrint(path, options, print, args);
    if (node?.type === "ieConditionalComment" || node?.kind === "ieConditionalComment") return recursivelyMapDoc(rawPrintingResult, (doc) => {
      if (typeof doc === "object" && doc.type === "line") return doc.soft ? "" : " ";
      return doc;
    });
    return rawPrintingResult;
  };
}
const defaults = {
  endOfLine: "lf",
  tabWidth: 2,
  plugins: [modifiedHtml],
  bracketSameLine: true,
  parser: "html"
};
const pretty = (str, options = {}) => {
  return Jn(str.replaceAll("\0", ""), {
    ...defaults,
    ...options
  });
};
const plainTextSelectors = [
  {
    selector: "img",
    format: "skip"
  },
  {
    selector: "[data-skip-in-text=true]",
    format: "skip"
  },
  {
    selector: "a",
    options: {
      linkBrackets: false,
      hideLinkHrefIfSameAsText: true
    }
  }
];
function toPlainText(html$1, options) {
  return convert(html$1, {
    wordwrap: false,
    ...options,
    selectors: [...plainTextSelectors, ...options?.selectors ?? []]
  });
}
function createErrorBoundary(reject) {
  if (!React.Component) return (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: props.children });
  return class ErrorBoundary extends React.Component {
    componentDidCatch(error) {
      reject(error);
    }
    render() {
      return this.props.children;
    }
  };
}
const readStream = async (stream) => {
  let result = "";
  const decoder = new TextDecoder("utf-8");
  if ("pipeTo" in stream) {
    const writableStream = new WritableStream({
      write(chunk) {
        result += decoder.decode(chunk, { stream: true });
      },
      close() {
        result += decoder.decode();
      }
    });
    await stream.pipeTo(writableStream);
  } else {
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        result += decoder.decode(chunk, { stream: true });
        callback();
      },
      final(callback) {
        result += decoder.decode();
        callback();
      }
    });
    await new Promise((resolve, reject) => {
      writable.on("pipe", (source) => {
        source.on("error", (err) => {
          writable.destroy(err);
        });
      });
      writable.on("error", reject);
      writable.on("close", () => {
        resolve();
      });
      stream.pipe(writable);
    });
  }
  return result;
};
const render = async (node, options) => {
  const reactDOMServer = await import("./react-dom.mjs").then(function(n) {
    return n.s;
  }).then((m) => {
    if ("default" in m) return m.default;
    return m;
  });
  let html$1;
  await new Promise((resolve, reject) => {
    if (Object.hasOwn(reactDOMServer, "renderToReadableStream") && typeof WritableStream !== "undefined") {
      const ErrorBoundary = createErrorBoundary(reject);
      reactDOMServer.renderToReadableStream(/* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { children: node }) }), {
        progressiveChunkSize: Number.POSITIVE_INFINITY,
        onError(error) {
          reject(error);
        }
      }).then(async (stream) => {
        await stream.allReady;
        return readStream(stream);
      }).then((result) => {
        html$1 = result;
        resolve();
      }).catch(reject);
    } else {
      const ErrorBoundary = createErrorBoundary(reject);
      const stream = reactDOMServer.renderToPipeableStream(/* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { children: node }) }), {
        async onAllReady() {
          html$1 = await readStream(stream);
          resolve();
        },
        onError(error) {
          reject(error);
        },
        progressiveChunkSize: Number.POSITIVE_INFINITY
      });
    }
  });
  if (options?.plainText) return toPlainText(html$1, options.htmlToTextOptions);
  const document = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">${html$1.replace(/<!DOCTYPE.*?>/, "")}`;
  if (options?.pretty) return pretty(document);
  return document;
};
export {
  render as r
};
