var selectCharacter = true;

console.log(selectCharacter);

$(".col-img").on("click", function(){
	var clickedCharacter = $(this).children(".icon-img").attr("alt");
	if (selectCharacter === true) {
		$("body").removeClass();
		$(".reset-btn-row").removeClass("d-none");
		$(".message-col").removeClass("col-md-8").addClass("col-md-3");
		$(".message-col p").text("test");
		selectCharacter = false;
		if (clickedCharacter === "Superman") {
			$("body").addClass("background-superman");
		}
		if (clickedCharacter === "Wonder Woman") {
			$("body").addClass("background-wonder-woman");
		}
		if (clickedCharacter === "Batman") {
			$("body").addClass("background-batman");
		}
		if (clickedCharacter === "The Flash") {
			$("body").addClass("background-flash");
		}


	}
});