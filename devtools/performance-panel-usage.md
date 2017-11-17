# DevTools Performance 使用手册

## 一. 控制条和设置项
控制条

- 录制：加载时、运行时 *（注意：录制时长）*
- 导入、导出
- 屏幕截图

设置项

- 禁用JS采样：_当在移动设备上运行时，可以禁止，以减少开销_
- 启用高级绘制分析：_当确定绘制是瓶颈时，再开启（否则它引入的性能开销，会影响数据）_
- 网络节流
- CPU节流


## 二. Overview 概览

<table>
    <tr>
        <td rowspan="4">操作</td>
        <td>选中</td>
        <td>
            <ul>
                <li>鼠标拖拽，选中感兴趣的某段</li>
                <li>左键单击，选中细条</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>缩放</td>
        <td>
            <ul>
                <li>移动手柄：鼠标 hover 至手柄顶部粗条处，变手型时即可移动</li>
                <li>
                    滚动鼠标滚轮，hover 在 Overview 或 Section 区域<br/>
                    <em>一般情况：先用鼠标点击感兴趣的位置，再缩放</em><br/>
                    <em>（～滚动时，按Shift试试。看啥反应～）</em></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>平移</td>
        <td>
            <ul>
                <li>鼠标，移动到手柄处，变成手型，移动</li>
                <li>鼠标，按住 shift，滚动鼠标滚轮</li>
                <li>触摸板，直接滑动</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>看截屏</td>
        <td>
            <ul>
                <li>hover上，看大图</li>
                <li>hover＋平移，大图幻灯片播放</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td rowspan="3">关注点</td>
        <td>FPS</td>
        <td>
            <ul>
                <li>一般情况，绿条越高，FPS就越高</li>
                <li>上方红条：帧率低到已经影响到用户体验了</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>CPU</td>
        <td>
            <ul>
                <li>如果充满了某个颜色，说明彼时CPU被大量占用</li>
                <li>如果CPU被长时间占用，说明有地方需要优化</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>三竖线</td>
        <td>
            <ul>
                <li>绿线：首次绘制的时间</li>
                <li>蓝线：DOMContentLoaded 事件触发的时间</li>
                <li>红线：Load 事件触发的时间</li>
            </ul>
        </td>
    </tr>
</table>

### DOMContentLoaded 和 load 事件

<table>
    <tr>
        <td>DOMContentLoaded</td>
        <td>
            when the <strong>initial HTML document</strong> has been completely <strong>loaded and parsed</strong>, without waiting for stylesheets, images, and subframes to finish loading
        </td>
        <td style="white-space:nowrap">
            可以访问DOM
        </td>
    </tr>
    <tr>
        <td>load</td>
        <td>
            when <strong>a resource</strong> and <strong>its dependent resources</strong> have finished loading.  
        </td>
        <td style="white-space:nowrap">
            完全加载完毕
        </td>
    </tr>
</table>




## 三. Network

<table>
    <tr>
        <td rowspan="4">X轴</td>
        <td rowspan="4">line-bar（时间）</td>
        <td>灰色线（左）</td>
        <td>Queued／Stalled</td>
        <td>若太长，说明排队等待的时间过程</td>
    </tr>
    <tr>
        <td>透明条</td>
        <td>TTFB</td>
        <td>若太长，说明网慢／服务器本身响应慢</td>
    </tr>
    <tr>
        <td>深色条</td>
        <td>下载内容</td>
        <td>若太长，说明文件内容大</td>
    </tr>
    <tr>
        <td>灰色线（右）</td>
        <td colspan="2">等待主线程的时间 <em>（ Network / Timing 里未显示）</em></td>
    </tr>
    <tr>
        <td>Y轴</td>
        <td>资源（可并行）</td>
        <td colspan="3">
            <ul>
                <li>蓝色：HTML</li>
                <li>黄色：JS</li>
                <li>紫色：CSS</li>
                <li>绿色：Img</li>
                <li>灰色：其它资源，eg.jsonp</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td rowspan="4">操作</td>
        <td>X轴</td>
        <td colspan="3">可缩放，鼠标滚轮</td>
    </tr>
    <tr>
        <td>Y轴</td>
        <td colspan="3">可上下滚动，鼠标滚轮＋Shift ／ 点击拖拽滚动条</td>
    </tr>
    <tr>
        <td>整体</td>
        <td colspan="3">可平移，同 Overview</td>
    </tr>
    <tr>
        <td>点击资源条</td>
        <td colspan="3">
            <ul>
                <li>Summary，查看详情</li>
                <li>Buttom-Up / Call Tree / Event Log 则显示该资源时间周期期间发生的活动</li>
            </ul>
        </td>
    </tr>
</table>

