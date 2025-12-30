from PIL import Image
import numpy as np

# Load the problematic frame
frame_path = "extracted_frames/frame_0090.png"
img = Image.open(frame_path).convert("RGB")
data = np.array(img)

# Analyze corners (usually background)
corners = [
    data[0, 0],
    data[0, -1],
    data[-1, 0],
    data[-1, -1]
]

print("Corner pixel values (R, G, B):")
for c in corners:
    print(c)

# Analyze a central region (likely shoe)
center_y, center_x = data.shape[0] // 2, data.shape[1] // 2
center_pixel = data[center_y, center_x]
print(f"Center pixel value: {center_pixel}")

# Analyze distribution of "dark" pixels
# Flatten
flat_data = data.reshape(-1, 3)
# Calculate brightness (Luma)
luma = 0.299 * flat_data[:, 0] + 0.587 * flat_data[:, 1] + 0.114 * flat_data[:, 2]

print(f"Min Luma: {np.min(luma)}")
print(f"Max Luma: {np.max(luma)}")
print(f"Average Luma: {np.mean(luma)}")

# Check how many pixels are "pure black"
zeros = np.sum(np.all(flat_data < [5, 5, 5], axis=1))
print(f"Pixels nearly black (<5,5,5): {zeros} / {len(flat_data)} ({zeros/len(flat_data)*100:.1f}%)")
