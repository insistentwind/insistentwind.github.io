---
title: "数字几何处理"
published: 2026-08-08
description: "系统整理数字几何处理中离散微分算子、网格去噪、参数化、形变、修复、简化与方向场等核心方法。"
image: "/assets/images/wallpaper/moonlit-ruins.webp"
tags: ["数字几何处理", "三角网格", "参数化", "几何形变"]
category: "几何处理"
draft: false
---

*Geometric Processing*

这是一份按课程进度整理的数字几何处理笔记，内容覆盖几何表示与网格数据结构、离散微分算子、网格去噪、参数化、几何形变、模型修复、曲面映射、网格简化、方向场以及 Delaunay 三角剖分。正文保留了课堂推导、论文方法、实验现象和作业实现记录，并按主题重新梳理了标题层级，方便后续查阅和补充。

## 2-25 · 几何表示与网格数据结构

![](/assets/posts/digital-geometry-processing/image-20251003195301953.webp)

### 点云

### 有符号距离场

![](/assets/posts/digital-geometry-processing/image-20251003201105535.webp)

![](/assets/posts/digital-geometry-processing/image-20251004003241910.webp)

### 隐式函数

![](/assets/posts/digital-geometry-processing/image-20251004003422816.webp)

### 空间网格与层次结构

四叉树，八叉树-hierarchy结构

![](/assets/posts/digital-geometry-processing/image-20251004003939841.webp)

如何构造数据结构呢？
![](/assets/posts/digital-geometry-processing/image-20251004004015492.webp)

对立方体八叉树的一个优化：

![](/assets/posts/digital-geometry-processing/image-20251004004455342.webp)

用平面对曲面进行逼近，如果逼近程度已经很好了，就不用继续细分了。得到的是一些平面的块？意思是直接用平面逼近曲面
![](/assets/posts/digital-geometry-processing/image-20251004004844646.webp)

### 三角网格表示

![](/assets/posts/digital-geometry-processing/image-20251004005045435.webp)

![](/assets/posts/digital-geometry-processing/image-20251004005346091.webp)

#### 作业 1

![](/assets/posts/digital-geometry-processing/image-20251004005527640.webp)

![](/assets/posts/digital-geometry-processing/image-20251004005918121.webp)

### 流形

![](/assets/posts/digital-geometry-processing/image-20251004010651215.webp)

![](/assets/posts/digital-geometry-processing/image-20251004010954901.webp)

### 半边结构

![](/assets/posts/digital-geometry-processing/image-20251004011839866.webp)

OFF格式
![](/assets/posts/digital-geometry-processing/image-20251004013023075.webp)![](/assets/posts/digital-geometry-processing/image-20251004013033702.webp)

## 2-28 · 离散微分几何

离散几何
目标：
![](/assets/posts/digital-geometry-processing/image-20251004144226032.webp)

![](/assets/posts/digital-geometry-processing/image-20251004144335725.webp)

![](/assets/posts/digital-geometry-processing/image-20251004144711757.webp)

![](/assets/posts/digital-geometry-processing/image-20251004145331717.webp)

#### 思考

![](/assets/posts/digital-geometry-processing/image-20251004145740535.webp)

### 法向

![](/assets/posts/digital-geometry-processing/image-20251004145805988.webp)

### 梯度离散化

![](/assets/posts/digital-geometry-processing/image-20251004150326442.webp)

计算梯度
![](/assets/posts/digital-geometry-processing/image-20251004150606676.webp)
![](/assets/posts/digital-geometry-processing/image-20251004151008558.webp)
![](/assets/posts/digital-geometry-processing/image-20251004151231438.webp)

可以看到这个梯度的值和x的值是无关的，也就是每个三角形面中的梯度都是一样的constant，f(x)是一个线性函数

#### 思考

![](/assets/posts/digital-geometry-processing/image-20251004152006460.webp)

怎么求：把xj - xk和三角形的法向量做一个叉乘就可以了

### 拉普拉斯算子

![](/assets/posts/digital-geometry-processing/image-20251004152936020.webp)

![](/assets/posts/digital-geometry-processing/image-20251004153159213.webp)

每个三角形内部的梯度是一个constant，而每个顶点所连接的三角形的梯度是不一样的，因此可以对顶点求梯度的梯度

![](/assets/posts/digital-geometry-processing/image-20251004153733870.webp)

![](/assets/posts/digital-geometry-processing/image-20251004154111584.webp)

### 均匀 Laplace 算子

![](/assets/posts/digital-geometry-processing/image-20251004155357875.webp)

### 余切 Laplace 算子

![](/assets/posts/digital-geometry-processing/image-20251004155848412.webp)

利用格林公式，把面积分转化为线积分

![](/assets/posts/digital-geometry-processing/image-20251004160247086.webp)

知道为什么是除以4了，因为有一个除以2是求得。蓝色区域的面积，而不是某一个点的一阶邻域的总面积。
那么余切是怎么来的：上面（xi-xk）*(xj-xk)点乘是cos，而下面的AT是1/2*a*b* sin(),上下一比就是cot
![](/assets/posts/digital-geometry-processing/image-20251004161207012.webp)

![](/assets/posts/digital-geometry-processing/image-20251004161432169.webp)

![](/assets/posts/digital-geometry-processing/image-20251004161534903.webp)

公式里有两部分的cot，是因为一条边可能对应的是两个三角形的cot

### 高斯曲率

平均曲率就是（最大曲率加上最小曲率）/2,H是这个点的平均曲率,两个主曲率除以2，δx就是算出来的离散拉普拉斯算子

高斯曲率是主曲率相乘(k1 * k2)，平均曲率是相加除以2(k1 + k2) / 2

![](/assets/posts/digital-geometry-processing/image-20251004162321204.webp)

![](/assets/posts/digital-geometry-processing/image-20251004162701089.webp)

## 3-03 · 网格去噪与频谱处理

网格去噪
![](/assets/posts/digital-geometry-processing/image-20251004190000293.webp)

如何分辨feature 和 noise

![](/assets/posts/digital-geometry-processing/image-20251004190237401.webp)

### 基于滤波的方法

![](/assets/posts/digital-geometry-processing/image-20251004191154789.webp)

空间和时间的离散：
![](/assets/posts/digital-geometry-processing/image-20251004191439157.webp)

时间上：由于上面给出的扩散方程，所以下面这个式子成立

![](/assets/posts/digital-geometry-processing/image-20251004192043888.webp)

![](/assets/posts/digital-geometry-processing/image-20251004192106594.webp)

![](/assets/posts/digital-geometry-processing/image-20251004192251608.webp)

曲率和laplace转换公式的条件：需要时cot权重
![](/assets/posts/digital-geometry-processing/image-20251009160103216.webp)



![](/assets/posts/digital-geometry-processing/image-20251004192458800.webp)

uniform的laplace不满足线性LIN性质的，因为他是把每个点都移动到了一阶邻域的中心

### 网格光顺（Fairing）

![](/assets/posts/digital-geometry-processing/image-20251004193713675.webp)

### 高斯滤波

![](/assets/posts/digital-geometry-processing/image-20251004194153622.webp)

这个Kp是为了实现一个归一化，Ws权值归一化把p和q是度量两点之间的距离权重![](/assets/posts/digital-geometry-processing/image-20251004195135614.webp)

不能保边缘

![](/assets/posts/digital-geometry-processing/image-20251004195544682.webp)

解决方法：双边滤波，多了一个对于颜色跳变权重的度量，考虑颜色上的相似性
![](/assets/posts/digital-geometry-processing/image-20251004195702494.webp)

加入对颜色跳变的估计
![](/assets/posts/digital-geometry-processing/image-20251004195836433.webp)

如何把这个对像素的处理，推广到对网格上的处理？，高度 + 距离

![](/assets/posts/digital-geometry-processing/image-20251004200215716.webp)

去找一个顶点，找到法向，做一个切平面，对一阶邻域中的点求出高度，作为双边滤波中，二维像素的灰度值

![](/assets/posts/digital-geometry-processing/image-20251004200333639.webp)

类比于对图像处理的ws，wr

#### 作业

![](/assets/posts/digital-geometry-processing/image-20251004200530022.webp)

1.法线，2.保体积。如何在空间中包体积？答案：联立原点

### 法向滤波与顶点位置恢复

那直接对曲面上的点的法向量做处理，然后对点的位置进行恢复，这样会很不精准。
因此，想要从别的信号恢复点的位置，瞄准了三角形的法向量是无歧义的，从这个法向量进行恢复

![](/assets/posts/digital-geometry-processing/image-20251004201610333.webp)

![](/assets/posts/digital-geometry-processing/image-20251010221332821.webp)

这样可以算出来新的法向量，更加自然

![](/assets/posts/digital-geometry-processing/image-20251004202127415.webp)

#### 作业3

先基于双边滤波恢复出平面的法向，再根据法向找出恢复后的顶点

![](/assets/posts/digital-geometry-processing/image-20251004202457020.webp)

恢复顶点位置：采用迭代的方法
![](/assets/posts/digital-geometry-processing/image-20251004202520947.webp)

每次只动一个顶点，求一次导数等于0，找到最小值估计。保体积。用这个式子更新顶点位置

#### 公式推导

![](/assets/posts/digital-geometry-processing/image-20251004202616827.webp)

效果：
![](/assets/posts/digital-geometry-processing/image-20251004203247954.webp)

### 傅里叶变换

![](/assets/posts/digital-geometry-processing/image-20251004203740629.webp)

本质是空域和时域之间的转化

![](/assets/posts/digital-geometry-processing/image-20251004203919416.webp)

如何推广到二维流形曲面？
![](/assets/posts/digital-geometry-processing/image-20251004204200381.webp)

![](/assets/posts/digital-geometry-processing/image-20251004204331385.webp)

效果：
![](/assets/posts/digital-geometry-processing/image-20251004204506455.webp)

## 3-06 · 优化与数据驱动的网格平滑

Optimization-based methods，基于优化的方法

找一个最大的flat rigion？

![](/assets/posts/digital-geometry-processing/image-20251009223909730.webp)

#### 相关论文

![](/assets/posts/digital-geometry-processing/image-20251009223947869.webp)

效果：
![](/assets/posts/digital-geometry-processing/image-20251011185848523.webp)

### 技术实现

![](/assets/posts/digital-geometry-processing/image-20251011185922933.webp)

要使输出和输入之间的距离最小，然后输出的梯度为0

