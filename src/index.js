#!/usr/bin/env node
const fs = require('fs');

// 获取当前目录下所有文件夹
const folders = fs.readdirSync('./', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);


// 给数字开头的文件夹更新前缀
folders.forEach((folder, index) => {
  if (/^\d/.test(folder)) {
    const oldPath = `./${folder}`;
    const newPath = `./${addZero(index + 1, folders.length.toString().length)}${folder.replace(folder.match(/^\d+/)[0], '')}`;
    console.log(oldPath, newPath)
    fs.renameSync(oldPath, newPath);
  }
});

// 补全0
function addZero(num, length) {
  var str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
console.log('更新完成!');

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
