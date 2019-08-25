
// Budget Controller

var BudgetController = (function (){
	
	// Budget constructor
	var Budget = function(date, type, desc, val){
		this.date = date;
		this.type = type;
		this.desc = desc;
		this.val = val;
		this.status = 'active';
	}
	var data = {
		store: {
			'inc': [],
			'exp': []
		},
		totals: {
			'inc': 0,
			'exp': 0,
			'budget': 0,
			'percentage': 0
		},
		dateArray: [],
		dateArr: []
	}
	return {
		
		addItem: function(date, type, desc, val){
			var newItem;
			newItem = new Budget(date, type, desc, val);
			data.store[type].push(newItem);
			//data.dateArray.push(date);
			return data;
		},
		/*
		addId: function(type, id){
			data.store[type].id 
		}
		*/
		calcBudget: function(){
			var sumInc = 0, sumExp = 0, budget = 0, percentage;
			for(var i=0; i<data.store['inc'].length; i++){
				sumInc = sumInc + parseFloat(data.store['inc'][i].val);
			}
			for(var j=0; j<data.store['exp'].length; j++){
				sumExp = sumExp + parseFloat(data.store['exp'][j].val);
			}
			data.totals['inc'] = sumInc;
			data.totals['exp'] = sumExp;
			budget = sumInc - sumExp;
			if(data.store['inc']){
				percentage = Math.round((sumExp/sumInc) * 100);
			}
			
			data.totals['budget'] = budget;
			//console.log(sumInc);
			//console.log(sumExp);
			//console.log(budget);
			
			return{
				sumInc: sumInc,
				sumExp: sumExp,
				budget: budget,
				percentage: percentage
			}
			
		},
		deleteItem: function(type, ID){
			//type = type.toString();
			if(data.store[type].length != 0){
				
				console.log(data.store[type][ID - 1].desc);
				//data.store[type].splice(ID - 1, 1);
				data.store[type][ID - 1].val = 0;
				data.store[type][ID - 1].status = 'deleted';
				console.log(data.store[type]);
				
				/*
				var ids;
				ids = data.store[type].map(function(cur){
					return cur.id;
				});
				console.log(ids);
				*/
				//console.log(data.dateArray);
			}
		}
	}
	
	
	
})();

// UI Controller 