![](/assets/posts/digital-geometry-processing/image-20251011191231332.webp)

beta是自己设置的，需要逐渐变大

为什么1方法会存在解析解？
![](/assets/posts/digital-geometry-processing/image-20251011191247127.webp)

![](/assets/posts/digital-geometry-processing/image-20251011192224558.webp)

得到一种分片，某种颜色比较光滑的结果

### 推广到三角网格

![](/assets/posts/digital-geometry-processing/image-20251011192714408.webp)

怎么做？
![](/assets/posts/digital-geometry-processing/image-20251011192723316.webp)

![](/assets/posts/digital-geometry-processing/image-20251011192910701.webp)

cotangent laplace效果不好的原因是 他没有把flat rigion给抹平

![](/assets/posts/digital-geometry-processing/image-20251011192954852.webp)

如何推广定义一条边的laplace算子？
![](/assets/posts/digital-geometry-processing/image-20251011193746111.webp)

![](/assets/posts/digital-geometry-processing/image-20251011193801436.webp)

![](/assets/posts/digital-geometry-processing/image-20251011193836966.webp)

![](/assets/posts/digital-geometry-processing/image-20251011194149236.webp)

### 基于面积的边算子

![](/assets/posts/digital-geometry-processing/image-20251011194243191.webp)

问题：
![](/assets/posts/digital-geometry-processing/image-20251011194640751.webp)

#### 相关论文

![](/assets/posts/digital-geometry-processing/image-20251011231235697.webp)

![](/assets/posts/digital-geometry-processing/image-20251011232614912.webp)

### 基于数据驱动的方法

data-driven methods

![](/assets/posts/digital-geometry-processing/image-20251011233455483.webp)

![](/assets/posts/digital-geometry-processing/image-20251011233709882.webp)

![](/assets/posts/digital-geometry-processing/image-20251011234423316.webp)

![](/assets/posts/digital-geometry-processing/image-20251011234819595.webp)

通过拟合函数自适应地去找一个合适的结果,找s，r，k

![](/assets/posts/digital-geometry-processing/image-20251011234945491.webp)

![](/assets/posts/digital-geometry-processing/image-20251011235207981.webp)

![](/assets/posts/digital-geometry-processing/image-20251011235247073.webp)

![](/assets/posts/digital-geometry-processing/image-20251011235318503.webp)

#### 延伸阅读

![](/assets/posts/digital-geometry-processing/image-20251011235550681.webp)

## 3-10 · 网格参数化

网格参数化

![](/assets/posts/digital-geometry-processing/image-20251012160515351.webp)

![](/assets/posts/digital-geometry-processing/image-20251012160832782.webp)

有什么用？
作用：
![](/assets/posts/digital-geometry-processing/image-20251012161919368.webp)

网格化简之后，希望保留原始网格上的一些特征。例如褶皱等的信息，如何拿到这些信息，通常是需要存储稠密网格上的法向信息。两种网格同时进行参数化，渲染稀疏网格的时候，可以取到稠密网格上的normal。normal上会有变化

![](/assets/posts/digital-geometry-processing/image-20251012162229783.webp)

1.不能有自交，2. 两个三角形有交集，那么在参数区域中要么有一个相同的边，点或者为空。不可能相交区域是一个平面区域（这种肯定有自交）

![](/assets/posts/digital-geometry-processing/image-20251012162751430.webp)

inversion-free，只要求法向方向一致就行，不要求自交。要求无翻转



![](/assets/posts/digital-geometry-processing/image-20251012163238876.webp)

局部双射
只要这些一阶邻域角度之和小于2π就可以满足local injective了

另一个条件
![](/assets/posts/digital-geometry-processing/image-20251012163409975.webp)

### 参数化方法

### Tutte 重心映射

#### 作业

![](/assets/posts/digital-geometry-processing/image-20251012164245919.webp)

理论：如果边界顶点有序地落在凸多边形上，内部的顶点是他的邻居的线性组合，那么这样的参数化坐标就是双射的

不能是封闭的网格，要和圆盘同胚，也就是openmesh

![](/assets/posts/digital-geometry-processing/image-20251012164619981.webp)

条件：
![](/assets/posts/digital-geometry-processing/image-20251012165309642.webp)

![](/assets/posts/digital-geometry-processing/image-20251012165941326.webp)

### LSCM

不能保证双射和不自交

![](/assets/posts/digital-geometry-processing/image-20251012170219233.webp)

![](/assets/posts/digital-geometry-processing/image-20251012171335222.webp)

conformal-》保角

在每个输入的三角形网格建立一个局部的坐标系

这个工作的目标：是找一套uv坐标，使得空间三角网格映射到二维坐标上的畸变程度最小

参数化坐标（u，v）是定义在三角形网格上的一个函数，也就是一个分片线性函数

由于中心坐标表达，三角形上每个点的位置都可以有三个顶点的重心坐标公式表示出来，因此是线性的

![](/assets/posts/digital-geometry-processing/image-20251012172422355.webp)

![](/assets/posts/digital-geometry-processing/image-20251012172755941.webp)

 把uv映射看成函数，ui = u（x），由于三角形中心坐标那里，可以得出u的梯度

要使这个连续函数是一个相似变换：
![](/assets/posts/digital-geometry-processing/image-20251012173532310.webp)
scale 乘上一个旋转矩阵？这是目标，找出共性变换的

由于3D曲面有高斯曲率（比如一个球帽），想把它完美地无畸变地摊平成平面是不可能的（除非把它撕开）。

![](/assets/posts/digital-geometry-processing/image-20251012173651662.webp)

### ABF

Angle-Based flattening

![](/assets/posts/digital-geometry-processing/image-20251012191438529.webp)

约束：
![](/assets/posts/digital-geometry-processing/image-20251012192153422.webp)

最后一个约束，为了保证最后一个三角形放进来之后可以使得整个曲面合得上，所以根据正弦定理，可以得到这个约束式子

这个式子的理论基础是正弦定理：
![](/assets/posts/digital-geometry-processing/image-20251013155642704.webp)

推导

![](/assets/posts/digital-geometry-processing/image-20251013155907882.webp)



非线性等式约束，不是很好解

解决方案：
![](/assets/posts/digital-geometry-processing/image-20251012193120954.webp)

![](/assets/posts/digital-geometry-processing/image-20251012193311039.webp)

![](/assets/posts/digital-geometry-processing/image-20251012193704455.webp)

![](/assets/posts/digital-geometry-processing/image-20251012193938103.webp)

![](/assets/posts/digital-geometry-processing/image-20251012194148209.webp)

![](/assets/posts/digital-geometry-processing/image-20251012194706953.webp)

## 3-13 · ARAP 参数化

 ![](/assets/posts/digital-geometry-processing/image-20251013164840855.webp)

### ARAP参数化

![](/assets/posts/digital-geometry-processing/image-20251013165340428.webp)

  变形类型
![](/assets/posts/digital-geometry-processing/image-20251013165552513.webp)

![](/assets/posts/digital-geometry-processing/image-20251013165915093.webp)

 ![](/assets/posts/digital-geometry-processing/image-20251013170120898.webp)

### Local/Global 求解

![](/assets/posts/digital-geometry-processing/image-20251013173730149.webp)

为什么能收敛： 

![](/assets/posts/digital-geometry-processing/image-20251014231934776.webp)

每次求解，Jt到Lt的距离都在减少，能量方程是单调下降的，所以是收敛的

#### Local 步骤（作业 5）

给定Jt 去求 Lt，给定jacob矩阵，去求旋转矩阵

![](/assets/posts/digital-geometry-processing/image-20251014231634587.webp)

输入：作业4的输入

![](/assets/posts/digital-geometry-processing/image-20251014232943829.webp)

### 相关论文

![](/assets/posts/digital-geometry-processing/image-20251014233015439.webp)

思路：
![](/assets/posts/digital-geometry-processing/image-20251014234311250.webp)

效果：
![](/assets/posts/digital-geometry-processing/image-20251014234255488.webp)

优化：
![](/assets/posts/digital-geometry-processing/image-20251014234756693.webp)

## 几何形变概述

![](/assets/posts/digital-geometry-processing/image-20251015000228293.webp)

H：用户操纵的形变，部分顶点上的位移，用户输入的值
F：displacement = 0；没有位移
S：其余的区域

![](/assets/posts/digital-geometry-processing/image-20251015000437776.webp)

### 形变区域与约束

![](/assets/posts/digital-geometry-processing/image-20251015001141541.webp)

## 3-17 · 网格形变与形变迁移

回顾：
![](/assets/posts/digital-geometry-processing/image-20251018214850028.webp)

如何计算变形：扩散下去

### 基于传播的方法（Propagation Based）

![](/assets/posts/digital-geometry-processing/image-20251018214952443.webp)

![](/assets/posts/digital-geometry-processing/image-20251018215903913.webp)

黑色红色线是等值线，怎么算扩散？

从handle(1)到fix(0)，中间的变形区域设为s，那么如何计算s。实际上变形区域内部的点就是x = x + s * displacement(位移，绿色那部分的位移)
方法：
![](/assets/posts/digital-geometry-processing/image-20251018215926798.webp)

线性差值距离。

方法2：直接解出来s，通过laplace矩阵。R上面的那些顶点相当于是变量，H上设置为1？
接一个laplace方程，上面矩阵保证顶点关系，多出来的约束用做是变形后的顶点的位置？
接出来的应该是s（距离值吧），那就把变形对应的点右侧b设置为1，其他都是0，然后解出来这个矩阵方程，得到的每个点的解就应该是距离handle那一圈的距离s的值

问题：
![](/assets/posts/digital-geometry-processing/image-20251018221735976.webp)

这里中间不能保证是大于1的，会往下凹。

### 多尺度方法（Multi-Scale Based）

多尺度的方法

分成两（或者多）个频率带，一个是低频的，一个是高频的。直接把两个部分分开，把低频部分做一个deform，然后直接把高频部分加回来。因为高频部分可能会有一些细节，对低频部分做一个操作，细节比较少。高频加回来之后细节扭曲比较少

![](/assets/posts/digital-geometry-processing/image-20251018222317363.webp)

![](/assets/posts/digital-geometry-processing/image-20251018222755273.webp)

步骤：
![](/assets/posts/digital-geometry-processing/image-20251018222925600.webp)

如何表示这个滤波：
base就是滤波光滑后网格顶点位置，h（details）是每个顶点上的displacement（位移）

