const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const { getCircleArea, getSquareArea } = require('./mathUtil');
const { logInput, logResult } = require('./log');

rl.question('넓이를 구하고자 하는 도형의 종류를 입력해주세요.',
    figure => {
    console.log(`선택한 도형 ${figure}`);
    switch(figure){
        case '정사각형' :
            rl.question('변의 길이를 입력해주세요. : ', input => {
                console.log(logInput(input));
                console.log(logResult('정사각형',getSquareArea(input)));
                rl.close();
            });break;
        case '원' :
            rl.question('반지름의 길이를 입력해주세요. : ', input => {
                console.log(logInput(input));
                console.log(logResult('원',getCircleArea(input)));
                rl.close();
            });break;
        default :
            console.log('지원하지 않는 도형입니다 정사각형 또는 원을 입력해 주세요.');
            rl.close();

    }
})