#### 1.java三个体系：
java SE standard edition标准版

java EE enterprise edition企业版

java ME micro edition微型版

#### 2.JDK和JRE：
JDK包含了JRE，JDK可以将java进行编译和调试，是开发环境；

JRE则是java运行环境，只能运行java文件，用户只需要JRE。

.java是纯文本文件，是任何文本编辑器都可以编写，但是不能执行；
JDK是java语言的开发包，可以将.java编译成可执行的java程序；
JVM则是运行可执行的java程序；（JDK包含JRE，JRE包含JVM）
eclipse就是java的开发环境

java基础j2se---数据库知识---java web（html+css+）----j2EE
J2SE内容：

#### 3.java两种核心机制

java虚拟机jvm：则是与平台无关的语言
java每种基本类型所占空间大小不随硬件架构变化，是固定的，其为可移植原因之一。

垃圾收集机制：不在使用指针，语言健壮性较好

#### 4.java是解释性语言

编译型语言：编译之后可以直接运行，其实是把所有的源程序全部编译成二进制代码的可运行程序，可直接运行此程序

编译型语言执行速度快，效率高，但是跨平台性能较差，c，c++
解释性语言：执行需要一个解释环境，其实是把做好的源程序翻译一句，然后执行一句，直到结束。

java程序也需要编译，但是不是直接编译机器语言，而是先编译成字节码，然后解释执行字节码。也就是刚开始java文件编译成了class文件，随后用虚拟机/jvm/jre拿一行解释一行，解释成操作系统可执行的。

#### 5.java程序执行过程和内存管理

**程序执行过程**：

exe直接在操作系提执行，class要在虚拟机上执行；在硬盘中存在一个程序先load到内存中，操作系统找到内存中的main方法开始执行，

**执行过程中进行内存管理，分为四部分**：

code segment存放代码

data segment静态变量static和字符串常量

stack局部变量

heap存放new出来的东西，也就是存放很多对象

#### 6.java变量分类

（局部变量和成员变量）java中没有全局变量

**局部变量**：

方法体内声明的变量（包含形参），若不初始化会报错

**成员变量**：

类体class内声明的变量，若不初始化，则java会默认初始化，一般为0等

#### 7.java数据类型

**基本数据类型和引用数据类型**

二者区别：

基本类型占用一块内存

除了8种基本类型，其他全是引用数据类型，引用数据类型占用两块内存（类和对象）

**基本数据类型：（面试会问，四类8种分类明白的说出)**

数值型4类8种基本类型

整型：byte,short,int,long

（整型byte1范围-128--127，short2，int4，long8后边要加l和浮点型float4加上f，double8）
ps：根据所要表示的范围选择需要的类型，节省空间

浮点型：float,double

字符型：char

布尔型：boolean

#### 8.在内存中区分类和对象：

类是静态的概念，在代码区；引用new出来的对象都在heap中（堆内存），类的每个成员变量在不同对象中都有不同的值，但是方法只有一份，执行的时候才占用内存。

#### 9.数据类型转换：（和随后的对象转型的基本原则相同）
##### 1.容量小的类型自动转换为容量大的数据类型

表示数的大小，不是内存中多少，不然long和float就不是如此）
容量大小排序：
byte,short,char(三者之间不能相互转换)--int--long--float--double

##### 2.容量大的数据类型转换为容量小的数据类型需要加上强制转换符
这时精度会降低，特别需要注意。

实数默认是double（所以float类型后边要加上f），整数默认是int（所以long类型要在后边加上l）

可以直接将整型常量直接赋值给byte，short，char等，不需要进行强制类型转换，只要不超出其表数范围。