hi不是正常的在三维空间中的表示，而是用局部的标准正交基构成的，local frame，ni是base曲面的法向量，ti1，ti2是垂直于ni的两个向量

![](/assets/posts/digital-geometry-processing/image-20251018224047867.webp)

alpha beta gamma三个数字是不变的

![](/assets/posts/digital-geometry-processing/image-20251018224106042.webp)

### 微分坐标（Differential Coordinates）

基于微分坐标

![](/assets/posts/digital-geometry-processing/image-20251018225833645.webp)

先恢复出来微分坐标（梯度或者laplace）

过程是：先计算出来原始曲面的梯度，然后根据这个梯度去恢复出来变形后的曲面的位置

步骤：
![](/assets/posts/digital-geometry-processing/image-20251018231330792.webp)

![](/assets/posts/digital-geometry-processing/image-20251018231415184.webp)

![](/assets/posts/digital-geometry-processing/image-20251018231619409.webp)

如何算这个Mi呢？相当于用户操作的形变的表达

![](/assets/posts/digital-geometry-processing/image-20251018233525609.webp)

Mi一开始由用户给定，现在的问题变成如何把Mi从一开始扩散到网格外面

![](/assets/posts/digital-geometry-processing/image-20251018233805370.webp)

这是一个默认的好用的方法：直接对r和s进行差值

![](/assets/posts/digital-geometry-processing/image-20251018235612802.webp)

对平移的敏感程度不好

下面这个方法是点变换的同时对rotation矩阵Mi持续优化

![](/assets/posts/digital-geometry-processing/image-20251018235956609.webp)

![](/assets/posts/digital-geometry-processing/image-20251019000057723.webp)

### 形变迁移（Deformation Transfer）

变形参考，把马的变形转移到骆驼上去，对比着transfer，有相似的变形量
![](/assets/posts/digital-geometry-processing/image-20251019000721728.webp)

第一步要算出来deformation的表示

![](/assets/posts/digital-geometry-processing/image-20251019152257250.webp)

只有三个点的话是不足以算出来3个点的仿射变换的，所以在空间中加一个v4
![](/assets/posts/digital-geometry-processing/image-20251019152535993.webp)

![](/assets/posts/digital-geometry-processing/image-20251019203223051.webp)

### ARAP 去噪

![](/assets/posts/digital-geometry-processing/image-20251019205818814.webp)

希望：变形后的那个向量和变形前的那个向量只经过一个旋转

![](/assets/posts/digital-geometry-processing/image-20251019210318841.webp)

![](/assets/posts/digital-geometry-processing/image-20251019210558951.webp)

![](/assets/posts/digital-geometry-processing/image-20251019210813231.webp)

这个第一个式子，因为前后两项跟变量Ri没有关系，Ri是local中要求的旋转矩阵，所以直接不考虑，只考虑带有Ri的项。
矩阵的迹是一个数字，它等于主对角线上所有元素的和。所以第二行可以这么写。

想象一下(1, 2, 3) * (1, 2, 3)T 是一个数字，把它转置一下就是(1, 2, 3)T * (1, 2, 3),这是一个矩阵，迹就是原来的数字

课堂小测：推导
![](/assets/posts/digital-geometry-processing/image-20251019211643752.webp)

![](/assets/posts/digital-geometry-processing/image-20251019212226615.webp)

## 3-20 · 空间形变与重心坐标

25-10-27

变形前后的三角形之间的连接关系没有改变，改变的只有顶点的位置xyz

### 空间形变

![](/assets/posts/digital-geometry-processing/image-20251027220340479.webp)

![](/assets/posts/digital-geometry-processing/image-20251027220603822.webp)

![](/assets/posts/digital-geometry-processing/image-20251027221106314.webp)

![](/assets/posts/digital-geometry-processing/image-20251027221125603.webp)

![](/assets/posts/digital-geometry-processing/image-20251027221255143.webp)

### 基于笼的自由形变

![](/assets/posts/digital-geometry-processing/image-20251027221459405.webp)

Cl是网格的控制顶点，φl是第l个顶点的基函数，这个奇函数在l上pi那一点的取值

![](/assets/posts/digital-geometry-processing/image-20251027223911472.webp)

### 问题：

![](/assets/posts/digital-geometry-processing/image-20251028222527141.webp)

### 重心坐标

#### 课堂小测：证明

![](/assets/posts/digital-geometry-processing/image-20251028222650950.webp)

一般型的重心坐标
![](/assets/posts/digital-geometry-processing/image-20251028224835630.webp)

#### 性质

![](/assets/posts/digital-geometry-processing/image-20251028225625611.webp)

![](/assets/posts/digital-geometry-processing/image-20251028225737658.webp)

![](/assets/posts/digital-geometry-processing/image-20251028230423245.webp)

![](/assets/posts/digital-geometry-processing/image-20251028231445625.webp)

问题![](/assets/posts/digital-geometry-processing/image-20251028231211519.webp)

拿到λ和μ![](/assets/posts/digital-geometry-processing/image-20251028231805459.webp)

证明λ和μ就是中心点的坐标，构造出来λ和μ，自然也就满足GBC的性质

因为左边那个式子加起来等于1，所以 x = () * x，然后分离变量得到右侧为0的式子

![](/assets/posts/digital-geometry-processing/image-20251028232434398.webp)

![](/assets/posts/digital-geometry-processing/image-20251028232608574.webp)

求解过程中比较快，基函数形式不变，只需要处理网格顶点位置，deformation通过这个函数传入到内部就可以完成对应变形。

## 3-24 · 广义重心坐标

### 均值坐标（Mean Value Coordinates）

### 坐标推导

 ![](/assets/posts/digital-geometry-processing/image-20251030162809572.webp)

条件：
![](/assets/posts/digital-geometry-processing/image-20251030164126252.webp)

证明：
![](/assets/posts/digital-geometry-processing/image-20251030164259192.webp)

#### 课堂小测

theta可以任意定义？在圆上一角度？

#### 和差化积

![](/assets/posts/digital-geometry-processing/image-20251030164613848.webp)

![](/assets/posts/digital-geometry-processing/image-20251030164754779.webp)

坐标是怎么来的：
![](/assets/posts/digital-geometry-processing/image-20251030170325970.webp)

利用 这个重心坐标去逼近一个分片线性函数![](/assets/posts/digital-geometry-processing/image-20251030213202643.webp)

![](/assets/posts/digital-geometry-processing/image-20251030220013382.webp)

![](/assets/posts/digital-geometry-processing/image-20251030220110725.webp)

如果满足平均值定理，那么UT就是这样一种形式

公式以及证明：![](/assets/posts/digital-geometry-processing/image-20251030220542528.webp)

![](/assets/posts/digital-geometry-processing/image-20251030221222809.webp)f(v)是由这个重心坐标公式得到的

![](/assets/posts/digital-geometry-processing/image-20251030221718204.webp)

接下来证明这个一段圆弧上的积分式子，可以满足1/2pi*r这样一种形式

![](/assets/posts/digital-geometry-processing/image-20251030222055380.webp)

局部平均值定理和调和函数是不一样的

#### 作业7

实现平均值坐标的参数化，把tuttes 权值换一下，角度直接拿R3空间中的角度

![](/assets/posts/digital-geometry-processing/image-20251030224141257.webp)

### 效果

### 坐标权重效果

![](/assets/posts/digital-geometry-processing/image-20251030224340939.webp)

负数角度解决方法：
![](/assets/posts/digital-geometry-processing/image-20251030224709049.webp)

### Harmonic Coordinates

harmonic 调和坐标

![](/assets/posts/digital-geometry-processing/image-20251030233905383.webp)

 学思路：层次结构/多分辨率结构，从下往上迭代，为了在求解过程中及早得陷入一个局部最小。

#### 书本：

polygon mesh processing A3 187页求解大规模稀疏方程组，A33是multi grid 也就是分辨率加速

![](/assets/posts/digital-geometry-processing/image-20251104234649956.webp)



![](/assets/posts/digital-geometry-processing/image-20251104234819966.webp)

![](/assets/posts/digital-geometry-processing/image-20251104234954202.webp)

![](/assets/posts/digital-geometry-processing/image-20251104235248461.webp)

![](/assets/posts/digital-geometry-processing/image-20251104235442212.webp)

![](/assets/posts/digital-geometry-processing/image-20251105000022528.webp)

![](/assets/posts/digital-geometry-processing/image-20251105000050307.webp)

什么是解析函数？

#### 文章

![](/assets/posts/digital-geometry-processing/image-20251105000613347.webp)

### Bounded Biharmonic Weights

什么是实时的？如果要解一个方程那就肯定不是实时的，而基于这种wij，或者linear blend skinning的方式，算是实时的，速度快

![](/assets/posts/digital-geometry-processing/image-20251105001049926.webp)

### 三类形变控制方式

![](/assets/posts/digital-geometry-processing/image-20251105001636768.webp)

![](/assets/posts/digital-geometry-processing/image-20251105001840619.webp)

#### Bone、Cage 与 Handle

![](/assets/posts/digital-geometry-processing/image-20251105002054482.webp)

![](/assets/posts/digital-geometry-processing/image-20251105002108506.webp)

怎么构造weights？
![](/assets/posts/digital-geometry-processing/image-20251105002122451.webp)

reproduction是啥？

![](/assets/posts/digital-geometry-processing/image-20251105002338866.webp)

他不是一个bycentric coordinate

约束到0-1之间，就是bound

![](/assets/posts/digital-geometry-processing/image-20251105002536221.webp)

bihormanic是什么意思



## 3-27 · 几何修复

11-10

### 修复问题分类

![](/assets/posts/digital-geometry-processing/image-20251110233335818.webp)

![](/assets/posts/digital-geometry-processing/image-20251110233950905.webp)

![](/assets/posts/digital-geometry-processing/image-20251110234245897.webp)

![](/assets/posts/digital-geometry-processing/image-20251110235354075.webp)

#### 孤立点

![](/assets/posts/digital-geometry-processing/image-20251111000100157.webp)

![](/assets/posts/digital-geometry-processing/image-20251111000208576.webp)

![](/assets/posts/digital-geometry-processing/image-20251111000544671.webp)

#### 拓扑噪声：

![](/assets/posts/digital-geometry-processing/image-20251111000740416.webp)

朝向![](/assets/posts/digital-geometry-processing/image-20251111001219592.webp)

#### 曲面孔洞

![](/assets/posts/digital-geometry-processing/image-20251111001545889.webp)

![](/assets/posts/digital-geometry-processing/image-20251111001934676.webp)

