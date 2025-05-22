---
sidebar_position: 1
---


## RS-485串口通讯基础

### 串口通讯硬件接线

![image-20250520144300919](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520144300919.png)

### 串口通讯数据流和格式

![image-20250520145655518](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520145655518.png)

### 串行通信格式（单字节协议）

常用：（9600，N，8，1）波特率9600b/s，无奇偶校验位，8位数据位，1位停止位

 ## Modbus通讯协议

### 关于通讯协议

不同设备之间交换数据要遵循的规范。就好比人与人之间交流用的语言，必须要有语法。通常情况下，串行通信遵守Modbus协议串口硬件(RS-232、RS-485、RS-422)都是按照Modbus协议。但是Modbus也可以用于以太网TCP/IP通信。

#### Modbus与串口的关系

1. 串口通讯物理接口：RS232、RS-485、RS-422接口，是硬件
2. Modbus是国际标准的串口通讯协议，是软件

#### Modbus与串行通信关系

1. 前面所讲串行通信格式:表示一个字节的传输协议(9600，N，8,1)，实际应用中数据传送都是多个串行字节组合到一起。

   问题:如何识别多个字节?也就是对多个串行字节传输和解析的标准怎么规定?Modbus就是这个作用。

2. Modbus:就是如何用串口一次连续传输多个有序字节的协议。它规定了一次发送多少给字节，以及字节顺序如何排列。

#### Modbus网络传输的三种模式

1. ASCII模式：G标准信息交换码(0-9，a-z，A-Z)，数据中的每8个位的字节都用ASCI码发送。

2. RTU模式: (Remote TerminalUnit，RTU)远程终端单元模式通信，针对通信距离较长和工业现场环境恶劣而设计的通信结构。特点:消息中每个8 bit的字节都包含量4bit的十六进制字符。

3. TCP模式：通过以太网和互联网连接传输数据使用的是TCP/P协议，称为TCP模式，硬件接口就是以太网(Fthernet)接口。

### Modbus RTU消息帧格式

![image-20250520151128701](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520151128701.png)

### Modbus数据存储区和功能码

#### 线圈和寄存器

![image-20250520151606597](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520151606597.png)

#### 功能码

![image-20250520152343524](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520152343524.png)

### Modbus通讯模式

#### 主-从通讯

![image-20250520152854738](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520152854738.png)

#### 主设备请求模式

1. **单播模式**:主设备仅仅寻址单个从设备。从设备接收并处理完请求后，向主设备返回一个响应报文，即应答。
    此模式下，要有两个Modbus报文:一个是主设备请求报文，一个是从设备响应报文。从设备地址必须唯一(1~247)。

  ![image-20250520153029270](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520153029270.png)

2. **广播模式**:主设备可以向所有的从设备发送请求指令。从设备接收到广播指令后，仅仅做指令处理而不应答。此模式下，请求指令必须是“写”指令。根据协议要求，
   所有从设备必须接收广播模式下的写指令，地址0被保留用来识别广播通信。

### Modbus报文解析实战

![image-20250520153330272](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520153330272.png)

## 基于Modbus协议实现上位机程序开发

### 项目UI设计《注意问题》

缩放与布局的界面必须是100%，显示器分辨率使用推荐的分辨率。

![image-20250520164721286](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520164721286.png)

### 新建项目

创建winforms类库，项目名scada.MyControls， 选择解决方案和项目不在同一目录，解决方案名称scada.THProject，运行环境.net8

删除scada.MyControls项目下默认Class.cs，添加项“用户窗口控件”，命名为THMeter.cs。

### 温湿度显示问题

控件界面大小宽度设置成73px，高度设置为203px。在控件上添加Panel控件，重命名为panelBg,宽度设置成73px，高度设置为203px。

![image-20250520170935788](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520170935788.png)

panelBg设置背景图像

![image-20250520171042137](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520171042137.png)

添加Label到控件中，修改Text属性为“”，修改AutoSize属性为Flase,将BackColor设置成白色，将Width属性修改为10，Height属性设置为135

