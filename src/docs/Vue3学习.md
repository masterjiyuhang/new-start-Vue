## nodejs安装

- nrm
- nvm





## Vue3

### 1 模板语法

解析器 将模板解析为AST 抽象语法树 abstract syntax tree

优化器 遍历AST标记静态节点，静态节点不可变，不需要为打上标签的静态节点创建新的虚拟节点，直接克隆已有的虚拟节点。

代码生成器，使用AST生产渲染函数。

**模板编译指的是模板将编译成render函数的过程，渲染函数的作用是每次执行时，会根据最新状态生成新的vnode**。

### 2 响应式

#### ref家族

##### shallowRef

创建一个跟踪自身 `.value` 变化的 ref，但不会使其值也变成响应式的

##### ref

1. 接受一个内部值并返回一个[响应式](https://so.csdn.net/so/search?q=响应式&spm=1001.2101.3001.7020)且可变的 ref 对象。ref 对象仅有一个 `.value` property，指向该内部值。
2. 注意被ref包装之后需要.value 来进行赋值
3. 取页面上的元素

~~~vue
<tempalte>
    <div ref="haha">
        哈哈
    </div>
</tempalte>

<script setup lang="ts">
    import { ref } from 'vue';
    const haha = ref()
</script>
~~~



##### customerRef

customRef 是个工厂函数要求我们返回一个对象 并且实现 get 和 set 适合去做防抖之类的

~~~js
import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

~~~



##### triggerRef

强制更新页面DOM，通常在对浅引用的内部值进行深度变更后使用。

~~~js
const shallow = shallowRef({
  greet: 'Hello, world'
})

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = 'Hello, universe'

// 打印 "Hello, universe"
triggerRef(shallow)
~~~



##### isRef

判断是不是一个ref对象



#### reactive家族

##### reactive

- 用来绑定复杂的数据类型 例如 对象 数组。

- 使用reactive 去修改值无须`.value`

- 对于直接定义的数组进行赋值，不能成功。会脱离响应式。

  - 使用push

  - 或者再包裹一层对象



##### readonly

拷贝一份proxy对象将其设置为只读



##### shallowReactive

只能对浅层的数据，如果是深层的数据只会改变值。不会改变视图



##### shallowReadonly

- [`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly) 的浅层作用形式
- 和 `readonly()` 不同，这里没有深层级的转换：只有根层级的属性变为了只读。属性的值都会被原样存储和暴露，这也意味着值为 ref 的属性**不会**被自动解包了。

#### to家族

##### toRef

- 基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

- 如果原始对象是非[响应式](https://so.csdn.net/so/search?q=响应式&spm=1001.2101.3001.7020)的就不会更新视图 数据是会变的

  - ~~~js
    const state = reactive({
      foo: 1,
      bar: 2
    })
    
    const fooRef = toRef(state, 'foo')
    
    // 更改该 ref 会更新源属性
    fooRef.value++
    console.log(state.foo) // 2
    
    // 更改源属性也会更新该 ref
    state.foo++
    console.log(fooRef.value) // 3
    
    ~~~

- 源码

  - 如果是ref 对象直接返回 否则 调用 ObjectRefImpl 创建一个类ref 对象

    - ~~~ts
      export function toRef<T extends object, K extends keyof T>(
      	object: T,
          key: K,
          defaultValue?: T[k]
      ): ToRef<T[k]>{
          const val = object[key]
          return isRef(val)
          ? val
          : (new ObjectRefImpl(object, key, defaultValue) as any)
      }
      ~~~

    - 

  -  类ref 对象只是做了值的改变 并未处理 收集依赖 和 触发依赖的过程 所以 普通对象无法更新视图

    - ~~~ts
      class ObjectRefImpl<T extends object, K extends keyof T> {
          public readonly __v_isRef = true
          
          constuctor(
          	private readonly _object: T,
              private readonly _key: K,
              private readonly _defaultValue?: T[K]
          ){}
          
          get value(){
              const val = this._object[this._key]
              return val === undefined ? (this._defaultValue as T[K]) : val
          }
          set value(){
              this._object([this._key]) = newVal
          }
      }
      ~~~

    - 

  - 



##### toRefs

- 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。 就是结构reactive对象时用。

- 每个单独的 ref 都是使用 [`toRef()`](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 创建的。

- 源码

  - 把reactive对象的每一个属性都变成ref对象循环 调用了toRef

    - ~~~ts
      export type ToRefs<T = any> = {
          [k in keyof T]: ToRef<T[K]>
      }
      
      export function toRefs<T extends object>(object: T): ToRefs<T> {
          const ret: any = isArray(object) ? new Array(object.length) : {}
          
          for(const key in object){
              ret[key] = toRef(object, key)
          }
          
          return ret
      }
      ~~~

    - 



##### toRaw

- 根据Vue创建的一个代理返回其原始对象。

- `toRaw()` 可以返回由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive)、[`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly)、[`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 或者 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理对应的原始对象。

- 这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

  - ~~~js
    const foo = {}
    const reactiveFoo = reactive(foo)
    
    console.log(toRaw(reactiveFoo) === foo) // true
    ~~~

- 源码

  - 通过 ReactiveFlags 枚举值 取出proxy对象的原始对象

    - ~~~ts
      export const enum ReactiveFlags {
          SKIP = '__v_skip',
          IS_REACTIVE = '__v_isReactive',
          IS_READONLY = '__v_isReadonly',
          IS_SHALLOW = '__v_isShallow',
          RAW = '__v_raw'
      }
      
      export function toRaw<T>(observed T): T {
          const raw = observed && (observed as Target)[ReactiveFlags.RAW]
          return raw ? toRaw(raw) : observed
      }
      ~~~

    - 






##### markRaw()

- 将一个对象标记为不可被转为代理。返回该对象本身。

    - ~~~js
      const foo = markRaw({})
      console.log(isReactive(reactive(foo))) // false
      
      // 也适用于嵌套在其他响应性对象
      const bar = reactive({ foo })
      console.log(isReactive(bar.foo)) // false
      ~~~
    
    - 
    
    
    

### 3 计算属性

#### computed 

计算属性就是**当依赖的属性的值发生变化的时候，才会触发他的更改**，如果依赖的值，不发生变化的时候，使用的是缓存中的属性值。

接受一个getter函数，返回一个只读的响应式ref对象。

##### 计算属性缓存和方法的区别

不同之处在于**计算属性值会基于其响应式依赖被缓存**。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 `author.books` 不改变，无论多少次访问 `publishedBooksMessage` 都会立即返回先前的计算结果，而不用重复执行 getter 函数。

相比之下，方法调用**总是**会在重渲染发生时再次执行函数。

**不要在 getter 中做异步请求或者更改 DOM**！

### 4 侦听器

在状态变化时执行一些副作用。例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。

#### watch

`watch` 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组

~~~js
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

// 不能直接侦听响应式对象的属性值
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})

// 需要用一个返回该属性的 getter 函数：

watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)

~~~

##### 深层监听

显式地加上 `deep` 选项，强制转成深层侦听器

~~~js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++

watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)

watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
~~~

`watch` 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。

可以通过传入 `immediate: true` 选项来强制侦听器的回调立即执行。

#### watchEffect

回调会立即执行，不需要指定 `immediate: true`。

在执行期间，它会自动追踪 `todoId.value` 作为依赖（和计算属性类似）。

每当 `todoId.value` 变化时，回调会再次执行。有了 `watchEffect()`，我们不再需要明确传递 `todoId` 作为源值。

侦听器的回调使用与源完全相同的响应式状态是很常见的。来看个代码。

~~~js
const todoId = ref(1)
const data = ref(null)

watch(todoId, async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
}, { immediate: true })

// 使用watchEffect 来简化上面的代码。watchEffect() 允许我们自动跟踪回调的响应式依赖。

watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})

~~~



#### 区别

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

#### 回调的触发时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'` 选项。

~~~js
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
~~~







### 生命周期

https://cn.vuejs.org/assets/lifecycle.16e4c08e.png

#### 主要流程

render => **setup** => **beforeCreate** => init Options API  => **created** => has pre-compiled template ?   (**beforeMount**): (compile template on-the-fly)  =>  **beforeMount** => init render create & insert DOM nodes => **mounted** => (when date changes  => **beforeUpdate** => re-render and patch => **updated** ) => when component is unmounted => **beforeUnmount** => **unMounted**



#### 生命周期钩子

组合式api才能使用生命周期钩子

##### onMounted

注册一个回调函数，在组件挂载完成后执行。

- 其所有同步子组件都已经被挂载 (不包含异步组件或 `<Suspense>` 树内的组件)。
- 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。

##### onUpdated

注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。

- 父组件的更新钩子将在其子组件的更新钩子之后调用。
- 这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 作为替代。

##### onUnmounted

注册一个回调函数，在组件实例被卸载之后调用。

- 其所有子组件都已经被卸载。
- 所有相关的响应式作用 (渲染作用以及 `setup()` 时创建的计算属性和侦听器) 都已经停止。

##### onBreforeMount

注册一个钩子，在组件被挂载之前被调用。

当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。

在服务端渲染期间这个钩子不会被调用。



##### onBeforeUpdate

注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。

这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。



##### onBeforeUnmount

注册一个钩子，在组件实例被卸载之前调用。

当这个钩子被调用时，组件实例依然还保有全部的功能。

在武器渲染期间这个钩子不会被调用。



##### onErrorCaptured()

注册一个钩子，在捕获了后代组件传递的错误时调用。

错误可以从以下几个来源中捕获：

- 组件渲染
- 事件处理器
- 生命周期钩子
- `setup()` 函数
- 侦听器
- 自定义指令钩子
- 过渡钩子

这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串。

可以在 `errorCaptured()` 中更改组件状态来为用户显示一个错误状态。注意不要让错误状态再次渲染导致本次错误的内容，否则组件会陷入无限循环。

**错误传递规则**

- 默认情况下，所有的错误都会被发送到应用级的 [`app.config.errorHandler`](https://cn.vuejs.org/api/application.html#app-config-errorhandler) (前提是这个函数已经定义)，这样这些错误都能在一个统一的地方报告给分析服务。
- 如果组件的继承链或组件链上存在多个 `errorCaptured` 钩子，对于同一个错误，这些钩子会被按从底至上的顺序一一调用。这个过程被称为“向上传递”，类似于原生 DOM 事件的冒泡机制。
- 如果 `errorCaptured` 钩子本身抛出了一个错误，那么这个错误和原来捕获到的错误都将被发送到 `app.config.errorHandler`。
- `errorCaptured` 钩子可以通过返回 `false` 来阻止错误继续向上传递。即表示“这个错误已经被处理了，应当被忽略”，它将阻止其他的 `errorCaptured` 钩子或 `app.config.errorHandler` 因这个错误而被调用。

##### onActivated

注册一个回调函数，如果组件实例是keep-alive 缓存树的一部分，当组件被插入到DOM树中时被调用。

服务端渲染期间不会被调用。



##### onDeactivated

注册一个回调函数，若组件实例是 [``](https://cn.vuejs.org/api/built-in-components.html#keepalive) 缓存树的一部分，当组件从 DOM 中被移除时调用。

##### 

##### onRenderTracked （only  dev）

注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。

**这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。**

##### onRenderTriggered（only  dev）

注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。

**这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。**



##### onServerPrefetch （ssr only）

注册一个异步函数，在组件实例在服务器上被渲染之前调用。

如果这个钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成。

这个钩子仅会在服务端渲染中执行，可以用于执行一些仅存在于服务端的数据抓取过程。

~~~js
<script setup>
import { ref, onServerPrefetch, onMounted } from 'vue'

const data = ref(null)

onServerPrefetch(async () => {
  // 组件作为初始请求的一部分被渲染
  // 在服务器上预抓取数据，因为它比在客户端上更快。
  data.value = await fetchOnServer(/* ... */)
})

onMounted(async () => {
  if (!data.value) {
    // 如果数据在挂载时为空值，这意味着该组件
    // 是在客户端动态渲染的。将转而执行
    // 另一个客户端侧的抓取请求
    data.value = await fetchOnClient(/* ... */)
  }
})
</script>
~~~

