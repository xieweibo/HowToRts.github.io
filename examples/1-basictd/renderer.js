//This file just deals with drawing things.
//It is probably cludgy as, don't look in here for good coding advice! :)s

var stage;
var gfxResources = {};

function init() {
	stage = new createjs.Stage('canvas');
	createjs.DisplayObject.suppressCrossDomainErrors = true;

	var queue = new createjs.LoadQueue(false);
	queue.addEventListener('complete', loadingComplete);
	queue.addEventListener('fileload', function (event) {

		//remove path and extension
		var filename = event.item.id.substring('../images/'.length);
		filename = filename.substr(0, filename.lastIndexOf('.'));

		gfxResources[filename] = event.result;
	});

	queue.loadFile('../images/tower.png');
	queue.loadFile('../images/turret.png');

	queue.loadFile('../images/agent.png');

	queue.load();
}

function createCenteredBitmap(filename) {
	var sprite = new createjs.Bitmap(gfxResources[filename]);
	sprite.regX = sprite.image.width / 2;
	sprite.regY = sprite.image.height / 2;
	return sprite;
}

var towerBitmaps = [];

function loadingComplete() {
	//Draw a grid
	var gridShape = new createjs.Shape();
	gridShape.x = 0.5;
	gridShape.y = 0.5;
	gridShape.graphics.beginStroke('#000').setStrokeStyle(1);
	for (var x = 0; x < gridWidthPx; x += gridPx) {
		gridShape.graphics.moveTo(x, 0);
		gridShape.graphics.lineTo(x, gridHeightPx);
	}
	for (var y = 0; y < gridHeightPx ; y += gridPx) {
		gridShape.graphics.moveTo(0, y);
		gridShape.graphics.lineTo(gridWidthPx, y);
	}
	stage.addChild(gridShape);

	startGame();

	createjs.Ticker.setFPS(10);
	createjs.Ticker.addEventListener("tick", function () {
		//TODO: gameTick();
		rendererTick();
		stage.update();
		//console.log('tick');
	});
}

function rendererTick() {
	//Create tower bitmaps for all the new towers
	while (towerBitmaps.length < towers.length) {
		var tower = towers[towerBitmaps.length];
		var container = new createjs.Container();
		container.addChild(createCenteredBitmap('tower'));
		container.addChild(createCenteredBitmap('turret'));
		container.x = gridPx * (tower.x + 0.5);
		container.y = gridPx * (tower.y + 0.5);
		towerBitmaps.push(container);
		stage.addChild(container);
	}

	//TODO: Create enemy bitmaps, move them, rotate them etc
}