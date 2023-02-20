import { isRegExp, remove, getFirstComponentChild } from "../utils";

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === "string") {
    return pattern.split(",").indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCacheEntry(cache, key, keys, current?: any) {
  const cached = cache[key];
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

function pruneCache(keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance;
  for (const key in cache) {
    const cachedNode = cache[key];
    if (cachedNode) {
      const name =
        cachedNode.key || getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

const patternTypes = [String, RegExp, Array];

export default {
  name: "RcCache",
  // 不能开启会导致 key 会增加 transition 的key
  // abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number],
  },

  created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    this.$watch("include", (val) => {
      pruneCache(this, (name) => matches(val, name));
    });
    this.$watch("exclude", (val) => {
      pruneCache(this, (name) => !matches(val, name));
    });
  },

  methods: {
    /**
     *
     * 收到销毁 缓存
     */
    close(key) {
      const { cache, keys } = this;
      if (keys.indexOf(key) === -1) {
        console.error(`tab 关闭了一个没有缓存的 key: ${key}`); // eslint-disable-line
        return;
      }
      pruneCacheEntry(cache, key, keys);
    },

    /**
     *
     * 销毁所有
     * @param {any} exclude 需要排除销毁的内容
     */
    closeAll(exclude) {
      for (const key in this.cache) {
        if (exclude === undefined || !matches(exclude, key)) {
          pruneCacheEntry(this.cache, key, this.keys);
        }
      }
    },
  },

  render() {
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);
    const componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      /**
       * 可以用URL 当唯一key 所以用在 URL 缓存时 必须给key
       * <Cache :include="getTabKeepAliveInclude">
       *   <router-view :key="$route.fullPath"></router-view>
       * </Cache>
       */
      const vKey = vnode.key;
      // check pattern
      const name = vKey || getComponentName(componentOptions);
      const { include, exclude } = this;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      const { cache, keys } = this;
      const key =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode); // eslint-disable-line
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  },
};
