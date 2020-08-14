# 目录
```bash
    // done: ✔︎ , doing: - , plan: *
    ├──Button                       ✔︎ 按钮组件
    ├──Input                        ✔︎ 输入框组件
    ├──Cell                         ✔︎ 列表单元格
    ├──Flex                         ✔︎ Flex组件
    ├──Loading                      ✔︎ Loading组件
    ├──Mask                         ✔︎ Mask蒙层组件
    ├──WhiteSpace                   ✔︎ 上下间距
    ├──WingBlank                    ✔︎ 两侧空白
    ├──Slider                       ✔︎ 滑块
    ├──Tooltip                      ✔︎ 提示框
    ├──Modal                        ✔︎ Modal，Modal对话框
    ├──Pop                          ✔︎ Pop弹出框
    ├──Toast                        ✔︎ Toast，提示框
    ├──Tabs                         ︎︎︎✔︎ Tab
    ├──TabPage                     ︎︎ ︎✔︎ TabPage 页面导航
    ├──Icon                        ︎ ✔︎︎ Icon
    ├──Progress                     ︎✔︎︎  Progress 进度条(建议：应支持圆形和条状的)
    ├──Gesture                      ︎✔︎︎  手势系统
    ├──Sortable                     ✔︎︎  排序组件
    ├──RgbwSlider                   ︎✔︎︎  RgbwSlider Rgbw 颜色选择器
    ├──CctSlider                    ✔︎︎  CctSlider Cct 色温选择器
    ├──Switch                       ✔︎︎  Switch 开关
    ├──Checkbox                     ✔︎︎ Checkbox 单选=
    ├──Radio                        ✔︎︎ Radio 单选
    ├──Badge                        ✔︎︎ Badge 徽章
    ├──Text                         ✔︎︎ Text 多行输入框
    ├──Empty                        ✔︎︎ Empty 空省（建议：包含各个列表数据的Empty）
    ├──Dropdown                     ✔︎︎  Dropdown 下拉框
    ├──LazyImage                    ✔︎︎  Lazy 懒加载图片
    ├──Picker                       ✔︎︎ Picker 选择器
    ├──LoadMore                     ✔︎︎  LoadMore（建议：应支持未开始，加载中，没有更多等状态）
```
# Button

按钮说明, 支持 Styling component

```javascript
export const PROP_TYPES_TYPE = [
  "",
  "text"
  "primary",
  "secondary",
  "info",
  "success",
  "error",
  "warn",
  "surface",
  "neuter50",
  "neuter100",
  "neuter200",
  "neuter300",
  "neuter400",
  "neuter500",
  "neuter600",
  "neuter700",
  "neuter800",
  "neuter900"
];


export const PROP_TYPES_COLOR = [
  "primary",
  "secondary",
  "info",
  "success",
  "error",
  "warn",
  "background",
  "surface",
  "neuter50",
  "neuter100",
  "neuter200",
  "neuter300",
  "neuter400",
  "neuter500",
  "neuter600",
  "neuter700",
  "neuter800",
  "neuter900"
];
```

为更好的满足需求，为 text, surface 类型的 button 放开 color 定义。

## 注意

为满足链接需求，开放 as 和 to 参数，link 接收 react-router-dom.Link，to 接收链接地址

```javascript
import { Link } from 'react-router-dom';

<Button as={Link} to="abc">
  打开链接
</Button>;
```

## 属性说明

| 属性      | 说明                                           | 类型    | 默认值    |
| --------- | ---------------------------------------------- | ------- | --------- |
| type      | 按钮类型，PROP_TYPES_TYPE                      | string  | primary   |
| size      | 按钮大小，可选值为`large`/`small`              | string  | large     |
| block     | block 元素                                     | boolean | true      |
| round     | 圆弧                                           | boolean | false     |
| disabled  | 设置禁用                                       | boolean | false     |
| loading   | 加载中                                         | boolean | false     |
| plain     | 扁平化                                         | boolean | false     |
| textAlign | 文字排版,可选值为`center`/`left`/`right`       | string  | `center`  |
| color     | type 为，`surface`, `text`时，PROP_TYPES_COLOR | string  | `primary` |

