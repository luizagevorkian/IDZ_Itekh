(function(){
	
	var state = 1;
	var puzzle = document.getElementById('puzzle');

	// Creates solved puzzle
	solve();
	
	// Регистрирация обработчика события(нажатия)
	puzzle.addEventListener('click', function(e){
		if(state == 1){
			// перемещение элементов игры
			puzzle.className = 'animate';
			shiftCell(e.target);
		}
	});
	
	
	function solve(){
		
		if(state == 0){
			return;
		}
		
		puzzle.innerHTML = '';
		
		var n = 1;
		for(var i = 0; i <= 3; i++){
			for(var j = 0; j <= 3; j++){
				var cell = document.createElement('span');
				cell.id = 'cell-'+i+'-'+j;
				cell.style.left = (j*80+1*j+1)+'px';
				cell.style.top = (i*80+1*i+1)+'px';
				
				if(n <= 15){
					cell.classList.add('number');
					cell.classList.add((i%2==0 && j%2>0 || i%2>0 && j%2==0) ? 'dark' : 'light');
					cell.innerHTML = (n++).toString();
				} else {
					cell.className = 'empty';
				}
				
				puzzle.appendChild(cell);
			}
		}
		
	}

	// перемещение к пустой ячейке
	function shiftCell(cell){
		
		// проверка номера квадрата
		if(cell.clasName != 'empty'){
			
			//получение пустой соседней ячейки
			var emptyCell = getEmptyAdjacentCell(cell);
			
			if(emptyCell){
				
				var tmp = {style: cell.style.cssText, id: cell.id};
				
				// Меняет значения идентификатора и стиля
				cell.style.cssText = emptyCell.style.cssText;
				cell.id = emptyCell.id;
				emptyCell.style.cssText = tmp.style;
				emptyCell.id = tmp.id;
				
				if(state == 1){
					// проверка порядка номеров
					checkOrder();
				}
			}
		}
		
	}

	//Получаем определенную ячейку по строке и столбцу
	function getCell(row, col){
	
		return document.getElementById('cell-'+row+'-'+col);
		
	}

	//пустая ячейка
	function getEmptyCell(){
	
		return puzzle.querySelector('.empty');
			
	}
	
	//Получаем пустую соседнюю ячейку, если она существует
	function getEmptyAdjacentCell(cell){
		
		
		var adjacent = getAdjacentCells(cell);
		
		// поиск пустой ячейки
		for(var i = 0; i < adjacent.length; i++){
			if(adjacent[i].className == 'empty'){
				return adjacent[i];
			}
		}
		
		
		return false;
		
	}

	//получение соседних ячеек
	function getAdjacentCells(cell){
		
		var id = cell.id.split('-');
		
		
		var row = parseInt(id[1]);
		var col = parseInt(id[2]);
		
		var adjacent = [];
		
		
		if(row < 3){adjacent.push(getCell(row+1, col));}			
		if(row > 0){adjacent.push(getCell(row-1, col));}
		if(col < 3){adjacent.push(getCell(row, col+1));}
		if(col > 0){adjacent.push(getCell(row, col-1));}
		
		return adjacent;
		
	}
	
	//проверка порядка номеров
	function checkOrder(){
		
		
		if(getCell(3, 3).className != 'empty'){
			return;
		}
	
		var n = 1;
		
		for(var i = 0; i <= 3; i++){
			for(var j = 0; j <= 3; j++){
				if(n <= 15 && getCell(i, j).innerHTML != n.toString()){
					
					return;
				}
				n++;
			}
		}
		
		if(alert('You won! Congratulations!')){
		
		}
		
	
	}

	

}());
