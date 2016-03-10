var mainWidth = $('.main-container').width();
var mainHeight = $('.main-container').height();

if (mainWidth > 1280) { mainWidth = 1280 }
if (mainHeight > 930) { mainHeight = 930 }

var canvasWidth = mainWidth * 0.72;
var canvasHeight = canvasWidth * 0.6;

$('.main-container').css('width', mainWidth);
$('.main-container').css('height', mainHeight);

$('#canvas').css('width', canvasWidth);
$('#canvas').css('height', canvasHeight);


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

var sections = ['accueil', 'infos', 'photos', 'drawing'];
var activeSection = 0;


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

function changeSection(index) {
	if (activeSection == 3) {
		dropBlackPen();
		dropWhitePen();
		dropEraser();
	}
 	activeSection += index;
 	if (activeSection < 0) { activeSection = sections.length-1 }
 	else if (activeSection > sections.length-1) { activeSection = 0 }

 	var nextSection = sections[activeSection];
 	$('.section-container').each(function() {
 		if($(this).attr('id') == nextSection) {
 			console.log($(this).attr('id'));
 			$(this).animate({'opacity': '1'}, 200).show();
 		}
 		else {
 			$(this).animate({'opacity': '0'}, 200).hide();
 		}
 	});
}
var imageBoard = new DrawingBoard.Board('canvas', {
			controls: false,
			color: '#FFF',
			size: 2,
			webStorage: false,
			background: false
		});

var activeTool = "";

function pickBlackPen() {
	imageBoard.setMode('pencil');
	imageBoard.setColor('#000');
	imageBoard.ctx.lineWidth = 2;
	$('#black-pen').css('opacity', '0.2');
	$('#white-pen').css('opacity', '1');
	$('#eraser').css('opacity', '1');
	$('body').css('cursor', "url('img/cursor-crayon-noir.png'), auto");

	activeTool = 'black pen';
}
function pickWhitePen() {
	imageBoard.setMode('pencil');
	imageBoard.setColor('#FFF');
	imageBoard.ctx.lineWidth = 2;
	$('#white-pen').css('opacity', '0.2');
	$('#black-pen').css('opacity', '1');
	$('#eraser').css('opacity', '1');
	$('body').css('cursor', "url('img/cursor-crayon-blanc.png'), auto");

	activeTool = 'white pen';
}
function pickEraser() {
	imageBoard.setMode('eraser');
	imageBoard.ctx.lineWidth = 40;
	$('#white-pen').css('opacity', '1');
	$('#black-pen').css('opacity', '1');
	$('#eraser').css('opacity', '0.2');
	$('body').css('cursor', "url('img/cursor-gomme.png'), auto");

	activeTool = 'eraser';
}
function dropBlackPen() {
	imageBoard.ctx.lineWidth = 0.01;
	$('#black-pen').css('opacity', '1');
	$('body').css('cursor', "auto");

	activeTool = '';
}
function dropWhitePen() {
	imageBoard.ctx.lineWidth = 0.01;
	$('#white-pen').css('opacity', '1');
	$('body').css('cursor', "auto");

	activeTool = '';
}
function dropEraser() {
	imageBoard.ctx.lineWidth = 0.01;
	$('#eraser').css('opacity', '1');
	$('body').css('cursor', "auto");

	activeTool = '';
}

$('#black-pen').click(function() {
	if (activeTool == "black pen") {
		dropBlackPen();
	}
	else {
		pickBlackPen();
	}
});
$('#white-pen').click(function() {
	if (activeTool == "white pen") {
		dropWhitePen();
	}
	else {
		pickWhitePen();
	}
});
$('#eraser').click(function() {
	if (activeTool == "eraser") {
		dropEraser();
	}
	else {
		pickEraser();
	}
});