## 方法

| 名称    | 说明     | 默认值   |
| ------- | -------- | -------- |
| onClick | 按钮点击 | () => {} |

# Input

输入框组件，支持 Styling component

## API

| 属性         | 说明                                                   | 类型    | 默认值 |
| ------------ | ------------------------------------------------------ | ------- | ------ |
| type         | 输入框类型，可选值为`text`/`password`/`number`/`phone` | string  | `text` |
| readOnly     | 只读属性                                               | boolean | false  |
| disabled     | 失效                                                   | boolean | false  |
| defaultValue | 默认值                                                 | string  | 无     |
| value        | 值                                                     | string  | 无     |
| placeholder  | placeholder                                            | string  | 无     |
| edit         | 是否显示编辑图标                                       | boolean | false  |
| clear        | 清除功能                                               | boolean | false  |
| eye          | 查看密码功能                                           | boolean | false  |

## 方法

| 名称     | 说明       | 默认值   |
| -------- | ---------- | -------- |
| onChange | 输入值改变 | () => {} |
| onBlur   | 失去焦点   | () => {} |
| onFocus  | 后去焦点   | () => {} |

# Cell

Cell 布局，Cell 为列表而工作，`Cell`组件包含`CellItem`、`CellHeader`、`CellBody`、`CellFooter`、`CellLabel`等子组件

## Cell 列表框

无属性要求

## CellItem 列表子组件

注意：可当成 Link 使用

```javascript
import { Link } from 'react-router-dom';

<CellItem as={Link} to="abc">
  打开链接
</CellItem>;
```

| 属性     | 说明                 | 类型            | 默认值 |
| -------- | -------------------- | --------------- | ------ |
| to       | 链接地址             | sting           | ''     |
| noGap    | 不需要默认 padding   | boolean         | false  |
| spacings | [垂直间距, 水平间距] | arrayOf(number) | [9, 8] |

## CellHeader 子组件左侧元素

| 属性    | 说明 | 类型   | 默认值 |
| ------- | ---- | ------ | ------ |
| spacing | 宽度 | number | 0      |

## CellBody 子组件左侧元素

非必要，无属性要求

## CellFooter 子组件左侧元素

| 属性  | 说明         | 类型             | 默认值   |
| ----- | ------------ | ---------------- | -------- |
| arrow | 是否显示箭头 | boolean          | false    |
| align | 对齐方式     | string.flexAlign | `center` |

## CellLabel 为表单布局而生

非必要，无属性要求

# Flex

Flex 布局

```
// flex Wrap
const flexWrap = PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']);

// Flex Direction
const flexDirection = PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']);

// Flex Justify
const flexJustify = PropTypes.oneOf([
  '',
  'flex-start',
  'flex-end',
  'center',
  'baseline',
  'space-between',
  'space-around',
  'stretch',
]);

// Flex Align
const flexAlign = PropTypes.oneOf(['', 'space-between', 'flex-start', 'flex-end', 'center', 'space-around', 'stretch']);

```

## Flex 属性说明

| 属性      | 说明            | 类型                              | 默认值   |
| --------- | --------------- | --------------------------------- | -------- |
| direction | flex-direct     | flexDirection                     | `row`    |
| wrap      | flex-wrap       | flexWrap                          | `nowrap` |
| justify   | justify-content | flexJustify                       | ``       |
| align     | align-items     | flexAlign                         | ``       |
| padding   | padding         | [number, string],最多可定义四个值 | [0]      |
| height    | 高度            | [number, string]                  | `auto`   |
| width     | 宽度            | [number, string]                  | `auto`   |

## FlexItem 属性说明

| 属性   | 说明        | 类型 默认值 |
| ------ | ----------- | ----------- |
| flex   | flex 占位   | number      | 1 |
| grow   | flex grow   | number      | 0 |
| shrink | flex shrink | number      | 1 |
| align  | align-self  | flexAlign   | `` |

# Loading

加载中说明