### Network / Timing
<table>
   <tbody>
        <tr>
            <td>Resource Scheduling</td>
            <td>Queueing</td>
            <td>
                请求正在排队。有以下几种原因：
                <ul>
                    <li>有更高优先级的请求</li>
                    <li>已经有6个 TCP 连接了（ 仅适用 HTTP/1.0 和 HTTP1.1 ）</li>
                    <li>浏览器正在分配磁盘缓存（通常非常迅速）</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td rowspan="6">Connection Start</td>
            <td>Stalled</td>
            <td>停滞。由于 Queueing 中列的任何原因而暂停</td>
        </tr>
        <tr>
            <td>DNS Lookup</td>
            <td>DNS 查找。浏览器正在解析请求的 IP 地址</td>
        </tr>
        <tr>
            <td>Proxy Negotiation</td>
            <td>代理协商。浏览器正在与代理服务器协商请求</td>
        </tr>
        <tr>
            <td>Initial Connection</td>
            <td>建立连接。包括 TCP 握手/重试和协商 SSL 的时间</td>
        </tr>
        <tr>
            <td>SSL</td>
            <td>完成 SSL 握手</td>
        </tr>
        <tr>
            <td>ServiceWorker Preparation</td>
            <td>sw 准备。浏览器正在启动 sw</td>
        </tr>
        <tr>
            <td rowspan="6">Request/Response</td>
            <td>Request to ServiceWorker</td>
            <td>请求 sw。该请求正在被发送给 sw</td>
        </tr>
        <tr>
            <td>Request Sent</td>
            <td>请求发送。请求正在发送，通常不到1ms</td>
        </tr>
        <tr>
            <td>Waiting (TTFB)</td>
            <td>浏览器正在等待响应的第一个字节，Time To First Byte<br/>该时间包括一次往返延迟和服务器准备响应的时间</td>
        </tr>
        <tr>
            <td>Content Download</td>
            <td>浏览器正在接收响应</td>
        </tr>
        <tr>
            <td>Receiving Push</td>
            <td>浏览器正在通过 HTTP/2 服务器推送接收此响应的数据</td>
        </tr>
        <tr>
            <td>Reading Push</td>
            <td>浏览器正在读取以前收到的本地数据</td>
        </tr>
    </tbody>
</table>

## 四. Main

### 火焰图：记录主线程上的活动

<table>
    <tbody>
        <tr>
            <td rowspan="3">介绍</td>
            <td>x轴</td>
            <td>记录时间</td>
            <td>每个 bar 代表一个事件，越宽代表事件花费的时间越长</td>
        </tr>
        <tr>
            <td>y轴</td>
            <td>调用堆栈</td>
            <td>多个事件彼此堆叠，上面的调了下面的／父子函数</td>
        </tr>
        <tr>
            <td>颜色</td>
            <td colspan="2">
                <ul>
                    <li>蓝色：加载活动，Request、Response、Parse HTML</li>
                    <li>紫色：渲染活动，Recalculate Style、Layout、Update Layer Tree</li>
                    <li>绿色：绘制活动，Paint、Composite Layers</li>
                    <li>深黄色：脚本活动</li>
                    <li> 其它随机色：调用栈里的JS颜色</li>
                </ul>
                <em>（颜色可参考底部的 Summary、Event Log 里显示的）</em>
            </td>
        </tr>
        <tr>
            <td rowspan="4">操作</td>
            <td>查看详情</td>
            <td colspan="2">点击事件，看 Summary<br/><em>（点击Main的空白处，Summary 回到显示 Overview 中选中的全局态）</em></td>
        </tr>
        <tr>
            <td>顺序预览</td>
            <td colspan="2">选中一个事件后，上下左右箭头</td>
        </tr>
        <tr>
            <td>查找</td>
            <td colspan="2">cmd+F，搜索事件／也可输入正则（Cancel 退出）</td>
        </tr>
        <tr>
            <td>隐藏详细调用栈</td>
            <td colspan="2">Disable JavaScript samples，选中只看顶级事件</td>
        </tr>
        <tr>
            <td rowspan="3">关注</td>
            <td>红三角</td>
            <td colspan="2">事件右上角的红三角：警告，占用主线程时间太长了</td>
        </tr>
        <tr>
            <td>太宽的事件</td>
            <td colspan="2">条越宽，代表执行时间很长</td>
        </tr>
        <tr>
            <td>其它视角</td>
            <td colspan="2">
                <ul>
                    <li>Bottom-Up：开销大的函数</li>
                    <li>Call Tree：导致最多活动的根活动</li>
                    <li>Event Log：按时间顺序排列</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Main 里的 Activity

