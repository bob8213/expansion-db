
((global) => {
  var Resize = (() => {
    const {coroutine} = global.Utils;
    const config = global.Config;
    const State = global.State;

    // Resize events
    let resizing = false;
    let resizedElement = null;

    const onResizableEnter = (element) => {
      element.style.cursor = "col-resize";
    };

    const onResizableExit = (element) => {
      element.style.cursor = null;
    };

    const onResizeBegin = (element) => {
      element.style.borderColor = "#185282";
    };

    const onResize = (element) => {
      //TODO
      console.log(`Resizing ${element.classList[1]}!`);
    };

    const onResizeEnd = (element) => {
      element.style.borderColor = "black";
    };

    // While mouse is on a resizable panel
    const onMouseStay = (split) => {
      let event = split.onmousestay.event;
      if(event == null) return;

      let width = split.offsetWidth;
      let x = event.offsetX;
      if(
        x >= width - config.splitBorderHandle &&
        x <= width + 1 + config.splitBorderHandle
      ){
        if (!resizing) onResizableEnter(split);
        if (!resizing && State.isMouseDown()) {
          resizing = true;
          resizedElement = split;
          onResizeBegin(split);
        }
      }else{
        if (!resizing) onResizableExit(split);
      }

      //This cannot work since it's in onMouseStay
      //TODO Resize coroutine
      if (resizing) {
        if (State.isMouseDown()) {
          onResize(resizedElement);
        }else{
          resizing = false;
          onResizableExit(split);
          onResizeEnd(split);
        }
      }
    };

    // Subscribe to mouse events for split panels
    (() => {
      let splits = Array.from(document.getElementsByClassName("split"));
      splits.forEach(split => {
        split.onmousestay = coroutine(() => onMouseStay(split));

        split.onmousemove = (event) => {
          split.onmousestay.event = event;
        };

        split.onmouseenter = () => {
          split.onmousestay.event = event;
          split.onmousestay.start();
        };

        split.onmouseleave = () => {
          split.onmousestay.stop();
        };
      });
    })();

    return {
      resizing: resizing
    };
  })();

  global.Resize = Resize;
})( this );
