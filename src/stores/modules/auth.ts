import { getRouterListApi, getAuthButtonListApi } from "./../../api/mock";
import { getAllBreadcrumbList, getShowMenuList } from "@/utils/system";
import { getFlatArr } from "@/utils/arr";
import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { store } from "../index";
import { moduleRouteList } from "@/router/basic";
import { getPublicKey } from "@/api/auth";
// import JSEncrypt from "jsencrypt";
// import { piniaPersistConfig } from "./../storePlugin";

export const AuthStore = defineStore({
  id: "AuthStore",
  state: (): AuthState => ({
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: "",
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    publicKey: "",
  }),
  getters: {
    // 按钮权限列表
    authButtonListGet: (state) => state.authButtonList,
    // 后端返回的菜单列表 ==> 这里没有经过任何处理
    authMenuListGet: (state) => state.authMenuList,
    // 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
    showMenuListGet: (state) => getShowMenuList(state.authMenuList),
    // 扁平化之后的一维数组路由，主要用来添加动态路由
    flatMenuListGet: (state) => getFlatArr(state.authMenuList),
    // 所有面包屑导航列表
    breadcrumbListGet: (state) => getAllBreadcrumbList(state.authMenuList),
    publicKeyGet: (state) => state.publicKey,
  },
  actions: {
    // 获取公钥
    async getPublicKey() {
      const { data } = await getPublicKey();
      this.publicKey = data;
    },
    // 根据公钥加密
    async encrypt(pwd) {
      if (!this.publicKey) {
        throw new Error("公钥未加载");
      }

      const encoder = new TextEncoder();
      const encodedData = encoder.encode(pwd);

      const publicKey = await window.crypto.subtle.importKey(
        "spki",
        this.pemToArrayBuffer(this.publicKey), // 转换 PEM 格式
        {
          name: "RSA-OAEP",
          hash: { name: "SHA-256" }, // 确保与后端匹配
        },
        true,
        ["encrypt"],
      );

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encodedData,
      );

      return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))); // Base64 编码
    }, // PEM 转换为 ArrayBuffer
    pemToArrayBuffer(pem) {
      const b64 = pem.replace(
        /-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\n/g,
        "",
      );
      const binary = atob(b64);
      const buffer = new ArrayBuffer(binary.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < binary.length; i++) {
        view[i] = binary.charCodeAt(i);
      }
      return buffer;
    },
    // getAuthButtonList
    async getAuthButtonList() {
      const { data } = await getAuthButtonListApi();
      console.log("🍉 ~ file: auth.ts:36 ~ getAuthButtonList ~ data:", data);
      this.authButtonList = data;
    },
    // getAuthMenuList
    async getAuthMenuList() {
      const { data } = await getRouterListApi();
      console.log(
        "🍉 ~ file: auth.ts:41 ~ getAuthMenuList ~ data:",
        data,
        moduleRouteList,
      );
      this.authMenuList = data
        .concat(moduleRouteList)
        .sort((a: any, b: any) => {
          const weightA = a.weight || 0;
          const weightB = b.weight || 0;
          return weightB - weightA;
        });
    },
    // setRouteName
    async setRouteName(name: string) {
      this.routeName = name;
    },
  },
  // persist: piniaPersistConfig("AuthStore"),
});

export function useAuthStoreWithOut() {
  return AuthStore(store);
}