写出编译出错的地方：
```

void public method()
{
  int i=1,j;
  float f1=0.1;有错，实数默认是double类型，这样需要强制转换成folat或者后边加上f：区别：0.1f本身就是4个字节；(float)0.1则是存储8个字节，知识强制转换了
  float f2=123; 无错，123默认为整型，int转换成float是自动转换
  long l1=12345678,l2=8888888888;12345678默认为int型，自动转换成l无问题；8888888888超出int范围，后边加上l或者强制转换(long)
  double d1=2e20,d2=124;无问题，d2可以直接int类型转变成double类型
  byte b1=1,b2=2,b3=129;b1，b2无问题，但是b3有问题，超出byte
  j=j+10;有错，j还无赋值
  i=i/10;有错，结果会是0，
  i=i*0.1;有错，虽然结果一样，但是i就会变成double类型，因为*0.1，所以需要强制转换
  char c1='a',c2=125;无错
  byte b=b1-b2;有错，默认b1，b2读取为int型，转换成byte需要强制转换
  char c=c1+c2-1;有错，默认c1，c2读取为int型，转换成char需要强制转换
  float f3=f1+f2;无错，因为f1，f2本身就是float类型
  float f4=f1+f2*0.1;有错，因为0.1默认是double类型，虽然f1和f2是float类型，还需要强制转换
  double d=d1*i+j;有错，j无赋值
  float f=(float)(d1*5+d2);无错
}

```

#### 10.运算符：
##### 1.自加（++）和自减（--）：在前时先运算再取值，再后时先取值后运算

```
例子：
int i1=10,i2=20;
int i = (i2++);
System.out.println("i=" + i +"i2="+ i2);i=20,i2=21
i=(++i2);
System.out.println("i=" + i +"i2="+ i2);i=22,i2=22
例子：
public class Test{
  public static void main(String[] args) {
    Person p1 = new Person(1,22);id和age
    Person p2 = new Person(2,23);
    int age = 25;
    p1.setAge(age);//p1的age为25
    p2.setAge(age++);//加号在后边，先取值后运算，age为26，但p2的age是25
  }
}
```


##### 2.短路与&&和逻辑与&区别，短路或||和逻辑或|区别：

```
&&第一个不成立则不再计算，||第一个成立则不在计算
public class Test {
  public static void main(String args[]){
    int i = 1,j = 2;
    boolean flag1 = (i>3)&&((i+j)>5);
    //第二个操作数i+j>5不计算，因为i>3不成立，这就是短路与，但是逻辑与第一个不成立则仍然计算第二个操作数
    boolean flag2 = (i<2)||((i+j)>5);//不算第二个操作数，因为第一个成立
  }
}
```
##### 3.+运算符：

```
算数加法，还可以对字符串进行连接操作
+运算符两侧的操作符只要有一个是字符串类型，系统会自动把另外一个操作数转换成字符串然后进行连接。
写1+1*2+1*2*3=1*2*3*4+····也就是计算result=1!+2!+···+10！
int j=1,result=0;
for(int i = 1;i <= 10;i++){
  j = j * i;
  result += j;
}
用一个for循环写1+3+5+···+99值
int j,result=0;
for（int i = 1；i <= 50;i++）{
  j=i*2-1;
  result=result+j;
}
输出1-100的前五个可以被3整除的数
int j = 1;
for(int i = 1;j <=5 &&i <= 100;i++) {
  if(i % 3 == 0){
    System.out.println(i);
    j++;
  }
}
输出101-200的质数
public class practicewhile {
  public static void main(String[] args) {
    for(int i = 101;i <= 200;i++){
        if(i % 2 != 0 && i % 3 != 0 && i % 5 != 0 && i % 7 != 0){
          System.out.println(i);
        }
    }

  }
}
此方法是break和continue的运用~
public class practicewhile {
  public static void main(String[] args) {
    for(int i = 101;i <= 200;i++){
      for(int j = 2;j < i;j++){
        boolean f = true;
        if(i % j == 0) {
          f = false;
          break;
        }
      }
      if(!f){continue;}
      System.out.println(i);
    }

  }
}
```
#### 11.面向对象

**类**：

描述同个类型对象的抽象的概念，类中定义了一类对象具有的静态和动态属性

**对象**：

可以看成该类的一个具体实例，对象通过属性（成员变量）和方法对应事物具有的静态和动态属性

