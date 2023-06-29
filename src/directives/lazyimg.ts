/**
 * 图片懒加载
 */
// 导入默认图片
// 引入监听是否进入视口
import type { App, Directive } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
export default function setupLazyimgDirective(app: App) {
  // app 实例身上有我们想要的全局注册指令方法  调用即可
  app.directive("lazyimg", {
    mounted(el, binding) {
      if (ssr) return;
      // el:img dom对象
      // binding.value  图片url地址
      // 使用 vueuse/core 提供的监听 api 对图片 dom 进行监听 正式进入视口才加载
      // img.src = url
      const { stop } = useIntersectionObserver(
        // 监听目标元素
        el,
        ([{ isIntersecting }], observerElement) => {
          if (isIntersecting) {
            // 图片加载失败显示默认图片
            el.onerror = function () {
              el.src = "/box.png";
            };
            // 这里显示传过来的图片数据
            el.src = binding.value;
            stop(); // 中止监听
          }
        },
      );
    },
  });
}
