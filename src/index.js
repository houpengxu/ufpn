#!/usr/bin/env node
const fs = require('fs');

// 读取当前目录下的所有文件和文件夹
fs.readdir('.', (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  let folders = []
  let files = []
  res.forEach((item) => {
    // 判断是否为文件夹
    if (fs.lstatSync(item).isDirectory()) {
      folders.push(item)
    } else {
      files.push(item)
    }
  });
  rename(folders)
  rename(files)
  console.log('更新完成!');
});

// 重命名文件夹或文件
function rename(pathList) {
  let index = 0;
  pathList.forEach((item) => {
    // 数字开头且不全是数字
    if (/^\d+\D+/.test(item)) {
      index++;
      const oldPath = `./${item}`;
      const newPath = `./${addZero(index, pathList.length.toString().length)}${item.replace(item.match(/^\d+/)[0], '')}`;
      console.log(oldPath, newPath)
      fs.renameSync(oldPath, newPath);
    }
  })
}

// 补全0
function addZero(num, length) {
  var str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

// 如果执行命令的时候有参数,则用作git提交注释自动进行git提交和推送
const gitComment = process.argv[2]
if (gitComment) {
  const { exec } = require('child_process');
  exec(`git add .;git commit -m "${gitComment}";git push;`, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行命令出错: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}
