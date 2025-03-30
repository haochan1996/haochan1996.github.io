---
sidebar_position: 1
---

# 认识Rust

怎么来的？

要解决什么问题？

未来有什么前景？

Rust语言诞生于2006年，原本是Mozilla员工Graydon Hoare的私人项目。Mozilla于2009年开始赞助这个项目，并于2010年对外公布。Graydon Hoare认为，未来的互联网除了需要关注性能，更需要关注安全性和并发性。因此，他对Rust语言的期望是：必须更加安全、不易崩溃；不需要垃圾回收机制，不能为了内存安全而引入性能负担；拥有一系列相互协作的特性，使得程序更容易编写、维护和调试。总之，一切都是为了让开发者写出更安全、更高效的代码。

Rust还追求高效开发。泛型和trait系统使其具备了强大的抽象表达能力。同时，为了保证程序的健壮性，Rust还设计了简单又精致的错误处理机制，让开发者可以从更细的粒度对非正常情况进行合理处理。

## 搭建编程环境

直接在官网下载安装，废物都会，不多介绍。

## Hello Rust

创建项目目录，就是存放代码的目录

```bash
mkdir hello_rust
cd hello_rust
```

新建一个名为`main.rs`的源文件，Rust源文件以`.rs`扩展名结尾。打开`main.rs`文件，输入以下代码：

```rust
1  fn main() {
2      println!("Hello, Rust!");
3  }
```

运行rust，代码编写完成后，需要先编译再运行。编译程序，在终端运行以下命令：

```bash
rustc main.rs
```

可以看到在当前文件夹中生成一个名为main的可执行程序，在终端运行以下命令：

```bash
./main
```

## Hello Cargo

下面介绍Rust提供的构建工具和包管理器Cargo。使用Cargo管理Rust项目，特别是编写复杂的Rust程序，可以很方便地构建代码、下载依赖库并编译这些库。在实际项目开发中，建议一律使用Cargo来管理Rust项目。

常用的Cargo命令

```rust
cargo new  // 新建项目
cargo build // 编译项目
cargo check	//检查项目中的错误，但不编译任何文件
cargo run 	//编译运行项目
cargo rest 	//测试项目
cargo doc	//构建项目文档
cargo publish	//将库发布到crates.io
cargo clean		//移除项目的target文件夹及其所有子文件夹和文件
cargo update	//更新项目的所有依赖库
```

如果想查看cargo的帮助信息，可以在终端命令行窗口使用`cargo -h`命令。如果对某个命令不甚熟悉，可以使用`cargo help <command>`显示某个命令的帮助信息。

### 创建项目

cargo可以创建两种类型的项目：可执行的二进制程序和库。

运行以下命令，可以创建可执行的二进制程序。

```bash
cargo new project_name
```

运行以下命令，可以创建库。

```bash
cargo new project_name --lib
```

下面使用Cargo创建新项目——可执行的二进制程序hello_cargo。在终端运行以下命令：

```bash
cargo new hello_cargo
```

这会生成一个名为`hello_cargo`的新文件夹，其中包含以下文件：

```bash
hello_cargo
|- Cargo.toml
|- src
    |- main.rs
```

`Cargo.toml`是项目数据描述文件，其中包含项目的元数据和依赖库。`src/main.rs`是源代码文件。编辑源代码文件，输入以下代码：

```bash
1  fn main() {
2      println!("Hello, Cargo!");
3  }
```

### 编译和运行项目

编译项目，在终端运行以下命令：

```bash
cargo build
```

查看文件夹会发现，文件结构已发生变化，其中包含以下文件：

```bash
hello_cargo
|- Cargo.lock
|- Cargo.toml
|- src
    |- main.rs
|- target
    |- debug
        |- hello_cargo
        |- ...
```

cargo build命令会在`target/debug/`目录下生成一个可执行文件`hello_cargo`。运行这个可执行文件，可以看到打印出`“Hello, Cargo!”`字符串。

```bash
./target/debug/hello_cargo
```

也可以直接使用`cargo run`命令在编译的同时运行生成的可执行文件：

### 发布项目

项目经过严格测试，最终准备发布时，可以使用`cargo build --release`来优化编译项目，这时会在`target/release`目录下生成一个在生产环境中使用的可执行文件。