import { _swipe, _swipeOnPercentage, _calculateXY } from './internal/_swipe';
import getPlatform from './platform';

/**
 * The values in the below object are percentages of the screen
 */
const SWIPE_DIRECTION = {
  down: {
    start: { x: 50, y: 15 },
    end: { x: 50, y: 85 }
  },
  left: {
    start: { x: 95, y: 50 },
    end: { x: 5, y: 50 }
  },
  right: {
    start: { x: 5, y: 50 },
    end: { x: 95, y: 50 }
  },
  up: {
    start: { x: 50, y: 85 },
    end: { x: 50, y: 15 }
  }
};

/**
 * Swipe
 * @param  {Object}    options
 * @param  {Function}  cb
 * @return {undefined}
 */
export default function swipe(options, cb) {
  if (options.from || options.to) {
    _swipe(options);
  } else {
    const platform = getPlatform();

    if (platform === 'ios') {
      driver.execute('mobile:swipe', options);
    } else {
      _swipe(options);
    }
  }

  if (typeof cb === 'function') {
    cb();
  }
}

export function swipeOnElementToLeft(element) {
  const location = element.getLocation();
  const { width } = driver.getWindowRect();
  const options = {
    from: {
      x: width - location.x - 10,
      y: location.y
    },
    to: {
      x: (width - location.x) / 2,
      y: location.y
    }
  };
  _swipe(options);
}

export function swipeSlider(element, from, to) {
  const location = element.getLocation();
  const width = element.getSize('width');
  const height = element.getSize('height');

  const options = {
    from: {
      x: location.x + width * from,
      y: location.y + height / 2
    },
    to: {
      x: location.x + width * to,
      y: location.y + height / 2
    }
  };
  _swipe(options);
}

export function swipeUp(percentage = 1) {
  _swipeOnPercentage(
    _calculateXY(SWIPE_DIRECTION.up.start, percentage),
    _calculateXY(SWIPE_DIRECTION.up.end, percentage)
  );
}

export function swipeDown(percentage = 1) {
  _swipeOnPercentage(
    _calculateXY(SWIPE_DIRECTION.down.start, percentage),
    _calculateXY(SWIPE_DIRECTION.down.end, percentage)
  );
}

export function swipeLeft(percentage = 1) {
  _swipeOnPercentage(
    _calculateXY(SWIPE_DIRECTION.left.start, percentage),
    _calculateXY(SWIPE_DIRECTION.left.end, percentage)
  );
}

export function swipeRight(percentage = 1) {
  _swipeOnPercentage(
    _calculateXY(SWIPE_DIRECTION.right.start, percentage),
    _calculateXY(SWIPE_DIRECTION.right.end, percentage)
  );
}

// scroolOnElement: Element is scrolled on
// DestinationElement: Scroll will be stopped if this element is found
export function swipeLeftOnElementToFindElement(
  scrollOnElement,
  toFindElement,
  maxScrolls,
  amount = 0
) {
  if (
    (!toFindElement.isExisting() || !toFindElement.isDisplayed()) &&
    amount <= maxScrolls
  ) {
    swipeOnElementToLeft(scrollOnElement);
    swipeLeftOnElementToFindElement(
      scrollOnElement,
      toFindElement,
      maxScrolls,
      amount + 1
    );
  } else if (amount > maxScrolls) {
    throw new Error(
      `The element '${toFindElement}' could not be found or is not visible.`
    );
  }
}