让Label完美覆盖到温度计的中心。

![image-20250520171823396](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520171823396.png)添加温度条的实现属性。

```c#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace scada.MyControls
{
    public partial class THMeter : UserControl
    {
        public THMeter()
        {
            InitializeComponent();
        }

        // 设置温湿度柱状显示和实际温湿度显示【属性】
        private int barHeight = 135;

        public double SetHTValue
        {
            get { return barHeight; }
            set
            {
                if (value < 0 || value > 70)
                {
                    MessageBox.Show("温湿度必须在0-70之间！");
                }
                else
                {
                    double realValue = (barHeight/70.0) *value; // 实际值对应的高度
                    this.lblBar.Height =  barHeight - Convert.ToInt32(realValue);
                }
            }
        }
    }
}
```

接下来测试下，选中解决方案，添加新项目，项目选择Windows窗体应用scada.THProjectMain，创建后重命名From1窗口为FromMain窗口

选中scada.MyControls项目，右击选择生成。查看工具箱这里，自定义的控件THMeter就会显示在这里,可以直接拖到FromMain窗口中。

![image-20250520173007821](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520173007821.png)

修改启动项，运行项目。

![image-20250520173559115](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520173559115.png)

将用户控件THMeter直接拖到FormMain中，在新建一个button控件

![image-20250520203144928](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520203144928.png)

双击button1控件，添加按钮点击事件。在窗口初始化程序中给自定义的控件赋值。

```c#
namespace scada.THProjectMain
{
    public partial class FormMain : Form
    {
        public FormMain()
        {
            InitializeComponent();

            this.thMeter1.SetHTValue = 20;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.thMeter1.SetHTValue = 30;
        }

    }
}

```

接着运行主窗口。

![form](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/form.gif)

### 背景颜色的改变

首先，将图片添加成资源，方便后面通过代码实现背景的切换。

![image-20250520215728140](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520215728140.png)

在panelBg这里设置背景的时候，选择项目资源文件，点击导入将green_all和red_all文件导入，默认选中green_all。修改THMeter.ms

```c#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace scada.MyControls
{
    public partial class THMeter : UserControl
    {
        public THMeter()
        {
            InitializeComponent();
        }

        // 设置温湿度柱状显示和实际温湿度显示【属性】  
        private int barHeight = 135;
        public double SetHTValue
        {
            get { return barHeight; }
            set
            {
                // 设置温湿度值  
                if (0 <= value && value <= 70 )
                {
                    double realValue = (barHeight / 70.0) * value; // 实际值对应的高度  
                    this.lblBar.Height = barHeight - Convert.ToInt32(realValue);
                }
                else
                {
                    if(value != null)
                    {
                        Console.WriteLine("");
                    }
                    else
                    {
                        MessageBox.Show("温湿度必须在0-70之间！");
                    }
                    
                }
            }
        }

        // 设置温湿度计的背景颜色【属性】
        private BgColor bgColor = BgColor.Green;

        public BgColor SetBackgroundColor
        {
            get { return bgColor; }
            set
            {
                // 设置背景颜色  
                bgColor = value;
                if (bgColor == BgColor.Green)
                {
                    this.panelBg.BackgroundImage = Properties.Resources.green_all;
                }
                else if (bgColor == BgColor.Red) 
                {
                    this.panelBg.BackgroundImage = Properties.Resources.red_all;
                }
            }
        }
        public enum BgColor
        {
            Green,
            Red
        }

    }
}

```

再测试下，在FormMain中添加如下控件，并实现两个按钮的点击事件。

![image-20250520221450728](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520221450728.png)

FormMain.cs中实现按钮点击事件：