```javascript
export const PROP_TYPES_TYPE = [
  'primary',
  'secondary',
  'info',
  'success',
  'error',
  'warn',
  'surface',
  'neuter50',
  'neuter100',
  'neuter200',
  'neuter300',
  'neuter400',
  'neuter500',
  'neuter600',
  'neuter700',
  'neuter800',
  'neuter900',
];
```

## 属性说明

| 属性  | 说明                                      | 类型   | 默认值  |
| ----- | ----------------------------------------- | ------ | ------- |
| color | loading 颜色 ,PROP_TYPES_TYPE，或特定颜色 | string | #fff    |
| size  | loading 大小，会转为 rem                  | number | 48      |
| type  | ['bubbles', 'bars', 'spokes', 'spin']     | string | bubbles |

# WhiteSpace

上下距离，用于替换元素的 marginTop/marginBottom 写法，最终的计算时 spacing \* 4px， size \* 1px

## 属性说明

| 属性    | 说明 | 类型           | 默认值 |
| ------- | ---- | -------------- | ------ |
| spacing | 大小 | number         | 0      |
| size    | 大小 | 优先于 spacing | null   |

# WingBlank

两边距离，用于替换块元素的 marginLeft，marginRight 的写法，最终的计算时 spacing \* 4px， size \* 1px

## 属性说明

| 属性    | 说明 | 类型           | 默认值 |
| ------- | ---- | -------------- | ------ |
| spacing | 大小 | number         | 0      |
| size    | 大小 | 优先于 spacing | null   |

# Slider

滑块

## 属性说明

| 属性         | 说明           | 类型    | 默认值 |
| ------------ | -------------- | ------- | ------ |
| min          | 最小值         | number  | 0      |
| max          | 最大值         | number  | 100    |
| defaultValue | 默认值         | number  | 0      |
| disabled     | 禁用           | boolean | false  |
| tooltip      | tooltip 提示框 | bool    | false  |

## 方法

| 名称     | 说明                | 默认值   |
| -------- | ------------------- | -------- |
| onChange | slider 值修改时触发 | () => {} |

# Slider

滑块

## 属性说明

| 属性           | 说明     | 类型                      | 默认值  |
| -------------- | -------- | ------------------------- | ------- |
| defaultVisible | 默认可见 | boolean                   | false   |
| placement      | 位置     | `top`, `bottom`           | `top`   |
| value          | 默认值   | string/number             | null    |
| trigger        | 触发方式 | `hover`, `focus`, `click` | `focus` |

## TODO

动画优化

# Modal

Modal 对话框

## 属性说明

| 属性         | 说明         | 类型    | 默认值 |
| ------------ | ------------ | ------- | ------ |
| title        | 对话框标题   | string  | null   |
| visible      | 是否可见     | boolean | false  |
| closable     | 关闭按钮     | boolean | false  |
| confirm      | 确认按钮     | string  | ''     |
| cancel       | 取消按钮     | string  | ''     |
| maskClosable | 点击蒙层关闭 | boolean | true   |

## 方法说明

| 属性       | 说明                     | 默认值   |
| ---------- | ------------------------ | -------- |
| onClose    | 关闭                     | () => {} |
| afterClose | 关闭动画结束             | () => {} |
| onConfirm  | 点击 confirm, 支持 async | () => {} |
| onCancel   | 点击 cancel，支持 async  | () => {} |

## 行内调用

```javascript
Modal.alert({ title, content, confirm, onConfirm });
Modal.confirm({ title, content, confirm, cancel, onConfirm, onCancel });

Modal.pop({ title, content, confirm, cancel, maskClosable, onConfirm, onCancel, fill });
```
# Pop

Pop 对话框

## 属性说明

| 属性         | 说明         | 类型            | 默认值   |
| ------------ | ------------ | --------------- | -------- |
| placement    | 位置         | `top`, `bottom` | `bottom` |
| title        | 对话框标题   | string          | null     |
| visible      | 是否可见     | boolean         | false    |
| closable     | 关闭按钮     | boolean         | false    |
| maskClosable | 点击蒙层关闭 | boolean         | true     |