var UIController = (function (){
	
	function dateConvert(date){
		console.log(date);
		var da = date.split(" ");
		var d = da[0];
		var m = da[1]
		var month = {
			'January': '01',
			'February': '02',
			'March': '03',
			'April': '04',
			'May': '05',
			'June': '06',
			'July': '07',
			'August': '08',
			'September': '09',
			'October': '10',
			'November': '11',
			'December': '12'
		}
		var dat = new Date();
		var y = dat.getFullYear();
		return y+'-'+month[m]+'-'+d;
		
	}
	
	return{
		setDate: function(){
					var date, month, day, year, minDate, maxDate, lastDate, zeroFillm, zeroFilld;
					date = new Date();
					day = date.getDate();
					month = date.getMonth();
					year  = date.getFullYear();
					var months = {
						0: 'January',
						1: 'February',
						2: 'March',
						3: 'April',
						4: 'May',
						5: 'June',
						6: 'July',
						7: 'August',
						8: 'September',
						9: 'October',
						10: 'November',
						11: 'December'
					};
					
					if(month.toString().length <= 1){
						zeroFillm = '0';
					}
					else{
						zeroFill = '';
					}
					if(day.toString().length <= 1){
						zeroFilld = '0';
					}
					else{
						zeroFilld = '';
					}
					document.querySelector('.budget__title--month').textContent = months[month] + ' ' + year;
					document.querySelector('.add__date').value = year + '-' + zeroFillm + (month + 1) + '-' + zeroFilld + day;
					document.getElementsByClassName('add__date')[0].setAttribute('min',year+'-'+'0'+(month + 1)+'-'+'01');
	
					if(month === 3 || month === 5 || month === 8 || month === 10){
						lastDate = '30';
					}
					else if(month === 1){
						lastDate = '28';
					}
					else{
						lastDate = '31';
					}
					document.getElementsByClassName('add__date')[0].setAttribute('max',year+'-'+'0'+(month + 1)+'-' + lastDate);

				},
		
		clearPlaceholders: function(){
			document.querySelector('.budget__value').textContent = '+0.00';
			document.querySelector('.budget__income--value').textContent = '+0.00';
			document.querySelector('.budget__expenses--value').textContent = '-0.00';
			document.querySelector('.budget__expenses--percentage').textContent = '---';
			//document.querySelector('.date').textContent = '';
			//document.querySelector('.expenses__title').textContent = '';
			document.querySelector('.container').style.display = 'none';
			//document.querySelector('.card').style.boxShadow = 'none';
		},
		getInput: function(){
			return{
				date: document.querySelector('.add__date').value,
				type: document.querySelector('.add__type').value,
				desc: document.querySelector('.add__description').value,
				val: document.querySelector('.add__value').value
			}
		},
		displayItem: function(date, type, desc, val, dateArray, dateArr, incomeIdCount, expenseIdCount){
			
			var el, str, id;
			//dateArray.push(date);
			//console.log(dateArray.length);
			//id = date.slice(-2);
			
			document.querySelector('.container').style.display = 'block';
			//el = document.querySelector('.budget__list');
			//el = [];
			var element = document.querySelector('.container');
			var index;
			//console.log(idCount);
			str = '';
			if(dateArray.includes(date)){
				console.log("Isme h");
				index = dateArray.indexOf(date);
				//console.log(index);
				str1 = '<div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
				str2 = '<div class="item clearfix" id="expense-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
				//str = '<div class="card"><h2 class="date">DATE</h2><div class="budget__list"><div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>' + str +'</div></div></div></div>';
				//el.insertAdjacentHTML('afterbegin',str);
				//idCount++;
				
				
				
				el = document.querySelectorAll('.budget__list')[index];
				if(type === 'inc'){
					id = 'income';
					incomeIdCount++;
					id = id + '-' + incomeIdCount;
					str1 = str1.replace('income-0',id);
					str1 = str1.replace('Salary',desc);
					str1 = str1.replace('+ 2,100.00',val);
					el.insertAdjacentHTML('beforeend',str1);
				}
				else{
					id = 'expense';
					//id = id + '-' + idCount;
					expenseIdCount++;
					id = id + '-' + expenseIdCount;
					str2 = str2.replace('expense-0',id);
					str2 = str2.replace('Salary',desc);
					str2 = str2.replace('+ 2,100.00',val);
					el.insertAdjacentHTML('beforeend',str2);
				}
				
				
				
				/*
				for(var i=0; i<dateArray.length; i++){
					el[i] = document.querySelectorAll('.budget__list')[i];
					el[i].insertAdjacentHTML('beforeend',str);
				}*/
				
				//element.insertAdjacentHTML('beforeend',str);
			}
			else{
				dateArray.push(date);
				//dateArray = dateArray.sort();
				//idCount = 0;
				//id = id + '-' + idCount;
				console.log("Nahi h");
				str = '<div class="card"><h2 class="date">DATE</h2><div class="budget__list"><div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>' + str +'</div></div></div></div>';
				//el.insertAdjacentHTML('afterbegin',str);
				//str = str.replace('income-0',id);
				if(type === 'exp'){
					str = str.replace('income','expense');
					id = 'expense';
					expenseIdCount++;
					id = id + '-' + expenseIdCount;
					str = str.replace('expense-0',id);
				}
				else{
					id = 'income';
					//incomeIdCount = 0;
					incomeIdCount++;
					id = id + '-' + incomeIdCount;
					str = str.replace('income-0',id);
					//console.log(incomeIdCount);
				}
				str = str.replace('Salary',desc);
				str = str.replace('+ 2,100.00',val);
				element.insertAdjacentHTML('beforeend',str);
			}
			
			//console.log(dateArray);
			//console.log(itemsCount);
			//document.querySelector('.date').textContent = date; 
			//console.log(id);
			
			// Displaying date
			var day, month, year, d;
			d = date.split('-');
			day = d[2];
			month = d[1];
			year = d[0];
			var months = {
						0: 'January',
						1: 'February',
						2: 'March',
						3: 'April',
						4: 'May',
						5: 'June',
						6: 'July',
						7: 'August',
						8: 'September',
						9: 'October',
						10: 'November',
						11: 'December'
					};
			for(var i=0; i<dateArray.length; i++){
				d = dateArray[i].split('-');
				day = d[2];
				month = d[1];
				year = d[0];
				dateArr[i] = day + ' ' + months[month - 1];
			}
			console.log(dateArr);
			for(var i=0; i<dateArray.length; i++){
				document.querySelectorAll('.date')[i].textContent = dateArr[i];
			}
			//this.setDate();
			/*
			// Sort the cards by date
			
			var cards = element.childNodes;
			var cardsArr = [];
			for (var i in cards) {
				if (cards[i].nodeType == 1) { // get rid of the whitespace text nodes
					cardsArr.push(cards[i]);
					console.log(cards[i].childNodes[0].textContent);
				}
			}
			//console.log(cardsArr);
			cardsArr.sort(function(a, b) {
				return a.childNodes[0].textContent == b.childNodes[0].textContent ? 0 : (a.childNodes[0].textContent > b.childNodes[0].textContent ? 1 : -1);
			});
			console.log(cardsArr);
			
			for (var i = 0; i < cardsArr.length; ++i) {
				element.appendChild(cardsArr[i]);
			}
			
			var ans = prompt("Want to rearrange?");
			if(ans === 'y'){
				for (var i = 0; i < cardsArr.length; ++i) {
					element.appendChild(cardsArr[i]);
				}
			}
			*/
			
			// Displaying according to type
			
			var itemDesc, itemVal, itemDel;
		
			itemDesc = document.getElementById(id).childNodes[0];
			itemVal = document.getElementById(id).childNodes[1].childNodes[0];
			itemDel = document.getElementById(id).childNodes[1].childNodes[1].childNodes[0];
			
			if(type === 'exp'){
				itemDesc.style.color = 'red';
				itemVal.style.color = 'red';
				itemDel.style.color = 'red';
				
				//console.log("exp item");
			}
			else{
				itemDesc.style.color = '#28B9B5';
				itemVal.style.color = '#28B9B5';
				itemDel.style.color = '#28B9B5';
				
			}
			
			return {
				incomeIdCount: incomeIdCount,
				expenseIdCount: expenseIdCount,
				id: id
			}
			
		},
		displayBudget: function(sumInc, sumExp, budget, percentage){
			document.querySelector('.budget__value').textContent = budget;
			document.querySelector('.budget__income--value').textContent = sumInc;
			document.querySelector('.budget__expenses--value').textContent = sumExp;
			document.querySelector('.budget__expenses--percentage').textContent = percentage + '%';
		},
		removeNode: function(selectorID,dateArray,dateArr){
			var el, par;
			el = document.getElementById(selectorID);
			console.log(el);
			par = el.parentNode.parentNode;
			el.parentNode.removeChild(el);
			//console.log(par.childNodes[1].childNodes);
			console.log(dateArr);
			var x = par.childNodes[0].textContent;
			var y = dateConvert(x);
			
			//console.log();
			if(par.childNodes[1].childNodes.length == 0){
				
				for(var i=0; i<dateArr.length; i++){
					if(dateArray[i]==y){
						dateArray.splice(i,1);
						dateArr.splice(i,1);
					}
				}
				par.parentNode.removeChild(par);
				//dateArray.pop();
				
			}
			console.log(dateArray);
			console.log(dateArr);
		},
		editing: function(){
			var budgetValue,budgetIncome,budgetExpense,itemValues;
			budgetValue = document.querySelector(".budget__value").textContent;
			document.querySelector(".budget__value").innerHTML = '<span>&#8377;</span>' + budgetValue;
			//console.log(document.querySelector(".budget__value").textContent);
			budgetIncome = document.querySelector(".budget__income--value").textContent;
			document.querySelector(".budget__income--value").innerHTML = '<span>&#8377;</span>' + budgetIncome;
			budgetExpense = document.querySelector(".budget__expenses--value").textContent;
			document.querySelector(".budget__expenses--value").innerHTML = '<span>&#8377;</span>' + budgetExpense;
			/*
			itemValues = document.querySelectorAll(".item__value");
			console.log(itemValues);
			for(var i=0; i<itemValues.length; i++){
				console.log(!itemValues[i].innerHTML.includes('<span>&#8377;</span>'));
				if(!itemValues[i].innerHTML.includes('<span>&#8377;</span>')){
					itemValues[i].innerHTML = '<span>&#8377;</span>' + itemValues[i].textContent;
				}
				
			}*/
		}
	}
	
})();