<table>
    <tbody>
        <tr>
            <td>Parse HTML</td>
            <td>构建 DOM</td>
            <td></td>
        </tr>
        <tr>
            <td>Evaluate Script</td>
            <td>执行 JS</td>
            <td></td>
        </tr>
        <tr>
            <td>Parse Stylesheet</td>
            <td>构建 CSSOM</td>
            <td></td>
        </tr>
        <tr>
            <td>Recalculate Style</td>
            <td>构建 RenderTree</td>
            <td></td>
        </tr>
        <tr>
            <td>Layout</td>
            <td>布局／自动重排</td>
            <td>
                <ul>
                    <li>Layout: Chrome IE Safari</li>
                    <li>Reflow: FF</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Paint</td>
            <td>绘制／栅格化</td>
            <td>Paint／Raster</td>
        </tr>
        <tr>
            <td>Composite Layers</td>
            <td>合成</td>
            <td></td>
        </tr>
    </tbody>
</table>




## 五. Summary：Main 中 Activity 的关键字段

在主进程上执行的任务，Summary 里的字段会据任务的不同而不同。此处列出部分活动里的关键字段。

> 以下的链接均为空，旨在表示：在面板里点击该链接，会打开特定文件或直接定位到具体代码行

公共字段有：

字段               | 值（示例）         |  说明
------------------|------------------|---------
Total Time        | 0                |
Self Time         | 0                |
Pending for       | 0.0 ms           |
Initiator         | [reveal]()       | 
First Invalidated | &nbsp;           | 第一次触发的地方
Aggregated Time   | &nbsp;           |

不同的任务，又有各自的详情字段。下面按照功能，将这些任务分为特定组来介绍。

### 网络 相关的活动
1. Send Request
2. Receive Response
3. Receive Data _{n}_
4. Finish Loading

对象             | 字段             | 值（示例）         |  说明
----------------|------------------|------------------|---------
Send Request    | Resource         | [www.so.com/]()  |
&nbsp;          | Request Method   | GET              |
&nbsp;          | Priority         | Highest          | 
&nbsp;          | Preview          | &nbsp;           |  若是图片，则有预览
Receive Response<br/>Receive Data<br/>Finish Loading  | Resource    | [www.so.com/]()  |
&nbsp;           | Encoded Data       | 65536 Bytes   | 若是.html，则收到第一个<br/>Receive Data 就可以<br/>开始 Parse HTML 了 
&nbsp;           | First Invalidated  | pull @ [:formatted:12520]()  | 
Receive Response | Status Code        | 200             |
&nbsp;           | MIME Type          | text/html       |
Finish Loading   | Decoded Body       | 78782 Bytes     | 值是n次Receive Data<br/>的Encoded Data之和



### HTML／CSS／JS 相关的活动
1. Parse HTML
2. Parse Stylesheet
3. Evaluate Script

对象             | 字段             | 值（示例）         |  说明
----------------|------------------|------------------|---------
Parse HTML      | Range            | - [(index):0]() [0…89]<br>- [(index):90]() [90…98]<br>- [(index):99]() [99…113]<br>- [(index):114]() [114…120]<br>- [(index):121]() [121…-1]<br> | 开始<br/><br/><br/><br/>结束
Evaluate Script | Script           | [(index):21]()  |

### 渲染 相关的活动
1. Recalculate Style
2. Layout
3. _Update Layer Tree_
4. Paint
5. _Composite Layers_

对象                 | 字段                        | 值（示例）         | 说明 
--------------------|-----------------------------|------------------|---------
Recalculate Style   | Elements Affected           | 720              |  
&nbsp;              | First Invalidated           | - setPlatform<br/>- addClass @ [(index):115]()<br/>- style	@ [:formatted:8712]() |
Layout              | Nodes That Need Layout      | 958 of 958       | 
&nbsp;              | Layout root                 | #document        |
&nbsp;              | First Layout Invalidation   | - style	@ [:formatted:8712]<br/>-(anonymous) @ [(index):115]() |
Paint               | Location                    | (0, 0)           |
&nbsp;              | Dimensions                  | 1280 × 1846      |
&nbsp;              | Layer Root                  | #document        |



### Event 相关的活动
Type 有以下几种：

- beforeunload
- readystatechange _{n}_
- DOMContentLoaded _{n}_
- load
- pageshow
- pagehide
- visibilitychange
- webkitvisibilitychange
- unload
- readystatechange
- load
- scroll
- ... 

> `load` 的触发时机：任何资源加载完后，都会触发，eg .html/js/css/png/jpg/...


### 其他活动
- XHR Load
- Timer Fired
- Major GC
- Minor GC
- DOM GC
- ...

对象               | 字段                | 值（示例）                          |  说明
------------------|---------------------|-----------------------------------|---------
Timer Fired       | Timer ID            | 6                                 |
&nbsp;            | Timer Installed     | checkForLoad	@ [:formatted:1]()  | 
Major GC          | Collected           | 0 B                               |
DOM GC            | Details             |  - collect<br/>- idle sweep       |

