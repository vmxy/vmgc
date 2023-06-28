import UAParser from "ua-parser-js";
import { useAuthStore } from "@/store";
import { isArray, isString } from "@/utils";
import { useSSRContext } from "vue";

interface AppInfo {
  /** 项目标题 */
  title: string;
  /** 项目描述 */
  desc: string;
}

/** 项目信息 */
export function useAppInfo(): AppInfo {
  const { VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env;
  let info = {
    title,
    desc,
  };
  if (ssr) {
    const ctx = useSSRContext();
    ["title", "desc"].forEach((key) => {
      info[key] = getEnv(key, ctx) || info[key];
    });
  }
  return info;
}
function getEnv(name, ctx?: { [key: string]: any }) {
  let env = globalThis.__env || {};
  let val = env[name] || ctx[name];
  return val;
}
/** 获取设备信息 */
export function useDeviceInfo() {
  const parser = new UAParser();
  const result = parser.getResult();
  return result;
}

/** 权限判断 */
export function usePermission() {
  const auth = useAuthStore();

  function hasPermission(permission: Auth.RoleType | Auth.RoleType[]) {
    const { userRole } = auth.userInfo;

    let has = userRole === "super";
    if (!has) {
      if (isArray(permission)) {
        has = (permission as Auth.RoleType[]).includes(userRole);
      }
      if (isString(permission)) {
        has = (permission as Auth.RoleType) === userRole;
      }
    }
    return has;
  }

  return {
    hasPermission,
  };
}
