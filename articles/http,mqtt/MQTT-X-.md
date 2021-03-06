# MQTT
## 概述
MQTT 是一个客户端架构的发布/订阅模式的消息传输协议。设计思想是轻巧、开放、简单、规范、易于实现。这些特点是它对很多场景来说都是很好的选择，特别是对于受限的环境如机器与机器的通信(M2M)以及物联网环境(IoT)
### 术语 Terminology
#### 1. 网络连接 Network Connection
MQTT 使用的底层传输协议基础设施
- 客户端使用它连接服务器
- 他提供有序的、可靠的、双向字节流传输

#### 2. 应用消息 Application Message
MQTT协议通过网络传输应用数据。应用消息通过MQTT传输时，它们有关联的服务质量（QoS）和主题（Topic）。
#### 3. 客户端 Client
使用MQTT的程序或设备。客户端总是通过网络连接到服务端。它可以
- 发布应用消息给其它相关的客户端。
- 订阅以请求接受相关的应用消息。
- 取消订阅以移除接受应用消息的请求。
- 从服务端断开连接。
#### 4. 服务端 Server
一个程序或设备，作为发送消息的客户端和请求订阅的客户端之间的中介。服务端
- 接受来自客户端的网络连接。
- 接受客户端发布的应用消息。
- 处理客户端的订阅和取消订阅请求。
- 转发应用消息给符合条件的已订阅客户端。
#### 5. 订阅 Subscription
订阅包含一个主题过滤器（Topic Filter）和一个最大的服务质量（QoS）等级。订阅与单个会话（Session）关联。会话可以包含多于一个的订阅。会话的每个订阅都有一个不同的主题过滤器。
#### 6. 主题名 Topic Name
附加在应用消息上的一个标签，服务端已知且与订阅匹配。服务端发送应用消息的一个副本给每一个匹配的客户端订阅。
#### 7. 主题过滤器 Topic Filter
订阅中包含的一个表达式，用于表示相关的一个或多个主题。主题过滤器可以使用通配符。
#### 8. 会话 Session
客户端和服务端之间的状态交互。一些会话持续时长与网络连接一样，另一些可以在客户端和服务端的多个连续网络连接间扩展。
#### 9. 控制报文 MQTT Control Packet
通过网络连接发送的信息数据包。MQTT规范定义了十四种不同类型的控制报文，其中一个（PUBLISH报文）用于传输应用消息。
### 数据表示 Data representations
#### 1. 二进制位 Bits
字节中的位从0到7。第7位是最高有效位，第0位是最低有效位。
#### 2. 整数数值 Integer data values
整数数值是16位，使用大端序（big-endian，高位字节在低位字节前面）。这意味着一个16位的字在网络上表示为最高有效字节（MSB），后面跟着最低有效字节（LSB）。
#### 3. UTF-8编码字符串 UTF-8 encoded strings
注意事项:
UTF-8编码字符串中的字符数据必须是按照Unicode规范 [Unicode] 定义的和在RFC3629 [RFC3629] 中重申的有效的UTF-8格式。特别需要指出的是，这些数据不能包含字符码在U+D800和U+DFFF之间的数据。如果服务端或客户端收到了一个包含无效UTF-8字符的控制报文，它必须关闭网络连接 [MQTT-1.5.3-1]。

UTF-8编码的字符串不能包含空字符U+0000。如果客户端或服务端收到了一个包含U+0000的控制报文，它必须关闭网络连接 [MQTT-1.5.3-2]。

数据中不应该包含下面这些Unicode代码点的编码。如果一个接收者（服务端或客户端）收到了包含下列任意字符的控制报文，它可以关闭网络连接：

- U+0001和U+001F之间的控制字符
- U+007F和U+009F之间的控制字符
- Unicode规范定义的非字符代码点（例如U+0FFFF）
- Unicode规范定义的保留字符（例如U+0FFFF）
UTF-8编码序列0XEF 0xBB 0xBF总是被解释为U+FEFF（零宽度非换行空白字符），无论它出现在字符串的什么位置，报文接收者都不能跳过或者剥离它 [MQTT-1.5.3-3]。
#### 4. 编辑约定 Editing conventions
本规范用黄色高亮的文本标识一致性声明，每个一致性声明都分配了一个这种格式的引用：[MQTT-x.x.x-y]。

## MQTT 控制报文格式 MQTT Control Packet format
### MQTT 控制报文的结构 Structure of an MQTT Control Packet
**Packet**
MQTT 协议通过交换预定义的MQTT控制报文通信。<br>
MQTT 控制报文有三部分组成:
英文|中文
--|:--:|
Fixed header|固定报头，所有控制
Variable header| 可变报头，部分控制报文包含
Payload|有效载荷，部分控制报文包含
### 固定报头 Fixed header
每个 MQTT 控制报文都包含一个固定报头。
bit|7|6|5|4|3|2|1|0|
---|:--:|---:|---:|---:|---:|---:|---:|---:|
byte 1|MQTT控制报文的类型||||用于指定控制报文类型的标志位|
byte 2|剩余长度
### MQTT控制报文的类型 MQTT Control Packet type
位置：第1个字节，二进制位7-4。表示为4位无符号值
### 标志 Flags
固定报头第1个字节的剩余的4位 [3-0]包含每个MQTT控制报文类型特定的标志。
### 剩余长度  Remaining Length
位置：从第2个字节开始。
剩余长度（Remaining Length）表示当前报文剩余部分的字节数，包括可变报头和负载的数据。剩余长度不包括用于编码剩余长度字段本身的字节数。
### 可变报头 Variable header
某些MQTT控制报文包含一个可变报头部分。它在固定报头和负载之间。可变报头的内容根据报文类型的不同而不同。可变报头的报文标识符（Packet Identifier）字段存在于在多个类型的报文里。
#### 报文标识符 Packet Identifier
### 有效载荷 Payload
某些MQTT控制报文在报文的最后部分包含一个有效载荷。

## MTTQ 控制报文
### CONNECT 连接服务端
客户端和服务端的连接建立后，客户端给服务端发送的第一个必须是 CONNECT 报文。<br>
且在一个网络连接上客户端只能发送一次 CONNECT 报文，服务端必须将客户端发送的第二个 CONNECT 报文当做协议违规处理，并断开连接。<br>
有效载荷包含一个或多个编码的字段。包括客户端的唯一标识符，Will主题，Will消息，用户名和密码。除了客户端标识之外，其它的字段都是可选的，基于标志位来决定可变报头中是否需要包含这些字段。
#### 固定报头 Fixed header
