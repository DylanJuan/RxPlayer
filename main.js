// MenuBtn //
$(".dropdown-button").on("click", function() {
	var menu = $(".dropdown-menu");
	if(menu.hasClass("show")) menu.removeClass("show");
	else menu.addClass("show");
})

// $(window).on("click", function(e) {
// 	if(!e.target.matches(".dropdown-button") && !e.target.matches(".bar")) {
// 		$(".dropdown-menu").removeClass("show");
// 	}
// })


//Banner Slider//
var bannerIdx = 1;

function slideImg(n) {
	if(n < 1) n = 3;
	else if(n > 3) n = 1;

	var banner = $(".banner");
	if(n == 1) {
		banner.css("background-image", "url('assets/img/banner.jpg'");
	}else if(n == 2) {
		banner.css("background-image", "url('assets/img/banner2.jpg'");
	}else if(n == 3) {
		banner.css("background-image", "url('assets/img/banner3.jpg'");
	}

	$(".pin-white").removeClass("pin-white");

	$(".slide-pin").eq(n-1).addClass("pin-white");

	bannerIdx = n;
}

$(".arrow-right").on("click", function() {
	slideImg(bannerIdx+1);
})

$(".arrow-left").on("click", function() {
	slideImg(bannerIdx-1);
})

$(".slide-pin").on("click", function() {
	bannerIdx = $(".slide-pin").index(this) + 1;
	slideImg(bannerIdx);
})

//Scroll navbar//
$(window).on("scroll", function() {
	var pos = $(window).scrollTop();
	if(pos < 400) $("#sticky-header").removeClass("sticky");
	else $("#sticky-header").addClass("sticky");
})

// $(window).on("click", function(e) {
// 	console.log(e);
// })



//Music Player
audio = new Audio();
audio.volume = 0.1;

var currSongIndex = -1;
var totalSong = $(".song-container").length;

function playSongbyIndex(idx, repeat) {
	if(repeat == 1) {
		if(idx < 0) idx = totalSong - 1;
		else if(idx == totalSong) idx = 0;
	}else {
		if(idx < 0) {
			idx = 0;
			audio.pause();
			return;
		}
		else if(idx == totalSong) {
			idx = totalSong - 1;
			audio.pause();
			return;
		}
	}
	

	var currActive = $(".song-container").eq(idx);
	var prevActive = $(".song-active");

	$(".song-active").removeClass("song-active");
	currActive.addClass("song-active");

	var currActiveInfo = currActive.children(".song-info");

	var playerImg = $(".player-img img");
	var playerTitle = $(".player-title");
	var playerArtist = $(".player-artist");
	var playerTotalTime = $(".total-time");

	var songPath = currActive.children(".song-info").children(".song-path").html();
	// console.log(currActiveInfo.children(".song-title").html());

	playerImg.attr("src", currActive.children(".song-img").children("img").attr("src"));
	playerTitle.html(currActiveInfo.children(".song-title").html());
	playerArtist.html(currActiveInfo.children(".song-singer").html());
	playerTotalTime.html(currActiveInfo.children(".song-length").html())

	var playBtn = $(".play-btn").children("img");
	playBtn.attr("src", "assets/img/pause.png");
	playBtn.addClass("playing");

	audio.src = "assets/songs/"+songPath;
	audio.play();

	currSongIndex = idx;
}

$(".song-container").on("click", function(e) {
	var index = $(".song-container").index(this)

	playSongbyIndex(index, 0);
})

$(".play-btn").on("click", function() {
	var playBtn = $(".play-btn img");
	var isPlaying = $(".playing");

	if(playBtn.is(isPlaying)) {
		isPlaying.attr("src", "assets/img/play2.png");
		isPlaying.removeClass("playing");
		audio.pause();
	}else {
		playBtn.attr("src", "assets/img/pause.png");
		playBtn.addClass("playing");
		audio.play();
		console.log("adaw");
	}
})

function prevNextSong(x) {
	var idx = currSongIndex + x;
	var repeat = 0;

	//If repeat status is one, we change the repeat status to all;
	if($(".repeatOne").length != 0) {
		var repeatBtn = $(".repeat-btn img");
		repeatBtn.removeClass("repeatOne");
		repeatBtn.addClass("repeatAll")
		repeatBtn.attr("src", "assets/img/repeatall.png");
	}

	if($(".repeatAll").length != 0) repeat = 1;

	if($(".shuffleOn").length != 0) {
		idx = randomizeIndex(0, totalSong, currSongIndex)
	}

	playSongbyIndex(idx, repeat);
}

