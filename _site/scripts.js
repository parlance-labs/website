let cube = document.querySelector('.cube');

let startX = 0;
let startY = 0;
let x = 0;
let y = 0;
let dragging = false;
let autoRotateSpeedX = Math.random() * 0.2 - 0.1;  // Reduced speed range for vertical rotation
let autoRotateSpeedY = Math.random() * 0.8 - 0.4;  // Increased speed range for horizontal rotation

function animate() {
    if (!dragging) {
        x += autoRotateSpeedX;
        y += autoRotateSpeedY;
        cube.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    }
    requestAnimationFrame(animate);
}

cube.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;

document.addEventListener('mousedown', (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    let deltaX = e.clientX - startX;
    let deltaY = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;
    x += deltaX * 0.5;
    y -= deltaY * 0.5;
    cube.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
}

function onMouseUp() {
    dragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

animate();