```c#
using static scada.MyControls.THMeter;

namespace scada.THProjectMain
{
    public partial class FormMain : Form
    {
        public FormMain()
        {
            InitializeComponent();

            this.thMeter1.SetHTValue = 20;
            this.thMeter2.SetHTValue = 20;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // 点击按钮1，设置第一个温湿度计的值和背景颜色
            this.thMeter1.SetHTValue = 30;
            this.thMeter1.SetBackgroundColor = BgColor.Green;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            // 点击按钮2，设置第2个温湿度计的值和背景颜色
            this.thMeter2.SetHTValue = 50;
            this.thMeter2.SetBackgroundColor = BgColor.Red;
        }
    }
}

```

运行后点击按钮，实现的效果如下：

![thbg](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/thbg.gif)

### 温湿度值的显示

接下来我们实现左边的控件显示温度，右边的控件显示湿度，并在控件下方使用静态文字标识，在文字的下方动态显示温度和湿度的值。

静态文字标识和温度和湿度的值都使用Label控件实现。

![image-20250520225936817](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520225936817.png)

### 连接参数界面

![image-20250520231943384](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250520231943384.png)

按照上图绘制界面，按照红色标注设置控件名称。（这里湿度的文字写错了，lal_H和lal_T的命名掉换一下）

### 请求和应答报文的封装和解析

#### Modbus报文通讯解析

在解决方案中创建新项目scada.ModbusBase,项目类型选择控制台程序。如果是.net8,需要手动安装 System.IO.Ports包。

```
using System.IO;
using System.IO.Ports;

namespace scada.ModbusBase
{
    internal class Program
    {
       
        static void Main(string[] args)
        {
            SerialPort serialPort = new SerialPort();
            // 设置串口参数
            serialPort.PortName = "COM12"; // 串口号
            serialPort.BaudRate = 9600; // 波特率
            serialPort.Parity = Parity.None; // 校验位
            serialPort.DataBits = 8; // 数据位
            serialPort.StopBits = StopBits.One; // 停止位
            serialPort.Handshake = Handshake.None; // 流控制
            serialPort.ReadTimeout = 500; // 读取超时
            serialPort.WriteTimeout = 500; // 写入超时

            // 打开串口
            try
            {
                serialPort.Open();
                Console.WriteLine("串口已打开");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"打开串口失败: {ex.Message}");
                return;
            }

            // 循环读取数据
            while (true)
            {
                Thread.Sleep(2000); // 延时2秒

                // 拼接报文
                List<byte> sendBytes = new List<byte>();
                sendBytes.Add(0x01); // 从站地址
                sendBytes.Add(0x03); // 功能码
                sendBytes.Add(0x00); // 起始地址高字节
                sendBytes.Add(0x00); // 起始地址低字节
                sendBytes.Add(0x00); // 寄存器数量高字节
                sendBytes.Add(0x02); // 寄存器数量低字节
                                     // CRC校验
                sendBytes.Add(0xC4); // CRC高字节
                sendBytes.Add(0x0B); // CRC低字节

                // 发送报文
                serialPort.Write(sendBytes.ToArray(), 0, sendBytes.Count);

                // 接收延时
                Thread.Sleep(100);

                // 读取serialPort数据   
                try
                {
                    byte[] receiveBytes = new byte[serialPort.BytesToRead];
                    // 接受缓冲区的全部字节
                    serialPort.Read(receiveBytes, 0, receiveBytes.Length);

                    if (receiveBytes[0] == 0x01)    // 判断地址
                    {
                        // 接收报文： 01  03  04  00  01  00  01  6A  33
                        // 转成10进制： 1   3   4   0   1   0   1   106 51
                        // 数据索引：[0] [1] [2]  [3] [4] [5] [6] [7] [8]
                        // 数组字节到10进制高低字转换
                        // 第一个寄存器温度，高字节在前，低字节在后
                        int highByte_temperature = receiveBytes[3]; // 高字节
                        int lowByte_temperature = receiveBytes[4]; // 低字节
                        int value_temperature = (highByte_temperature << 8) + lowByte_temperature; // 合并高低字节

                        int highByte_humidity = receiveBytes[5]; // 高字节
                        int lowBytee_humidity = receiveBytes[6]; // 低字节
                        int value_humidity = (highByte_humidity << 8) + lowBytee_humidity; // 合并高低字节

                        string humidity = (value_humidity * 0.1).ToString("0.0");
                        string temperature = (value_temperature * 0.1).ToString("0.0");

                        Console.WriteLine($"湿度:{humidity}% 温度:{temperature}℃");

                    }
                }
                catch (TimeoutException)
                {
                    Console.WriteLine("读取超时");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"读取数据失败: {ex.Message}");
                }
            }
        }
    }
}

```

