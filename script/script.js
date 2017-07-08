var totalBlocks = [],
    totalLinks = [],
    displayLinks = false;

//Setting up drop options
var targetDropOptions = {
    activeClass: 'dragActive'
};

//Setting up a Target endPoint
var targetColor = "#3CC47C";
var targetEndpoint = {
    anchor: "TopCenter", //Placement of Dot
    endpoint: ["Dot", { radius: 8}], //Other types are rectangle, Image, Blank, Triangle
    paintStyle: { fillStyle: targetColor }, //Line color
    isSource: true, //Starting point of the connector
    scope: "green dot",
    connectorStyle: { strokeStyle: targetColor, lineWidth: 4 }, // Means Bridge width and bridge color
    connector: ["Flowchart", { curviness: 63 }], //Other properties Bezier
    maxConnections: -1, //No upper limit
    isTarget: true, //Means same color is allowed to accept the connection
    dropOptions: targetDropOptions //Means when the drag is started, other terminals will start to highlight
};


//Setting up a Source endPoint
var sourceColor = "#FC4A1A";
var sourceEndpoint = {
    anchor: "BottomCenter",
    endpoint: ["Dot", { radius: 8}],
    paintStyle: { fillStyle: sourceColor },
    isSource: true,
    scope: "green dot",
    connectorStyle: { strokeStyle: sourceColor, lineWidth: 4 },
    connector: ["Flowchart", { curviness: 63}],
    maxConnections: -1,
    isTarget: true,
    dropOptions: targetDropOptions
};

jsPlumb.bind("ready", function () {
    //Set up endpoints on the divs
    jsPlumb.addEndpoint($(".window"), targetEndpoint);
    // jsPlumb.addEndpoint($(".window"), sourceEndpoint);
    // jsPlumb.draggable($(".window"));
    jsPlumb.bind("connection", function (connInfo, originalEvent) {
        // Draw new labels for connections
        totalLinks.push(totalLinks.length + 1);
        var labelString = 'L' + totalLinks[totalLinks.length-1] + ' ' + connInfo.connection.sourceId + "-" + connInfo.connection.targetId;
        connInfo.connection.getOverlay("label").setLabel(labelString);
    });
    enableDisableButton();
});

// Add new blocks
function addDiv() {
    var id= generateId();
    totalBlocks.push(id);
    var newDiv = $('<div>', { id: id }, { class: 'window' }).addClass('block').css('background-color', getRandomColor()).appendTo('body');
    $(newDiv).html('<div class= "center"><i id= "' + id + '" class="material-icons" onclick= "removeBlock(this)">remove_circle</i><div class= "block-id">'+ id + '</div></div>');
    jsPlumb.addEndpoint($(newDiv), targetEndpoint, {
        connectorOverlays:[ 
            [ "Arrow", { width:20, length:15, location:1, id:"arrow" } ],
            [ "Label", { label:"Connecting...", id:"label", location: 0.5, cssClass: 'conn-label'  } ]
        ]
    });
    jsPlumb.addEndpoint($(newDiv), sourceEndpoint, {
        connectorOverlays:[ 
            [ "Arrow", { width:20, length:15, location:1, id:"arrow" } ],
            [ "Label", { label:"Connecting...", id:"label", location: 0.5, cssClass: 'conn-label' } ]
        ]
    });
    jsPlumb.draggable($(newDiv));
    $(newDiv).addClass('window');
    drawLine(true);
    enableDisableButton();
}

function generateId() {
    var i= 0;
    for(var i=0; i<=totalBlocks.length+1; i++) {
        if(totalBlocks.indexOf(i) === -1) {
            return i;
        }
    }
}

// Enable-disable line drawing
function drawLine(fromFxn) {
    if(!fromFxn) {
        displayLinks = !displayLinks;
    }
    var display = displayLinks ? 'block' : 'none';
    $('._jsPlumb_endpoint').css('display', display);
}

// Remove an existing block
function removeBlock(elt) {
    var elem = document.getElementById(elt.id);
    jsPlumb.remove(elem);
    totalBlocks.splice(totalBlocks.indexOf(parseInt(elt.id)), 1);
    enableDisableButton();
}

// Enable-disable 'Draw Line' button
function enableDisableButton() {
    if(totalBlocks.length>1) {
        document.getElementById('draw-line').disabled = false;
    } else {
        document.getElementById('draw-line').disabled = true;
    }
}

// Generate new random background color for the blocks
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}