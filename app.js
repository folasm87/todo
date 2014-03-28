$(document).ready(function () 
//$(document).bind(function ()
	{	

	var items  = []; /*Contains the items in the TODO list*/
	
	var current  = 0;
	
	/* Event that handles dragging items and making them sortable */
	 
	/*	 
	 var isDragging = false;
    $("#list li")
    .mousedown(function() {
        $(window).mousemove(function() {
            isDragging = true;
            $(window).unbind("mousemove");
        });
    })
    .mouseup(function() {
        var wasDragging = isDragging;
        isDragging = false;
        $(window).unbind("mousemove");
        if (!wasDragging) {
            $("#throbble").toggle();
        }
    });
		
		
	*/
	
	$('#list li').draggable();
	$("#list").sortable({
			connectWith: '#delete'	
	}).disableSelection();

	$('#delete').droppable({
	
			accept: '#list li',
			//hoverClass: "highlight",			
			hoverClass: "highlight",
			
			
			drop: function(event, ui) {
					
					ui.draggable.remove();
			}	
			
			
	});
	/*
	var addItem = function (item) {
		
		var first = '<li class="listItem"><form><input class="check" type="checkbox"><span class="checkable">';
		
		first = first + " " + item;
		
		var last = '</span></form></li>';
		
		first = first + last;
		
		checkItem();
		$('ul#list').append(first);
	};

	*/

	/* Function that handles checking through the text of checked items */
	var checkItem = function (itemNum) {
		
		var item = '#'+ itemNum;
		console.log(item);
		//$('input.check').on('change',function() {
		$(item).on('change',function() {
			$(this).siblings('.checkable').toggleClass('strike');
			
			console.log("checkered");	    
   
    
		});	
	
	};
	
	
	/* Function and Event to change text of items when content area is double clicked and a new value is entered */
	
	var editItem = function (currentItem, num) {
	
		//$('.check').dblclick(function () {
		//$('.checkable').dblclick(function () {
		var selector = '#'+ currentItem;
		$(selector).dblclick(function () {
		 console.log("Double Clicked!!!");
			var storeText = $(this).text();
			
			//$(this).text("");
			//$(this).hide().after('<textarea class="edit" maxlength="140"></textarea>');
			
			var editArea  = '<input type="text" class="edit" maxlength="140" id="';
			editArea += 'edit' + num + '">';
			
			
			//$(this).hide().after('<input type="text" class="edit">');
			
			$(this).hide().after(editArea);
			$('#edit' + num).focus();
			$('#edit' + num).val(storeText);
			
			$(document).on('keypress','.edit', function(event){
			
				var keycode = (event.keyCode ? event.keyCode : event.which);
		
				if(keycode == '13') {
	
					event.preventDefault();
					
					var changeItem = $('#edit' + num).val();	
					
					
					console.log("Change is " + changeItem);
					if (changeItem) {
						$(selector).show();
						$(selector).text(changeItem);
						$('#edit' + num).hide()
						
						//$('input.edit').remove();
						
						//$('.checkable').html("");
						//$('.checkable').text(changeItem);
					}else {
						
						$(selector).show();
						$('#edit' + num).hide()
					}	
				
				}
				
			});
			
			$(document).on('click', function(event) {
				
	        var changeItem = $('#edit' + num).val();	
				
				console.log("Outside click change is "  + changeItem);
				if (changeItem) {
					$(selector).show();
					$(selector).text(changeItem);
					$('#edit' + num).hide()
						
				}else{
						
					$(selector).show();
					$('#edit' + num).hide()
				}	
			});

	});
		
		
		
		
	
	}
	
	
	
	
	
	var removeItem = function (item) {	
	
	};

	
	/* Event handler for entering in a new item */
	$(document).on('keypress','#item', function(event){

		var keycode = (event.keyCode ? event.keyCode : event.which);
		
		if(keycode == '13') {
	
			event.preventDefault();
		
		
				var temp = $(this).val();    	
       	
       		items.push(temp);
       		
       		console.log(temp);
       		console.log(items);
       		
       		
       		/*We create unique ID's for the input and the span elements as we have to call checkItem and editItem on each listItem and calling
				  them to a general class causes these classes to be called on listItems multiple times.         		
       		*/
       		
       		
       		var first = '<li class="listItem"><form><input class="check" type="checkbox" id="';
		
				var currentForm = "li" + current,
					 currentItem = "span" + current;
				
				
				
				first += currentForm + '"><span class="checkable" id="';
				
				first += currentItem + '">';
				
				first += " " + temp;
		
				var last = '</span></form></li>';
		
				first = first + last;
				
				console.log("Current item is " + currentItem);
				console.log(first);
				//checkItem();
				//console.log("checkItem called");
				//editItem();
				//console.log("editItem called");
				$('ul#list').append(first);
				checkItem(currentForm);
				console.log("checkItem2 called");
				editItem(currentItem, current);
				console.log("editItem2 called");
				
				current += 1;
		}
	
	});
	
	
	


	}

);