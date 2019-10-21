var now = 1;//现在是谁在下
var isFisihed;//是否结束
var chessBoard = new Array(15);//棋盘情况
var startBtn = document.getElementById('start');//开始按钮
var boards = document.getElementById('board');//整个棋盘
var board = document.getElementsByClassName('board')[0];//下棋部分
var spanX = document.getElementById("x");//X坐标轴
var spanY = document.getElementById("y");//Y坐标轴
var downed = document.getElementById("location");//下棋后的红色定位
var chesses;//所有棋子
var nowChess = document.getElementById('now');//可视化当前是谁在下棋
var time;//定时时间
var timer;//定时器
var timeNode = document.getElementById("time");//设置时间的节点

/**下棋 */
function down(e) {
    if (isFisihed) {
        alert("请重新开始游戏");
        return;
    }
    var x = Math.floor((e.layerX + 50) / 50) - 1;
    var y = Math.floor((e.layerY + 25) / 50) - 1;

    if (chessBoard[x][y] !== 0) {
        return;
    }
    clearInterval(timer);
    timeNode.value = time;
    timer = setInterval(delTime, 1000);
    var chess = document.createElement('div');
    if (now === 1) {
        chess.style.backgroundColor = "black";
    }
    chess.className = "chess";
    //下棋的位置
    chess.style.top = y * 50 + 25 + "px";
    chess.style.left = x * 50 + "px";
    //提示当前下棋点
    downed.style.top = y * 50 + 25 + "px";
    downed.style.left = x * 50 + "px";
    chessBoard[x][y] = now;

    if (now === 1) {
        chess.style.backgroundColor = "black";
        nowChess.style.backgroundColor = "white";
        now = 2;
    }
    else {
        chess.style.backgroundColor = "white";
        nowChess.style.backgroundColor = "black";
        now = 1;
    }
    chesses.appendChild(chess);

    if (judgeFinish(chessBoard, x, y)) {
        isFisihed = true;
        if (now === 2) {
            alert("黑棋获胜");
        }
        else {
            alert("白棋获胜");
        }
        clearInterval(timer);
        timeNode.value = time;
        timeNode.readOnly = false;
    }
}

/**移动事件 */
function move(e) {
    var x = Math.floor((e.layerX + 50) / 50) - 1;
    var y = Math.floor((e.layerY + 25) / 50) - 1;
    if (chessBoard[x][y] !== 0) {
        return;
    }
    spanX.innerHTML = x;
    spanY.innerHTML = y;
    board.style.background = "url('images/location1.png') no-repeat " + (x * 50 - 26) + "px " + (y * 50 - 26) + "px";

}

/**初始化棋盘 */
function init() {
    time = timeNode.value;
    if (time < 15) {
        alert("步时不能小于15！请重新设置");
        return;
    }
    if (time > 60) {
        alert("步时不能大于60！请重新设置");
        return;
    }
    timeNode.readOnly = true;
    isFisihed = false;
    for (var i = 0; i < 15; i++) {
        chessBoard[i] = new Array(15);
        for (var j = 0; j < 15; j++) {
            chessBoard[i][j] = 0;
        }
    }
    if (chesses) {
        boards.removeChild(chesses);
    }
    timer = setInterval(delTime, 1000);
    nowChess.style.backgroundColor = "black";
    chesses = document.createElement('div');
    chesses.id = 'chess';
    boards.appendChild(chesses);
    board.onclick = down;
    board.onmousemove = move;
    startBtn.innerHTML = "重新开始";
    downed.style.top = "-500px";
    // board.addEventListener("mousemove", move);
    // board.addEventListener("click", down);
}

/**判断输赢 */
function judgeFinish(board, x, y) {
    var count = 0;
    var i, j;
    var chess = board[x][y];
    for (i = x - 4; i <= x + 5; i++) {
        if (count == 5)
            return true;
        if (i < 0 || i > 14 || chess != board[i][y]) {
            count = 0;
            continue;
        }
        count++;
    }
    count = 0;
    for (j = y - 4; j <= y + 5; j++) {
        if (count == 5)
            return true;
        if (j < 0 || j > 14 || chess != board[x][j]) {
            count = 0;
            continue;
        }
        count++;
    }
    count = 0;
    for (i = x - 4, j = y - 4; i <= x + 5; i++ , j++) {
        if (count == 5)
            return true;
        if (i < 0 || j < 0 || j > 14 || i > 14 || chess != board[i][j]) {
            count = 0;
            continue;
        }
        count++;
    }
    count = 0;
    for (i = x - 4, j = y + 4; i <= x + 5; i++ , j--) {
        if (count == 5)
            return true;
        if (i < 0 || j < 0 || j > 14 || i > 14 || chess != board[i][j]) {
            count = 0;
            continue;
        }
        count++;
    }
    return false;
}

/**倒计时函数 */
function delTime() {
    if (--timeNode.value <= 0) {
        isFisihed = true;
        if (now === 2) {
            alert("黑棋获胜");
        }
        else {
            alert("白棋获胜");
        }
        clearInterval(timer);
        timeNode.value = time;
        timeNode.readOnly = false;
    }
}
/**开始游戏 */
startBtn.onclick = function (e) {
    if (confirm("是否开始?")) {
        init();
    }
}