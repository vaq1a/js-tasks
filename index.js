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