使用Modbus slave 工具模拟一个Modbus服务端，运行控制台程序，这里创建了虚拟串口COM11<-->COM12，创建方式不过多赘述。

![image-20250521131401556](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250521131401556.png)

#### Modbus RTU通讯类

在解决方案中创建新项目scada.ModbusRTUlib,项目类型选择类库。在项目下添加ModbusRTU.cs。

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
// 引入命名空间
using System.Threading;
using System.IO.Ports;
using System.Runtime.InteropServices;

namespace scada.ModbusRTUlib
{
    /// <summary>
    /// Modbus RTU协议实现
    /// </summary>
    public class ModbusRTU
    {


        // 字段
        private SerialPort serialPort = null; // 串口对象

        // 构造方法
        public ModbusRTU()
        {

        }

        /// <summary>
        /// 有参构造方法
        /// </summary>
        /// <param name="delay">接收延时</param>
        public ModbusRTU(int delay)
        {
            this.ReceiveDelay = delay; // 接收延时
        }

        // 属性
        private int _receivedelay = 100; // 接收延时
        public int ReceiveDelay
        {
            get { return _receivedelay; }
            set
            {
                if (value < 0 || value > 2000) // 
                {
                    _receivedelay = 100;
                }
                else
                {
                    _receivedelay = value;
                }
            }
        }

        // 方法（打开串口、关闭串口、读保持寄存器03H, CRC校验）
        /// <summary>
        /// 打开串口
        /// </summary>
        /// <param name="portName">串口号</param>
        /// <param name="baudRate">波特率</param>
        /// <param name="parity">校验位</param>
        /// <param name="dataBits">数据位</param>
        /// <param name="stopBits">停止位</param>
        public void OpenPort(string portName, int baudRate = 9600,
            Parity parity = Parity.None, int dataBits = 8,
            StopBits stopBits = StopBits.One)
        {
            // 创建串口对象
            serialPort = new SerialPort(portName, baudRate, parity, dataBits, stopBits);

            // 打开串口
            try
            {
                serialPort.Open();
            }
            catch (Exception ex)
            {
                throw new Exception($"打开串口失败: {ex.Message}");
            }
        }


        /// <summary>
        /// 关闭串口
        /// </summary>
        public void ClosePort()
        {

            if (serialPort != null && serialPort.IsOpen)
            {
                serialPort.Close();
            }
        }

