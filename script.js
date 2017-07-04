angular.module('blockApp', ['ngAnimate'])
.controller('blockController', blockController);

blockController.$inject = [];
function blockController() {
    var _this = this;
    _this.totalLength = 1;
    _this.allSides = ['top', 'right', 'bottom', 'left'];
    _this.blockMatrix = {
        '0': [getRandomColor()],
        length: 1
    };
    _this.rowArray = new Array(1);

    _this.addBlock = addBlock;
    _this.removeBlock = removeBlock;
    _this.getRandomColor = getRandomColor;

    function addBlock(side, rowNumber, columnNumber) {
        _this.totalLength++;
        if(side === 'top' || side === 'bottom') {
            addRowOrElement(side, rowNumber, columnNumber);
        } else {
            addElementToRow(side, rowNumber, columnNumber);
        }
    }

    function addRowOrElement(side, rowNumber, columnNumber) {
        if(!_this.blockMatrix.hasOwnProperty(rowNumber+1) ||
        (_this.blockMatrix.hasOwnProperty(rowNumber+1) &&
        _this.blockMatrix[rowNumber][columnNumber])) {
            _this.rowArray = new Array(_this.rowArray.length+1);
            _this.blockMatrix[_this.rowArray.length-1] = new Array(columnNumber);
        }
        if(side === 'top') {
            for(var i=_this.rowArray.length-1; i>=rowNumber; i--) {
                if(i === rowNumber) {
                    _this.blockMatrix[i].splice(columnNumber, 1, getRandomColor());
                } else {
                    _this.blockMatrix[i][columnNumber] = _this.blockMatrix[i-1][columnNumber];
                }
            }
        } else {
            for(var i=_this.rowArray.length-1; i>rowNumber; i--) {
                if(i === rowNumber+1 || rowNumber === 0) {
                    if(_this.blockMatrix[i].length >= columnNumber) {
                        _this.blockMatrix[i].splice(columnNumber, 1, getRandomColor());
                    } else {
                        _this.blockMatrix[i][columnNumber] = getRandomColor();
                    }
                } else {
                    _this.blockMatrix[i][columnNumber] = _this.blockMatrix[i-1][columnNumber];
                }
            }
        }
    }

    function addElementToRow(side, rowNumber, columnNumber) {
        if(side === 'right') {
            _this.blockMatrix[rowNumber].splice(columnNumber+1, 0, getRandomColor());
        } else {
            if(!_this.blockMatrix[rowNumber][columnNumber-1]) {
                _this.blockMatrix[rowNumber][columnNumber-1] = getRandomColor();
            } else {
                _this.blockMatrix[rowNumber].splice(columnNumber, 0, getRandomColor());
            }
        }
    }

    function removeBlock(side, rowNumber, columnNumber) {
        if(_this.totalLength === 1) {
            return;
        } else {
            delete _this.blockMatrix[rowNumber][columnNumber];
        }
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}