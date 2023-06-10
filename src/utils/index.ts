export * from "./common";
export * from "./storage";
export * from "./service";
export * from "./router";
export * from "./form";

import * as common from "./common";
import * as router from "./router";
const abc = "abc",
  ef = "ef";
export { common, router, ef };
export default {
  common,
  router,
  abc,
};
