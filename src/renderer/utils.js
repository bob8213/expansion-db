
((global) => {
  var Utils = (() => {
    const sleep = (ms) => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    // Async loop at a fixed interval
    const coroutine = (f) => {
      let loop = false;
      let run = async () => {
        f();
        await sleep(100);
        if (loop) run();
      };

      let stay = {
        start: () => {
          loop = true;
          run();
        },
        stop: () => loop = false,
        event: null,
      };

      return stay;
    };

    return {
      sleep: sleep,
      coroutine: coroutine
    };
  })();

  global.Utils = Utils;
})( this );
