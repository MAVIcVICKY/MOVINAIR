const canvas = document.getElementById('shoe-canvas');
const context = canvas.getContext('2d');

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 192; // Total number of frames we processed
const currentFrame = index => (
    `images/nobg_frame_${index.toString().padStart(4, '0')}.png`
);

const images = [];
const imageObjects = [];

// Preload images
for (let i = 1; i <= frameCount; i++) {
    images.push(currentFrame(i));
}

let imagesLoaded = 0;
const preloadImages = () => {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = images[i];
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 1) {
                render(1); // Render first frame as soon as possible
            }
        };
        imageObjects.push(img);
    }
};

const shoe = {
    frame: 0
};

// Scroll animation logic
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;

    // Map scroll to frame index
    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex + 1));
});

function updateImage(index) {
    if (index < 1 || index > frameCount) return;
    render(index);
}

function render(index) {
    const img = imageObjects[index - 1];
    if (img && img.complete) {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image centered and scaled to cover (contain-like behavior for canvas)
        // Or simpler: just drawImage if aspect ratio matches or we want to fill
        // Given 1920x1080 frames, let's just draw

        // Calculate aspect ratio to maintain cover/contain if needed, 
        // but for now let's draw full canvas as the CSS handles the responsive size.
        context.drawImage(img, 0, 0);
    }
}

preloadImages();
