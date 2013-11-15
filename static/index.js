var resources, all_buildings, fps; 

resources = [ 
	{
		'name': 'gold'
		'value': 1000,
	},
	{
		'name': 'coins'
		'value': 0,
	}
];

all_buildings = [
	{
		'name': 'goldmine',
		'target_add': 'gold',
		'target_remove': null,
		'value': 100
	},
	{
		'name': 'goldsmelter',
		'target_add': 'coins',
		'target_remove': 'gold',
		'value': 100
	}
];

buildings = [
	$.extend({}, all_buildings[0])
];

$(buildings).each(function (i, e) {e.id = i;})

building = 
{
	'level': '1', 
	'time': '3',
	'timeOutId': null,
	'doing': false,
	'efficiancy': 1,
	'time': function () {
		return this.time * 1000;
	},
	'do': function () { 
		var change = this.level * 10;
		setResource(this.target_add, getResource(this.target_add).value + change * this.efficiancy);
		if(this.target_remove) {
			setResource(this.target_remove, getResource(this.target_remove).value - change);
		}
		this.doing = true;
		this.timeout = setTimeout($.proxy(this.do, this), this.time());
	}, 
	'stop': function () {
		clearTimeout(this.timeout);
		this.doing = false;
	},
	'toggleDoing': function () {
		if(this.doing) {
			this.stop();
		} else {
			this.do();
		}
	},
	'level_up': function () {
		this.level++;
	},
	'buy_level_up': function () {
		var cost = this.level*this.level;
		if (getResource('coins').value > cost) {
			getResource('coins').value = getResource('coins').value - cost;
			this.level_up();
		}
	}
}

$(buildings).each(function (i, e) {
	$(e).extend(e, building);
})

function setResource (resourceName, value) {
	$(resources).each(function (i, e) {
		if (e.name == resourceName) {
			e.value = value;
		}
	});
}

function getResource (resourceName) {
	var result;
	$(resources).each(function (i, e) {
		if (e.name == resourceName) {
			result = e;
		}
	});
	return result;
}

function getBuilding (id) {
	var result;
	$(buildings).each(function (i, e) {
		if (e.id == id) {
			result = e;
		}
	});
	return result;
}

function init_buildings () {
	$('#buildings-list').empty();
	$(buildings).each(function (i, e) {
		var container, dl, dd, toggleButton, upgradeButton;

		container = document.createElement('div');
		dt = document.createElement('dt');
		dd = document.createElement('dd');
		toggleButton = document.createElement('button');
		upgradeButton = document.createElement('button');

		$(toggleButton).click(function (e) {
			getBuilding($(this).attr('bId')).toggleDoing();
		})

		$(upgradeButton).click(function (e) {
			getBuilding($(this).attr('bId')).buy_level_up();
		})

		$(container).attr('id', e.name);
		$(container).append(dt);
		$(container).append(dd);
		$(container).append(toggleButton);
		$(container).append();
		$(container).addClass('container')

		$(dt).text(e.name);
		$(dd).text(e.value);
		$(toggleButton).text('toggle');
		$(upgradeButton).text('upgrade');
		$(toggleButton).attr('bId', e.id);
		$(upgradeButton).attr('bId', e.id);

		$('#buildings-list').append(container);
	});
}

function init_resources () {
	$(resources).each(function (i, e) {
		var container, dl, dd;

		container = document.createElement('div');
		dt = document.createElement('dt');
		dd = document.createElement('dd');

		$(container).attr('id', e.name);
		$(container).append(dt);
		$(container).append(dd);
		$(container).addClass('container')

		$(dt).text(e.name);
		$(dd).text(e.value);

		$('#resources-list').append(container);
	});
}

function init_all_buildings () {
	$(all_buildings).each(function (i, e) {
		var container, type, value, button;

		container = document.createElement('div');
		type = document.createElement('p');
		value = document.createElement('p');
		button = document.createElement('button');

		$(container).append(type);
		$(container).append(value);
		$(container).append(button);
		$(container).addClass('container');
		$(container).attr('id', e.name);

		$(type).text('type: ' + e.name);
		$(value).text('value: ' + e.value);
		$(button).text('buy');

		$(button).click(function () {
			if(getResource('coins').value > e.value){
				setResource('coins', getResource('coins').value - e.value);
				var new_building = $.extend({}, e);
				$.extend(new_building, building);
				buildings.push();
				init_buildings();
			} else {
				alert("You don't have enough money to buy that.");
			}
		});
		
		$('#buy ol').append(container);
	});	
}

function init () {
	init_buildings();
	init_resources();
	init_all_buildings();	
}

function mainloop () {
	$(resources).each(function (i, e) {
		var selector = '#resources-list #'+ e.name + ' dd';
		$(selector).text(e.value);
	});

	setTimeout(mainloop, 1/fps*1000);
}

$(function () {
	init();
	setTimeout(mainloop, 1/fps*1000);
});