#### 缝隙

![](/assets/posts/digital-geometry-processing/image-20251111002210374.webp)

#### 退化单元

![](/assets/posts/digital-geometry-processing/image-20251111002643192.webp)

#### 自相交

![](/assets/posts/digital-geometry-processing/image-20251111003133795.webp)

#### 特征丢失

![](/assets/posts/digital-geometry-processing/image-20251111003715782.webp)

#### 数据噪声

![](/assets/posts/digital-geometry-processing/image-20251111003932215.webp)

![](/assets/posts/digital-geometry-processing/image-20251111004109460.webp)

![](/assets/posts/digital-geometry-processing/image-20251111004205337.webp)

![](/assets/posts/digital-geometry-processing/image-20251111223539889.webp)

![](/assets/posts/digital-geometry-processing/image-20251111223713372.webp)

## 3-31 · 网格缺陷、嵌入与映射

![](/assets/posts/digital-geometry-processing/image-20251111224724175.webp)

![](/assets/posts/digital-geometry-processing/image-20251111225048989.webp)

### 经常出现的数据类型

#### 重叠（Overlap）

![](/assets/posts/digital-geometry-processing/image-20251111232230376.webp)

![](/assets/posts/digital-geometry-processing/image-20251111233158684.webp)

三角网格之间的连接关系没有定义好![](/assets/posts/digital-geometry-processing/image-20251111233211914.webp)

![](/assets/posts/digital-geometry-processing/image-20251111233507032.webp)

![](/assets/posts/digital-geometry-processing/image-20251111233752086.webp)

质量比较差的三角形网格![](/assets/posts/digital-geometry-processing/image-20251111234524821.webp)

### 修复方法

![](/assets/posts/digital-geometry-processing/image-20251111235248459.webp)

![](/assets/posts/digital-geometry-processing/image-20251112000553951.webp)

法向处理![](/assets/posts/digital-geometry-processing/image-20251112000636499.webp)

补洞![](/assets/posts/digital-geometry-processing/image-20251112000931131.webp)

![](/assets/posts/digital-geometry-processing/image-20251112001404339.webp)

![](/assets/posts/digital-geometry-processing/image-20251112001643607.webp)

合缝![](/assets/posts/digital-geometry-processing/image-20251112001927507.webp)

![](/assets/posts/digital-geometry-processing/image-20251112002117691.webp)

拓扑简化![](/assets/posts/digital-geometry-processing/image-20251112002129806.webp)

找到环丙-切开网格，补上洞

### 嵌入

![](/assets/posts/digital-geometry-processing/image-20251113224341252.webp)

嵌入到体素会出现的问题：![](/assets/posts/digital-geometry-processing/image-20251113225156218.webp)

解决方法：
![](/assets/posts/digital-geometry-processing/image-20251113225951757.webp)

![](/assets/posts/digital-geometry-processing/image-20251113230241176.webp)

### 映射

![](/assets/posts/digital-geometry-processing/image-20251113231654461.webp)

![](/assets/posts/digital-geometry-processing/image-20251113231825526.webp)

![](/assets/posts/digital-geometry-processing/image-20251113231920621.webp)

![](/assets/posts/digital-geometry-processing/image-20251113232357315.webp)

### 度量

![](/assets/posts/digital-geometry-processing/image-20251113233012080.webp)

![](/assets/posts/digital-geometry-processing/image-20251113233205939.webp)

## 4-03 · 无翻转参数化与局部投影

![](/assets/posts/digital-geometry-processing/image-20251121164924612.webp)
希望参数化中的三角形不发生翻转

![](/assets/posts/digital-geometry-processing/image-20251121165849083.webp)

这里可以看到，要想让能量值取得最小，那么这个函数的最小值就在conformal这里取到了（保角映射）

![](/assets/posts/digital-geometry-processing/image-20251130231926263.webp)

### 优势

![](/assets/posts/digital-geometry-processing/image-20251130232105143.webp)

![](/assets/posts/digital-geometry-processing/image-20251130232906621.webp)

![](/assets/posts/digital-geometry-processing/image-20251201001357188.webp)

![](/assets/posts/digital-geometry-processing/image-20251201171717400.webp)

要取得的是黄色圆盘的外部
![](/assets/posts/digital-geometry-processing/image-20251201171831545.webp)

![](/assets/posts/digital-geometry-processing/image-20251201171945364.webp)

#### 作业：

![](/assets/posts/digital-geometry-processing/image-20251201172021604.webp)

### 投影方法

![](/assets/posts/digital-geometry-processing/image-20251201172248893.webp)

![](/assets/posts/digital-geometry-processing/image-20251201173438264.webp)

![](/assets/posts/digital-geometry-processing/image-20251201174110516.webp)

![](/assets/posts/digital-geometry-processing/image-20251201184243013.webp)

#### 如何投影

把jacob投影到Hi空间之中

![](/assets/posts/digital-geometry-processing/image-20251201190017301.webp)

收敛性比较差![](/assets/posts/digital-geometry-processing/image-20251201190131608.webp)

能量下降比较快：
![](/assets/posts/digital-geometry-processing/image-20251201190256663.webp)

![](/assets/posts/digital-geometry-processing/image-20251201191407982.webp)

![](/assets/posts/digital-geometry-processing/image-20251201191445397.webp)

![](/assets/posts/digital-geometry-processing/image-20251201192449636.webp)

![](/assets/posts/digital-geometry-processing/image-20251201192507480.webp)

![](/assets/posts/digital-geometry-processing/image-20251201192952120.webp)

直接把jacob矩阵作为优化目标，可以永远不出这个space，满足这个二次的assemble的约束，也就是那个放射变换矩阵，满足边那些

![](/assets/posts/digital-geometry-processing/image-20251221000601410.webp)

## 4-07 · PolyCube 参数化

12- 21

### PolyCube

![](/assets/posts/digital-geometry-processing/image-20251221230649154.webp)

定义就是横平竖直的，边界的那个法向量要和轴对齐，轴有6个方向那种

![](/assets/posts/digital-geometry-processing/image-20251221232550473.webp)



![](/assets/posts/digital-geometry-processing/image-20251221232913506.webp)

#### PolyCube 基本概念

![](/assets/posts/digital-geometry-processing/image-20251221233019030.webp)

![](/assets/posts/digital-geometry-processing/image-20251221233531162.webp)

### PolyCube 生成方法

![](/assets/posts/digital-geometry-processing/image-20251221233704911.webp)

流程

![](/assets/posts/digital-geometry-processing/image-20251221233818580.webp)

![](/assets/posts/digital-geometry-processing/image-20251221234030739.webp)

![](/assets/posts/digital-geometry-processing/image-20251221234338477.webp)

把表面上的顶点旋转矩阵扩散到内部

![](/assets/posts/digital-geometry-processing/image-20251222000012137.webp)

![](/assets/posts/digital-geometry-processing/image-20251222000315347.webp)

![](/assets/posts/digital-geometry-processing/image-20251222000354955.webp)

![](/assets/posts/digital-geometry-processing/image-20251222000619582.webp)

### 基于体素的方法

![](/assets/posts/digital-geometry-processing/image-20251222000936808.webp)

人为地搭建出来一个polycube

![](/assets/posts/digital-geometry-processing/image-20251222002042058.webp)

![](/assets/posts/digital-geometry-processing/image-20251222002804195.webp)

新的方式：
![](/assets/posts/digital-geometry-processing/image-20251222002746787.webp)

![](/assets/posts/digital-geometry-processing/image-20251222003037317.webp)

![](/assets/posts/digital-geometry-processing/image-20251222003045809.webp)

![](/assets/posts/digital-geometry-processing/image-20251222003542499.webp)

![](/assets/posts/digital-geometry-processing/image-20251222003838880.webp)



![](/assets/posts/digital-geometry-processing/image-20251222003940952.webp)



先把多边形网格反映射回到rotation-dirven模型上，再头回到原始网格上进行mapping

![](/assets/posts/digital-geometry-processing/image-20251222004210642.webp)

条件：
![](/assets/posts/digital-geometry-processing/image-20251222004335928.webp)

![](/assets/posts/digital-geometry-processing/image-20251222004504756.webp)

### 基于聚类的方法

![](/assets/posts/digital-geometry-processing/image-20251222004727523.webp)

![](/assets/posts/digital-geometry-processing/image-20251222005153872.webp)

![](/assets/posts/digital-geometry-processing/image-20251222005333643.webp)

![](/assets/posts/digital-geometry-processing/image-20251222005408096.webp)

![](/assets/posts/digital-geometry-processing/image-20251222005625778.webp)

复数角![](/assets/posts/digital-geometry-processing/image-20251222005810228.webp)

欧拉角

![](/assets/posts/digital-geometry-processing/image-20251222010056038.webp)

![](/assets/posts/digital-geometry-processing/image-20251222010122519.webp)

![](/assets/posts/digital-geometry-processing/image-20251222010217405.webp)

![](/assets/posts/digital-geometry-processing/image-20251222010250222.webp)

## 4-10 · 曲面映射

### 曲面映射问题

![](/assets/posts/digital-geometry-processing/image-20251222110012380.webp)

构造polycube和原始输入模型之间的映射

![](/assets/posts/digital-geometry-processing/image-20251222110309848.webp)

连接关系，顶点个数，三角形个数一样，顶点位置不一样，这不一定是双射的，比如说有个三角形退化了或者自交![](/assets/posts/digital-geometry-processing/image-20251222111006948.webp)

![](/assets/posts/digital-geometry-processing/image-20251222112242198.webp)

### 算法：

#### 公共基础域（Common Base Domain）

![](/assets/posts/digital-geometry-processing/image-20251222203850192.webp)

![](/assets/posts/digital-geometry-processing/image-20251222204240434.webp)

![](/assets/posts/digital-geometry-processing/image-20251222204337610.webp)

![](/assets/posts/digital-geometry-processing/image-20251222204607562.webp)

算法缺陷![](/assets/posts/digital-geometry-processing/image-20251222205137586.webp)

构造优化：
![](/assets/posts/digital-geometry-processing/image-20251222205146880.webp)

![](/assets/posts/digital-geometry-processing/image-20251222205202270.webp)

#### 基于参数化的方法：

![](/assets/posts/digital-geometry-processing/image-20251222205441504.webp)

沿着landing mark 切开，参数化后边界对应![](/assets/posts/digital-geometry-processing/image-20251222205946830.webp)

