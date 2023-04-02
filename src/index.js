#!/usr/bin/env node
const fs = require('fs');
const packageInfo = require('../package.json');
const { program } = require('commander');

const defalutAddSeparator = '.'
program
  .name(packageInfo.name)
  .description(packageInfo.description)
  .version(packageInfo.version);

program
  .option('-as, --add-separator <char>', 'add separator character', defalutAddSeparator)
  .option('-rs, --remove-separator <char>', 'remove separator character')
program.parse();

const options = program.opts();

// Read all files and folder in the current directory. 读取当前目录下的所有文件和文件夹。
fs.readdir('.', (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  let folders = []
  let files = []
  res.forEach((item) => {
    if (fs.lstatSync(item).isDirectory()) {
      folders.push(item)
    } else {
      files.push(item)
    }
  });
  rename(folders)
  rename(files)
  console.log('Upadte completed ! 更新完成！');
});

function rename(pathList) {
  let index = 0;
  pathList.forEach((item) => {
    // Starting with a number but not all digits. 数字开头且不全是数字
    if (/^\d+\D+/.test(item)) {
      index++;
      const oldPath = `./${item}`;
      const newPathPart1 = addZero(index, pathList.length.toString().length)
      let newPathPart2 = options.addSeparator || ''
      if (options.removeSeparator == defalutAddSeparator) {
        newPathPart2 = ''
      }
      const newPathPart3 = item.replace(item.match(/^\d+/)[0] + (options.removeSeparator || ''), '')
      const newPath = `./${newPathPart1 + newPathPart2 + newPathPart3}`;
      console.log(oldPath, newPath)
      fs.renameSync(oldPath, newPath);
    }
  })
}

function addZero(num, length) {
  var str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