**创建对象**

new+构造方法创建新对象，其实new新对象时，就是调用了构造方法，从而形成新对象

```
若不写构造方法，系统默认无参数的构造方法name of class () {}
面向对象的核心思想是：引用
public class Person {
  int id;
  int age;
  Person(int _id,int _age) {
    id = _id;
    age = _age;
  }

  public static void main(String[] args) {
    Person tom = new Person(5,3);

  }
}
```
内存过程：在栈内存stack中分配空间tom***，且调用Person使局部变量_id：5和_age：3都在栈内存中，随后new一个对象存放在heap堆内存中，方法调用结束后，栈内存的_id 和_age局部变量则无作用，空间清除，想下图

分析下面程序内存：笔记本p1

```
class BirthDate {

  private int day;
  private int month;
  private int year;

  public BirthDate(int d,int m,int y){
    day = d;
    month = m;
    year = y;
  }

  public void setDay(int d) {
    day = d;
  }

  public void setMonth(int m) {
    month = m;
  }

  public void setYear(int y) {
    year = y;
  }

  public int getDay() {
    return day;
  }

  public int getMonth() {
    return month;
  }

  public int getYear() {
    return year;
  }

  public void display() {
    System.out.println (day+"-"+month+"-"+year);
  }

}

public class Test {

  public static void main(String[] args) {
    Test t = new Test();
    int date = 9;
    BirthDate d1 = new BirthDate(7,7,1970);
    BirthDate d2 = new BirthDate(1,1,2000);

    t.change1(date);
    t.change2(d1);
    t.change3(d2);

    System.out.println("date=" + date);
    d1.display();
    d2.display();
  }

    public void change1(int i){
      i = 1234;
    }

    public void change2(BirthDate b){
      b = new BirthDate(22,2,2004);
    }

    public void change3(BirthDate b){
      b.setDay(22);
    }

}
```

注意：每个编译单元（文件）都只能有一个public类。这表示，每个编译单元都有单一的公共接口，用public类来表现。
该接口可以按要求包含众多的支持包访问权限的类。如果在某个编译单元内有一个以上的public类，编译器就会给出出错信息。

#### 12.重载overload

方法的重载指一个类中可以定义有相同的名字，但参数不同的多个方法，调用时，会根据不同的参数表选择对应的方法，但返回值类型必须一致。

```

练习：点对象是否在圆内（认真考虑函数在什么类中，需要声明方法，重点方法的参数）
class Point {
  private double x;
  private double y;

  Point(double _x,double _y) {
    x = _x;
    y = _y;
  }

  void setX(double _x) {
    x = _x;
  }

  void setY(double _y) {
    y = _y;
  }

  double getX() {
    return x;
  }

  double getY() {
    return y;
  }
}

class Circle {
  private Point o;
  private double radius;

  Circle(Point p,double r) {
    o = p;
    radius = r;
  }

  Circle(double r) {
    o = new Point(0.0,0.0);
    radius = r;
  }

  Point getO() {
    return o;
  }

  double getRadius() {
    return radius;
  }

  void setO(Point p) {
    o = p;
  }

  void setRadius(double r) {
    radius = r;
  }

  boolean inCircle(Point p) {
    if((o.getX()-p.getX())*(o.getX()-p.getX())+(o.getY()-p.getY())*(o.getY()-p.getY()) < radius * radius) {
      return true;
    }else{
      return false;
    }
  }

  double aera() {
    return radius*3.14*radius;
  }
}


public class Test3 {
  public static void main(String[] args) {
    Circle c1 = new Circle(new Point(1.0,2.0),3.0);
    Circle c2 = new Circle(3.0);

    System.out.println("c1(" + c1.getO().getX() + "." + c1.getO().getY() + ")" + "," + c1.getRadius());
    System.out.println(c1.aera());

    System.out.println("c2(" + c2.getO().getX() + "." + c2.getO().getY() + ")" + "," + c2.getRadius());
    System.out.println(c2.aera());

    Point p1 = new Point(5.2, 6.3);
    System.out.println(c1.inCircle(p1));

    System.out.println(c2.inCircle(new Point(2.0,2.0)));
  }
}
```