## 方法说明

| 属性       | 说明         | 默认值   |
| ---------- | ------------ | -------- |
| onClose    | 关闭         | () => {} |
| afterClose | 关闭动画结束 | () => {} |

## 行内调用

```javascript
Modal.pop({ title, content, confirm, cancel, maskClosable, onConfirm, onCancel });
```

# Toast

Toast 提示框

## 全局方法

```javascript
/**
 * content 内容
 * duration 持续时间, 1 equal 100ms, 默认2.5
 * delay delay时间, 1 equal 100ms, 在delay时间内调用destroy，不会显示提示
 * onClose，关闭后回调
 */

$Toast.info(content, duration, delay, onClose);

$Toast.success(duration, delay, onClose);

$Toast.failure(duration, delay, onClose);

$Toast.loading({ type = 'bubbles', fill = 'transparent', color = 'primary' }, delay, onClose);

$Toast.modal({ title, content, confirm, cancel, maskClosable, onConfirm, onCancel })

// 销毁
$Toast.destroy();
```

# Tabs

## Tabs 属性说明

| 属性     | 说明     | 类型                  | 默认值   |
| -------- | -------- | --------------------- | -------- |
| tabs     | tab 数据 | arrayOf[{key, title}] | []       |
| onChange | tab 改变 | func                  | () => {} |
| type     | 类型     | `rect`, `circle`      | `rect`   |

# TabPage

TabPage 布局，包含三个子组件 TabPagePanel,
TabPageBar,
TabPageBarItem。服务于主页/栏目级别的页面

## TabPage

布局框，无属性需求

## TabPagePanel

TabPage 的内容面板，无属性需求

## TabPageBar

TabPage 的导航条，无属性需求

## TabPageBarItem。服务于主页 属性说明

| 属性 | 说明      | 类型   | 默认值 |
| ---- | --------- | ------ | ------ |
| icon | icon 图标 | string | ''     |

# Icon

Icon， 支持 Styling component

```javascript
const PROP_TYPES_COLOR: [
'transparent',
'primary',
'secondary',
'info',
'success',
'error',
'warn',
'background',
'surface',
'neuter50',
'neuter100',
'neuter200',
'neuter300',
'neuter400',
'neuter500',
'neuter600',
'neuter700',
'neuter800',
'neuter900',
];

const _size = {
  small: 48,
  medium: 64,
  large: 120,
};
```

## 属性说明

| 属性     | 说明                               | 类型   | 默认值 |
| -------- | ---------------------------------- | ------ | ------ |
| color    | 颜色 PROP_TYPES_COLOR              | string | ``     |
| size     | icon 大小                          | string | small  |
| fontSize | icon 大小, 会转为 rem，优先于 size | number |        |

# Progress

进度条

## 属性说明

| 属性    | 说明     | 类型                     | 默认值 |
| ------- | -------- | ------------------------ | ------ |
| type    | 类型     | string[`line`, `circle`] | `line` |
| percent | 当前单独 | 0-100 数字               | 0      |

# 手势

手势系统，包括 Drag 拖拽组件，LongPress 长按组件，Pulldown 下拉刷新组件。基于 react-use-gesture 开发，同时暴露以下方法

- ✔︎ useDrag
- ✔︎ usePinch
- ✔︎ useGesture

## LongPress 组件

| 事件    | 说明     | 类型 | 默认值   |
| ------- | -------- | ---- | -------- |
| onPress | 长按事件 | func | () => {} |

## Drag 组件