![](/assets/posts/digital-geometry-processing/image-20251222210345510.webp)

为什么locally injective就足够了？
![](/assets/posts/digital-geometry-processing/image-20251222210820977.webp)

![](/assets/posts/digital-geometry-processing/image-20251222210919303.webp)

解决cut问题：
![](/assets/posts/digital-geometry-processing/image-20251222211526074.webp)

## 4-14 · 几何渐变与点集配准

### 几何渐变（Morphing）

![](/assets/posts/digital-geometry-processing/image-20251223183751244.webp)

形状差值的过程

![](/assets/posts/digital-geometry-processing/image-20251223183954537.webp)

要求是compatible meshes，就是顶点个数和连接关系是一样的，只不过顶点位置不一样

### 作业9

实现morphing

### 性质：

![](/assets/posts/digital-geometry-processing/image-20251223185055353.webp)

![](/assets/posts/digital-geometry-processing/image-20251223190426422.webp)

#### 方法1

![](/assets/posts/digital-geometry-processing/image-20260118222818315.webp)

边长，二面角，三角形到原点的体积，或者面积做一个插值

![](/assets/posts/digital-geometry-processing/image-20251223191446648.webp)

![](/assets/posts/digital-geometry-processing/image-20251223191950028.webp)

### ARAP插值

![](/assets/posts/digital-geometry-processing/image-20260118225626027.webp)

效果：
![](/assets/posts/digital-geometry-processing/image-20260118233430924.webp)

![](/assets/posts/digital-geometry-processing/image-20260118233521713.webp)

输入：compatible input output meshes

### 数据驱动方法

![](/assets/posts/digital-geometry-processing/image-20260118235219512.webp)

找到最短路径，直接进行一个arap
**![](/assets/posts/digital-geometry-processing/image-20260118235339688.webp)**

### 点集配准

![](/assets/posts/digital-geometry-processing/image-20260118235445195.webp)

![](/assets/posts/digital-geometry-processing/image-20260119000301648.webp)

![](/assets/posts/digital-geometry-processing/image-20260119000415987.webp)

![](/assets/posts/digital-geometry-processing/image-20260119000435094.webp)

![](/assets/posts/digital-geometry-processing/image-20260119000554939.webp)

![](/assets/posts/digital-geometry-processing/image-20260119000851290.webp)

![](/assets/posts/digital-geometry-processing/image-20260119000939276.webp)

![](/assets/posts/digital-geometry-processing/image-20260119001052581.webp)

 ![](/assets/posts/digital-geometry-processing/image-20260119001137593.webp)

![](/assets/posts/digital-geometry-processing/image-20260119001238979.webp)

![](/assets/posts/digital-geometry-processing/image-20260119001245944.webp)

## 4-17 · Atlas 生成、网格切割与双射

### Atlas 生成

什么是Atlas genertaion？
![](/assets/posts/digital-geometry-processing/image-20260119234141882.webp)

纹理和obj对应

![](/assets/posts/digital-geometry-processing/image-20260119234423115.webp)

![](/assets/posts/digital-geometry-processing/image-20260119234955214.webp)

![](/assets/posts/digital-geometry-processing/image-20260119235326613.webp)

一个缝对应的两块之间缝合后的颜色不一致性问题

![](/assets/posts/digital-geometry-processing/image-20260119235619802.webp)

![](/assets/posts/digital-geometry-processing/image-20260119235831600.webp)

![](/assets/posts/digital-geometry-processing/image-20260120000057765.webp)

![](/assets/posts/digital-geometry-processing/image-20260120000402422.webp)

应用：
![](/assets/posts/digital-geometry-processing/image-20260120000425725.webp)

### 网格切割方法

![](/assets/posts/digital-geometry-processing/image-20260120001300059.webp)

point to path文章：
![](/assets/posts/digital-geometry-processing/image-20260120001429456.webp)

![](/assets/posts/digital-geometry-processing/image-20260120002314398.webp)

基于segmentation方法：
![](/assets/posts/digital-geometry-processing/image-20260120002327689.webp)

![](/assets/posts/digital-geometry-processing/image-20260120002634905.webp)

![](/assets/posts/digital-geometry-processing/image-20260120002906091.webp)

### Bijection

![](/assets/posts/digital-geometry-processing/image-20260130212058253.webp)

![](/assets/posts/digital-geometry-processing/image-20260130212318198.webp)

scaffold(脚手架方法)

![](/assets/posts/digital-geometry-processing/image-20260130212348068.webp)



## 4-21 · Atlas 分解、装箱与畸变优化

Chart packing

![](/assets/posts/digital-geometry-processing/image-20260130215006869.webp)

方法1：axis-aligned structure![](/assets/posts/digital-geometry-processing/image-20260130215139615.webp)

![](/assets/posts/digital-geometry-processing/image-20260130215211797.webp)

![](/assets/posts/digital-geometry-processing/image-20260130215248174.webp)

pipeline：

![](/assets/posts/digital-geometry-processing/image-20260130215414712.webp)

### 轴向形变

![](/assets/posts/digital-geometry-processing/image-20260130215514049.webp)

### 分解与装箱

![](/assets/posts/digital-geometry-processing/image-20260130215537115.webp)

![](/assets/posts/digital-geometry-processing/image-20260130215636059.webp)

### 畸变优化

![](/assets/posts/digital-geometry-processing/image-20260130215938327.webp)

altas 完结

## 网格简化

### 简化目标

![](/assets/posts/digital-geometry-processing/image-20260130221254165.webp)

### 基本定义

![](/assets/posts/digital-geometry-processing/image-20260130221406863.webp)

![](/assets/posts/digital-geometry-processing/image-20260130221544546.webp)

### 局部操作

![](/assets/posts/digital-geometry-processing/image-20260130222054580.webp)

![](/assets/posts/digital-geometry-processing/image-20260130222145164.webp)

![](/assets/posts/digital-geometry-processing/image-20260130222342616.webp)

![](/assets/posts/digital-geometry-processing/image-20260130222626224.webp)

### 二次误差度量（QEM）

二次误差度量

![](/assets/posts/digital-geometry-processing/image-20260130223029331.webp)

![](/assets/posts/digital-geometry-processing/image-20260130223541750.webp)

![](/assets/posts/digital-geometry-processing/image-20260130223648740.webp)

![](/assets/posts/digital-geometry-processing/image-20260130223844009.webp)

### 作业9：

如果得到的quadratic矩阵不是满秩的，那就直接用v1v2这条边的中点来代替，最小化顶点应该也在这条边上

把error放到最小堆里，然后每次把cost最小的边拿出来。每次更新后都要更新涉及到更新的边的cost，新顶点的cost‘就继承到了原来的那个Q矩阵

![](/assets/posts/digital-geometry-processing/image-20260130225520017.webp)

书上115页求解最优解

### VSA

![](/assets/posts/digital-geometry-processing/image-20260130231614679.webp)

![](/assets/posts/digital-geometry-processing/image-20260130231750084.webp)

把网格分割得到region，每个region用平面去逼近

![](/assets/posts/digital-geometry-processing/image-20260130232002629.webp)

![](/assets/posts/digital-geometry-processing/image-20260130232009791.webp)

![](/assets/posts/digital-geometry-processing/image-20260130232230079.webp)

![](/assets/posts/digital-geometry-processing/image-20260130232430272.webp)

## 4-24 · 球面参数化

### 球面参数化问题

把一个亏格为0的映射到一个球面上

![](/assets/posts/digital-geometry-processing/image-20260131002759506.webp)

应用：
![](/assets/posts/digital-geometry-processing/image-20260131002847623.webp)

![](/assets/posts/digital-geometry-processing/image-20260131003938509.webp)

challenge：
![](/assets/posts/digital-geometry-processing/image-20260131224446706.webp)

如何实现球面参数化：![](/assets/posts/digital-geometry-processing/image-20260131224701519.webp)

### 层次化方法

![](/assets/posts/digital-geometry-processing/image-20260131224752969.webp)

![](/assets/posts/digital-geometry-processing/image-20260131225213494.webp)

#### 简化过程

![](/assets/posts/digital-geometry-processing/image-20260131231048100.webp)

### 网格细化

![](/assets/posts/digital-geometry-processing/image-20260131231352334.webp)

![](/assets/posts/digital-geometry-processing/image-20260131232138287.webp)

![](/assets/posts/digital-geometry-processing/image-20260131232217697.webp)

![](/assets/posts/digital-geometry-processing/image-20260131232820077.webp)

![](/assets/posts/digital-geometry-processing/image-20260131232902854.webp)

![](/assets/posts/digital-geometry-processing/image-20260131233038108.webp)

## 4-28 · 方向场

### 方向场定义

定义

![](/assets/posts/digital-geometry-processing/image-20260131234838258.webp)

方向场中，每个方向都相差90°？![](/assets/posts/digital-geometry-processing/image-20260131235721757.webp)

![](/assets/posts/digital-geometry-processing/image-20260201000329384.webp)![](/assets/posts/digital-geometry-processing/image-20260201000905165.webp)

![](/assets/posts/digital-geometry-processing/image-20260201001108170.webp)

### 作业10

![](/assets/posts/digital-geometry-processing/image-20260201001207801.webp)

![](/assets/posts/digital-geometry-processing/image-20260201001659519.webp)

![](/assets/posts/digital-geometry-processing/image-20260201001706648.webp)

![](/assets/posts/digital-geometry-processing/image-20260201001932192.webp)

### 离散化

#### 切空间

![](/assets/posts/digital-geometry-processing/image-20260201002334541.webp)

联络每个三角形面片的方向场，去做一个比较：这里是把法向方向一致，这样就可以比较了![](/assets/posts/digital-geometry-processing/image-20260201224209460.webp)

![](/assets/posts/digital-geometry-processing/image-20260201225011159.webp)

p点是奇异点：p点这个地方没有明确定义方向的朝向

![](/assets/posts/digital-geometry-processing/image-20260201225452867.webp)

index=0就是非奇异点，=1是奇异点

![](/assets/posts/digital-geometry-processing/image-20260201225935057.webp)

![](/assets/posts/digital-geometry-processing/image-20260201230358452.webp)

![](/assets/posts/digital-geometry-processing/image-20260201230837726.webp)

![](/assets/posts/digital-geometry-processing/image-20260201230959845.webp)

![](/assets/posts/digital-geometry-processing/image-20260201231242683.webp)

![](/assets/posts/digital-geometry-processing/image-20260201231359840.webp)