#### 13.this关键字：

代表使用该方法的对象的引用；内存分析p2
```

public class Leaf {
  int i = 0;
  Leaf(int i) {this.i = i;}//这时候，stack中有成员变量i和形参i，用this就区分了，所以用this可以处理方法中成员变量和参数重名的情况，用this标注的i肯定是成员变量
  Leaf increament() {//方法要求返回Leaf对象的引用，this就是对象的引用，所以返回Leaf
    i++;
    return this;//返回值还会在stack中有存储空间
  }
  void print() {
    System.out.println("i="+i);
  }
  public static void main(String[] args) {
    Leaf leaf = new Leaf(100);
    Leaf.increament().increament().print();
  }
}
```

#### 14.static关键字

在类中，用static声明的成员变量是静态成员变量，为该类的公用变量，在第一次使用时被初始化，对类的所有对象来说，static成员变量只有一份，存放在data segment中

在类中，用static声明的方法是静态方法，在调用静态方法的时候，不会将对象的引用传递给它，所以在static方法中不可访问非static的成员。
可以通过对象引用或类名访问静态成员。

main方法中必须有static，就是因为我们平时使用main方法不需要new出对象就可以使用

```
分析有static以及字符串常量的内存：p3
public class Cat {
    private static int sid = 0;
    private String name;
    int id;
    Cat(String name) {
        this.name = name;
        id = sid++;
    }
    public void info(){
        System.out.println
               ("My name is "+name+" No."+id);
    }
    public static void main(String arg[]){

        Cat.sid = 100;
        Cat mimi = new Cat("mimi");
        Cat pipi = new Cat("pipi");
        mimi.info();//100
        pipi.info();//101
    }
}
无static之后，sid不累加，p4
public class Cat {
    private int sid = 0;
    private String name;
    int id;
    Cat(String name) {
        this.name = name;
        id = sid++;
    }
    public void info(){
        System.out.println
               ("My name is "+name+" No."+id);
    }
    public static void main(String arg[]){

        Cat mimi = new Cat("mimi");
        Cat pipi = new Cat("pipi");
        mimi.info();//1
        pipi.info();//1
    }
}
```

#### 15.package和import语句

package命名将域名倒过来写，不会冲突，package com.,因为公司域名都不一样，则package取名不会重复；（约定俗成）

**package需要注意：**

##### 1.package为解决类的命名冲突问题，java加入包机制，提供类的多重类命名空间，package必须写在源代码的第一条语句

class中
##### 2.编译出来的class文件必须在正确目录下边，即和package的层次完全一致

##### 3.在另外class中要用package中的类，必须将名字写全，但需要写全很麻烦，则引入import

比如引用Cat类：则是com.bjsxt.Cat c= new com.bjsxt.Cat();
但是麻烦，则引出import，在文件第一行加入import com.bjsxt.Cat;或者import com.bjsxt.*;

jar包

#### 16.类的继承与权限控制：

##### 1.通过extends关键字实现类的继承

##### 2.通过继承子类自动拥有基类（superclass）的所有成员（变量和方法）
ps：虽然继承了所有的成员，不管是public、protected、private，但是private和default类型的成员还是不能被子类访问的

##### 3.java只允许单继承，不允许多继承（一个子类只能有一个基类，一个基类可以派生多个子类）

```
class Parent {

}
class Child extends Parent {

}
访问权限：
                类内部         同一个包        子类        任何类
private:        yes
default：       yes            yes
protected:      yes            yes            yes
public:         yes            yes            yes           yes
对于class的权限修饰用public和default：但随后好似会学内部类
public class可以在任何地方访问
default class只可以被同一个包内部的类访问
```


#### 17.方法的重写overWrite or override：

（继承时候，不是百分之百满意原方法，则需要进行重写）

