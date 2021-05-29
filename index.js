//--------------------1--------------------

function add(n){
    let count = n;

    function f(a) {
        count += a;
        return f;
    }

    f.toString = () => {
        return count;
    }

    return f;
}

add(2)(3)(4); //9

//--------------------2--------------------

function date(num) {
    let h = Math.floor(num / 3600);
    let m = Math.floor((num - (h * 3600)) / 60);
    let s = Math.floor(num - ((h * 3600) + (m * 60)));

    return [String(h), String(m), String(s)].map(el => el.length === 1 ? '0' + el : el).join('|');
}

function stat(strg) {
    if(!strg.length) {
        return '';
    }

    var regex = new RegExp('(\\d{1,2})\\|(\\d{1,2})\\|(\\d{1,2})', 'g');


    let timesArr = [];
    let i;

    while(match = regex.exec(strg)){
        timesArr.push((+match[1] * 3600) + (+match[2] * 60) + +match[3]);
    }

    let mediana;

    if(timesArr.length % 2 === 0) {
        let test = timesArr.sort((a, b) => a - b);
        let x = timesArr.length / 2;
        mediana = date((test[x - 1] + test[x]) / 2);
    } else {
        i = Math.floor(timesArr.length / 2);
        mediana = date(timesArr.sort((a, b) => a - b)[i]);
    }

    return [
        `Range: ${date(Math.max(...timesArr) - Math.min(...timesArr))}`,
        `Average: ${date((timesArr.reduce((acc, el) => acc + el) / timesArr.length))}`,
        `Median: ${mediana}`
    ].join(' ');
}

console.log(stat("01|15|59, 1|47|16, 01|17|20, 1|32|34, 2|17|17")); //Range: 01|01|18 Average: 01|38|05 Median: 01|32|34
console.log(stat("02|15|59, 2|47|16, 02|17|20, 2|32|34, 2|17|17, 2|22|00, 2|31|41")); //Range: 00|31|17 Average: 02|26|18 Median: 02|22|00

//--------------------3--------------------

function travel(r, zipcode) {
    if(!zipcode.length) {
        return ':/';
    }

    let regexp = new RegExp(`^(?<home>\\d+?)\\s(?<street>.+[^${zipcode}])\\s(?<zipcode>${zipcode})\\b`, 'i');
    let resultHome = [];
    let resultStreet = [];

    r.split(',').filter(el => new RegExp(`\\b(${zipcode})\\b`, 'gi').exec(el)).forEach(el => {
        let result = regexp.exec(el);

        resultHome.push(result[1]);
        resultStreet.push(result[2]);
    });

    if(resultHome.length) {
        return [zipcode, ':', resultStreet, '/', resultHome].join('');
    } else {
        return [zipcode, ':', '/'].join('');
    }
}

let r = "123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432"
travel(r, ''); // ":/"
travel(r, "OH 43071"); //"OH 43071:Main Street St. Louisville,Main Long Road St. Louisville/123,432"
travel(r, "NY 56432"); //"NY 56432:High Street Pollocksville/786"
travel(r, "NY 5643");  //"NY 5643:/"

//--------------------4--------------------

const towns = ["Rome", "London", "Paris", "NY", "Vancouver", "Sydney", "Bangkok", "Tokyo", "Beijing", "Lima", "Montevideo", "Caracas", "Madrid", "Berlin"];

const data =
    "Rome:Jan 81.2,Feb 63.2,Mar 70.3,Apr 55.7,May 53.0,Jun 36.4,Jul 17.5,Aug 27.5,Sep 60.9,Oct 117.7,Nov 111.0,Dec 97.9" + "\n" +
    "London:Jan 48.0,Feb 38.9,Mar 39.9,Apr 42.2,May 47.3,Jun 52.1,Jul 59.5,Aug 57.2,Sep 55.4,Oct 62.0,Nov 59.0,Dec 52.9" + "\n" +
    "Paris:Jan 182.3,Feb 120.6,Mar 158.1,Apr 204.9,May 323.1,Jun 300.5,Jul 236.8,Aug 192.9,Sep 66.3,Oct 63.3,Nov 83.2,Dec 154.7" + "\n" +
    "NY:Jan 108.7,Feb 101.8,Mar 131.9,Apr 93.5,May 98.8,Jun 93.6,Jul 102.2,Aug 131.8,Sep 92.0,Oct 82.3,Nov 107.8,Dec 94.2" + "\n" +
    "Vancouver:Jan 145.7,Feb 121.4,Mar 102.3,Apr 69.2,May 55.8,Jun 47.1,Jul 31.3,Aug 37.0,Sep 59.6,Oct 116.3,Nov 154.6,Dec 171.5" + "\n" +
    "Sydney:Jan 103.4,Feb 111.0,Mar 131.3,Apr 129.7,May 123.0,Jun 129.2,Jul 102.8,Aug 80.3,Sep 69.3,Oct 82.6,Nov 81.4,Dec 78.2" + "\n" +
    "Bangkok:Jan 10.6,Feb 28.2,Mar 30.7,Apr 71.8,May 189.4,Jun 151.7,Jul 158.2,Aug 187.0,Sep 319.9,Oct 230.8,Nov 57.3,Dec 9.4" + "\n" +
    "Tokyo:Jan 49.9,Feb 71.5,Mar 106.4,Apr 129.2,May 144.0,Jun 176.0,Jul 135.6,Aug 148.5,Sep 216.4,Oct 194.1,Nov 95.6,Dec 54.4" + "\n" +
    "Beijing:Jan 3.9,Feb 4.7,Mar 8.2,Apr 18.4,May 33.0,Jun 78.1,Jul 224.3,Aug 170.0,Sep 58.4,Oct 18.0,Nov 9.3,Dec 2.7" + "\n" +
    "Lima:Jan 1.2,Feb 0.9,Mar 0.7,Apr 0.4,May 0.6,Jun 1.8,Jul 4.4,Aug 3.1,Sep 3.3,Oct 1.7,Nov 0.5,Dec 0.7";

