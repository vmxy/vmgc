import { computed, ref, watch } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { useAppStore, useThemeStore } from "@/store";
import { useRoute } from "vue-router";

type LayoutMode = "vertical" | "horizontal";
type LayoutHeaderProps = Record<UnionKey.ThemeLayoutMode, App.GlobalHeaderProps>;

export function useBasicLayout() {
  const app = useAppStore();
  const theme = useThemeStore();
  const route = useRoute();
  const breakpoints = useBreakpoints(breakpointsTailwind);

  const mode = computed(() => {
    const vertical: LayoutMode = "vertical";
    const horizontal: LayoutMode = "horizontal";
    return theme.layout.mode.includes(vertical) ? vertical : horizontal;
  });

  const headerMode = ref("home");
  headerMode.value = getHeaderMode();
  function getHeaderMode() {
    let hm = route.query.headerMode;
    if (hm instanceof Array) {
      hm = hm[0];
    }
    return hm || headerMode?.value || "home";
  }
  //const isMobile = breakpoints.smaller("sm");
  const isMobile = computed(() => app.isMobile);

  const isSmallScreen = computed(() => {
    let width = theme.config.breakpoints.s;
    return globalThis.innerWidth <= width;
  });

  const layoutHeaderProps: LayoutHeaderProps = {
    vertical: {
      showLogo: false,
      showHeaderMenu: false,
      showMenuCollapse: true,
      mode: "home",
    },
    "vertical-mix": {
      showLogo: false,
      showHeaderMenu: false,
      showMenuCollapse: false,
      mode: "home",
    },
    horizontal: {
      showLogo: true,
      showHeaderMenu: true,
      showMenuCollapse: false,
      mode: "home",
    },
    "horizontal-mix": {
      showLogo: true,
      showHeaderMenu: false,
      showMenuCollapse: true,
      mode: "home",
    },
  };

  const headerProps = computed(() => {
    let props = layoutHeaderProps[theme.layout.mode];
    props.mode = headerMode.value as any;
    return props;
  });

  const siderVisible = computed(() => theme.layout.mode !== "horizontal");
  const siderWidth = computed(() => {
    const { width, mixWidth, mixChildMenuWidth } = theme.sider;
    const isVerticalMix = theme.layout.mode === "vertical-mix";
    let w = isVerticalMix ? mixWidth : width;
    if (isVerticalMix && app.mixSiderFixed) {
      w += mixChildMenuWidth;
    }
    return w;
  });
  const siderCollapsedWidth = computed(() => {
    const { collapsedWidth, mixCollapsedWidth, mixChildMenuWidth } = theme.sider;
    const isVerticalMix = theme.layout.mode === "vertical-mix";
    let w = isVerticalMix ? mixCollapsedWidth : collapsedWidth;
    if (isVerticalMix && app.mixSiderFixed) {
      w += mixChildMenuWidth;
    }
    return w;
  });

  watch(
    isMobile,
    (newValue) => {
      if (newValue) {
        app.setSiderCollapse(true);
      }
    },
    { immediate: true },
  );
  watch(
    () => route.fullPath,
    (nv) => {
      headerMode.value = getHeaderMode();
    },
  );

  return {
    mode,
    headerMode,
    isMobile,
    headerProps,
    siderVisible,
    siderWidth,
    siderCollapsedWidth,
    isSmallScreen,
  };
}
