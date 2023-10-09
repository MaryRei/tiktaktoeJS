var playing;
var turns = 0;

var game_board = [
  ["\u2060", "\u2060", "\u2060"],
  ["\u2060", "\u2060", "\u2060"],
  ["\u2060", "\u2060", "\u2060"],
]
var win_combos = []

function play_game(){
    let winner = " "
    turns += 1
    var result = check_win()
    if (result){
        winner = "player"; playing = false
    }
    if (playing == true){
        var move = make_move()
        var x = move[0], y = move[1]
        game_board[x][y] = "O"
        document.getElementById(x + "," + y).innerHTML = "O"
        result = check_win()
        if (result == true){
            winner = "computer"
            document.getElementById('winner').innerHTML = "Computer wins!"
            playing = false }
    }
    return winner
}

function square(id){
   if (playing == false){     
     location.reload()
     return }
   let coordinates = id.split(",")
   let x = coordinates[0]; let y = coordinates[1];
   if (game_board[x][y] == "\u2060"){
       game_board[x][y] = "X"
       document.getElementById(id).innerHTML = "X"
       var winner = play_game()
       if (winner == "player"){
         document.getElementById('winner').innerHTML = "Player wins!"     
       }
   }
}//end square function
function restart(){
  playing = true
  turns = 0
  win_combos = []
  for(let i = 0; i < 3; i++){
    for(let x = 0; x < 3; x++){
      game_board[i][x] = "\u2060"}}
}//end restart
restart()

function check_win(){
    for (let i=0; i<3; i++){
        if(doTheyMatch(i, 0, i, 1, i, 2)){ 
            return matching(i, 0, i, 1, i, 2) //checking horizontal
        } else if(doTheyMatch(0, i, 1, i, 2, i)){ //checking vertical
            return matching(0, i, 1, i, 2, i);
           } }//end for loop
    if (doTheyMatch(0, 0, 1, 1, 2, 2)){ //checking diagonal       
        return matching(0, 0, 1, 1, 2, 2)        
    }  else if(doTheyMatch(0, 2, 1, 1, 2, 0)){ //checking other side diagonal
        return matching(0, 2, 1, 1, 2, 0);        
    } else { return false;}
}// end function

function doTheyMatch(x0, y0, x1, y1, x2, y2){ //checks equality between all 3 cells and that it is not empty
  if ((game_board[x0][y0] == game_board[x1][y1]) && (game_board[x0][y0] == game_board[x2][y2]) && (game_board[x0][y0] != "\u2060")){return true;}
  else {return false}
}

function win_combos_highlight(){
  for (var i=0; i<win_combos.length; i++){
    var cell = document.getElementById(win_combos[i])
    cell.style.backgroundColor = "red"; }
}//end win_combo function

function get_player_moves(){
  for (var i=0; i<3; i++){
    if(equality(i, 0, i, 1) && emptySpace(i, 2)){ return [i, 2] 
    } else if(equality(i, 1, i, 2, i, 0)){ return [i, 0] }
      else if(equality(i, 0, i, 2, i, 1)){ return [i, 1] }
      else if(equality(0, i, 1, i, 2, i)){ return [2, i] }
      else if(equality(1, i, 2, i, 0, i)){ return [0, i] }
      else if(equality(0, i, 2, i, 1, i)){ return [1, i] }
  }//end horizontal and diagonal blocks loop
  if(equality(0, 0, 1, 1, 2, 2)){ return [2, 2] }
  else if(equality(2, 2, 1, 1, 0, 0)){ return [0, 0] }
  else if(equality(0, 0, 2, 2, 1, 1)){ return [1, 1] }
  else{
    return false;
  }
}//end get player moves

function equality(row1, row2, column1, column2, movex, movey){
  if ((game_board[row1][column1] == "X" && game_board[row2][column2] == "X")||(game_board[row1][column1] == "O" && game_board[row2][column2] == "O")){
    if(game_board[movex][movey] == "\u2060"){
      return true;}
  } else {
    return false;}
}
function emptySpace(x, y){
  if(game_board[x][y] == "\u2060"){return true
  }else{return false}
}
function matching(x0, y0, x1, y1, x2, y2){
  win_combos.push([x0, y0], [x1, y1], [x2, y2])
  win_combos_highlight()
  return true
}
function make_move(){
  var x, y
  var arr1 = get_player_moves()
  if (arr1 != false){ x = arr1[0]; y = arr1[1];}
  else { 
    for(let i=0; i<3; i++){
      for(let e=0; e<3; e++){
        if(game_board[i][e] == "\u2060"){
          x = i; y = e; break; }
    }
  } }
  return [x, y] }