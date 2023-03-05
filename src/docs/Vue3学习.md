## nodejs安装

- nrm
- nvm





## Vue3

### 模板语法

解析器 将模板解析为AST 抽象语法树 abstract syntax tree

优化器 遍历AST标记静态节点，静态节点不可变，不需要为打上标签的静态节点创建新的虚拟节点，直接克隆已有的虚拟节点。

代码生成器，使用AST生产渲染函数。

**模板编译指的是模板将编译成render函数的过程，渲染函数的作用是每次执行时，会根据最新状态生成新的vnode**。

### 响应式

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
    
    
    

#### computed 

计算属性就是**当依赖的属性的值发生变化的时候，才会触发他的更改**，如果依赖的值，不发生变化的时候，使用的是缓存中的属性值。

接受一个getter函数，返回一个只读的响应式ref对象。

##### 计算属性缓存和方法的区别

不同之处在于**计算属性值会基于其响应式依赖被缓存**。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 `author.books` 不改变，无论多少次访问 `publishedBooksMessage` 都会立即返回先前的计算结果，而不用重复执行 getter 函数。

相比之下，方法调用**总是**会在重渲染发生时再次执行函数。

**不要在 getter 中做异步请求或者更改 DOM**！