        /// <summary>
        /// 读取保持寄存器03H
        /// </summary>
        /// <param name="slaveAddress">从站地址</param>
        /// <param name="startAddress">起始寄存器地址</param>
        /// <param name="registerCount">寄存器个数</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public byte[] ReadHoldingRegisters(byte slaveAddress, ushort startAddress, ushort registerCount)
        {
            // 第一步：封装请求报文
            List<byte> sendBytes = new List<byte>();
            sendBytes.Add(slaveAddress); // 从站地址
            sendBytes.Add(0x03); // 功能码
            sendBytes.Add((byte)(startAddress >> 8)); // 起始地址高字节
            sendBytes.Add((byte)(startAddress & 0xFF)); // 起始地址低字节
            sendBytes.Add((byte)(registerCount >> 8)); // 寄存器数量高字节
            sendBytes.Add((byte)(registerCount & 0xFF)); // 寄存器数量低字节
                                                         // CRC校验
            byte[] crc = CRC16(sendBytes.ToArray(), 6);//封装CRC校验校验前面6位
            sendBytes.Add((crc[0])); // CRC低字节
            sendBytes.Add((crc[1])); // CRC高字节

            // 第二步：发送请求报文
            byte[] receiveBytes = null; // 定义接收字节数组
            try
            {
                if (serialPort == null || !serialPort.IsOpen)
                {
                    throw new Exception("串口未打开");
                }
                serialPort.Write(sendBytes.ToArray(), 0, sendBytes.Count);
                // 接收延时
                Thread.Sleep(ReceiveDelay);

                // 第三步：接收响应报文
                // 读取serialPort数据   
                try
                {
                    receiveBytes = new byte[serialPort.BytesToRead];
                    serialPort.Read(receiveBytes, 0, receiveBytes.Length);
                    
                }
                catch (Exception ex)
                {
                    throw new Exception($"读取数据失败: {ex.Message}");
                }
            }
            catch (Exception ex)
            {

                throw new Exception($"发送数据失败: {ex.Message}"); ;
            }

            // 第四步：解析响应报文
            if (receiveBytes.Length == 5 + 2 * registerCount)
            {
                //进一步校验
                if  ( receiveBytes[1] == 0x03
                    && receiveBytes[2] == registerCount*2)
                {
                    byte[] returnDataArray = new byte[registerCount*2];//用于返回的数据数组

                    //返回截取后只包括数据的数组（从索引3开始（去掉地址、功能码、字节计数），
                    //目的数组，从0开始，复制数据长度）
                    Array.Copy(receiveBytes, 3, returnDataArray, 0, registerCount*2);
                    return returnDataArray;//返回的数组，只包括数据
                }
                else return null;
            }
            else return null;
        }

        #region  CRC校验【查表法，速度很快】

        private static readonly byte[] aucCRCHi = {
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
             0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
             0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
             0x00, 0xC1, 0x81, 0x40
         };
        private static readonly byte[] aucCRCLo = {
             0x00, 0xC0, 0xC1, 0x01, 0xC3, 0x03, 0x02, 0xC2, 0xC6, 0x06, 0x07, 0xC7,
             0x05, 0xC5, 0xC4, 0x04, 0xCC, 0x0C, 0x0D, 0xCD, 0x0F, 0xCF, 0xCE, 0x0E,
             0x0A, 0xCA, 0xCB, 0x0B, 0xC9, 0x09, 0x08, 0xC8, 0xD8, 0x18, 0x19, 0xD9,
             0x1B, 0xDB, 0xDA, 0x1A, 0x1E, 0xDE, 0xDF, 0x1F, 0xDD, 0x1D, 0x1C, 0xDC,
             0x14, 0xD4, 0xD5, 0x15, 0xD7, 0x17, 0x16, 0xD6, 0xD2, 0x12, 0x13, 0xD3,
             0x11, 0xD1, 0xD0, 0x10, 0xF0, 0x30, 0x31, 0xF1, 0x33, 0xF3, 0xF2, 0x32,
             0x36, 0xF6, 0xF7, 0x37, 0xF5, 0x35, 0x34, 0xF4, 0x3C, 0xFC, 0xFD, 0x3D,
             0xFF, 0x3F, 0x3E, 0xFE, 0xFA, 0x3A, 0x3B, 0xFB, 0x39, 0xF9, 0xF8, 0x38,
             0x28, 0xE8, 0xE9, 0x29, 0xEB, 0x2B, 0x2A, 0xEA, 0xEE, 0x2E, 0x2F, 0xEF,
             0x2D, 0xED, 0xEC, 0x2C, 0xE4, 0x24, 0x25, 0xE5, 0x27, 0xE7, 0xE6, 0x26,
             0x22, 0xE2, 0xE3, 0x23, 0xE1, 0x21, 0x20, 0xE0, 0xA0, 0x60, 0x61, 0xA1,
             0x63, 0xA3, 0xA2, 0x62, 0x66, 0xA6, 0xA7, 0x67, 0xA5, 0x65, 0x64, 0xA4,
             0x6C, 0xAC, 0xAD, 0x6D, 0xAF, 0x6F, 0x6E, 0xAE, 0xAA, 0x6A, 0x6B, 0xAB,
             0x69, 0xA9, 0xA8, 0x68, 0x78, 0xB8, 0xB9, 0x79, 0xBB, 0x7B, 0x7A, 0xBA,
             0xBE, 0x7E, 0x7F, 0xBF, 0x7D, 0xBD, 0xBC, 0x7C, 0xB4, 0x74, 0x75, 0xB5,
             0x77, 0xB7, 0xB6, 0x76, 0x72, 0xB2, 0xB3, 0x73, 0xB1, 0x71, 0x70, 0xB0,
             0x50, 0x90, 0x91, 0x51, 0x93, 0x53, 0x52, 0x92, 0x96, 0x56, 0x57, 0x97,
             0x55, 0x95, 0x94, 0x54, 0x9C, 0x5C, 0x5D, 0x9D, 0x5F, 0x9F, 0x9E, 0x5E,
             0x5A, 0x9A, 0x9B, 0x5B, 0x99, 0x59, 0x58, 0x98, 0x88, 0x48, 0x49, 0x89,
             0x4B, 0x8B, 0x8A, 0x4A, 0x4E, 0x8E, 0x8F, 0x4F, 0x8D, 0x4D, 0x4C, 0x8C,
             0x44, 0x84, 0x85, 0x45, 0x87, 0x47, 0x46, 0x86, 0x82, 0x42, 0x43, 0x83,
             0x41, 0x81, 0x80, 0x40
         };
        private byte[] CRC16(byte[] pucFrame, int usLen)
        {
            int i = 0;
            byte[] res = new byte[2] { 0xFF, 0xFF };
            ushort iIndex;
            while (usLen-- > 0)
            {
                iIndex = (ushort)(res[0] ^ pucFrame[i++]);
                res[0] = (byte)(res[1] ^ aucCRCHi[iIndex]);
                res[1] = aucCRCLo[iIndex];
            }
            return res;
        }

