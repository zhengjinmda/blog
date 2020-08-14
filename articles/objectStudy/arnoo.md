```jsx
// 引入国际化组件
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

// 变量使用 t 方法 翻译成各种语言
t('room.list.header')
```

```jsx
useCurrentHouse
import { useCurrentHouse } from '@leedarson/store';
const { isOwner } = useCurrentHouse() || {};
// 返回 true or false 判断当前家 house 是否存在
```

```jsx
useRoomList
import { useRoomList } from '@leedarson/store';
const { data: roomsData, loaded, sorts } = useRoomList() || {};

//loaded 在 Loading 组件中 用作判断 房间列表是否有值 返回 true or false
// roomsData 房间数据
// sorts 排序
```

```jsx
useDeviceList
import { useDeviceList } from '@leedarson/store';
const { data: deviceData, masterDevices = {} } = useDeviceList();

// deviceData 设备信息
// masterDevices 主设备信息
```


```jsx
// 环境变量
// 使用 webpack 或者 nodejs 配置
// 根据不同的环境 如 develp test pre production 提供不同的全局变量
process.app.modules
const { RoomListShowDefault, _room } = process.app.modules;

// RoomListShowDefault 返回 true or false
// _room 返回 undefined
// 在 ARNOO 里的 config/app/defaultModules.js
```

```jsx
useTheme
const theme = useTheme();
// 返回一个对象 包括各种默认的主题样式
```

