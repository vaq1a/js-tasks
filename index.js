// 1

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