        private bool CheckCRC(byte[] value)
        {
            if (value == null) return false;

            if (value.Length <= 2) return false;

            int length = value.Length;
            byte[] buf = new byte[length - 2];
            Array.Copy(value, 0, buf, 0, buf.Length);

            byte[] CRCbuf = CRC16(buf, buf.Length);
            if (CRCbuf[0] == value[length - 2] && CRCbuf[1] == value[length - 1])
            {
                return true;
            }
            return false;
        }


        #endregion

    }
}

```

### 项目中使用通讯类

将ModbusRTUlib项目引用到THProjectMain项目中。

![image-20250521145549480](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250521145549480.png)

修改FromMain.cs实现后端逻辑。

```
using static scada.MyControls.THMeter;
using System.IO.Ports;
using scada.ModbusRTUlib;
using scada.MyControls;

namespace scada.THProjectMain
{
    public partial class FormMain : Form
    {
        // 创建通信类对象
        ModbusRTU modbusRTU = new ModbusRTU();
        public FormMain()
        {
            InitializeComponent();
            Init();
        }

        /// <summary>
        /// 初始化上下文
        /// </summary>
        private void Init()
        {
            // 绑定波特率的下拉框
            string[] baudRates = { "2400", "4800", "9600", "115200", "19200", "38400" };
            this.cmb_BaudRate.Items.AddRange(baudRates);
            this.cmb_BaudRate.SelectedIndex = 2;

            // 当前可用的串口
            this.cmb_PortName.DataSource = SerialPort.GetPortNames();

            // 定时器设置
            this.timer1.Interval = 1000; // 1秒

        }

