import { A as AbstractChat, D as DefaultChatTransport } from "./ai.mjs";
import { r as reactExports } from "./react.mjs";
import { t as throttleFunction } from "./throttleit.mjs";
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  member.set(obj, value);
  return value;
};
function throttle(fn, waitMs) {
  return waitMs != null ? throttleFunction(fn, waitMs) : fn;
}
var _messages, _status, _error, _messagesCallbacks, _statusCallbacks, _errorCallbacks, _callMessagesCallbacks, _callStatusCallbacks, _callErrorCallbacks;
var ReactChatState = class {
  constructor(initialMessages = []) {
    __privateAdd(this, _messages, void 0);
    __privateAdd(this, _status, "ready");
    __privateAdd(this, _error, void 0);
    __privateAdd(this, _messagesCallbacks, /* @__PURE__ */ new Set());
    __privateAdd(this, _statusCallbacks, /* @__PURE__ */ new Set());
    __privateAdd(this, _errorCallbacks, /* @__PURE__ */ new Set());
    this.pushMessage = (message) => {
      __privateSet(this, _messages, __privateGet(this, _messages).concat(message));
      __privateGet(this, _callMessagesCallbacks).call(this);
    };
    this.popMessage = () => {
      __privateSet(this, _messages, __privateGet(this, _messages).slice(0, -1));
      __privateGet(this, _callMessagesCallbacks).call(this);
    };
    this.replaceMessage = (index, message) => {
      __privateSet(this, _messages, [
        ...__privateGet(this, _messages).slice(0, index),
        // We deep clone the message here to ensure the new React Compiler (currently in RC) detects deeply nested parts/metadata changes:
        this.snapshot(message),
        ...__privateGet(this, _messages).slice(index + 1)
      ]);
      __privateGet(this, _callMessagesCallbacks).call(this);
    };
    this.snapshot = (value) => structuredClone(value);
    this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => {
      const callback = throttleWaitMs ? throttle(onChange, throttleWaitMs) : onChange;
      __privateGet(this, _messagesCallbacks).add(callback);
      return () => {
        __privateGet(this, _messagesCallbacks).delete(callback);
      };
    };
    this["~registerStatusCallback"] = (onChange) => {
      __privateGet(this, _statusCallbacks).add(onChange);
      return () => {
        __privateGet(this, _statusCallbacks).delete(onChange);
      };
    };
    this["~registerErrorCallback"] = (onChange) => {
      __privateGet(this, _errorCallbacks).add(onChange);
      return () => {
        __privateGet(this, _errorCallbacks).delete(onChange);
      };
    };
    __privateAdd(this, _callMessagesCallbacks, () => {
      __privateGet(this, _messagesCallbacks).forEach((callback) => callback());
    });
    __privateAdd(this, _callStatusCallbacks, () => {
      __privateGet(this, _statusCallbacks).forEach((callback) => callback());
    });
    __privateAdd(this, _callErrorCallbacks, () => {
      __privateGet(this, _errorCallbacks).forEach((callback) => callback());
    });
    __privateSet(this, _messages, initialMessages);
  }
  get status() {
    return __privateGet(this, _status);
  }
  set status(newStatus) {
    __privateSet(this, _status, newStatus);
    __privateGet(this, _callStatusCallbacks).call(this);
  }
  get error() {
    return __privateGet(this, _error);
  }
  set error(newError) {
    __privateSet(this, _error, newError);
    __privateGet(this, _callErrorCallbacks).call(this);
  }
  get messages() {
    return __privateGet(this, _messages);
  }
  set messages(newMessages) {
    __privateSet(this, _messages, [...newMessages]);
    __privateGet(this, _callMessagesCallbacks).call(this);
  }
};
_messages = /* @__PURE__ */ new WeakMap();
_status = /* @__PURE__ */ new WeakMap();
_error = /* @__PURE__ */ new WeakMap();
_messagesCallbacks = /* @__PURE__ */ new WeakMap();
_statusCallbacks = /* @__PURE__ */ new WeakMap();
_errorCallbacks = /* @__PURE__ */ new WeakMap();
_callMessagesCallbacks = /* @__PURE__ */ new WeakMap();
_callStatusCallbacks = /* @__PURE__ */ new WeakMap();
_callErrorCallbacks = /* @__PURE__ */ new WeakMap();
var _state;
var Chat = class extends AbstractChat {
  constructor({ messages, ...init }) {
    const state = new ReactChatState(messages);
    super({ ...init, state });
    __privateAdd(this, _state, void 0);
    this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => __privateGet(this, _state)["~registerMessagesCallback"](onChange, throttleWaitMs);
    this["~registerStatusCallback"] = (onChange) => __privateGet(this, _state)["~registerStatusCallback"](onChange);
    this["~registerErrorCallback"] = (onChange) => __privateGet(this, _state)["~registerErrorCallback"](onChange);
    __privateSet(this, _state, state);
  }
};
_state = /* @__PURE__ */ new WeakMap();
function useChat({
  throttle: throttle2,
  experimental_throttle,
  resume = false,
  ...options
} = {}) {
  const throttleWaitMs = throttle2 != null ? throttle2 : experimental_throttle;
  const latestRef = reactExports.useRef({});
  if (!("chat" in options)) {
    latestRef.current = {
      onToolCall: options.onToolCall,
      onData: options.onData,
      onFinish: options.onFinish,
      onError: options.onError,
      sendAutomaticallyWhen: options.sendAutomaticallyWhen,
      transport: options.transport
    };
  }
  let defaultTransport;
  const getTransport = () => {
    var _a;
    return (_a = latestRef.current.transport) != null ? _a : defaultTransport != null ? defaultTransport : defaultTransport = new DefaultChatTransport();
  };
  const chatOptions = {
    ...options,
    transport: {
      sendMessages: (sendOptions) => getTransport().sendMessages(sendOptions),
      reconnectToStream: (reconnectOptions) => getTransport().reconnectToStream(reconnectOptions)
    },
    onToolCall: (arg) => {
      var _a, _b;
      return (_b = (_a = latestRef.current).onToolCall) == null ? void 0 : _b.call(_a, arg);
    },
    onData: (arg) => {
      var _a, _b;
      return (_b = (_a = latestRef.current).onData) == null ? void 0 : _b.call(_a, arg);
    },
    onFinish: (arg) => {
      var _a, _b;
      return (_b = (_a = latestRef.current).onFinish) == null ? void 0 : _b.call(_a, arg);
    },
    onError: (arg) => {
      var _a, _b;
      return (_b = (_a = latestRef.current).onError) == null ? void 0 : _b.call(_a, arg);
    },
    sendAutomaticallyWhen: (arg) => {
      var _a, _b, _c;
      return (_c = (_b = (_a = latestRef.current).sendAutomaticallyWhen) == null ? void 0 : _b.call(_a, arg)) != null ? _c : false;
    }
  };
  const chatRef = reactExports.useRef(
    "chat" in options ? options.chat : new Chat(chatOptions)
  );
  const shouldRecreateChat = "chat" in options && options.chat !== chatRef.current || "id" in options && options.id != null && chatRef.current.id !== options.id;
  if (shouldRecreateChat) {
    chatRef.current = "chat" in options ? options.chat : new Chat(chatOptions);
  }
  const subscribeToMessages = reactExports.useCallback(
    (update) => chatRef.current["~registerMessagesCallback"](update, throttleWaitMs),
    // `chatRef.current.id` is required to trigger re-subscription when the chat ID changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [throttleWaitMs, chatRef.current.id]
  );
  const messages = reactExports.useSyncExternalStore(
    subscribeToMessages,
    () => chatRef.current.messages,
    () => chatRef.current.messages
  );
  const status = reactExports.useSyncExternalStore(
    chatRef.current["~registerStatusCallback"],
    () => chatRef.current.status,
    () => chatRef.current.status
  );
  const error = reactExports.useSyncExternalStore(
    chatRef.current["~registerErrorCallback"],
    () => chatRef.current.error,
    () => chatRef.current.error
  );
  const setMessages = reactExports.useCallback(
    (messagesParam) => {
      if (typeof messagesParam === "function") {
        messagesParam = messagesParam(chatRef.current.messages);
      }
      chatRef.current.messages = messagesParam;
    },
    [chatRef]
  );
  reactExports.useEffect(() => {
    if (resume) {
      chatRef.current.resumeStream();
    }
  }, [resume, chatRef]);
  return {
    id: chatRef.current.id,
    messages,
    setMessages,
    sendMessage: chatRef.current.sendMessage,
    regenerate: chatRef.current.regenerate,
    clearError: chatRef.current.clearError,
    stop: chatRef.current.stop,
    error,
    resumeStream: chatRef.current.resumeStream,
    status,
    /**
     * @deprecated Use `addToolOutput` instead.
     */
    addToolResult: chatRef.current.addToolOutput,
    addToolOutput: chatRef.current.addToolOutput,
    addToolApprovalResponse: chatRef.current.addToolApprovalResponse
  };
}
export {
  useChat as u
};
