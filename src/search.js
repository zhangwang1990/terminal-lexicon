const axios = require("axios");
const emoji = require("node-emoji");
const chalk = require("chalk");
const { intervalLog, clearIntervalLog } = require("./libs/onelineLog");
const {
  getRevelantWords,
  getRevelantWordsByType
} = require("./crawlers/getRevelantWords");

const { getEnglishDefinition } = require("./crawlers/getEnglishDefinition");

const {
  formatSoundmark,
  formatDefinition,
  formatExampleSentence,
  formatExampleTranslation,
  formatChineseDefinition,
  showRelevantNumWords,
  formatMeanAddExample
} = require("./fotmat");

const {
  SOURCE_SHANBEY_API,
  getExampleUrlById,
  SOURCE_BD_API
} = require("../config");

const searchWord = (word, relevantNum = 0) => {
  console.log(chalk.bold(`${word}:`));
  intervalLog();
  const isContainChinese = word.toString().match(/[\u3400-\u9FBF]/);
  if (isContainChinese) {
    searchWordByBdApi(word);
  } else {
    searchWordByShanbayAPi(word)
      .then(() => {
        if (relevantNum) {
          return getRevelantWords(word).then(revelantWords => {
            const { antonyms, synonyms } = revelantWords;
            showRelevantNumWords(synonyms, relevantNum, "synonyms");
            showRelevantNumWords(antonyms, relevantNum, "antonyms");
          });
        }
      })
      .catch(() => {
        console.log("未找到相关单词");
      });
  }
};

const searchWordByShanbayAPi = word => {
  return axios
    .get(`${SOURCE_SHANBEY_API}${word}`)
    .then(res => {
      clearIntervalLog();
      const data = res.data.data;
      const wordShanbayId = data.id;
      if (data.definition) {
        formatSoundmark(data.pronunciations);
        formatDefinition(data.definition);
      } else {
        console.log(emoji.get("disappointed_relieved"), res.data.msg);
      }
      return axios.get(getExampleUrlById(wordShanbayId));
    })
    .then(res => {
      const exampleList = res.data.data;
      if (exampleList.length > 0) {
        console.log(emoji.get("lollipop"), "例句：");
      }
      exampleList.forEach(example => {
        const exampleSentence = `${example.first}${chalk.bold(example.mid)}${
          example.last
        }`;
        formatExampleSentence(exampleSentence);
        const exampleTranslation = example.translation;
        formatExampleTranslation(exampleTranslation);
      });
    })
    .catch(err => {
      clearIntervalLog();
      console.log(err);
    });
};

const searchWordByBdApi = word => {
  axios
    .get(encodeURI(`${SOURCE_BD_API}${word}`))
    .then(res => {
      clearIntervalLog();
      const {
        trans_result: [{ dst }]
      } = res.data;
      formatChineseDefinition(dst);
    })
    .catch(err => {
      clearIntervalLog();
      console.log(err);
    });
};

const showRevelantWordsByType = (word, wordsNum, type) => {
  return getRevelantWordsByType(word, type).then(revelantWordsList => {
    showRelevantNumWords(revelantWordsList, wordsNum, type);
  });
};

const showEnglishDefinition = word => {
  console.log(word);
  return getEnglishDefinition(word).then(defList => {
    defList.forEach((def, index) => {
      formatMeanAddExample(def, index);
    });
  });
};

module.exports.searchWord = searchWord;
module.exports.searchWordByShanbayAPi = searchWordByShanbayAPi;
module.exports.searchWordByBdApi = searchWordByBdApi;
module.exports.showRevelantWordsByType = showRevelantWordsByType;
module.exports.showEnglishDefinition = showEnglishDefinition;
