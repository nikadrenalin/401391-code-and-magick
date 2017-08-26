/* jshint browser: true */

(function () {
	"use strict";

	var template = document.querySelector('template#similar-wizard-template'),
		personagesContainer = document.querySelector('.setup-similar-list'),
		NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
		LASTNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
		COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
		EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    ESC_KEYCODE = 27,
    ENTER_KEYCODE = 13;

	if (supportsTemplate()) {
	  template = template.content;
	}

  addEventOpenPopup();
	printPersonages(personagesContainer, template, getPersonages(NAME, LASTNAME, COAT_COLORS, EYES_COLORS));

	// Add event for open popup
  function addEventOpenPopup() {
    var $setupOpen = document.querySelector('.setup-open'),
        $setupOpenIcon = $setupOpen.querySelector('.setup-open-icon');

    $setupOpenIcon.addEventListener("keydown", function(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        showBlock();
      }
    });
    $setupOpen.addEventListener('click', showBlock);
  }

  // Check has parent
  function isDescendant(parentClass, child) {
    var node = child.parentNode;
    while (node !== null) {
      if (node.classList && node.classList.contains(parentClass)) {
        return node;
      }
      node = node.parentNode;
    }
    return false;
  }

  // Chose personage part from list
  function changePersonage(evt) {
    var $wizard = null,
      $overlay,
      fireballColorVal = null,
      result = isDescendant('setup-similar-item', evt.target);
    if (result || evt.target.classList.contains('setup-fireball')) {
      $overlay = document.querySelector('.overlay');
      $wizard = document.querySelector('.setup-wizard-wrap');
      fireballColorVal = FIREBALL_COLOR[Math.floor(Math.random() * FIREBALL_COLOR.length)];
      if (evt.target.classList.contains('setup-fireball')) {
        evt.target.parentNode.style.backgroundColor = fireballColorVal;
        evt.target.parentNode.querySelector('input').value = fireballColorVal;
      } else {
        $wizard.querySelector('.wizard-coat').style.fill = result.querySelector('.wizard-coat').style.fill;
        $overlay.querySelector('input[name="coat-color"]').value = result.querySelector('.wizard-coat').style.fill;
        $wizard.querySelector('.wizard-eyes').style.fill = result.querySelector('.wizard-eyes').style.fill;
        $overlay.querySelector('input[name="eyes-color"]').value = result.querySelector('.wizard-eyes').style.fill;
      }
    }
  }

  // Add kyy event close popup
  function addKeyEventClosePopup(evt) {
    var condition1 = evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('setup-user-name');
    var condition2 = evt.keyCode === ENTER_KEYCODE && evt.target.classList.contains('setup-close');
    var condition3 = evt.keyCode === ENTER_KEYCODE && evt.target.classList.contains('setup-submit');

    if (condition1 || condition2 || condition3) {
      hideBlock();
    }
  }

  // Remove class 'hidden' from DOM node
  function showBlock() {
    var $setubBlock = document.querySelector('.overlay');
    var $closeButton = $setubBlock.querySelector('.setup-close');

    $closeButton.addEventListener('click', hideBlock);
    $setubBlock.addEventListener('keydown', addKeyEventClosePopup);
    $setubBlock.addEventListener('click', changePersonage);
    $setubBlock.classList.remove('hidden');
	}

	// Hide block '.overlay'
  function hideBlock() {
    var $setubBlock = document.querySelector('.overlay'),
        $closeButton = $setubBlock.querySelector('.setup-close');

    $closeButton.removeEventListener('click', hideBlock);
    $setubBlock.removeEventListener('keydown', addKeyEventClosePopup);
    $setubBlock.removeEventListener('click', changePersonage);
    $setubBlock.classList.add('hidden');
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
			fragment = document.createDocumentFragment(),
      personagesWrapper = document.querySelector('.setup-similar');

		for (i; i < personages.length; i++) {
			personageHtml = persePersonageTemplate(template, personages[i]);
			fragment.appendChild(personageHtml);
		}
		container.appendChild(fragment);
    personagesWrapper.classList.remove('hidden');

		function persePersonageTemplate(template, personage) {
			template = template.cloneNode(true);

			template.querySelector('.setup-similar-label').textContent = personage.name;
			template.querySelector('.wizard-coat').style.fill = personage.coatColor;
			template.querySelector('.wizard-eyes').style.fill = personage.eyesColor;

			return template;
		}
	}
})();
