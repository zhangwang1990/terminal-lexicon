# terminal-lexicon

> 几乎每天都需要看英文文档，经常需要查单词，每次打开词典，输入后查词，感觉效率太低，而终端其实算是桌面上始终打开着的程序，由此有了此在终端中查单词的程序。有时候也会需要在 Linux 上工作，Linux 上使用此程序感觉也挺好的 😉

## 安装

本程序需要全局安装。

### 使用 yarn

```bash
yarn global add terminal-lexicon
```

### 使用 npm

```bash
npm install terminal-lexicon -g
```

## 使用

安装成功后，使用`dict <word>`即可查询单词`word`:

如：

```bash
# 查询单个单词
dict node
node：
🎧 音标：
     英  [nəʊd]     美  [noʊd]
🌈 释义：
     n. 节, 结节, 瘤, (戏剧情节的)曲折或纠纷
     [计算机] 节点
```

```bash
# 查询词组
➜ dict a hard nut to crack
a hard nut to crack：
✨ 音标：
     英[ə hɑːd nʌt tə kræk]     美[ə hɑːrd nʌt tə kræk]
🌈 释义：
     棘手的问题,难对付的人
```

```bash
# 中译英
➜ dict 前端工程师
前端工程师:
🌈 释义：
     Front-end Engineer

~
➜ dict Python工程师
Python工程师:
🌈 释义：
     Python Engineer
```

```bash
# 支持获取词汇的相关词汇（本功能的初衷在于辅助程序命名）
# 想要获取相关词汇，只需在所查单词之后添加 -r [n] 即可，n 代表相关单词个数，默认为3
➜ dict -r obtain
obtain:
✨ 音标：
     英[əb'teɪn]     美[əb'teɪn]
🌈 释义：
     vt. 获得, 得到
     vi. 通用, 流行, 存在
🍭 例句：
     The leech hangs about other people hoping to obtain money.
     > 那个吸血鬼依附于他人希望获得钱财。
     I haven't been able to obtain that book anywhere.
     > 我到处都没买到那本书。
     These conditions no longer obtain.
     > 这些条件已不复存在了。
🌎 近义词：
     01. access         相似度：100
     02. achieve        相似度：100
     03. attain         相似度：100
🌎 反义词：
     01. disperse       相似度：-100
     02. distribute     相似度：-100
     03. divide         相似度：-100
```

## 开发计划

* [x] 基于扇贝 api 的简单释义
* [x] 添加对词组的支持
* [x] 添加例句
* [x] 添加中译英
* [x] 添加相关词汇搜索，同义词和反义词
* [ ] 分开展示同义词和反义词
* [ ] 添加英文释义
* [ ] 添加单词的计算机专业释义
* [ ] 离线词库
* [ ] 添加代码测试
* [ ] 也许要加单词的自动补全
* [ ] 也许会添加单词的纠错提示

> 如果你有什么好建议，欢迎在 issure 中提出，我们一起把这个词典做好目前使用的查单词接口来自扇贝单词，感谢！
