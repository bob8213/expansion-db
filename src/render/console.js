
((global) => {
  let Console = (() => {
    const Config = global.Config;
    const {coroutine} = global.Utils;

    const _console = document.getElementsByClassName("console")[0];
    const content = document.getElementsByClassName("console-content")[0];

    let margin = 100;

    let target = 0;
    let position = 0;

    const smooth = coroutine(() => {
      let t = .15;
      position = (1 - t) * position + t * target;
      content.style.bottom = `${position}px`;

      if (target >= position - 1 && target <= position + 1) {
        smooth.stop();
      }
    }, 16);

    _console.onwheel = (event) => {
      let height = 0;
      _console.childNodes.forEach(child => {
        height += child.offsetHeight|0;
      });

      target += event.deltaY * Config.wheelSpeed;
      let maxH = height - margin;
      if (maxH < 0) maxH = 0;
      if (target > maxH) target = maxH;
      if (target < 0) target = 0;

      smooth.start();
    };

    return {
      content: () => content
    }
  })();

  global.Console = Console;
})(this);