### 方向场表示

方向场的表示：

![](/assets/posts/digital-geometry-processing/image-20260201231955423.webp)

![](/assets/posts/digital-geometry-processing/image-20260201232422015.webp)

![](/assets/posts/digital-geometry-processing/image-20260201232544114.webp)

三角函数
![](/assets/posts/digital-geometry-processing/image-20260201232651165.webp)

### 作业

![](/assets/posts/digital-geometry-processing/image-20260201232702671.webp)

## 5-08 · 方向场约束与可积性

![](/assets/posts/digital-geometry-processing/image-20260202233632321.webp)

### 基本性质

![](/assets/posts/digital-geometry-processing/image-20260202233715244.webp)

![](/assets/posts/digital-geometry-processing/image-20260202233807649.webp)

![](/assets/posts/digital-geometry-processing/image-20260202234155583.webp)

### 约束

对齐![](/assets/posts/digital-geometry-processing/image-20260203000714863.webp)

对称![](/assets/posts/digital-geometry-processing/image-20260203000725946.webp)

![](/assets/posts/digital-geometry-processing/image-20260203000848272.webp)

![](/assets/posts/digital-geometry-processing/image-20260203000854808.webp)

### 可积场

![](/assets/posts/digital-geometry-processing/image-20260203001006997.webp)

参数化的梯度可以看做是两个分离的向量场

#### 课堂小测

![](/assets/posts/digital-geometry-processing/image-20260203001715646.webp)

证明为什么两个面的梯度，与中间边e的内积，是相等的

![](/assets/posts/digital-geometry-processing/image-20260203003248377.webp)

设计无旋场![](/assets/posts/digital-geometry-processing/image-20260203003454974.webp)

![](/assets/posts/digital-geometry-processing/image-20260203003652226.webp)

### 标架场（Frame Field）

![](/assets/posts/digital-geometry-processing/image-20260203004442957.webp)

这个polar decomposition 把frame filed转为cross filed 通过向量的形式

![](/assets/posts/digital-geometry-processing/image-20260203004531085.webp)

![](/assets/posts/digital-geometry-processing/image-20260203004844081.webp)

![](/assets/posts/digital-geometry-processing/image-20260203005058850.webp)

## Delaunay 三角剖分

![](/assets/posts/digital-geometry-processing/image-20260429143905492.webp)

凸包

![](/assets/posts/digital-geometry-processing/image-20260429144115449.webp)

![](/assets/posts/digital-geometry-processing/image-20260429145337531.webp)

![](/assets/posts/digital-geometry-processing/image-20260429145440945.webp)

### Delaunay 条件

![](/assets/posts/digital-geometry-processing/image-20260429145538484.webp)

### 生成方法

![](/assets/posts/digital-geometry-processing/image-20260429150432088.webp)

![](/assets/posts/digital-geometry-processing/image-20260429150722114.webp)

proof：
![](/assets/posts/digital-geometry-processing/image-20260429151604562.webp)

![](/assets/posts/digital-geometry-processing/image-20260429151728918.webp)

![](/assets/posts/digital-geometry-processing/image-20260429152522632.webp)

![](/assets/posts/digital-geometry-processing/image-20260429153008421.webp)

全部点都做一遍flip？

![](/assets/posts/digital-geometry-processing/image-20260429153259987.webp)

最大化最小角
![](/assets/posts/digital-geometry-processing/image-20260429154446014.webp)

![](/assets/posts/digital-geometry-processing/image-20260429160350327.webp)

直接比角度，去代替做外接圆看另一个点是不是在外接圆外

### 最优 Delaunay 三角剖分

![](/assets/posts/digital-geometry-processing/image-20260429160447720.webp)

这里会动这个顶点位置![](/assets/posts/digital-geometry-processing/image-20260429160725784.webp)

![](/assets/posts/digital-geometry-processing/image-20260429164708106.webp)

![](/assets/posts/digital-geometry-processing/image-20260429165720205.webp)





## 作业与实现记录

配置qt环境，运行报错：
```c++
qt.qpa.plugin: Could not find the Qt platform plugin "windows" in "" This application failed to start because no Qt platform plugin could be initialized. Reinstalling the application may fix this problem.
找不到platform，可能是因为环境变量目录没有设置正确，设置到bin目录可以运行成功
E:\Qt\6.9.3\msvc2022_64\bin
```

![](/assets/posts/digital-geometry-processing/image-20251010233754126.webp)

### 很有用的方法（上面的图）

求中间变量，再求目标变量

### 作业3

![](/assets/posts/digital-geometry-processing/image-20251011162719672.webp)

对于rock这个obj，如果不加这两行处理，会导致部分曲面无法显示

1.	你没对向量归一化，dot(a,b) 可能远大于 1。sqrt(1 - cos^2) 里出现负数 → NaN 或极小值，cot = cos / sin 爆炸，顶点位移失控，面退化。
2.	加 std::min(...,0.9) 把过大的 dot 强行压到 0.9，避免 1 - cos^2 变成负数或极小，数值不再爆炸，所以“好了”。



### 作业4

边界点没有按照边界的拓扑顺序排序，导致参数化之后，连接三角面时开始交叉

![](/assets/posts/digital-geometry-processing/image-20251012225318221.webp)

如何找边界点的拓扑顺序呢？
![](/assets/posts/digital-geometry-processing/image-20251012234931879.webp)

```c++
for (auto& v : mesh.vertices) {
	v->boundary_index = -1; // 重置
}
// 遍历所有边界半边，标记边界顶点的 boundary_index
// 按拓扑顺序遍历边界环** 很重要
int boundary_size = 0;          // 总边界顶点数
int boundary_cycle = 0;         // 边界环个数
std::unordered_set<geometry::HalfEdge*> visitedBoundaryHE;// 访问过的边界半边
// 遍历所有半边，找到边界半边
for (auto& hePtr : mesh.halfEdges) {
	geometry::HalfEdge* start = hePtr.get();
	if (start->pair) continue;// 不是边界半边
	if (visitedBoundaryHE.count(start)) continue;// 如果遍历过了，就跳过

	geometry::HalfEdge* he = start;
	int step = 0;
	do {
		visitedBoundaryHE.insert(he);
		geometry::Vertex* v = he->vertex;
		if (v->boundary_index < 0) {
			v->boundary_index = boundary_size++; // 从 0 开始递增
		}

		// 跳到下一条边界半边
		geometry::HalfEdge* candidate = he->next;
		while (candidate && candidate->pair) {
			candidate = candidate->pair->next;
		}
		he = candidate;
		step++;
		if (step > (int)mesh.halfEdges.size()) { // 安全退出：异常拓扑
			std::cerr << "Warning: boundary walk aborted (non-manifold?)" << std::endl;
			break;
		}
	} while (he && he != start);
	boundary_cycle++;
}

std::cout << "Boundary cycles: " << boundary_cycle
	<< " boundary vertices: " << boundary_size << std::endl;
```

![](/assets/posts/digital-geometry-processing/image-20251013102114215.webp)

### 作业5：

#### 答疑

问题：为什么要在原始的三维三角形网格上新建一个坐标系？再在这个坐标系上，把向量找出来，往2维平面上投影，和tuttes参数化后的坐标联立，解出变换的jacob矩阵？

答案：因为tuttes参数化后的坐标本身就是在2d平面上的，这个平面上的xy坐标可以正确表示，每个三角形的向量也可以正确由xy坐标相减表示出来。而三维坐标上的向量不是如此。想象一下，空间中有一个近似于垂直于xoy平面的 正 三角形
如果单纯的把xy二维坐标上的值相减得到三角形边向量的话，这个三角形形状肯定是被改变了的。所以要先在三维平面上建立一个坐标系。投影到2维平面上，求出jacob矩阵。

如何操作：
![](/assets/posts/digital-geometry-processing/image-20251016165649245.webp)

![](/assets/posts/digital-geometry-processing/image-20251016165704102.webp)
![](/assets/posts/digital-geometry-processing/image-20251016165712122.webp)

S是三维坐标系构建好的矩阵，的两条向量，e1和e2，由于e1是设为x轴，所以他这个向量的y方向是0，而x，y是
选择的基准点的坐标，他是在local坐标下的向量。这里的e1和e2，在三维三角形中，必须要和二维三角形中的向量一一对应。这里要计算三角形的线性变化jacob，用向量的形式计算出jacob就可以。主要是要确定基准点进行变换

没有对边界点加约束的后果：
![](/assets/posts/digital-geometry-processing/image-20251017001046486.webp)
只简单地加了对角正则 A(ii)+=1e-8。这个微小的 εI 相当于“软约束”，把原本奇异的拉普拉斯 L 变成 L+εI，消除了零空间（常量向量)，使矩阵可逆，SparseLU 能做完全支点选取并完成因式分解。
效果：这个原因是因为没有把b向量的构建对应起来
![](/assets/posts/digital-geometry-processing/image-20251017001126203.webp)

最后还是要固定边界点，找最小二乘
为什么不固定边界点会有零空间：

```
1.	你构造的是标准 cotangent 拉普拉斯 L：对角等于该行所有邻边权值之和，邻接是负权值，故每行元素和为 0 → 常量向量 (1,1,...,1) 满足 L·c=0，形成零空间。
2.	如果网格有多个连通分量，每个分量的常量向量都在零空间 → 零空间维度≥分量数。
3.	跳过退化三角形或边界半边会让某些顶点行近似全零或只剩很小对角，增加额外近似零方向。
4.	未加任何 Dirichlet 约束（固定顶点）或对角正则前，平移自由度未被去除，因此 L 不可逆。
5.	若再存在孤立顶点（度=0），对应行全 0，直接再增一维零空间。
解决：固定至少一个（更常用：一圈边界）顶点行或加极小正则 εI；有多分量需各自锚点。

```

如果直接对原始模型的边界进行固定，得到的效果是下图：
![](/assets/posts/digital-geometry-processing/image-20251017003438041.webp)

另一处错误：
ax=b中的b向量设置错误：这里拍平后的三角形的向量边要与初始的localcoords中的向量相互对应，然后再对顶点开始作用。算的是网格中所有的三角形网格向量对于某点的力的作用。
如果没有对应起来就是上面的情况。对应起来就是下面这个：
![](/assets/posts/digital-geometry-processing/image-20251017193812850.webp)

最后对于边界的处理有问题：直接跳过对边界的处理是不合理的，会导致上图这种情况。
注释掉后得到下面的最终结果：
![](/assets/posts/digital-geometry-processing/image-20251017214409569.webp)

