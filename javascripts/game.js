var Game = function(canvasID, canvasWidth, canvasHeight /*, useFullscreen */) {
    if (arguments[3]) {
        this.useFullscreen = arguments[3];
    }

    Config.width = canvasWidth;
    Config.height = canvasHeight;
	
    this.canvasElement = document.getElementById(canvasID);

    if (this.useFullscreen) {
        Config.width = window.innerWidth;
        Config.height = window.innerHeight;
    }

    this.canvasElement.width = Config.width;
    this.canvasElement.height = Config.height; 
    
    if (this.canvasElement.getContext) {
        this.drawingContext = this.canvasElement.getContext('2d');
    } else {
        throw 'No canvas support';
    }
	
    this.playerManager = new PlayerManager();
    this.engine = new Engine(this.drawingContext, this.playerManager.players);
};

Game.prototype.start = function() {
	this.drawFrame();
	this.playerManager.initializePlayers();
	this.engine.start();	
}

Game.prototype.restart = function() {
	this.engine.stop();
	this.drawingContext.clearRect(0, 0, Config.width, Config.height);
	this.start();
}

Game.prototype.stop = function() {
	this.engine.stop();
}

Game.prototype.addPlayer = function(name) {
    return this.playerManager.addPlayer(name);
}

Game.prototype.handleControl = function(playerID, direction) {
    this.playerManager.navigatePlayer(playerID, direction);  
};

Game.prototype.setCollisionCallback = function (callback) {
	this.engine.setCollisionCallback(callback);
}

Game.prototype.drawFrame = function () {
	this.drawingContext.lineWidth = 10;
	this.drawingContext.strokeStyle = "#E3D42E";
	this.drawingContext.strokeRect(0, 0, Config.width - 0, Config.height - 0);
}