##### 1.在子类中可以根据需要对基类中继承来的方法进行重写。
##### 2.重写的方法必须和被重写方法具有相同方法名称、参数列表和返回类型。
##### 3.重写方法不能使用比被重写方法更加严格的访问权限

#### 18.super 关键字

java类中使用super来引用基类的成分；内存分析p5

```
class FatherClass {
    public int value;
    public void f(){
        value = 100;
        System.out.println
        ("FatherClass.value="+value);
    }
}

class ChildClass extends FatherClass {
    public int value;
    public void f() {
        super.f();
        value = 200;
        System.out.println
             ("ChildClass.value="+value);
        System.out.println(value);
        System.out.println(super.value);
    }
}

public class TestInherit {
	public static void main(String[] args) {
		ChildClass cc = new ChildClass();
		cc.f();
	}
}
```

#### 19.继承中的构造方法：
##### 1.子类的构造过程必须调用基本的构造方法
##### 2.使用super(参数列表)调用基类的构造方法，使用this(参数列表)可以调用本类的其他构造方法，如果调用了super，必须写在子类构造方法的第一行；
##### 3.若子类构造方法没有显示调用基类构造方法则系统默认调用无参数的构造方法
##### 4.如果子类构造方法既没有显示调用基类构造方法，而基类又没有无参数的构造方法，则编译出错

#### 20.object类的方法：
（toString和equals都需要重写，因为默认的方法都是我们不希望的）

##### 1.toString方法：一般都继承且重写toString方法

##### 2.equals方法:

1.Object中定义是 public boolean equals(Object obj)即默认是看两者是否指向同一对象

```
 文档说明：that is, for any non-null reference values x and y, this method returns true if and only if x and y refer to the same object (x == y has the value true).
```

2.object的equals方法定义是：x.equals(y)当x和y是同一对象的引用时，返回true否则返回false

3.一般都会重写equals方法，如下实例；同时，J2SDK 很多类，比如String等已经对equals进行重写了，本身是比较是否为同一对象的引用，现在则是比较字符串是否相等。

```

 public class TestEquals {
   public static void main(String[] args) {

     Cat c1 = new Cat(1,2,3);
     Cat c2 = new Cat(1,2,3);

     System.out.println(c1.equals(c2));
   }
 }

 class Cat {
   int color;
   int height,weight;

   public Cat(int color,int height,int weight) {
     this.color = color;
     this.height = height;
     this.weight = weight;
   }
   // 继承并且改写equals方法
   public boolean equals(Object obj) {
     if(obj == null) return false;
     else {
       if(obj instanceof Cat){
         Cat c = (Cat)obj;
         if(this.color == c.color && this.height == c.height && this.weight == c.weight){
           return true;
         }
       }
     }
     return false;
   }
 }

```

#### 21.对象转型casting：（ppt132-135）

1.一个基类的引用类型变量可以“指向”其子类的对象。（这样可扩展性好，下面代码好好理解为什么就可以只用一个方法f，都传的是Animal都可以了！！）


2.一个基类的引用不可以访问其子类对象新增加的成员（属性和方法）

3.可以用引用变量instanceof类名 来判断该引用型变量所“指向”的对象是否属于该类或者该类的子类---则instanceof是看实际是什么类型，不看引用时什么类型

4.子类对象可以当做基类的对象来使用成为向上转型（upcasting），反之则是向下转型（downcasting），需要加上强制转换符

