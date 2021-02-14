const PI = 3.14;
const getCircleArea = r => r * r * PI;

//1
// module.exports = {
//     PI,
//     getCircleArea
// }

//2
// exports.PI = PI;
exports.getCircleArea = getCircleArea;