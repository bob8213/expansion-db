
((global) => {
  var State = (() => {
    let mouseDown = false;
    document.body.onmousedown = () => mouseDown = true;
    document.body.onmouseup = () => mouseDown = false;

    return {
      isMouseDown: () => mouseDown
    };
  })();

  global.State = State;
})( this );
