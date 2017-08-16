/**
 * Created by Nikita on 15.08.2017.
 */
window.renderStatistics = function (ctx, names, times) {

  // Get max element in array
  if (!Array.prototype.max) {
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };
  }

  printRect(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  printRect(ctx, 100, 10, 420, 270, 'white');

  printText(ctx, 'Ура вы победили!', 130, 50);
  printText(ctx, 'Список результатов:', 130, 70);

  printBarGraph(ctx, names, times);

  // Print bar graph
  function printBarGraph(canvas, namesArr, timesArr) {
    var maxVal = timesArr.max(),
      i = 0,
      distance = 130,
      percentage = 0;

    for (i; i < timesArr.length; i++) {
      percentage = (timesArr[i] * 100) / maxVal;
      if (timesArr[i] === maxVal) {
        printRect(canvas, distance, 100, 40, 150, getRandomColor(namesArr[i]));
        printText(ctx, Math.floor(timesArr[i]), distance,  90);
      }else {
        printRect(canvas, distance, 100 + ((150 * (100 - percentage)) / 100), 40, (150 * percentage) / 100, getRandomColor(namesArr[i]));
        printText(ctx, Math.floor(timesArr[i]), distance,  90 + ((150 * (100 - percentage)) / 100));
      }
      printText(ctx, namesArr[i], distance,  270);
      distance += 100;
    }
  }

  // Get random color
  function getRandomColor(name) {
    var random = Math.random().toFixed(1),
        result = null;

    if (name  === 'Вы') {
      result = 'rgba(255, 0, 0, 1)';
    }else {
      while (random < 0.2) {
        random = Math.random().toFixed(1);
      }
      result = 'rgba(0, 0, 255, ' + random + ')';
    }

    return result;
  }

  // Print rectangle
  function printRect(canvas, x, y, width, height, color) {
    canvas.beginPath();
    canvas.rect(x, y, width, height);
    canvas.fillStyle = color || 'black';
    canvas.fill();
  }

  // Print text
  function printText(canvas, text, x, y, font, style) {
    canvas.fillStyle = style || 'black';
    canvas.font = font || '16px PT Mono';
    canvas.fillText(text, x, y);
  }

}
