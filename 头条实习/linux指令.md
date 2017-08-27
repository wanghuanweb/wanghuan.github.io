#### 1.linux常用命令

cd ~          // 进入用户主目录
cd ../repos   // 从当前目录退到上层目录，然后再进入repos目录
pwd           //查看当前目录
pwd -P        //显示出实际路径

mkdir dirname // 新建目录
touch a.js    // 创建文件

rm a.js       // 删除文件
rm -r dir     // 删除目录
rm -rf dir    // 强制删除该目录
rmdir         // 新建空目录


cp a.js b.js  // 拷贝文件
cp -r a b     // 拷贝目录

mv d1/a.js d2/a.js // 移动（剪切）文件
mv a.js b.js  // 重命名文件

ls            // 列出目录下的文件
ll -l         // 列出目录下的文件，列表模式
ls -a         // 列出目录下的所有文件（包括隐藏文件）

find是在**目录中寻找文件 ，grep是在文件中查找文本
find ** -name file.name  //在**目录下查找名字为file.name的文件
find ** -empty        //可以按照文件的特征进行查找（是否是null，大小是多大，尺寸是多大）
grep 'test' aa bb cc  //在aa bb cc中查找test文本
grep 'test' d*　　//显示所有以d开头的文件中包含 test的行

**系统管理命令**

ps：显示当前状态处于running的进程
ps aux：是显示所有进程和其状态。
ps aux|grep 9428：是查找有9428的进程
kill -9 ** 强制杀死某进程
top：实时更新所有进程的状态

cat指令
主要有三大功能：
1.一次显示整个文件:cat filename
2.从键盘创建一个文件:cat > filename 只能创建新文件,不能编辑已有文件.
3.将几个文件合并为一个文件:cat file1 file2 > file

**需要跑长时间的程序时，使用screen命令**

查看所有窗口：screnn -ls
新建窗口：screen -S name
进入窗口：screen -x name
退出窗口：ctrl+a+d
销毁窗口：exit


#### 3.Vim常用命令

Vim有三种工作模式：命令行模式，输入模式，末行模式：
1.命令行模式：
  1)        选择行：shift + v;
  2)        块操作：ctrl+v 然后选择行，按shift+i，再做相应的操作，最后按ESC
  3)        dd删除整行，x删除选定字符。
  4)        为了使函数块收起，将光标移到该行，按Z+C；打开函数块：Z+O
  5)        Vim编辑器中，v+w连续选择多个单词； v+方向键相当于Windows中的shift+方向键,连续选择多个字符。
  6)        撤销:u ；恢复: ctrl+r
  7)        复制整行：yy；复制n行：yny；粘贴：p
  8)        查找：/； 查找替换：%s/a/b/g (将文本中所有的a替换成b)
2.输入模式：a/i/o进入，esc退出
3.末行模式：:进入，esc退出
   :q 退出vi程序。
   :w  保存vi程序
   :q! 强制退出vi程序。
   :wq 保存修改并退出
 另外：当打开文件时，显示文件已经处于打开状态，并出现信息：swap file ".xx.py.swp" already exists!时，则:退出vim; ls -a 删除相对应的.swp文件(用rm xx命令)

操作一个文件的简单步骤
1、编辑文件，默认进入编辑模式
vim test.js
2、在编辑模式下，通过hjkl（左下上右）移动光标（也可以通过上下左右按键），按u撤销刚才的操作
3、按 a/i/o 进入插入模式
a: 在当前光标后插入
i: 在当前光标前插入
o: 在新的一行插入
在插入模式下按 esc 恢复到编辑模式（所以如果有错误的编辑，可以按esc后再按u来撤销刚才的编辑）
4、编辑模式下，输入: 进入命令模式
在命令模式下，输入 q/wq/q! 可推出vim编辑器
q: 没有修改文件时，直接退出
wq: 保存并退出
q!: 强制退出不保存
=================
Vim常用命令
      Vim有三种工作模式：命令行模式，输入模式，末行模式：
      1.命令行模式：
        1)        选择行：shift + v;
        2)        块操作：ctrl+v 然后选择行，按shift+i，再做相应的操作，最后按ESC
        3)        dd删除整行，x删除选定字符。
        4)        为了使函数块收起，将光标移到该行，按Z+C；打开函数块：Z+O
        5)        Vim编辑器中，v+w连续选择多个单词； v+方向键相当于Windows中的shift+方向键,连续选择多个字符。
        6)        撤销:u ；恢复: ctrl+r
        7)        复制整行：yy；复制n行：yny；粘贴：p
        8)        查找：/； 查找替换：%s/a/b/g (将文本中所有的a替换成b)
      2.输入模式：a/i/o进入，esc退出
      3.末行模式：:进入，esc退出
                         :q 退出vi程序。
                         :q! 强制退出vi程序。
                         :wq 保存修改并退出
       另外：当打开文件时，显示文件已经处于打开状态，并出现信息：swap file ".xx.py.swp" already exists!时，则:退出vim; ls -a 删除相对应的.swp文件(用rm xx命令)