![](/assets/posts/digital-geometry-processing/image-20251017214432786.webp)

不能continue跳过处理
原因：

```
2.	Laplacian A 构造：跳过 boundary 半边 (ithe->isBoundary()) 使某些仅与边界接触、拓扑度很低的顶点行几乎全 0（只被正则 1e-8 微调）。SparseLU 在近奇异情况下把它们解成接近 0 的数 → 出现从原点辐射的线。解决：对所有 boundary 顶点加入硬 Dirichlet 行 (A(ii)=1, b=原参数化坐标)，或只排除 boundary 顶点出线性系统。

这行 continue 的意思是：“如果这是一条边界边，就完全忽略它，不要为它计算任何权重，也不要在矩阵 A 中建立任何连接。”

这导致了什么后果？

边界顶点在矩阵A中是“孤立”的：考虑一个边界顶点。它连接的所有边都是边界边（除了极少数情况）。因为您的代码跳过了所有边界边，所以在构建矩阵A时，这个边界顶点与它的任何邻居之间都没有建立连接！

软约束无力回天：之后，您对边界点施加了一个软约束 A.coeffRef(i, i) += 1e-8;。此时，一个边界顶点 i 在矩阵 A 中对应的整行，除了对角线上的 1e-8 之外，几乎全是零！

方程爆炸：这意味着，对于一个边界顶点 i，它在全局步骤中需要求解的方程，实际上简化成了： 1e-8 * u_i = b_i 这里的 b_i 是从局部步骤计算出的一个非零的“理想拉力”。为了解出 u_i，系统只能计算 u_i = b_i / 1e-8。这是一个极其巨大的数值！

视觉结果：因此，所有边界顶点都被计算到了一个离原点非常遥远的位置。而内部顶点由于受到正确的约束，位置相对正常。最终，您就看到了从内部“飞”向遥远边界的那些奇怪直线。
```

cot权值的累加：
```
3. “累加”的魔力：从“贡献”到完整的矩阵
最关键的一点是，这个过程会对网格中的每一条内部边都执行一次。

想象一下顶点 i，它有三个邻居 j, k, l。

当循环处理边 (i, j) 时，A(i, i) 会被加上 w_ij。

当循环处理边 (i, k) 时，A(i, i) 会被再次加上 w_ik。

当循环处理边 (i, l) 时，A(i, i) 会被第三次加上 w_il。

当所有边都处理完毕，A.setFromTriplets(...) 会执行累加。最终，矩阵 A 中 A(i, i) 的值，就是所有与顶点 i 相连的边的 cotangent 权重之和：w_ij + w_ik + w_il。
```

![](/assets/posts/digital-geometry-processing/image-20251017220606871.webp)

![](/assets/posts/digital-geometry-processing/image-20251017221152044.webp)

问答：
![](/assets/posts/digital-geometry-processing/image-20251017222337490.webp)

```c++
那现在后面那个b矩阵我没有理解，为什么是要这么做：

就算你说参考了力学的作用，对每个顶点有这样一个力，我还是没理解为什么要这么写得出来的结果是arap的？为什么要用cots，global我知道是旋转矩阵，那为什么能根据这个公式得到b，b是什么？b是拍平后的3维三角形，每个向量的大小，乘以到tutte参数化上的那个旋转矩阵，乘以cots？为什么这么写，cots是什么意义，我这么乘是啥意思，这不是有缩放了吗，我不是要保证尽可能isometric吗，我认为右边就是一个缩放矩阵就行了
```

答案：
```html
1. b 是什么？—— “理想的内部拉力”集合
首先，也是最重要的一点：b 向量不是坐标，也不是一个变换矩阵。

您可以把 b 向量想象成一个列表，记录了施加在每一个顶点上的一个**“理想的合力”**。整个全局步骤的目标就是求解一个巨大的平衡方程：A * u = b

u: 我们想要求解的、新的、更好的顶点位置。

A: 我们已经知道，这是余切拉普拉斯矩阵。它可以被看作是描述当前网格 u 内部弹力的系统。A*u 计算出的就是当前形状 u 下，每个顶点受到的内部合力。

b: 这是我们期望的、理想状态下每个顶点应该受到的内部合力。

所以，求解 A*u = b 的物理意义就是：“请找到这样一个新的形状 u，使得它自身的内部弹力 (A*u)，与我们计算出的‘理想拉力’ (b) 完全相等。”

```

```
2. b 的构建：一步步拆解 cots * global * e
现在我们来拆解这个“理想拉力”是如何计算出来的。它分为三步，对应三个乘法：

第一步: e —— “完美”的边 (e01, e12, e21)
是什么？ e01, e12, e21 是从 local_coords 中重建出来的2D边向量。而 local_coords 来自于对原始3D模型的“拍平”。
意义？ e 代表了在没有任何变形、拉伸或压缩的情况下，这条边最完美的、最原始的2D形态。它是我们追求“保长度”的**“黄金标准”**。

第二步: global[i] * e —— “理想”的边
是什么？ global[i] 是我们在局部步骤中为这个三角形计算出的最佳旋转矩阵 R。
意义？ R * e 的意思是：“取那条‘完美’的边 e，将它旋转到当前参数化平面上最合适的位置。”
结果？ R * e 是一个**“理想的边向量”。它具有我们想要的完美的长度**（来自e）和理想的方向（来自R）。

第三步: cots * (global[i] * e) —— “有影响力的理想拉力”
是什么？ cots 是我们计算出的余切权重。
为什么要有它？ 这就是最核心、也最违反直觉的一步。cots 在这里不是为了缩放几何，而是为了赋予这个“理想拉力”一个正确的“影响力”或“权重”。
意义？ cots 来自ARAP能量函数的数学推导（求导）。
ARAP的能量衡量了当前形状与理想形状的差异。
这个能量公式中，余切权重 cots 自然地作为加权因子出现。一个形状良好、面积大的三角形，其cotangent值通常更大，它对总能量的贡献也更大。这很合理：我们应该更关注那些“重要”的三角形。
当我们对这个能量函数求导以找到最小值时，cots 这个权重项就同时保留在了等式的左边（构成了矩阵 A）和右边（构成了向量 b）。
所以，b 向量必须乘以 cots，不是为了改变几何，而是为了与矩阵 A 的构建方式保持数学上的一致性！ 如果 b 不乘以 cots，那么 A*u=b 这个方程本身就是错误的，它不再是原始能量函数的正确梯度。
```

```
解答您的疑问
现在，我们可以直接回答您的问题了：

“为什么要用cots？”
因为 cots 是ARAP能量函数中的自然权重。为了让我们的线性系统 A*u=b 成为该能量函数的正确梯度，cots 必须同时作为权重出现在矩阵A和向量b中。它衡量的是每条边在整个系统中的“重要性”。

“我这么乘是啥意思，这不是有缩放了吗？”
您看得完全正确，这是一个缩放。但关键在于，我们缩放的不是几何本身，而是这个几何元素（边）在全局平衡方程中的**“话语权”或“影响力”**。一条权重（cots）大的边，它产生的“理想拉力”就更大，求解器在寻找最终平衡点时，就会更“努力”地去满足这条边的长度和方向要求。

“我不是要保证尽可能isometric吗？”
是的！而 A*u=b 这个方程，正是实现这个目标的数学工具。求解这个方程得到的新 u，其每个三角形的形状会趋向于 global[i] * e 所定义的那个只有旋转、没有缩放的“理想形状”。cots 在这个过程中扮演的角色，是告诉求解器在成千上万个三角形中，应该优先满足哪些三角形的“保长度”要求。

“我认为右边就是一个缩放矩阵就行了”
这里的混淆点在于，b 不是一个作用于顶点的变换。它是一个目标值。整个过程更像是一个巨大的“最小二乘”拟合问题：我们有一个描述内部连接的矩阵A，我们想找到一个位置向量u，使得A*u的结果尽可能地接近我们的目标b。而这个b，正是由“旋转过的完美边”和“边的重要性(cots)”共同决定的。

希望这个从物理意义到数学原理的拆解，能够彻底解开您关于 b 向量的疑惑！这是一个非常深刻的问题，理解了它，就真正理解了ARAP算法的精髓。
```

#### ARAP推导文档

