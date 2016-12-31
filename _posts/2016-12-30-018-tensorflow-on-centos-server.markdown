---
layout:     post
title:      "集群（或服务器） centOS 6 上 tensorflow 的安装"
date:       2016-12-30 12:00:00
author:     "Xin Wang"
header-img: "img/post-018/bg.jpg"
---

<figure class="kudo kudoable" data-id="1">
    <a class="kudobject">
        <div class="opening">
            <div class="circle">&nbsp;</div>
        </div>
    </a>
    <a href="#kudo" class="count">
        <span class="num">0</span>
        <span class="txt">Kudos</span>
    </a>
</figure>

[TensorFlow™](https://www.tensorflow.org) 是一个采用数据流图（data flow graphs）做数值计算的开源软件库。或“一个用于人工智能的开源神器”。TensorFlow 是由Google大脑小组开发的用于大型机器学习模型的实现与部署的第二代系统（第一代系统叫 DistBelief），已应用于Google搜寻、Google翻译、Gmail等服务。Google现行的人工智能系统有两套，除了自家的TensorFlow，另一套是2014年从DeepMind收购，战胜南韩九段棋手李世石的AlphaGo系统。（AlphaGo专注于棋赛发展，未来计划应用于医疗看护，也有可能投入自动驾驶等应用。）

TensorFlow 目前仍在开源社区被活跃地开发和完善。TensorFlow 具有高度的灵活性、真正的可移植性、将科研和产品联系在一起、自动求微分、多语言支持和性能最优化等诸多优点。而将如此拽的机器学习工具库安装到能够获取的计算资源（通常是集群、购买的服务器或工作站）上，是学习、使用和研究 Tensorflow 的第一步。

CentOS （Linux發行版之一）是集群或服务器上常用的操作系统。本文将介绍在集群的 CentOS 6.7 系统上安装 Tensorflow 的过程。

## 条件与环境

面临的条件与环境：在集群上有一个非管理员（非 root）账户，拥有目录`/public/home/xwang/`，集群没有外部网络连接，集群操作系统 CentOS 6.7，可 ssh 登陆，或者用 PFT 软件管理拥有目录下的文件。

不知“非 root 账户和没有外部网络连接”是不是常见的情况，但给安装软件带来了很大障碍。解决办法是在自己电脑上安装 CentOS 6.7 的虚拟机，先在虚拟机上安装好，再将相关文件上传到集群上；通过把安装到非 root 账户目录下的软件路径等环境配置到 `~/.basgrc` 文件中，解决非 root 账户的问题。

## 安装过程

### 依赖软件的安装

GCC、CUDA（可选）、CUDNN（可选）、Python、Binutils、Java 和 Bazel 是编译和安装 TensorFlow 需要的依赖软件。

(1) 首先是 Python 2.7 及 Python 软件包的安装，这里推荐 Anaconda，一个用于科学计算的Python 发行版。下载 Anaconda 在 Linux 下的安装器 Anaconda2-4.2.0-Linux-x86_64.sh，在终端执行：

```shell
bash Anaconda2-4.2.0-Linux-x86_64.sh
```

安装过程中自定义安装地址到`/public/home/xwang/anaconda2`。安装完成后编辑`~/.basgrc` 文件，如果没有

```shell
# added by Anaconda2 4.2.0 installer
export PATH="/public/home/xwang/anaconda2/bin:$PATH"
```

这两行，则加上。

(2) Java 的安装，网上下载 JDK 8，安装到`/public/home/xwang/usr/local/`下，安装完成后编辑`~/.basgrc` 文件，加上如下几行：

```shell
export JAVA_HOME=/public/home/xwang/usr/local/jdk_1.8.0
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

(3) GCC 和 Binutils 的安装，本文用的是 GCC 4.9.4，下载 GCC 4.9.4 源码，解压源码到`/public/home/xwang/usr/cache/gcc_src/`中，在终端中：

```shell
cd /public/home/xwang/usr/cache/gcc_src/
./configure --prefix=/public/home/xwang/usr/local/
```

`./configure --prefix=/public/home/xwang/usr/local/` 过程中很可能会报错说要安装一些依赖项，按要求安装到`/public/home/xwang/usr/local/`即可，本文将不详细讨论这些依赖项的安装，以避免文章的冗长。安装这些依赖项的过程大同小异：终端进到源码目录，运行`./configure --prefix=/public/home/xwang/usr/local/`，然后`make && make install`。安装好依赖项后，编辑`~/.basgrc` 文件，加上如下几行：

```shell
export PATH=/public/home/xwang/usr/local/bin:$PATH
export CPLUS_INCLUDE_PATH=/public/home/xwang/usr/local/include
export LD_LIBRARY_PATH=/public/home/xwang/usr/local/lib:/public/home/xwang/usr/local/lib64
export C_INCLUDE_PATH=/public/home/xwang/usr/local/include
export LIBRARY_PATH=/public/home/xwang/usr/local/lib:/public/home/xwang/usr/local/lib64
```

所有 GCC 4.9.4 的依赖项都安装好后，在`/public/home/xwang/usr/cache/gcc_src/`中运行`./configure --prefix=/public/home/xwang/usr/local/` 没有错误，然后执行 `make && make install` 进行安装。

下载 Binutils 源码，解压源码到`/public/home/xwang/usr/cache/binutils_src/`中，在终端中：

```shell
cd /public/home/xwang/usr/cache/binutils_src/
./configure --prefix=/public/home/xwang/usr/local/
make && make install
```

(4) Bazel 的安装。下载 Bazel 的源码，终端中：

```shell
wget https://github.com/bazelbuild/bazel/releases/download/0.4.2/bazel-0.4.2-dist.zip
mkdir -p bazel-0.4.2
cd bazel-0.4.2 && unzip ../bazel-0.4.2-dist.zip
```

需要修改 Bazel 源码中的 `tools/cpp/CROSSTOOL` 和 `tools/cpp/cc_configure.bzl` 文件。

在 `CROSSTOOL` 文件中，仅需要修改 "local_linux" 相关的 toolchain 代码块。

(a) 更改所有 binutils， gcc 和 cpp 工具的路径，包括 `ar`, `compat-ld`, `cpp`, `gcc`, `gcov`, `ld`, `nm`, `objcopy`, `objdump`, `strip` 等。例如，把 `tool_path { name: "ar" path: "/usr/bin/ar" }` 改为 `tool_path { name: "ar" path: "/public/home/xwang/usr/local/bin/ar" }`。若不知道相应路径，可以在终端：

```shell
[xwang@localhost ~]$ which gcc
/public/home/xwang/usr/local/bin/gcc
[xwang@localhost ~]$ which ld
/public/home/xwang/usr/local/bin/ld
[xwang@localhost ~]$ which gcov
/public/home/xwang/usr/local/bin/gcov
...
```

找到。

(b) 增加一句 `tool_path { name: "as" path: "/cm/shared/apps/binutils/2.25/src/bin/ar" }`。

(c) 把 `linker_flag: "-lstdc++"` 改为 `linker_flag: "-lstdc++, -Wl"` ；把`linker_flag: "-B/usr/bin/"` 改为 `linker_flag: "-B/public/home/xwang/usr/local/bin/"`。

(d) 更改 `cxx_builtin_include_library` 条目如下：

```shell
cxx_builtin_include_directory: "/public/home/xwang/usr/local/lib/gcc/x86_64-unknown-linux-gnu/4.9.4/include"
cxx_builtin_include_directory: "/public/home/xwang/usr/local/lib/gcc/x86_64-unknown-linux-gnu/4.9.4/include-fixed"
cxx_builtin_include_directory: "/public/home/xwang/usr/local/include/c++/4.9.4"
```

在 `cc_configure.bzl` 文件中，把所有 `"-B/usr/bin"` 替换为 `"-B/public/home/xwang/usr/local/bin"`

编译 Bazel，在终端运行：

```shell
export EXTRA_BAZEL_ARGS='-s --verbose_failures --ignore_unsupported_sandboxing --genrule_strategy=standalone --spawn_strategy=standalone --jobs 4'
./compile.sh
```

编译 Bazel 成功后，在 `output` 文件夹下复制名叫 `bazel` 的二进制文件到 `/public/home/xwang/usr/local/bin/`

### 编译 TensorFlow

在 `/public/home/xwang/usr/cache/` 目录下运行：

```shell
git clone https://github.com/tensorflow/tensorflow.git && cd tensorflow
```

需要修改 `third_party/gpus/crosstool/CROSSTOOL.tpl` 和 `third_party/gpus/crosstool/clang/bin/crosstool_wrapper_driver_is_not_gcc.tpl` 文件。

首先更改 `third_party/gpus/crosstool/CROSSTOOL.tpl`，仅需要修改 "local_linux" 相关的 toolchain 代码块。类似于 Bazel 的修改，更改所有 binutils 和 cpp 工具的路径，但切记，不要修改 gcc 的路径。更改 linker flags 和 `cxx_builtin_include_directory`，修改后为如下效果：

```shell
tool_path { name: "ar" path: "/public/home/xwang/usr/local/bin/ar" }
tool_path { name: "compat-ld" path: "/public/home/xwang/usr/local/bin/ld" }
tool_path { name: "cpp" path: "/public/home/xwang/usr/local/bin/cpp" }
tool_path { name: "dwp" path: "/usr/bin/dwp" }
# As part of the TensorFlow release, we place some cuda-related compilation
# files in @local_config_cuda//crosstool/clang/bin, and this relative
# path, combined with the rest of our Bazel configuration causes our
# compilation to use those files.
tool_path { name: "gcc" path: "clang/bin/crosstool_wrapper_driver_is_not_gcc" }
# Use "-std=c++11" for nvcc. For consistency, force both the host compiler
# and the device compiler to use "-std=c++11".
cxx_flag: "-std=c++11"
linker_flag: "-L/public/home/xwang/usr/local/lib64"
linker_flag: "-Wl,-no-as-needed"
linker_flag: "-lstdc++"
linker_flag: "-Wl,-rpath, /public/home/xwang/usr/local/lib64"
# linker_flag: "-B/usr/bin/"
cxx_builtin_include_directory: "/public/home/xwang/usr/local/lib/gcc/x86_64-unknown-linux-gnu/4.9.4/include"
cxx_builtin_include_directory: "/public/home/xwang/usr/local/lib/gcc/x86_64-unknown-linux-gnu/4.9.4/include-fixed"
cxx_builtin_include_directory: "/public/home/xwang/usr/local/include/c++/4.9.4"

%{gcc_host_compiler_includes}
tool_path { name: "gcov" path: "/public/home/xwang/usr/local/bin/gcov" }

# C(++) compiles invoke the compiler (as that is the one knowing where
# to find libraries), but we provide LD so other rules can invoke the linker.
tool_path { name: "ld" path: "/public/home/xwang/usr/local/bin/ld" }

tool_path { name: "nm" path: "/public/home/xwang/usr/local/bin/nm" }
tool_path { name: "objcopy" path: "/public/home/xwang/usr/local/bin/objcopy" }
objcopy_embed_flag: "-I"
objcopy_embed_flag: "binary"
tool_path { name: "objdump" path: "/public/home/xwang/usr/local/bin/objdump" }
tool_path { name: "strip" path: "/public/home/xwang/usr/local/bin/strip" }
```

修改 `third_party/gpus/crosstool/clang/bin/crosstool_wrapper_driver_is_not_gcc.tpl` 文件，修改第54行为 `LLVM_HOST_COMPILER_PATH = ('/public/home/xwang/usr/local/bin/gcc')`；注释掉 232 行 `cmd = 'PATH=' + PREFIX_DIR + ' ' + cmd`

修改 `configure` 文件，把 `bazel clean --expunge` 改为 `bazel clean --expunge_async`。然后终端运行：

```shell
export GCC_HOST_COMPILER_PATH=/public/home/xwang/usr/local/bin/gcc
export TEST_TMPDIR=/public/home/xwang/.cache/bazel
./configure
```

在 Configuration 过程中，选择默认检测到的 Python 路径，不需要 CUDA 支持。Bazel 会下载编译 TensorFlow 所需要的所有依赖，如果 `configure` 成功，则显示如下：

```shell
INFO: All external dependencies fetched successfully.
```

修改 `/public/home/xwang/.cache/bazel/_bazel_xwang/HashCodeShownAsAbove/external/protobuf/protobuf.bzl` 文件。寻找文件中的 `ctx.action` 代码块，添加一行 `use_default_shell_env=True` 得到如下结果：

```
ctx.action(
        inputs=inputs,
        outputs=ctx.outputs.outs,
        arguments=args + import_flags + [s.path for s in srcs],
        executable=ctx.executable.protoc,
        mnemonic="ProtoCompile",
        use_default_shell_env=True,
    )
```

编译。终端中运行：

```shell
bazel build -c opt -s --verbose_failures --define=use_fast_cpp_protos=true --ignore_unsupported_sandboxing --genrule_strategy=standalone --spawn_strategy=standalone --jobs 4 --linkopt '-lrt -lm' //tensorflow/tools/pip_package:build_pip_package
```

经过较长时间的编译（一般十几分钟），成功的编译得到如下结果：

```shell
Target //tensorflow/tools/pip_package:build_pip_package up-to-date:
  bazel-bin/tensorflow/tools/pip_package/build_pip_package
```

### TensorFlow 编译后安装

终端中运行：

```shell
bazel-bin/tensorflow/tools/pip_package/build_pip_package /public/home/xwang/tensorflow_pkg
pip install /public/home/xwang/tensorflow_pkg/*
```

即可。

### 虚拟机中文件的打包与上传到集群

在 `/public/home/xwang/` 目录下，终端运行：

```shell
tar -chjvf anaconda2.tar.bz2 anaconda2
cd .cache
tar -chjvf bazel.tar.bz2 bazel
cd /public/home/xwang/usr/cache
tar -chjvf tensorflow.tar.bz2 tensorflow
cd /public/home/xwang/usr
tar -chjvf local.tar.bz2 local
```

把 anaconda2.tar.bz2, bazel.tar.bz2, tensorflow.tar.bz2 和 local.tar.bz2 分别上传到集群的对应位置，解压即可。

随后编辑集群上的 `~/.basgrc` 文件，上面应有如下几行：

```shell
# added by Anaconda2 4.2.0 installer
export PATH="/public/home/xwang/anaconda2/bin:$PATH"

export JAVA_HOME=/public/home/xwang/usr/local/jdk_1.8.0
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

export PATH=/public/home/xwang/usr/local/bin:$PATH
export CPLUS_INCLUDE_PATH=/public/home/xwang/usr/local/include
export LD_LIBRARY_PATH=/public/home/xwang/usr/local/lib:/public/home/xwang/usr/local/lib64
export C_INCLUDE_PATH=/public/home/xwang/usr/local/include
export LIBRARY_PATH=/public/home/xwang/usr/local/lib:/public/home/xwang/usr/local/lib64
```

至此，TensorFlow 编译安装完成。测试是否安装成功，成功的话应有类似结果：

```shell
[xwang@node2 ~]$ python
```
```python
Python 2.7.13 |Anaconda custom (64-bit)| (default, Dec 20 2016, 23:09:15) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-1)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
Anaconda is brought to you by Continuum Analytics.
Please check out: http://continuum.io/thanks and https://anaconda.org
>>> import tensorflow
>>> 
```
