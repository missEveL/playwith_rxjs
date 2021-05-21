const shibesAPI = 'http://shibe.online/api/shibes?count=';
const http = require('http');

const getShibes = (count, callback) => {

    http.get(shibesAPI + count, callback);
}

const dogeLingo = [
"Much",
"Many",
"So",
"Such",
"Very"
]

getRandomIndex = (max, min) =>{
return Math.floor(Math.random() * (max - min) ) + min;
}

const dogeTranslate = (text) => {
    txtArr = String(text).split(" ");
    txtArr.splice(getRandomIndex(txtArr.length,1), 0, "wow");
    txtArr.splice(getRandomIndex(txtArr.length,0), 0, dogeLingo[getRandomIndex(dogeLingo.length, 0)]);
    return txtArr.join(" ");
}

module.exports = {getShibes, dogeTranslate};
