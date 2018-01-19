
module.exports = {
  judge: (points, currentPoint) => {
    var currentX = currentPoint.x
    var currentY = currentPoint.y
    // var startX = 0, startY = 0
    var startY = currentY - 4 > 0 ? currentY : 0
    var startX = currentX - 4 > 0 ? currentX : 0
    var endX = currentX + 4 < 18 ? currentX : 18
    var endY = currentY + 4 < 18 ? currentY : 18

    var count = 0 // 连成的棋子的个数

    var i, j

    // 判断横的 是否有5个
    for (i = startX; i <= endX; i++) {
      points.indexOf(`${i}/${currentY}`) === -1 ? count = 0 : count++
      if (count === 5) return true
    }

    // 判断竖的 是否有5个
    for (j = startY; j <= endY; j++) {
      points.indexOf(`${currentX}/${j}`) === -1 ? count = 0 : count++
      if (count === 5) return true
    }
    count = 0

    // 判断左上角到右下角
    for (i = startX, j = startY; i <= endY; i++, j++) {
      points.indexOf(`${i}/${j}`) === -1 ? count = 0 : count++
      if (count === 5) return true
    }
    count = 0

    // 判断右上角到左下角
    for (i = endX, j = startY; i <= endY; i--, j++) {
      points.indexOf(`${i}/${j}`) === -1 ? count = 0 : count++
      if (count === 5) return true
    }
    count = 0

    return false
  }
}
