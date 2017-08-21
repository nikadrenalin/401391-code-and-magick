/* jshint browser: true */

(function () {
	"use strict";
	
	var setup = document.querySelector('.setup'),
		template = document.querySelector('template#similar-wizard-template'),
		personagesWrapper = document.querySelector('.setup-similar'),
		personagesContainer = personagesWrapper.querySelector('.setup-similar-list'),
		names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
		lastnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
		coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
		eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

	if (supportsTemplate()) {
	  template = template.content;
	}

	showBlock(setup);
	printPersonages(personagesContainer, template, getPersonages(names, lastnames, coatColors, eyesColors));
	showBlock(personagesWrapper);

	// Remove class 'hidden' from DOM node
	function showBlock(block) {
		block.classList.remove('hidden');
	}

	// Check support 'template' tag
	function supportsTemplate() {
	  return 'content' in document.createElement('template');
	}

	// Create array random personages
	function getPersonages(names, lastnames, coatColors, eyesColors, count) {
		var i = 0,
			countObjs = 0,
			obj = {},
			result = [];

		if (!count) {
			countObjs = 4;
		}

		for (i; i < countObjs; i++) {
			obj.name = names[Math.floor(Math.random() * names.length)] + ' ' + lastnames[Math.floor(Math.random() * lastnames.length)];
			obj.coatColor = coatColors[Math.floor(Math.random() * coatColors.length)];
			obj.eyesColor = eyesColors[Math.floor(Math.random() * eyesColors.length)];

			result.push(obj);
			obj = {};
		}

		return result;
	}

	// print personages in dom
	function printPersonages(container, template, personages) {
		var i = 0,
			personageHtml = null,
			fragment = document.createDocumentFragment();

		for (i; i < personages.length; i++) {
			personageHtml = persePersonageTemplate(template, personages[i]);
			fragment.appendChild(personageHtml);
		}
		container.appendChild(fragment);

		function persePersonageTemplate(template, personage) {
			template = template.cloneNode(true);

			template.querySelector('.setup-similar-label').textContent = personage.name;
			template.querySelector('.wizard-coat').style.fill = personage.coatColor;
			template.querySelector('.wizard-eyes').style.fill = personage.eyesColor;

			return template;
		}
	}	
})();