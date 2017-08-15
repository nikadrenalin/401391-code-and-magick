'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramheight = 150;
  var step = histogramheight / (max - 0);

  ctx.textBaseline = 'top'; // Рисуем надпись от левого верхнего угла
  for (i = 0; i < times.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], 140 + 90 * i, 250);
    ctx.fillText(parseInt(times[i], 10), 140 + 90 * i, 240 - times[i] * step - 30);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.round(Math.random() * 10) / 10 + ')';
    }
    ctx.fillRect(140 + 90 * i, 240, 40, -times[i] * step);
  }
};