```

public class ObjectConvert {
  public static void main(String[] args) {
    ObjectConvert o = new ObjectConvert();

    Animal a = new Animal("name");
    Cat c = new Cat("catname","blue");
    Dog d = new Dog("dogname","black");

    o.f(a);
    o.f(c);
    o.f(d);
  }

  public void f(Animal a) {
    System.out.println("name:" + a.name);
    if(a instanceof Cat) {
      Cat cat = (Cat)a;
      System.out.println("eyesColor:" + cat.eyesColor);
    }
    if(a instanceof Dog) {
      Dog dog = (Dog)a;
      System.out.println("furColor:" + dog.furColor);
    }
  }
}

class Animal {
  public String name;

  public Animal(String name) {
    this.name = name;
  }
}

class Cat extends Animal {
  public String eyesColor;

  public Cat(String name,String color) {
    super(name);
    eyesColor = color;
  }
}

class Dog extends Animal {
  public String furColor;

  public Dog(String name,String color) {
    super(name);
    furColor = color;
  }
}
虽然上述程序扩展性比之前好，因为f()函数就重复用了，但是下边看扩展性更好的方法：动态绑定和多态

```

#### 22.动态绑定和多态：（是面向对象的核心）

**多态的存在三个必要条件：**

1.要有继承

2.要有重写

3.父类引用指向子类对象（当三个条件满足时，调用对象方法时候，new的是谁，则调用谁的方法）

动态绑定：指“在执行期间（不是编译期间）”判断所引用对象的实际类型，根据实际类型调用相应的方法


#### 23.final 关键字

可修饰变量，方法和类；相当于c++的关键字 const

final 的变量值不可以被改变

final 的方法不能被重写

final 的类不能被继承

#### 24.数组

一维数组的声明方式：type var[];
或者type[] var;声明的时候不能声明数组的长度，比如：int a[5];不合法
数组对象的创建：int s[];s = new int[5];

```
public class ArrayTest {
  public static void main(String[] args) {

    int s[];
    s = new int[5];

    for(int i = 0;i <= 4;i++) {
      s[i] = i;
    }
  }
}

```
元素为引用数据类型的数组--这种数组每一个元素都要实例化

动态初始化--数组定义与数组元素分配空间和赋值的操作分开进行，比如：

```

public class ArrayTest {
  public static void main(String[] args) {
    Date days[];
    days = new Date[3];
    for(int i = 0;i <= 2;i++) {
      days[i] = new Date(2004,4,i+1);
    }
  }
}
class Date {
  int year;
  int month;
  int day;

  Date (int year;int month;int day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
}
静态初始化：在定义数组的同时就为数组元素分配空间并赋值
public class ArrayTest {
  public static void main(String[] args) {
    int a[] = {1,2,3};
    Date days[] = {
      new Date(1,4,2004);
      new Date(2,4,2004);
      new Date(3,4,2004);
    };
  }
}
class Date {
  int year;
  int month;
  int day;

  Date (int year;int month;int day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
}

```

##### 25.九种排序算法代码：

```
直接插入排序：
public class SortArray {
  public static void main(String[] args) {
    int a[] = {2,4,6,1,3,8,9,7,5};
    insertionSort(a);
    for(int i = 0;i < a.length;i++)
      System.out.print(a[i] + " ");
  }
// insertionSort必须为static方法，因为不能再静态上下文中引用非静态的方法
  public static int[] insertionSort(int a[]) {
    for(int i = 1;i < a.length;i++) {
      for(int j = i;j > 0;j--) {
        if(a[j] < a[j-1]) {
          int temp = a[j];
          a[j] = a[j-1];
          a[j-1] = temp;
        }
      }
    }
    return a;
  }
}
```

```

折半插入排序：
public class SortArray {
  public static void main(String[] args) {
    int a[] = {2,4,6,1,3,8,9,7,5};
    binaryInsertSort(a);
    for(int i = 0;i< a.length;i++){
      System.out.println(a[i] + "");
    }
  }

  public static int[] binaryInsertSort(int a[]) {
    for(int i = 1;i < a.length;i++) {
      int temp = a[i];
      int low = 0;
      int high = i-1;

      while(low <= high) {
        int mid = (low + high)/2;
       if(temp < a[mid]) {
         high = mid - 1;
       }else{
         low = mid + 1;
       }
      }

      for(int j = i; j >=low + 1;j--){
        a[j] = a[j-1];
      }
      a[low] = temp;
    }
    return a;
  }
}

```

