interface Window {
  $loadingBar?: import("naive-ui").LoadingBarProviderInst;
  $dialog?: import("naive-ui").DialogProviderInst;
  $message?: import("naive-ui").MessageProviderInst;
  $notification?: import("naive-ui").NotificationProviderInst;
}

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void];

  /** 选项数据 */
  type OptionWithKey<K> = { value: K; label: string };
}

/** 构建时间 */
declare const PROJECT_BUILD_TIME: string;

declare var wait: (ttl: number) => Promise<void>;
declare var $loadingBar: import("naive-ui").LoadingBarProviderInst;
declare var $message: import("naive-ui").MessageProviderInst;
declare var $dialog: import("naive-ui").DialogProviderInst;
declare var $notification: import("naive-ui").NotificationProviderInst;
type Code = {
  label: string;
  value: string | number;
};

type Page = {
  /** 总条数 */
  total: number;
  /** 当前页面 */
  pageNo: number;
  /** 分页大小,默认18 */
  pageSize: number;
  totalPage: number;
};
type SearchPage = {
  pageNo: number;
  pageSize?: number;
};
