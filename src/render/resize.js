
((global) => {
  let Resize = (() => {
    const {frame} = global.Utils;
    const Config = global.Config;
    const State = global.State;

    // Resize events
    let resizing = false;
    let resizable = false;
    let selectedSplit;

    const onResizableEnter = (element) => {
      resizable = true;
      element.style.cursor = "col-resize";
    };

    const onResizableExit = (element) => {
      resizable = false;
      element.style.cursor = null;
    };

    const onResizeBegin = (element) => {
      resizing = true;
      element.style.borderColor = "#185282";

      // Show frame and set cursor, it also cancels any
      // click event that could fire on mouse up.
      frame.style.zIndex = 10;
      frame.style.cursor = "col-resize";

      selectedSplit = element;
    };

    const onResizeEnd = (element) => {
      resizing = false;

      element.style.borderColor = "black";
      frame.style.zIndex = -10;
      frame.style.cursor = null;
    };

    // Splits setup
    (() => {
      let splits = Array.from(document.getElementsByClassName("split"));

      // Subscribe to mouse events for split panels
      splits.forEach(split => {
        split.onmousemove = (event) => {
          let w = split.offsetWidth;
          let handle = Config.splitBorderHandle;
          let x = event.offsetX;
          if(x >= w - handle && x <= w + 1 + handle){
            if (!resizable) onResizableEnter(split);
          }else{
            if (resizable) onResizableExit(split);
          }
        };

        split.onmousedown = () => {
          if (!resizing && resizable) {
            onResizeBegin(split);
          }
        };
      });

      frame.onmousemove = () => {
        if (State.isMouseDown()) {
          //TODO actual resizing :)
          console.log("resize");
        }else{
          onResizeEnd(selectedSplit);
        };
      };

      frame.onmouseup = () => {
        onResizeEnd(selectedSplit);
      };

      // Remove borders on the splits that have children
      splits.forEach(split => {
        split.childNodes.forEach(child => {
          let classes = child.classList;
          if (classes && classes.contains("split")) {
            split.style.border = "none";
            return;
          }
        });
      });
    })();

    return {
      resizing: resizing
    };
  })();

  global.Resize = Resize;
})( this );
