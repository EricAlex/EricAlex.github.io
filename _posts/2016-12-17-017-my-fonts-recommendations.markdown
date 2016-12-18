---
layout:     post
title:      "字体控：几种字体的推荐和介绍"
date:       2016-12-17 12:00:00
author:     "Xin Wang"
header-img: "img/post-017/bg.jpg"
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

<p>
相对于中文字体，英文字体有太多种类可供选择；这里介绍目前见到的字体里面，比较推荐的几种。这些字体都符合<a href="https://en.wikipedia.org/wiki/TrueType">TrueType</a>或者<a href="https://en.wikipedia.org/wiki/OpenType">OpenType</a>。平常使用的文本内容用衬线字体比较合适，这里介绍的几种字体都是衬线字体。
</p>

## <a href="http://www.tug.dk/FontCatalogue/linuxlibertine/">Linux Libertine</a>
<p>
比较喜欢的字体之一。优雅又不失平实。不知道为啥叫“浪荡子”(Libertine)。在数学公式中的表现同样出色。
</p>

### 用法
``` tex
\usepackage[T1]{fontenc}
\usepackage{libertine}
\usepackage[libertine]{newtxmath}
```
<p>
其中，数学公式中使用 Linux Libertine 字体是通过 'newtxmath' 包的 'libertine' 选项实现的。该包还支持 'libertine'、 'garamondx'、 'baskervaldx'、 'charter'、 'cochineal' 和 'utopia' 选项，分别实现对应风格的数学公式字体。
</p>

### 效果

<p><center>
<img src="{{ site.baseurl }}/img/post-017/libertine.jpg">
</center></p>

## <a href="http://www.tug.dk/FontCatalogue/alegreya/">Alegreya</a>
<p>
看起来挺有意思，去棱角，同时衬线强烈。在数学公式中的表现也不错。
</p>

### 用法
``` tex
\usepackage[T1]{fontenc}
\usepackage{Alegreya}
```

### 效果

<p><center>
<img src="{{ site.baseurl }}/img/post-017/Alegreya.jpg">
</center></p>

## <a href="http://www.tug.dk/FontCatalogue/garamond/">Garamond</a>
<p>
非常优雅，但平常用的话，或许有点装饰过度。在数学公式中的表现不错。
</p>

### 用法
``` tex
\usepackage[T1]{fontenc}
\usepackage[urw-garamond]{mathdesign}
```
<p>
使用前，在某些系统或TeX环境下，需要先安装Garamond字体。
</p>

### 效果

<p><center>
<img src="{{ site.baseurl }}/img/post-017/Garamond.jpg">
</center></p>

## <a href="http://www.adobe.com/products/type/fonts-by-adobe.html">Minion Pro</a> (文字)和 <a href="http://www.tug.dk/FontCatalogue/charterbt/">Charter</a> (数学公式)
<p>
Minion Pro 包含在 Adobe PDF 阅读器字体包中，在标准TeX中也可用。中规中矩，细节中显示简洁优雅。用 Charter 书写数学公式，与 Minion Pro 的风格搭配。
</p>

### 用法
``` tex
\usepackage{fontspec}
\setmainfont{Minion Pro}
\usepackage[charter]{newtxmath}
```

### 效果

<p><center>
<img src="{{ site.baseurl }}/img/post-017/Minion_Pro.jpg">
</center></p>

## <a href="http://www.tug.dk/FontCatalogue/newtx/">New TX</a>
<p>
New TX 提供了 <a href="http://www.tug.dk/FontCatalogue/nimbus/start">URW Nimbus Roman</a> 风格的字体。中规中矩，不管在文本中还是在数学公式中。
</p>

### 用法
``` tex
\usepackage{newtxtext}
\usepackage{newtxmath}
```

### 效果

<p><center>
<img src="{{ site.baseurl }}/img/post-017/Times.jpg">
</center></p>

## <a href="https://www.fontsquirrel.com/fonts/cardo">Cardo</a> (文字)和 <a href="http://www.tug.dk/FontCatalogue/xits/">XITS Math</a> (数学公式)
<p>
Cardo 非常优雅，原为中世纪研究而被开发，但适用于一般用途。使用前需安装（获取免费）。不甚支持数学公式，配合 XITS Math 显示数学公式。
</p>

### 用法
``` tex
\usepackage{fontspec}
\setmainfont{Cardo}

\usepackage{unicode-math}
\setmathfont
[    Extension = .otf,
      BoldFont = *bold,
]{xits-math}
```

### 效果

<p><center>
<img src="{{ site.baseurl }}/img/post-017/Cardo.jpg">
</center></p>

## <a href="https://www.fontsquirrel.com/fonts/junicode">Junicode</a> (文字)和 <a href="http://www.tug.dk/FontCatalogue/xits/">XITS Math</a> (数学公式)
<p>
Junicode 的优雅装饰程度介于 Linux Libertine 和 Garamond 之间，类似于 Cardo，也是为中世纪研究而被开发，但适用于一般用途。使用前需安装（获取免费）。不甚支持数学公式，配合 XITS Math 显示数学公式。
</p>

### 用法
``` tex
\usepackage{fontspec}
\setmainfont{Junicode}

\usepackage{unicode-math}
\setmathfont
[    Extension = .otf,
      BoldFont = *bold,
]{xits-math}
```

### 效果

<p><center>
<img src="{{ site.baseurl }}/img/post-017/Junicode.jpg">
</center></p>