        private bool _isConnected = false;
        public bool IsConnected
        {
            get { return _isConnected; }
            set
            {
                _isConnected = value; // 保存当前状态
                this.btn_OpenAndClose.Text = _isConnected ? "断开连接" : "打开连接";
                if (value)
                {
                    // 如果连接成功，设置按钮颜色
                    this.btn_OpenAndClose.BackColor = Color.Red;
                    this.btn_OpenAndClose.ForeColor = Color.White;
                    this.lbl_Status.ForeColor = Color.Green;
                }
                else
                {
                    this.btn_OpenAndClose.BackColor = Color.Green;
                    this.btn_OpenAndClose.ForeColor = Color.White;
                    this.lbl_Status.ForeColor = Color.Red;
                }
            }
        }
        // 打开和关闭串口
        private void btn_OpenAndClose_Click(object sender, EventArgs e)
        {
            if (!IsConnected)
            {
                try
                {
                    modbusRTU.OpenPort(this.cmb_PortName.Text,
                        Convert.ToInt32(this.cmb_BaudRate.Text));
                    IsConnected = true;
                    this.timer1.Start(); // 启动定时器
                }
                catch (Exception ex)
                {
                    MessageBox.Show("打开串口失败！" + ex.Message);
                    return;
                }
            }
            else
            {
                try
                {
                    this.timer1.Stop(); // 先停止定时器
                    modbusRTU.ClosePort();
                    IsConnected = false;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("关闭串口失败！" + ex.Message);
                    return;
                }
            }
        }


        #region 定时循环读取寄存器数据
        private void timer1_Tick(object sender, EventArgs e)
        {
            // 读取数据（2个寄存器，起始地址：0000H）
            byte[] data = modbusRTU.ReadHoldingRegisters(Convert.ToByte(this.cmb_Slaved.Text), 0, 2);

            if (data != null)
            {
                // 解析数据
                int temperature = (data[0] << 8) + data[1]; // 温度
                int humidity = (data[2] << 8) + data[3]; // 湿度
                                                         // 显示数据


                // 设置温湿度计的显示值
                if (temperature >= 0 && temperature <= 70)
                {
                    this.thMeter1.SetHTValue = temperature;
                    this.lal_T.Text = temperature.ToString("0.0");
                    if (temperature >= 45 && temperature < 70)
                    {
                        if (this.thMeter1.SetBackgroundColor == THMeter.BgColor.Green)
                        {
                            this.thMeter1.SetBackgroundColor = THMeter.BgColor.Red;
                        }
                    }
                    else
                    {
                        if (this.thMeter1.SetBackgroundColor == THMeter.BgColor.Red)
                        {
                            this.thMeter1.SetBackgroundColor = THMeter.BgColor.Green;
                        }
                    }
                    
                    
                }
                else
                {
                    this.thMeter1.SetHTValue = 0;
                    this.lal_T.Text = "err";
                    if (this.thMeter1.SetBackgroundColor == THMeter.BgColor.Red)
                    {
                        this.thMeter1.SetBackgroundColor = THMeter.BgColor.Green;
                    }
                }

                if (humidity >= 0 && humidity <= 700)
                {
                    this.thMeter2.SetHTValue = humidity*0.1;
                    this.lal_H.Text = (humidity * 0.1).ToString("0.0");

                    if(humidity >= 450 && humidity <= 700)
                    {
                        if (this.thMeter2.SetBackgroundColor == THMeter.BgColor.Green)
                        {
                            this.thMeter2.SetBackgroundColor = THMeter.BgColor.Red;
                        }
                    }
                    else
                    {
                        if (this.thMeter2.SetBackgroundColor == THMeter.BgColor.Red)
                        {
                            this.thMeter2.SetBackgroundColor = THMeter.BgColor.Green;
                        }
                    }
                }
                else
                {
                    this.thMeter2.SetHTValue = 0;
                    this.lal_H.Text = "err";
                    if (this.thMeter2.SetBackgroundColor == THMeter.BgColor.Red)
                    {
                        this.thMeter2.SetBackgroundColor = THMeter.BgColor.Green;
                    }
                }

            }
            #endregion
        }
    }
}
```

### 最终实现的效果

![mth](https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/mth.gif)