| 属性      | 说明       | 类型                                    | 默认值 |
| --------- | ---------- | --------------------------------------- | ------ |
| bounds    | 安全区域   | number[`top`, `right`, `bottom`, `left` | null   |
| offset    | 元素坐标   | [left, top]                             | [0, 0] |
| direction | 允许的方向 | sting[`x`, `y`]                         | null   |

| 事件   | 说明     | 类型                | 默认值   |
| ------ | -------- | ------------------- | -------- |
| onDrag | 拖拽事件 | ([left, top]) => {} | () => {} |

## 排序组件

| 属性         | 说明               | 类型                                 | 默认值                 |
| ------------ | ------------------ | ------------------------------------ | ---------------------- |
| data         | 排序数据           | array                                | []                     |
| direction    | 允许的方向         | sting[`x`, `y`, `xy`],`xy`为网格排序 | `y`                    |
| disabled     | 失效               | bool                                 | false                  |
| render       | render 子元素      | func                                 | (value, index) => null |
| renderHandle | render handle 元素 | func                                 | (value, index) => null |

| 事件        | 说明     | 类型 | 默认值   |
| ----------- | -------- | ---- | -------- |
| onSortStart | 排序开始 | func | () => {} |
| onSortMove  | 排序中   | func | () => {} |
| onSortEnd   | 排序结束 | func | () => {} |

# RgbSlider

色块

## 属性说明

| 属性         | 说明     | 类型        | 默认值    |
| ------------ | -------- | ----------- | --------- |
| disabled     | 禁用状态 | boolean     | false     |
| defaultValue | 默认颜色 | string`hex` | `#ff0000` |

## 事件说明

| 属性     | 说明         | 类型             | 默认值   |
| -------- | ------------ | ---------------- | -------- |
| onChange | 修改事件回调 | func,(hex) => {} | () => {} |

# Switch

按钮说明, 支持 Styling component

## 属性说明

| 属性     | 说明         | 类型    | 默认值 |
| -------- | ------------ | ------- | ------ |
| checked  | 是否默认选中 | boolean | false  |
| disabled | 是否不可修改 | boolean | false  |

## 方法

| 属性     | 说明                                                                                      | 类型                  | 默认值 |
| -------- | ----------------------------------------------------------------------------------------- | --------------------- | ------ |
| onChange | change 事件触发的回调函数                                                                 | (checked: bool): void | 无     |
| onClick  | click 事件触发的回调函数，当 switch 为 disabled 时，入参的值始终是默认传入的 checked 值。 | (checked: bool): void | 无     |

# Checkbox

Checkbox 复选框

## 属性说明

| 属性           | 说明                        | 类型   | isRequire | 默认值      |
| -------------- | --------------------------- | ------ | --------- | ----------- |
| color          | 颜色，可选值见 `Color 颜色` | string | false     | `secondary` |
| defaultChecked | 默认选中（非受控组件）      | bool   | false     | 无          |
| checked        | 当前选中                    | bool   | false     | 无          |
| disabled       | 禁用勾选                    | bool   | false     | false       |

## 方法说明

| 属性     | 说明       | 默认值   |
| -------- | ---------- | -------- |
| onChange | 点击复选框 | () => {} |

# Radio

Radio 单选框

## 属性说明

| 属性     | 说明                        | 类型   | isRequire | 默认值      |
| -------- | --------------------------- | ------ | --------- | ----------- |
| color    | 颜色，可选值见 `Color 颜色` | string | false     | `secondary` |
| name     | 分组命名                    | string | false     | `radio`     |
| checked  | 当前选中                    | bool   | false     | 无          |
| disabled | 禁用勾选                    | bool   | false     | false       |

## 方法说明

| 属性     | 说明       | 默认值   |
| -------- | ---------- | -------- |
| onChange | 点击复选框 | () => {} |

# Badge

徽章，对其子元素生效，支持 Styling component

## 属性说明

| 属性      | 说明                                                                     | 类型   | 默认值     |
| --------- | ------------------------------------------------------------------------ | ------ | ---------- |
| count     | Badge 中显示的内容                                                       | number | null       |
| color     | 徽章类型，可选值为 `Color 颜色`                                          | string | 'error'    |
| size      | 按钮大小，可选值为 `large`/`medium`/`small`                              | string | 'large'    |
| position  | 不含子节点时设置为`relative`可显示在行内，可选值为 `absolute`/`relative` | string | 'absolute' |
| max       | 计数最大值，超出时显示 xxx+                                              | number | 99         |
| invisible | 是否显示 Badge                                                           | bool   | null       |
| showZero  | 当 content 为 0 时，是否显示 Badge                                       | bool   | false      |

# Badge

徽章，对其子元素生效，支持 Styling component

## 属性说明

| 属性      | 说明                                                                     | 类型   | 默认值     |
| --------- | ------------------------------------------------------------------------ | ------ | ---------- |
| count     | Badge 中显示的内容                                                       | number | null       |
| color     | 徽章类型，可选值为 `Color 颜色`                                          | string | 'error'    |
| size      | 按钮大小，可选值为 `large`/`medium`/`small`                              | string | 'large'    |
| position  | 不含子节点时设置为`relative`可显示在行内，可选值为 `absolute`/`relative` | string | 'absolute' |
| max       | 计数最大值，超出时显示 xxx+                                              | number | 99         |
| invisible | 是否显示 Badge                                                           | bool   | null       |
| showZero  | 当 content 为 0 时，是否显示 Badge                                       | bool   | false      |

# Empty

Empty 空列表

## API

| 属性 | 说明      | 类型                                | 默认值 |
| ---- | --------- | ----------------------------------- | ------ |
| icon | icon 图标 | string[`storage`, `list`, `folder`] | null   |

# Flex

Flex 布局

## Flex 属性说明

## FlexItem 属性说明

| 属性 | 说明      | 类型   | 必填   | 默认值 |
| ---- | --------- | ------ | ------ | ------ |
| flex | flex 占位 | number | 非必填 | 1      |

# PickerView

PickerView 的功能类似于 Picker ，但它是直接渲染在区域中，而不是弹出窗口

## 属性说明

| 属性       | 说明                                                                   | 类型    | 默认值   |
| ---------- | ---------------------------------------------------------------------- | ------- | -------- |
| data       | 数据源, 由对象`array[{object}]`或数组`array[[array]]`组成的数组        | array   |          |
| value      | 当前值, 格式是`[value1, value2, value3]`, 对应数据源的相应级层 `value` | array   |          |
| cascade    | 是否级联                                                               | boolean | false    |
| title      | 标题                                                                   | string  |          |
| okText     | 确定按钮文本                                                           | string  | `Done`   |
| cancelText | 取消按钮文本                                                           | string  | `Cancel` |

## 方法说明

| 属性     | 说明         | 默认值 |
| -------- | ------------ | ------ |
| onOk     | 点击确定事件 |        |
| onCancel | 点击取消事件 |        |

---

# Picker

Picker 选择器，从底部弹出选择器

## 属性说明

| 属性    | 说明                                                                   | 类型    | 默认值 |
| ------- | ---------------------------------------------------------------------- | ------- | ------ |
| data    | 数据源, 由对象`array[{object}]`或数组`array[[array]]`组成的数组        | array   | 无     |
| value   | 当前值, 格式是`[value1, value2, value3]`, 对应数据源的相应级层 `value` | array   | 无     |
| cascade | 是否级联                                                               | boolean | false  |

## 方法说明

| 属性     | 说明         | 默认值   |
| -------- | ------------ | -------- |
| onChange | 选中后的回调 | () => {} |

# Switch

按钮说明, 支持 Styling component

## 属性说明

| 属性     | 说明                                                                                   | 类型    | 默认值 |
| -------- | -------------------------------------------------------------------------------------- | ------- | ------ |
| loading  | loading 的样式 `['', 'bubbles', 'bars', 'spokes', 'spin']` 不写默认不显示 loading 图标 | ''      | false  |
| showLine | 是否显示线段,默认显示                                                                  | boolean | true   |
| children | 显示的内容                                                                             | node    | ''     |

# LoadMore
## 属性说明

| 属性     | 说明                                                                                   | 类型    | 默认值 |
| -------- | -------------------------------------------------------------------------------------- | ------- | ------ |
| loading  | loading 的样式 `['', 'bubbles', 'bars', 'spokes', 'spin']` 不写默认不显示 loading 图标 | ''      | false  |
| showLine | 是否显示线段,默认显示                                                                  | boolean | true   |
| children | 显示的内容                                                                             | node    | ''     |
