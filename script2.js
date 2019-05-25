
var ctx;
var steps = []; // варианты ходов
const sizeСonst = 600; // размер холста

class rect {
    constructor(color, x, y, width, height) {
        this.color = color; // цвет прямоугольника
        this.x = x; // координата х
        this.y = y; // координата у
        this.width = width; // ширина
        this.height = height; // высота
        this.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        this.clear = function () {
            ctx.clearRect(this.x, this.y, this.width, this.height);
        };
    }
}
function init(p, h) {
    (p === undefined) ? x = 60 : x = p;
    (h === undefined) ? y = 480 : y = h;
    //дефолтный 1 - вариант.
    if (x < 60) x = 60; if (x > 480) x = 480;
    if (y < 60) y = 60; if (y > 480) y = 480;

    var chess = document.getElementById("chess");
    chess.width = chess.height = sizeСonst;
    ctx = chess.getContext('2d');
    ctx.clearRect(0, 0, sizeСonst, sizeСonst);

    //определяем потенциальные ходы 
    steps = [
        [x + 60 * 2, y + 60],
        [x + 60 * 2, y - 60],
        [x + 60, y + 60 * 2],
        [x - 60, y + 60 * 2],
        [x + 60, y - 60 * 2],
        [x - 60, y - 60 * 2],
        [x - 60 * 2, y - 60],
        [x - 60 * 2, y + 60]
    ];


    for (var i = 0; i < steps.length; i++) {
        if (steps[i][0] > 59 && steps[i][0] < 481 && steps[i][1] > 59 && steps[i][1] < 481) 	// проверка на граница шахматной доски 
        {
            var f = new rect('green', steps[i][0], steps[i][1], 60, 60); // закраска доступных вариантов хода
            f.draw();
        }
    }

    stepHorse(x, y); // отрисовка первоночально положения коня
}
init(); // получение координат с экрана
function stepHorse(x, y) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 60, 60);

}

$('#chess').click(function (event) {
    var x = event.pageX - this.offsetLeft - $('.chess').offset().left; // левый край координыт
    var y = event.pageY - this.offsetTop; // верхний край координаты
    x = (Math.floor(x / 60)) * 60; // пример Math.floor(125/60) = 2 => 2*60 120  получение позиции кратной 60
    y = (Math.floor(y / 60)) * 60;
    init(x, y);

})