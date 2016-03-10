// Set container and canvas size
var mainWidth = $('.main-container').width();
var mainHeight = $('.main-container').height();

if (mainWidth > 1280) { mainWidth = 1280 }
if (mainHeight > 930) { mainHeight = 930 }

var canvasWidth = mainWidth * 0.72;
var canvasHeight = canvasWidth * 0.6;

$('.main-container').css('width', mainWidth).css('height', mainHeight);
$('#canvas').css('width', canvasWidth).css('height', canvasHeight);


// Preload images
var images = new Array()
function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = preload.arguments[i]
	}
};
preload(
	"img/xanax01.jpg", "img/xanax02.jpg", "img/xanax03.jpg", "img/xanax04.jpg", "img/xanax05.jpg", "img/xanax06.jpg", "img/xanax07.jpg", "img/xanax08.jpg", "img/xanax09.jpg", "img/xanax10.jpg", "img/xanax11.jpg", "img/xanax12.jpg", "img/xanax13.jpg", "img/xanax14.jpg", "img/xanax15.jpg", "img/xanax16.jpg", "img/xanax17.jpg", "img/xanax18.jpg", "img/xanax19.jpg", "img/xanax20.jpg", "img/xanax21.jpg", "img/xanax22.jpg", "img/xanax23.jpg", "img/xanax24.jpg", "img/xanax25.jpg", "img/xanax26.jpg", "img/xanax27.jpg", "img/xanax28.jpg", "img/xanax29.jpg", "img/xanax30.jpg", "img/xanax31.jpg", "img/xanax32.jpg", "img/xanax33.jpg", "img/xanax34.jpg", "img/xanax35.jpg", "img/xanax36.jpg", "img/xanax37.jpg", "img/xanax38.jpg", "img/xanax39.jpg", "img/xanax40.jpg", "img/xanax41.jpg", "img/xanax42.jpg", "img/xanax43.jpg", "img/xanax44.jpg", "img/xanax45.jpg", "img/xanax46.jpg", "img/xanax47.jpg", "img/xanax48.jpg", "img/xanax49.jpg", "img/xanax50.jpg", "img/xanax51.jpg", "img/xanax52.jpg", "img/xanax53.jpg"
);

// Background images
function changeimg(name, number){
	var index=parseInt(name.slice(-8,-6));
	var indexetape=(index+number)+"";
	if (indexetape == "54") {
		indexetape = "1";
	}
	if (indexetape == "0") {
		indexetape = "53";
	}
	var pad = "00";
	var newindex = pad.substring(0, pad.length - indexetape.length) + indexetape;

	var nextimg="xanax"+newindex+".jpg";
	$(".main-container").css("background-image","url(img/"+nextimg+")")

	if (nextimg == "xanax01.jpg" || nextimg == "xanax53.jpg") {
		$('.section-container').css('visibility', 'hidden');
	}
	else {
		$('.section-container').css('visibility', 'visible');
	}
}

// Sections
var sections = ['accueil', 'infos', 'photos', 'drawing'];
var activeSection = 0;

function changeSection(index) {
	if (activeSection == 3) {
		dropTool('black-pencil');
		dropTool('white-pencil');
		dropTool('eraser');
	}
 	activeSection += index;
 	if (activeSection < 0) { activeSection = sections.length-1 }
 	else if (activeSection > sections.length-1) { activeSection = 0 }

 	var nextSection = sections[activeSection];
 	$('.section-container').each(function() {
 		if($(this).attr('id') == nextSection) {
 			$(this).animate({'opacity': '1'}, 200).show();
 		}
 		else {
 			$(this).animate({'opacity': '0'}, 200).hide();
 		}
 	});
}

// Key press
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        changeimg($(".main-container").css("background-image"), -1);
        break;

        case 39: // right
        changeimg($(".main-container").css("background-image"), 1);
        break;

        case 38: // top
        changeSection(-1);
        break;

        case 40: // bottom
        changeSection(1);
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

// Image Board
var imageBoard = new DrawingBoard.Board('canvas', {
	controls: false,
	color: '#FFF',
	size: 0.01,
	webStorage: false,
	background: false
});

// Drawing tools
var activeTool = "";
var tools = $('.drawing-control').children();

function pickTool(id, mode, color, lineWidth, cursor) {
	imageBoard.setMode(mode);
	imageBoard.setColor(color);
	imageBoard.ctx.lineWidth = lineWidth;
	$.each(tools, function(index, tool) {
		tool.id == id ? $(tool).css('opacity', '0.2') : $(tool).css('opacity', '1');
	});
	$('body').css('cursor', "url('img/cursor-"+id+".png'), crosshair");
	activeTool = id;
}
function dropTool(id) {
	imageBoard.ctx.lineWidth = 0.01;
	$('#'+id).css('opacity', '1');
	$('body').css('cursor', "auto");
	activeTool = '';
}
$('#black-pencil').click(function() {
	activeTool == "black-pencil" ? dropTool('black-pencil') : pickTool('black-pencil', 'pencil', '#000', 2)
});
$('#white-pencil').click(function() {
	activeTool == "white-pencil" ? dropTool('white-pencil') : pickTool('white-pencil', 'pencil', '#FFF', 2)
});
$('#eraser').click(function() {
	activeTool == "eraser" ? dropTool('eraser') : pickTool('eraser', 'eraser', '#FFF', 40);
});
