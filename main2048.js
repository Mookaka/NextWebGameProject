var board = new Array();
var score = 0;
var hasConfilicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){

    prepareForMobile();
    newgame();

});

function prepareForMobile()
{
    if(documentWidth > 400)
    {
        gridContainerWidth = 316;
        cellSideLength = 64;
        cellSpace = 12;
    }
    
    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container'
        ).css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);
    
    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
    
    
}


function newgame()
{

    init();

    generateOneNumber();
    generateOneNumber();
    // setTimeout("generateOneNumber()",100)
}

function init()
{
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++)
        {
             var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    
    for(var i = 0; i < 4; i++)
    {
        board[i] = new Array();
        hasConfilicted[i] = new Array();
        for(var j = 0; j < 4; j++)
        {
            board[i][j] = 0;
            hasConfilicted[i][j] = false;
        }
          
    }
    
    updateBoardView();
    
    score = 0;

    // $('#score').text(score);
    
}

function  updateBoardView()
{
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++)
        {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            var theGridCell = $('grid-cell-'+i+'-'+j);
            
            if(board[i][j] == 0)
            {
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
//                theNumberCell.css('top',getPosTop(i,j)+50);
//                theNumberCell.css('left',getPosLeft(i,j)+50);
                
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
            }
            else
            {
//                theNumberCell.css('width','100px');
//                theNumberCell.css('height','100px');
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theGridCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(getLevel(board[i][j]));
                // theNumberCell.text(board[i][j]);
            }
            
            hasConfilicted[i][j] = false;
                
        }
    
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.2*cellSideLength+'px');
}




function generateOneNumber()
{
    if(nospace(board))
        return false;

    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    
    var times = 0;
    while(times < 50)
    {
        if(board[randx][randy] == 0)
            break;
        
         randx = parseInt(Math.floor(Math.random() * 4));
         randy = parseInt(Math.floor(Math.random() * 4));
        
        times++;
    }
    
    if(times == 50)
    {
        for(var i = 0; i < 4; i++)
            for(var j = 0; j < 4;j++)
            {
                if(board[i][j] == 0)
                {
                    randx = i;
                    randy = j;
                }
            }
    }

    var randNumber = (Math.random() < 0.5)?2:4;

    board[randx][randy] = randNumber;
    
    showNumberWithAnimation(randx,randy,randNumber);
    
    return true;
 
    
}



$(document).keydown(function(event){

//    event.preventDefault();
    switch(event.keyCode)
    {
            case 37:   //left
            event.preventDefault();
            if(moveLeft())
            {
            setTimeout('generateOneNumber()',210);
            setTimeout('isgameover()',300);
            }
            break;
            case 38:
            event.preventDefault();
            if(moveUp())
            {
            setTimeout('generateOneNumber()',210);
            setTimeout('isgameover()',300);
//            generateOneNumber();
//            isgameover();
            }//up
            break;
            case 39:
            event.preventDefault();
            if(moveRight())
            {
            setTimeout('generateOneNumber()',210);
            setTimeout('isgameover()',300);
//            generateOneNumber();
//            isgameover();
            }//right
            break;
            case 40:
            event.preventDefault();
            if(moveDown())
            {
            setTimeout('generateOneNumber()',210);
            setTimeout('isgameover()',300);
//            generateOneNumber();
//            isgameover();
            }//down
            break;
            default:       //default
            break;
    }

});

document.addEventListener('touchstart',function(event)
{
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event)
{
    event.preventDefault();
});

document.addEventListener('touchend',function(event)
{
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    
    var deltax = endx - startx;
    var deltay = endy - starty;
    
    if(Math.abs(deltax) < 0.1*documentWidth && Math.abs(deltay) < 0.1*documentWidth)
        return;
    
    if(Math.abs(deltax) >= Math.abs(deltay))
    {
        if(deltax > 0)
        {
            if(moveRight())
            {
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
            
        }
        else
        {
            if(moveLeft())
            {
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300)
            }
        }
    }
    else
    {
        if(deltay > 0)
        {
            if(moveDown())
            {
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);

            }
        }
        else
        {
            if(moveUp())
            {
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',300);
            }
        }
    }
        
});

function isgameover()
{
    if(nospace(board) && noMove(board))
        gameover1();
    else if(currentBoardMax() >= 3192)
        gameover2();
}

function gameover1()
{
    alert('如果人生可以再来，那就把梦想重新拾起，继续向前！奔跑吧，兄弟！');
}

function gameover2()
{
    alert('下一步，除了和奥特曼拯救宇宙，这个世界已经没有可以让你施展的地方了。飞吧，兄弟！');
}

function moveLeft()
{
    if(!canMoveLeft(board))
        return false;
    
    for(var i = 0; i < 4; i++)
        for(var j = 1; j < 4; j++)
        {
            if(board[i][j] !=0)
            {
                for(var k = 0; k < j; k++)
                {
                    if(board[i][k] == 0 && noBlockHoriziontal(i,k,j,board))
                    {

                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHoriziontal(i,k,j,board) && !hasConfilicted[i][k])
                    {

                        showMoveAnimation(i,j,i,k);

                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        
                        hasConfilicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight()
{
    if(!canMoveRight(board))
        return false;

    for(var i = 0; i < 4; i++)
        for(var j = 2; j >= 0; j--)
        {
            if(board[i][j] !=0)
            {
                for(var k = 3; k > i; k--)
                {
                    if(board[i][k] == 0 && noBlockHoriziontal(i,j,k,board))
                    {

                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHoriziontal(i,j,k,board) && !hasConfilicted[i][k])
                    {

                        showMoveAnimation(i,j,i,k);

                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        
                        hasConfilicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    
    setTimeout("updateBoardView()",200);
    return true;   
}



function moveUp()
{
    if(!canMoveUp(board))
        return false;



    for(var j = 0; j < 4; j++)
        for(var i = 1; i < 4; i++)
        {
            if(board[i][j] !=0)
            {
                for(var k = 0; k < i; k++)
                {
                    if(board[k][j] == 0 && noBlockVertical(j,k,i,board))
                    {

                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConfilicted[k][j])
                    {

                        showMoveAnimation(i,j,k,j);

                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        
                        hasConfilicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    
    setTimeout("updateBoardView()",200);
    return true;

}



function moveDown()
{
    if(!canMoveDown(board))
        return false;

    for(var j = 0; j < 4; j++)
        for(var i = 2; i >= 0; i--)
        {
            if(board[i][j] != 0)
            {
                for(var k = 3; k > i; k--)
                {
                    if(board[k][j] == 0 && noBlockVertical(j,i,k,board))
                    {

                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConfilicted[k][j])
                    {

                        showMoveAnimation(i,j,k,j);

                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][i];
                        updateScore(score);
                        
                        hasConfilicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    
    setTimeout("updateBoardView()",200);
    return true;

}