```dockerfile
ARAP能量函数与梯度的推导

您的问题非常深刻：Au = b 这个线性系统，是如何从“尽可能保持等距(isometric)”这个目标推导出来的？为什么cotangent权重会同时出现在A和b中？

答案在于，ARAP算法的核心是定义一个**“变形能量” (Deformation Energy)**，然后通过最小化这个能量来找到最佳的2D顶点位置。我们求解的线性系统Au=b，正是这个能量函数梯度为零的数学表达。

1. 核心思想：定义“变形能量”

ARAP的能量衡量的是当前2D形状与理想2D形状之间的差异。

当前2D形状: 由我们要求解的变量——顶点位置 u 决定。

理想2D形状: 它就是原始3D三角形经过一次纯旋转后得到的形状。它具有完美的边长和角度，只是方向变了。

因此，ARAP的总能量 E(U) 是所有三角形的“局部变形能量” E_T 的总和：

$$E(U) = \sum_{T \in \text{Mesh}} E_T$$

而每个三角形 T 的局部变形能量，是其三条边的“变形程度”的加权和：

$$E_T(u_i, u_j, u_k) = \sum_{e_{ij} \in T} w_{ij} \left\| (u_i - u_j) - R_T(p_i - p_j) \right\|^2$$

让我们拆解这个关键公式：

u_i, u_j: 当前2D参数化平面上的顶点坐标（这是我们的变量）。

p_i, p_j: 原始3D模型中的顶点坐标（这是常量）。

(u_i - u_j): 当前2D网格中的边向量。

(p_i - p_j): 原始3D网格中的边向量。

R_T: 在局部步骤中为这个三角形T计算出的最佳旋转矩阵。

R_T(p_i - p_j): 这就是我们说的**“理想的边向量”**——它有完美的长度和角度，只是被旋转到了最佳方向。

w_{ij}: 这就是余切权重 (cotangent weight)。它衡量了这条边在整个能量计算中的“重要性”或“影响力”。

2. 最小化能量：梯度为零

为了找到使总能量 E(U) 最小的顶点位置 U，我们需要使用微积分的基本原理：在最小值点，能量函数对所有变量的梯度（偏导数）都必须为零。

我们的变量是所有顶点的坐标 u_k (具体来说是 u_k.x 和 u_k.y)。所以，我们需要求解以下方程组：

$$\frac{\partial E(U)}{\partial u_k} = 0 \quad (\text{对于所有顶点 } k)$$

3. 开始推导：对单个顶点求偏导

我们来关注能量函数 E 对某一个特定顶点 u_k 的偏导数。

首先，注意到 u_k 只会出现在与它相邻的边的能量项中。所以我们只需要对包含 u_k 的那些能量项求导。

让我们看一条边 (k, j) 的能量项：
$E_{kj} = w_{kj} \left\| (u_k - u_j) - R_{kj}(p_k - p_j) \right\|^2$
(这里的 R_kj 是包含边 (k,j) 的某个三角形的旋转矩阵)

对这个能量项求 u_k 的偏导数，根据链式法则 (d/dx) ||v(x)||^2 = 2v(x) · (dv/dx)，我们得到：

$$\frac{\partial E_{kj}}{\partial u_k} = 2 w_{kj} \left( (u_k - u_j) - R_{kj}(p_k - p_j) \right)$$

现在，我们将所有与 u_k 相连的边的贡献加起来，并让总和为零：

$$\frac{\partial E}{\partial u_k} = \sum_{j \in N(k)} 2 w_{kj} \left( (u_k - u_j) - R_{kj}(p_k - p_j) \right) = 0$$


(这里的 N(k) 代表顶点 k 的所有邻居顶点 j)

4. 整理方程：分离变量 u

我们可以把上面这个方程中的 u 项和 p, R 项分开。首先，去掉常数 2：

$$\sum_{j \in N(k)} w_{kj} (u_k - u_j) - \sum_{j \in N(k)} w_{kj} R_{kj}(p_k - p_j) = 0$$

然后，移项得到我们最终的平衡方程：

$$\sum_{j \in N(k)} w_{kj} (u_k - u_j) = \sum_{j \in N(k)} w_{kj} R_{kj}(p_k - p_j)$$

这个方程必须对每一个内部顶点 k 都成立。

5. 连接数学与代码：Au = b 的诞生

现在，我们来看这个方程是如何变成您的代码的。

等式左边 (LHS): A * u

$$\text{LHS} = \sum_{j \in N(k)} w_{kj} (u_k - u_j)$$

我们把它展开：


$$\text{LHS} = \left(\sum_{j \in N(k)} w_{kj}\right) u_k - \sum_{j \in N(k)} w_{kj} u_j$$

这正是您的余切拉普拉斯矩阵 A 的定义！

对角线元素 A(k, k): 它的值是所有与 k 相连的边的权重之和，即 (∑ w_kj)。

非对角线元素 A(k, j): 它的值是连接 k 和 j 的那条边的权重的负数，即 -w_kj。

当矩阵 A 的第 k 行乘以顶点位置向量 u 时，得到的结果 (Au)_k 就精确地等于上面的展开式。

等式右边 (RHS): b

$$\text{RHS} = \sum_{j \in N(k)} w_{kj} R_{kj}(p_k - p_j)$$

这正是您的**“理想拉力”向量 b**！

向量 b 的第 k 个元素 b_k，就是所有与 k 相连的“理想边” R(p_k-p_j)，经过它们各自的余切权重 w_kj 加权后的总和。

您的代码通过遍历每个三角形，并将计算出的 cots * global * e 的贡献累加到相应的顶点上，最终构建出了这个 b 向量。

结论

我们已经完整地从ARAP的能量函数出发，推导出了您代码中求解的线性系统 Au = b。

这个推导过程清晰地表明：

cotangent 是能量函数中固有的权重，它衡量了每条边的重要性。

对能量函数求导（寻找最小值）时，这个 cotangent 权重 w 自然地、同时地出现在了包含变量 u 的项（最终构成了矩阵A）和不包含变量 u 的项（最终构成了向量b）中。

因此，为了正确地最小化ARAP能量，cotangent 必须同时作为构建A和b的权重。您看到的 b 向量中的 cots 乘法，不是一个随意的缩放，而是能量梯度推导的必然结果。
```

具体就是对原始公式求个导，然后变量分离![](/assets/posts/digital-geometry-processing/image-20251017224108419.webp)![](/assets/posts/digital-geometry-processing/image-20251017224028364.webp)
![](/assets/posts/digital-geometry-processing/image-20251017223916174.webp)![](/assets/posts/digital-geometry-processing/image-20251017224228346.webp)

![](/assets/posts/digital-geometry-processing/image-20251017224837026.webp)

```
https://blog.csdn.net/why18767183086/article/details/108034725?ops_request_misc=%257B%2522request%255Fid%2522%253A%25227b52c04b5fa98b59c44a9cf535761a34%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=7b52c04b5fa98b59c44a9cf535761a34&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-108034725-null-null.142^v102^pc_search_result_base2&utm_term=arap%E5%8F%82%E6%95%B0%E5%8C%96&spm=1018.2226.3001.4187
```

![](/assets/posts/digital-geometry-processing/image-20251017224940270.webp)

这个是连续介-质力学”的公式，另一个是相同意义的离散微分几何公式

为什么只对ui求偏导？而不是pi？![](/assets/posts/digital-geometry-processing/image-20251017225725809.webp)

这个公式的单例的意义是什么？：

![](/assets/posts/digital-geometry-processing/image-20251017233103287.webp)

### 作业6

问题：
![](/assets/posts/digital-geometry-processing/image-20251026211612175.webp)

进行变换之后，所有顶点的Z轴方向改变，全都缩到原点去了，解决：把所有的Z轴不做变换。
我记得一开始还出现了一旦拖动顶点，所有顶点都会往中心去，是因为Z轴的坐标突然迭代变很大。这是什么原因造成的？

后面一个问题：fixed顶点在变形过程中还会改变：这是因为相机的缘故，每次通过meshupdate()的方法都会重置相机位置
![](/assets/posts/digital-geometry-processing/image-20251026223258245.webp)

![](/assets/posts/digital-geometry-processing/image-20251026223316221.webp)

现在的问题是，变形过程中这个模型会发生萎缩。原因是我只做了一次迭代，没有做多次迭代，效果不到位

![](/assets/posts/digital-geometry-processing/image-20251026223355175.webp)

### 重点错误：

这里做出来的重点错误就是，每次变换后，把这次变换前的坐标（上一次变换的new_position）作为old_position保存，然后进行下次迭代，这是严重的理解错误。正确做法是把模型一开始的顶点位置作为old_position保存起来，然后每次都是依据这个Old_position进行迭代的。

### 作业 7

我的代码好像确实是没问题的，问题在于结果的展示有问题，理论上来讲，参数化后应该是按照原来模型的分布进行展示，而我现在的样子是把他逆时针转了75度左右。是因为我边界半边参数化做的有问题吗

![](/assets/posts/digital-geometry-processing/image-20251108234437052.webp)

下面这个是普通的tuttes embedding

![](/assets/posts/digital-geometry-processing/image-20251108234932784.webp)





## 项目环境与调试记录

从vs2022升级到vs2026有一堆报错，主要的问题是E1696找不到头文件的问题，我的解决方案是把老版本的sdk装回来，然后重新配置。这里发现仍然解决不了问题，问题集中在IntelliSense上面，一直有提示错误E1696。问了gemini发现删除掉原项目的.VS文件夹后，缓存清理之后就可以正常无报错提示了。

```
很高兴你解决了问题！

你问的 .vs 文件夹是一个非常好的问题。

简单来说，.vs 文件夹是 Visual Studio 为你的项目（或解决方案）创建的一个“缓存和临时配置”文件夹。

它不是你的源代码的一部分。它100%可以安全删除（就像你刚刚做的那样），Visual Studio 会在下次打开项目时自动重新生成它。

1. 它的主要作用是什么？
.vs 文件夹里存放着所有“与你本地开发环境相关”的临时数据，主要包括：

IntelliSense 数据库 (最重要的)：

这就是导致你 E1696 错误的“元凶”。

为了实现快速的代码自动补全、错误提示（红色波浪线）和“转到定义”功能，Visual Studio 会预先扫描你的所有代码和 #include 的头文件，为它们建立一个索引数据库（通常是 .db 或 .suo 文件）。

这个数据库就存放在 .vs 文件夹里。

本地用户设置：

比如你上次打开项目时，打开了哪些文件、在哪些行设置了断点、你的窗口布局是怎样的。

这些个性化设置也存在这里，这样你下次打开项目时，VS可以恢复到你上次离开时的状态。

浏览信息 (Browse Information)：

用于支持 "Class View"（类视图）和 "Object Browser"（对象浏览器）的数据。

2. 为什么删除它能解决你的 E1696 问题？
你遇到的情况是：

你迁移了项目（从 VS2022 到 "VS2026"，或者只是换了环境）。

你的 CMakeLists.txt 和源代码都是最新的。

但是，.vs 文件夹里的 IntelliSense 数据库还是旧的。

这个旧的数据库“记住”了你旧环境的头文件路径（比如 D:\old_libs\eigen），所以它找不到文件，疯狂提示你 E1696 错误。

与此同时，你的 CMake 配置（在 build 文件夹里）可能也是旧的。

你执行的“方案B”做了两件事：

删除 build 文件夹： 这强制 CMake 重新运行，生成了指向新环境、新路径的正确配置。

删除 .vs 文件夹： 这强制 IntelliSense 扔掉了那个过时的、指向旧路径的数据库。

当你重新打开VS时，IntelliSense 发现数据库没了，于是它根据第一步生成的那个全新的、正确的 CMake 配置，重新扫描了所有文件，建立了一个全新的、正确的数据库。

于是，你的 E1696 红色波浪线就消失了。

总结
你可以把 .vs 文件夹想象成是 VS 为这个项目专门准备的“草稿纸”。时间久了，草稿纸上记的东西（缓存）可能会过时或写错（损坏）。

当VS表现得很奇怪（比如明明能编译，却满是红色波浪线）时，最简单的办法就是把这张“草稿纸”撕掉（删除 .vs 文件夹），让它拿张新纸重新开始写（重建缓存）。

因此，在 git 或 svn 这样的版本控制系统中，.vs 文件夹永远都应该被添加到 .gitignore（忽略列表）中，绝对不要提交它。
```



## 数学补充

### 正交矩阵列向量是单位向量

![](/assets/posts/digital-geometry-processing/image-20251022001439130.webp)![](/assets/posts/digital-geometry-processing/image-20251022001519844.webp)




