interface AppState {
  /** 侧边栏展开 */
  isCollapse: boolean;
  /** 搜索框 */
  searchFlag: boolean;
  /** 左侧展开 */
  sideFlag: boolean;
}

export const useAppStore = defineStore("useAppStore", {
	state: (): AppState => ({
		isCollapse: false,
		searchFlag: false,
		sideFlag: false,
	}),
	actions: {
		setCollapse(flag: boolean) {
			this.isCollapse = flag;
		},
	},
	getters: {},
	persist: {
		key: "app",
		storage: sessionStorage,
	},
});
