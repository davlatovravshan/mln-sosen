// Паралакс эффект и Анимация счётчика

let parallax = $('.parallax');
let infoBlock = $('#info-block');
let infoBlockHeight = infoBlock.height();

var enableShowAnimate = true;

$(window).on('scroll load resize', function() {

	let scrollPosition = $(window).scrollTop();

	// Паралакс эффект
	parallax.css('transform', 'translateY(' + scrollPosition * 0.3 + 'px)');

	// Анимация счётчика
	if (!enableShowAnimate) return false;

	var runHeight = infoBlock.offset().top - window.innerHeight;
	var notRunHeight = infoBlock.offset().top + infoBlockHeight;

	if (scrollPosition >= runHeight && scrollPosition <= notRunHeight) {

		$('.count-number').each(function() {

			$(this).prop('Counter', 0).animate({
				Counter: $(this).text()
			}, {
				duration: 4000,
				easing: 'swing',
				step: function(now) {
					$(this).text(Math.ceil(now))
				}
			})

		});

		enableShowAnimate = false;

	}

});



// Валидация Формы

let form = $('.contact-form');

form.on('submit', function(event) {

	console.log(form.elements)

	event.preventDefault();	
})