export function _swipe({ from, to }) {
  driver.touchPerform([
    {
      action: 'press',
      options: from
    },
    {
      action: 'wait',
      options: { ms: 500 }
    },
    {
      action: 'moveTo',
      options: to
    },
    {
      action: 'release'
    }
  ]);

  driver.pause(500);
}

export function _getDeviceScreenCoordinates(coordinates) {
  const { width, height } = driver.getWindowRect();

  return {
    x: Math.round(width * (coordinates.x / 100)),
    y: Math.round(height * (coordinates.y / 100))
  };
}

export function _swipeOnPercentage(from, to) {
  _swipe({
    from: _getDeviceScreenCoordinates(from),
    to: _getDeviceScreenCoordinates(to)
  });
}

export function _calculateXY({ x, y }, percentage) {
  return {
    x: x * percentage,
    y: y * percentage
  };
}