```

希尔排序
public class SortArray {
  public static void main(String[] args) {
    int a[] = {2,4,6,1,3,8,9,7,5};
    shellInsertSort(a);
    for(int i = 0;i< a.length;i++){
      System.out.println(a[i] + "");
    }
  }

  public static int[] shellInsertSort(int a[]) {
    int d = a.length;
    while(true)
    {
      d = d/2;
      for(int x = 0;x < d;x++){
        for(int i = x + d;i < a.length;i = i + d) {
          int temp = a[i];
          int j;
          // 注意判断条件j >= 0要在a[j] > temp前边，否则若j为负，a[j] > temp中数组不合法会运行报错
          for(j = i - d; j >= 0 && a[j] > temp;j = j-d) {
            a[j+d] = a[j];
          }
          a[j+d] = temp;
        }
      }
      if(d == 1){
        break;
      }
    }
    return a;
  }
}

```

```
简单选择排序
public class SortArray {
  public static void main(String[] args) {
    int a[] = {2,4,6,1,3,8,9,7,5};
    selectSort(a);
    for(int i = 0;i< a.length;i++){
      System.out.println(a[i] + "");
    }
  }

  public static int[] selectSort(int a[]) {
    int i,j,minIndex;
    for(i = 0;i < a.length;i++){
      minIndex = i;
      for(j = i + 1;j < a.length;j++){
        if(a[minIndex] > a[j]){
          minIndex = j;
        }
      }
      int temp = a[i];
      a[i] = a[minIndex];
      a[minIndex] = temp;
    }
    return a;
  }
}
```

```

堆排序：（答案还有问题）
public class SortArray {
  public static void main(String[] args) {
    int a[] = {2,4,6,1,3,8,9,7,5};
    heapSort(a);
    for(int i = 0;i< a.length;i++){
      System.out.print(a[i] + " ");
    }
  }

  public static int[] heapSort(int a[]) {

    for(int i = a.length/2 - 1;i >= 0;--i){
      heapAdjust(a,i);
    }

    for(int i = a.length - 1;i > 0;--i) {
      int temp = a[i];
      a[i] = a[0];
      a[0] = temp;
      heapAdjust(a,i);
    }
    return a;
  }

  public static int[] heapAdjust(int a[],int i) {
    int temp = a[i];
    int child = 2*i + 1;
    while(child < a.length){

      if(child + 1 < a.length && a[child] < a[child+1]) {
        ++child;
      }
      if(a[i] < a[child]) {
        a[i] = a[child];
        i = child;
        child = 2 * i + 1;
      }else {
        break;
      }
    }
    a[i] = temp;
    return a;
  }
}



public class HeapSortTest {

   public static void main(String[] args) {
     int[] data5 = new int[] { 5, 3, 6, 2, 1, 9, 4, 8, 7 };
       print(data5);
      heapSort(data5);
       System.out.println("排序后的数组：");
     print(data5);
   }

   public static void swap(int[] data, int i, int j) {
       if (i == j) {
          return;
       }
       data[i] = data[i] + data[j];
        data[j] = data[i] - data[j];
        data[i] = data[i] - data[j];
   }

    public static void heapSort(int[] data) {
        for (int i = 0; i < data.length; i++) {
            createMaxdHeap(data, data.length - 1 - i);
            swap(data, 0, data.length - 1 - i);
            print(data);
        }
    }

    public static void createMaxdHeap(int[] data, int lastIndex) {
       for (int i = (lastIndex - 1) / 2; i >= 0; i--) {
            // 保存当前正在判断的节点
            int k = i;
            // 若当前节点的子节点存在
            while (2 * k + 1 <= lastIndex) {
                // biggerIndex总是记录较大节点的值,先赋值为当前判断节点的左子节点
               int biggerIndex = 2 * k + 1;
                if (biggerIndex < lastIndex) {
                   // 若右子节点存在，否则此时biggerIndex应该等于 lastIndex
                   if (data[biggerIndex] < data[biggerIndex + 1]) {
                        // 若右子节点值比左子节点值大，则biggerIndex记录的是右子节点的值
                        biggerIndex++;
                   }
              }
                if (data[k] < data[biggerIndex]) {
                    // 若当前节点值比子节点最大值小，则交换2者得值，交换后将biggerIndex值赋值给k
                   swap(data, k, biggerIndex);
                   k = biggerIndex;
                } else {
                    break;
                }
            }
        }
   }

    public static void print(int[] data) {
       for (int i = 0; i < data.length; i++) {
            System.out.print(data[i] + "\t");
       }
        System.out.println();
    }

}
```

