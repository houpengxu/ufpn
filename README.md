# Update files or folders prefix number. 更新文件或文件夹前缀数字

## Background 背景

Sometimes when organizing files or folders, we use sequential numbers with the prefix 01, 02, 03, and so on. If we need to insert a new file or folder in between, we have to modify the names of all the subsequent directories. To avoid this, we can create a small tool to automatically modify the names. For example, if there are 90 folders in the current directory and we want to add a new folder between 20XX and 21XX, we can first name it 20XX and then run the program. If the new folder needs to be swapped with 21XX, we can do it manually, and the subsequent directories will be updated automatically. Moreover, the program will automatically add leading zeros to the numbers as the quantity increases.

有时候整理文件或文件夹使用01、02、03、...有序数字前缀，之后需要在中间再插入一个文件或文件夹的话，后面的目录名称都得修改，所以，做一个小工具来自动修改。
例如：当前文件夹总共有90个文件夹，要在20XX和21XX之间新增文件夹，那么可以先命名为20XX，然后执行程序即可，新插入的文件夹可能和21需要互换，这时候手动修改就行了，后面的自动会更新，并且数量增多后会自动补0。

## Install 安装

```sh
npm install -g ufpn
```

## Start 开始

```sh
ufpn --help
```

## Options 选项

### Adding and removing separators. 添加和移除分隔符

```sh
# List of files in the current directory. 当前目录文件列表。
# 1js、2css、3html
# To be modified as. 要修改成。 
# 1.js 2.css 3.html
ufpn
# List of files in the current directory. 当前目录文件列表。
# 1.js 2.css 3.html
# To be modified as. 要修改成。 
# 1-js 2-css 3-html
ufpn -rs . -as -
```

## Test 测试

```sh
cd test
node ../src/index.js
```
