
const inArray = (val, array) =>  $.inArray(val, array) !== -1;


const arrayDiff = (array1, array2=[]) =>
{
    let res = [];
    array1.concat(array2)
    .forEach(item => {
        if (array1.includes(item) && !array2.includes(item)) {
            res.push(item)
        }
    })
    return res
}

const arrayDuplicate = (array1, array2=[]) =>
{
    if (array2 == []) {
        return array1;
    }
    return arrayDiff(array1, arrayDiff(array1, array2));
}

const arrayUnique = (array) =>
{
    let res = array.filter(function (x, i, self) {
        return self.indexOf(x) === i && i !== self.lastIndexOf(x);
    });
    return res;
}

const arrayEmpty = (array) => array.length == 0;