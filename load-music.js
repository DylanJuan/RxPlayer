//Song Loader//
function loadMusic(data) {
	$(".music-list-container ul").append(
		$("<li>").append(
			$("<div>").attr("class", "song-container").append(
				$("<div>").attr("class", "song-img").append(
					$("<img>").attr("src", "assets/songs/"+data.Cover).append()
				)
			).append(
				$("<div>").attr("class", "song-info").append(
					$("<h3>").attr("class", "song-title").append(data.Title)
				).append(
					$("<p>").attr("class", "song-singer").append(data.Singer)
				).append(
					$("<p>").attr("class", "song-album").append(data.Album)
				)
			).append(
				$("<div>").attr("class", "song-info").append(
					$("<p>").attr("class", "song-length").append(data.Length)
				).append(
					$("<p>").attr("class", "song-genres").append(data.Genres)
				).append(
					$("<p>").attr("class", "song-year").append(data.Year)
				).append(
					$("<p>").attr("class", "song-path").append(data.Song)
				)
			).append(
				$("<div>").attr("class", "btn-play-green hide").append(
					$("<img>").attr("src", "assets/img/play.png")
				)
			)
		)
	)
}