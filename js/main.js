// Паралакс эффект и Анимация счётчика

let parallax = $('.parallax');
let infoBlock = $('#info-block');
let infoBlockHeight = infoBlock.height();

var enableShowAnimate = true;

$(window).on('scroll load resize', function() {

	let scrollPosition = $(window).scrollTop();

	// Паралакс эффект
	parallax.css('transform', 'translateY(' + scrollPosition * 0.4 + 'px)');

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

let requiredinputs = [
	'name',
	'email',
	'theme',
];

let form = $('.contact-form');

form.on('submit', function(event) {

	event.preventDefault();

	var myForm = $(this);

	var thisForm = myForm.get(0);
	var formElements = thisForm.elements;

	var formErrors = [];
	for (var i = 0; i < formElements.length - 1; i++) {

		var element = formElements[i];

		if (!requiredinputs.includes(element.name)) {
			continue;
		}

		if (element.value == '') {
			formErrors.push(element.name)
		}

	}

	var emailInput = formElements['email'];
	if (!validateEmail(emailInput.value) && !formErrors.includes('email')) {
		formErrors.push('email');
	}

	var enableForm = showErrorOnSubmit(formErrors, myForm);
	console.log(enableForm);
});


let formInputs = $('.form-input');

formInputs.on('change keyup focusout', function() {

	if (!requiredinputs.includes(this.name)) {
		return false;
	}

	if (this.value == '') {
		addError(this);
	} else {
		noError(this);
	}

});


let emailInput = $('.form-input[type=email]');

emailInput.on('change keyup focusout', function() {

	var value = this.value;

	if (!validateEmail(value)) {
		addError(this);
	} else {
		noError(this);
	}

});


function showErrorOnSubmit(formErrors, myForm) {

	var enableForm = true;
	formErrors.forEach(function(name) {
		
		var element = myForm.find('[name=' + name + ']');

		if (element.val() == '') {
			addError(element.get(0));
			enableForm = false;
		}

	});

	return enableForm;

}

function addError(element) {
	$(element).addClass('form-input-error');
	$(element).siblings('.form-error').show();	
}

function noError(element) {
	$(element).removeClass('form-input-error');
	$(element).siblings('.form-error').hide();
}

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}