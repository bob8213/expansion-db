
((global) => {
  let Utils = (() => {
    const sleep = (ms) => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    // Async loop at a fixed interval
    const coroutine = (f, _ms) => {
      let loop = false;
      let ms = _ms ? _ms : 100;
      let run = async () => {
        f();
        await sleep(ms);
        if (loop) run();
      };

      let stay = {
        start: () => {
          if (!loop) {
            loop = true;
            run();
          }
        },
        stop: () => loop = false,
        event: null,
      };

      return stay;
    };

    // Element that fits the whole application's frame.
    // Use case: cursor effect that is not tied to an element.
    const frame = (() => {
      let element = document.createElement("div");
      document.body.appendChild(element);
      element.id = "fullscreen";
      return element;
    })();

    return {
      sleep: sleep,
      coroutine: coroutine,
      frame: frame
    };
  })();

  global.Utils = Utils;
})( this );