const data1 =
    "Rome:Jan 90.2,Feb 73.2,Mar 80.3,Apr 55.7,May 53.0,Jun 36.4,Jul 17.5,Aug 27.5,Sep 60.9,Oct 147.7,Nov 121.0,Dec 97.9" + "\n" +
    "London:Jan 58.0,Feb 38.9,Mar 49.9,Apr 42.2,May 67.3,Jun 52.1,Jul 59.5,Aug 77.2,Sep 55.4,Oct 62.0,Nov 69.0,Dec 52.9" + "\n" +
    "Paris:Jan 182.3,Feb 120.6,Mar 188.1,Apr 204.9,May 323.1,Jun 350.5,Jul 336.8,Aug 192.9,Sep 66.3,Oct 63.3,Nov 83.2,Dec 154.7" + "\n" +
    "NY:Jan 128.7,Feb 121.8,Mar 151.9,Apr 93.5,May 98.8,Jun 93.6,Jul 142.2,Aug 131.8,Sep 92.0,Oct 82.3,Nov 107.8,Dec 94.2" + "\n" +
    "Vancouver:Jan 155.7,Feb 121.4,Mar 132.3,Apr 69.2,May 85.8,Jun 47.1,Jul 31.3,Aug 37.0,Sep 69.6,Oct 116.3,Nov 154.6,Dec 171.5" + "\n" +
    "Sydney:Jan 123.4,Feb 111.0,Mar 151.3,Apr 129.7,May 123.0,Jun 159.2,Jul 102.8,Aug 90.3,Sep 69.3,Oct 82.6,Nov 81.4,Dec 78.2" + "\n" +
    "Bangkok:Jan 20.6,Feb 28.2,Mar 40.7,Apr 81.8,May 189.4,Jun 151.7,Jul 198.2,Aug 197.0,Sep 319.9,Oct 230.8,Nov 57.3,Dec 9.4" + "\n" +
    "Tokyo:Jan 59.9,Feb 81.5,Mar 106.4,Apr 139.2,May 144.0,Jun 186.0,Jul 155.6,Aug 148.5,Sep 216.4,Oct 194.1,Nov 95.6,Dec 54.4" + "\n" +
    "Beijing:Jan 13.9,Feb 14.7,Mar 18.2,Apr 18.4,May 43.0,Jun 88.1,Jul 224.3,Aug 170.0,Sep 58.4,Oct 38.0,Nov 19.3,Dec 2.7" + "\n" +
    "Lima:Jan 11.2,Feb 10.9,Mar 10.7,Apr 10.4,May 10.6,Jun 11.8,Jul 14.4,Aug 13.1,Sep 23.3,Oct 1.7,Nov 0.5,Dec 10.7";

function mean(town, strng) {
    if(!towns.includes(town)) {
        return -1;
    }
    let valueArr = strng.split(`\n`).filter(el => el.match(RegExp(`${town}`, `i`))).join('').match(/(\d+)\.(\d+)/gi);

    if(valueArr) {
        return valueArr.map(el => Number(el)).reduce((acc, el) => acc + el) / 12;
    } else {
        return -1;
    }

}

function variance(town, strng) {
    if(!towns.includes(town)) {
        return -1;
    }
    const middle = mean(town, strng);
    const valueArr = strng.split(`\n`).filter(el => el.match(RegExp(`${town}`, `i`))).join('').match(/(\d+)\.(\d+)/gi);

    if(valueArr) {
        return valueArr.map(el => Math.pow(Number(el) - middle, 2)).reduce((acc, el) => acc + el) / 12;
    } else {
        return -1;
    }
}

console.log(mean("London", data)); //51.199999999999996
console.log(mean("Beijing", data)); //52.416666666666664
console.log(variance("London", data)); //57.42833333333374
console.log(variance("Beijing", data)); //4808.37138888889

//--------------------5--------------------

function strToHash(str){
    const obj = {};
    Array.from(str.matchAll(/(\w+)\=(\d+)/g)).forEach(el => obj[el[1]] = Number(el[2]));

    return obj;
}

strToHash("a=1, b=2, c=3, d=4"); // { 'a': 1, 'b': 2, 'c': 3, 'd': 4}
strToHash(""); // {}

//--------------------6--------------------

function inArray(array1,array2) {
    let str = array2.join(', ');
    return array1.filter(el => str.includes(el)).sort();
}

const a1 = ["arp", "live", "strong"];
const  a2 = ["lively", "alive", "harp", "sharp", "armstrong"];
// returns ["arp", "live", "strong"];

//const a1 = ["tarp", "mice", "bull"];
//const a2 = ["lively", "alive", "harp", "sharp", "armstrong"];
//returns [];

inArray(a1,a2);

//--------------------7--------------------