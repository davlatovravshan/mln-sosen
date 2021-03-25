const parallax = document.querySelector('.parallax');

window.addEventListener('scroll', function() {

	let scrollPosition = window.pageYOffset;
	parallax.style.transform = 'translateY(' + scrollPosition * 0.3 + 'px)';

});