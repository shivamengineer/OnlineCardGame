addEventListener('mousedown', (event) => {
    if(!players[socket.id]) return;

    console.log("x: " + event.clientX);
    console.log("y: " + event.clientY);
});