// App Controller

var AppController = (function (budgetCtrl, UICtrl){
	
	//var itemsCount;
	var idCount = {
		incomeIdCount: 0,
		expenseIdCount: 0
	}
	// 1. call initialization function
	function init(){
		// 1. Set Date
		UICtrl.setDate();
		
		// 2. Clear Placeholders
		UICtrl.clearPlaceholders();
		
		//itemsCount = 0;
		
		idCount.incomeIdCount = 0;
		idCount.expenseIdCount = 0;
	}
	document.getElementsByTagName("body")[0].addEventListener('load',init());
	
	// 2. After clicking button or pressing Enter
	
	var input, items, Budget;
	function ctrlAddItem(){
		
		var input, items, Budget;
		//itemsCount++;
		//idCount++;
		
		// 1. Get input data from fields
		
		input = UICtrl.getInput();
		
		// 2. Add input data to the budget Controller
		
		items = budgetCtrl.addItem(input.date, input.type, input.desc, input.val);
		console.log(items);
		
		// 3. Add the items to the UI
		
		idCount = UICtrl.displayItem(input.date, input.type, input.desc, input.val, items.dateArray, items.dateArr, idCount.incomeIdCount, idCount.expenseIdCount);
		
		// Add the id to the data structure
		//budgetCtrl.addId(id)
		
		// 4. Calculate the budget
		
		Budget = budgetCtrl.calcBudget();
		
		// 5. Display the Budget on the UI
		
		UICtrl.displayBudget(Budget.sumInc, Budget.sumExp, Budget.budget, Budget.percentage);
		
		return items;
	}
	function ctrlDeleteItem(event,items){
		
		var itemID, ID;
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		console.log(itemID);
		
		//console.log(ID);
		if(itemID){
			type = itemID.split('-')[0];
			ID = itemID.split('-')[1];
			if(type.includes('inc')){
				type = 'inc';
			}
			else{
				type = 'exp';
			}
			// 1. Delete from the data structure
			budgetCtrl.deleteItem(type, ID);
			
			//2. Delete from the UI
			UICtrl.removeNode(itemID,items.dateArray,items.dateArr);
			
			//3. Update and show the new budget.
			Budget = budgetCtrl.calcBudget();
			UICtrl.displayBudget(Budget.sumInc, Budget.sumExp, Budget.budget, Budget.percentage);
			
			//console.log(items);
			//4. Call editing
			UICtrl.editing();
		}
	}
	
	// function to check whether input is valid or not
	function validInput(){
		var desc, val;
		desc = document.querySelector(".add__description").value;
		val = document.querySelector(".add__value").value;
		
		if(desc !== "" && val.toString() !== ""){
			items = ctrlAddItem();
			//console.log(items);
			UICtrl.editing();
		}
		/*
		document.querySelector('.container').addEventListener('click',function(event){
			//console.log(items);
			ctrlDeleteItem.call(this,event,items);
		    })
		*/
		return items;
	}
	document.querySelector('.add__btn').addEventListener('click',function(event){
		items = validInput();
	})
	document.addEventListener('keypress',function(event){
		if(event.keyCode === 13){
			items = validInput();
		}
		
	//document.querySelectorAll('.item__delete--btn').forEach(addEventListener('click',))
	//document.querySelector('.container').addEventListener('click',ctrlDeleteItem)
	
	
	});
	
	document.querySelector('.container').addEventListener('click',function(event){
			//console.log(items1);
			ctrlDeleteItem.call(this,event,items);
		})
	
	
})(BudgetController, UIController);