```
冒泡排序：
public class SortArray {
  public static void main(String[] args) {
    int a[] = {2,4,6,1,3,8,9,7,5};
    bubbleSort(a);
    for(int i = 0;i< a.length;i++){
      System.out.print(a[i] + " ");
    }
  }

  public static int[] bubbleSort(int a[]) {
    int i = a.length;
    int temp,j;
    while(i > 0) {
      for(j = 0;j < i-1;j++) {
        if(a[j] > a[j+1]) {
          temp = a[j];
          a[j] = a[j+1];
          a[j+1] = temp;
        }
      }
      i--;
    }
    return a;
  }
}
```

```
快速排序：
public class SortArray {
  public static void main(String[] args) {
    int a[] = {2,4,6,1,3,8,9,7,5};
    quickSort(a,0,a.length-1);
    for(int i = 0;i< a.length;i++){
      System.out.print(a[i] + " ");
    }
  }

  public static int[] quickSort(int a[],int left,int right) {
    int dp;
    if(left < right) {
      dp = partition(a,left,right);
      quickSort(a,left,dp - 1);
      quickSort(a,dp + 1,right);
    }
    return a;
  }

  public static int partition(int a[], int left,int right) {

    int temp;
    int pivot = a[left];
    while(left < right) {
      while(left < right && a[right] > pivot) {
        right--;
      }
      if(left < right) {
        temp = a[left];
        a[left] = a[right];
        a[right] = temp;
      }
      while(left < right && a[left] < pivot) {
        left++;
      }
      if(left < right) {
        temp = a[left];
        a[left] = a[right];
        a[right] = temp;
      }
      a[left] = pivot;

    }
    return left;
  }
}
```

```
归并排序：
public class SortArray {
  public static void main(String[] args) {
    int a[] = {2,4,6,1,3,8,9,7,5};
    mergeSort(a,0,a.length-1);
    for(int i = 0;i < a.length;i++){
      System.out.print(a[i] + " ");
    }
  }

  public static int[] mergeSort(int a[],int low,int high) {
    int mid = (low + high)/2;
    if(low < high) {
      mergeSort(a,low,mid);
      mergeSort(a,mid+1,high);
      merge(a,low,mid,high);
    }
    return a;
  }

  public static void merge(int a[],int low,int mid,int high) {
    int array[] = new int[high - low +1];
    //左指针
    int i = low;
    // 右指针
    int j = mid + 1;
    int k = 0;
    // 把较小的数先移到新数组中
    while(i <= mid && j <= high) {
      if(a[i] < a[j]) {
        array[k++] = a[i++];
      }else {
        array[k++] = a[j++];
      }
    }
    // 把左边剩余的数移到数组
    while(i <= mid) {
      array[k++] = a[i++];
    }
    // 把右边剩余的数移到数组
    while(j <= high) {
      array[k++] = a[j++];
    }
    // 把新数组中的数覆盖a数组
    for(int k2 = 0;k2 <array.length;k2++) {
      a[k2 + low] = array[k2];
    }
  }
}

```

一切都是对象：
用引用操纵对象：String s;创建的是引用，但不是对象；new实现对象和引用的关联，String s=new String("asdf");
作用域：基本类型的作用域就由花括号决定，c和c++会将一个较大作用域变量隐藏，但是java不会
{
  int x=12;
  {
    int x=96;  在c和c++中是合法的，但在java中不合法
  }
}
