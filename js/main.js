$(function(){
	let isMobile;

	$(window).resize(function(){
		if(window.innerWidth > 950){
			if(isMobile != false){
				isMobile=false

				if($(".tab").hasClass("active") == true){
					$("nav > ul > li").each(function(index, item){
						let $item=$(item);

						$item.removeClass("active");
						$item.find("ul").slideUp(300);
					});

					$("body").removeClass("fixed");
					$("nav").removeClass("active");
					$(".tab").removeClass("active");
					$(".dimmed").removeClass("active");
				}
			}
		}
		else {
			if(isMobile != true){
				isMobile=true
			}
		}
	});

	$(window).trigger("resize");

	$(".nav > ul > li").hover(
		function(){
			if(isMobile == false){
				$(this).find("ul").stop().slideDown(300);
			}
		},
		function(){
			if(isMobile == false){
				$(this).find("ul").stop().slideUp(300);
			}
		}
	);

	$(".nav > ul > li > a").focusin(function(){
		if(isMobile == false){
			$(this).parent().addClass("active");
			$(this).next("ul").slideDown(300);
		}
	});

	$(".nav ul ul li:last-child a").focusout(function(){
		if(isMobile == false){
			$(this).parent().parent().parent().removeClass("active");
			$(this).parent().parent().slideUp(300);
		}
	});

	$(".tab").click(function (e) {
		e.preventDefault();

		if(isMobile == true){
			if($(".tab").hasClass("active") == false){
				$("body").addClass("fixed");
				$("nav").addClass("active");
				$(".tab").addClass("active");
				$(".dimmed").addClass("active");
			}
			else{
				// $("nav > ul > li").removeClass("active");
				// $("nav li ul").slideUp(300);

				$(".nav > ul > li").each(function(index, item){
					let $item=$(item);

					$item.removeClass("active");
					$item.find("ul").slideUp(300);
				});

				$("body").removeClass("fixed");
				$("nav").removeClass("active");
				$(".tab").removeClass("active");
				$(".dimmed").removeClass("active");
			}
		}
	});

	$(".nav > ul > li").click(function(e){
		e.preventDefault();

		if(isMobile == true){
			if($(this).hasClass("active") == false){
				console.log("false");
				$(".nav > ul > li").removeClass("active");
				$(this).addClass("active");
				$(".nav li ul").slideUp(300);
				$(this).find("ul").slideDown(300);
			}
			else{
				$(this).removeClass("active");
				$(this).find("ul").slideUp(300);
			}
		}
	});

	let n=0;
	let index=0;
	let total=4

	$(".slider li").eq(n).addClass("active");
	$(".slider .control li").eq(n).addClass("active");

	function setGallery(){
		$(".slider li").removeClass("active");
		$(".slider li").eq(n).addClass("active");
		$(".control li").removeClass("active");
		$(".slider .control li").eq(n).addClass("active");
	}

	function intervalMoving(){
		if(n < (total-1)){
			n=n+1;
		}
		else{
			n=0;
		}
		setGallery();
	}

	// let id=setInterval(intervalMoving, 5000);

	$(".slider .control li").click(function(e){
		e.preventDefault();
		index=$(this).index();

		if(n != index){
			n=index;
			setGallery();
		}
	});

	$(".slider .control li").hover(
		function(){
			clearInterval(id);
		},
		function(){
			id=setInterval(intervalMoving, 5000);
		}
	);

	$(".lnb .close").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
	});

	let t=0;

	$(window).scroll(function(){
		t=$(window).scrollTop();

		if(t > 100){
			$("#top").fadeIn(300);
		}
		else{
			$("#top").fadeOut(300);
		}
	});

	$("#top").click(function(e){
		e.preventDefault();
		$("html").delay(300).animate({ scrollTop: 0 }, 500);
	});
});