function randomizeIndex(start, end, exception) {
	var ret = exception;
	while(ret == exception) {
		ret = Math.floor((Math.random() * end) + start)
	}

	return ret;
}


$(".next-btn").on("click", function() {
	prevNextSong(1);
})

$(".prev-btn").on("click", function() {
	var x = -1;
	var currTime = Math.floor(audio.currentTime);

	//Reset current song progress if the audio time more than or equal to 3 seconds
	if(currTime >= 3) x = 0;

	prevNextSong(x);
})


//repeat Button
$(".repeat-btn").on("click", function() {
	var repeatOff = $(".repeatOff");
	var repeatAll = $(".repeatAll");
	var repeatOne = $(".repeatOne");
	var repeatBtn = $(".repeat-btn img");

	if(repeatBtn.is(repeatOff)) {
		repeatBtn.removeClass("repeatOff");
		repeatBtn.addClass("repeatAll")
		repeatBtn.attr("src", "assets/img/repeatall.png");
	}else if(repeatBtn.is(repeatAll)) {
		repeatBtn.removeClass("repeatAll");
		repeatBtn.addClass("repeatOne")
		repeatBtn.attr("src", "assets/img/repeatone.png");
	}else if(repeatBtn.is(repeatOne)) {
		repeatBtn.removeClass("repeatOne");
		repeatBtn.addClass("repeatOff")
		repeatBtn.attr("src", "assets/img/repeat.png");
	}
})

$(".shuffle-btn").on("click", function() {
	var shuffleBtn = $(".shuffle-btn img");

	if($(".shuffleOn").length != 0) {
		shuffleBtn.removeClass("shuffleOn");
		shuffleBtn.attr("src", "assets/img/shuffle.png");
	}else {
		shuffleBtn.addClass("shuffleOn");
		shuffleBtn.attr("src", "assets/img/shuffleon.png");
	}
})


//Update time on music player
$(audio).bind("timeupdate", function() {
	if(audio.currentTime == audio.duration) {
		if($(".repeatOne").length != 0) {
			audio.play();
		}
		else {
			var repeat = 0;
			var x = currSongIndex+1;

			if($(".repeatAll").length != 0) repeat = 1;

			if($(".shuffleOn").length != 0) {
				x = randomizeIndex(0, totalSong, currSongIndex)
			}

			playSongbyIndex(x, repeat);
		}
	}

	var currMinutes = Math.floor(audio.currentTime / 60);
	var currSeconds = Math.floor(audio.currentTime - currMinutes * 60);

	if(currMinutes < 10) currMinutes = "0" + currMinutes;
	if(currSeconds < 10) currSeconds = "0" + currSeconds;

	$(".curr-time").html(currMinutes+":"+currSeconds);


	var progressBar = audio.currentTime / audio.duration * 100;
	$(".seek-bar").css("width", progressBar + "%");

})


//Seek navigation on music player
var seekTime;

function showHoverMusicNav(e) {
	var seekArea = $(".seek-area");
	var insTime = $(".ins-time");
	var seekHover = $(".seek-hover");
	var seekBar = $(".seek-bar");

	var mouseHoverPos = seekArea.offset();
	var mouseHoverLength = e.clientX - mouseHoverPos.left;
	var seekLength = mouseHoverLength / seekArea.outerWidth();
	seekTime = audio.duration * seekLength;

	seekHover.width(mouseHoverLength);

	var time = seekTime / 60;

	var timeMinutes = Math.floor(time);
	var timeSeconds = Math.floor(seekTime - timeMinutes * 60);

	if (timeMinutes < 10) timeMinutes = "0" + timeMinutes;
	if (timeSeconds < 10) timeSeconds = "0" + timeSeconds;

	if (isNaN(timeMinutes) || isNaN(timeSeconds)) {
		timeMinutes = "00";
		timeSeconds = timeMinutes;
	}

	insTime.text(timeMinutes + ":" + timeSeconds);
	insTime.css({
		"left" : mouseHoverLength,
		"margin-left" : "360px"
	}).fadeIn(0);
}

function hideHoverMusicNav() {
	$(".seek-hover").width(0);
	$(".ins-time").text("00:00");
	$(".ins-time").css({
		"left": "0px",
		"margin-left": "0px"
	}).fadeOut(0);
}

$(".seek-area").mousemove(function(e) { showHoverMusicNav(e); });
$(".seek-area").mouseout(hideHoverMusicNav);
$(".seek-area").on("click", function() {
	audio.currentTime = seekTime;
	hideHoverMusicNav();
})