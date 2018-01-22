
module.exports = {
  judge: (points, currentPoint) => {
    var currentX = currentPoint.x
    var currentY = currentPoint.y
    // var startX = 0, startY = 0
    var startY = currentY - 4 > 0 ? currentY - 4 : 1
    var startX = currentX - 4 > 0 ? currentX - 4 : 1
    var endX = currentX + 4 < 19 ? currentX + 4 : 19
    var endY = currentY + 4 < 19 ? currentY + 4 : 19

    var count = 0 // 连成的棋子的个数
    
    var i, j
    // 判断横的 是否有5个
    for (i = startX; i <= endX; i++) {
      points.indexOf(`${i}/${currentY}`) === -1 ? count = 0 : count++
      if (count === 5) return true
    }
    count = 0

    // 判断竖的 是否有5个
    for (j = startY, count = 0; j <= endY; j++) {
      points.indexOf(`${currentX}/${j}`) === -1 ? count = 0 : count++
      if (count === 5) return true
    }
    count = 0

    // 判断左上角到右下角
    for (i = startX, count = 0, j = startY; j <= endY; i++, j++) {
      points.indexOf(`${i}/${j}`) === -1 ? count = 0 : count++
      if (count === 5) return true
    }
    count = 0

    // 判断右上角到左下角
    for (i = endX, j = startY, count = 0; j <= endY; i--, j++) {
      points.indexOf(`${i}/${j}`) === -1 ? count = 0 : count++
      if (count === 5) return true
    }

    return false
  }
}
