## 创建项目



## 登录界面实现

第一步：说明

背景是一张图片，需要将图片资源拷贝到images文件夹下

布局：从上到下（上中下）

Grid：可以分为上中下三行

局部根据需求进行布局填充内容

第二步：引入材料包

MD材料包，UI框架>>通过Nuget管理工具加载包，并将包需要的资源引入到App.xaml文件中

第三步：实现无边框

将窗体设置成无边框样式

第四步：添加关闭按钮

第五步：添加登录标题

Grid布局，添加一行三列

第六步：表单区域

引入MD材料包空间

## 针对登录窗体实现功能

两个功能：关闭窗体、登录的实现

关闭窗体相对实现简单

第一步：添加登录的视图模型类LoginViewModel.cs

第二步：需要去继承Prism MVVM的类，可以实现消息的通知

```c#
using Prism.Mvvm;

namespace scada.WPF.MultiTHMonitorProject.ViewModels
{
    public class LoginViewModel: BindableBase
    {
        
    }
}
```

以前使用的是事件绑定，现在使用命令（通过命令可以通过数据驱动完成），为了更好的分析，使用命令触发的方式去完成。

```c#
using Prism.Commands;

namespace scada.WPF.MultiTHMonitorProject.ViewModels
{
    public class LoginViewModel: BindableBase
    {
        public LoginViewModel()
        {
            // Initialize commands
            LogoutCommand = new DelegateCommand<string>(ExCloseLogin);
        }
       
        public DelegateCommand<String> LogoutCommand { get; private set; }

        private void ExCloseLogin(string obj)
        {
            Environment.Exit(0);
        }

    }
}
```

第三步：定义命令属性

第四步：通过构造函数初始化并调用关闭方法

第五步：实现关闭

第六步：命令绑定

```c#
<Window x:Class="scada.WPF.MultiTHMonitorProject.Views.LoginView"
       ...
        xmlns:viewModels="clr-namespace:scada.WPF.MultiTHMonitorProject.ViewModels"
       ...
            >
    <Window.DataContext>
        <viewModels:LoginViewModel/>
    </Window.DataContext>
</Window>

            
    <!--设置关闭按钮-->
    <Button Width="50" Height="50" Content="x"
            BorderThickness="0"
            Foreground="White"
            FontSize="22"
            Command="{Binding LogoutCommand}"
            Background="Transparent">
    </Button>
```

### 登录功能的实现

登录成功与否的条件：需要有登录账号和密码（正确的、存在的）

当如果登录的账号和密码不存在，做不成功的消息提示？

登录账号的属性。



