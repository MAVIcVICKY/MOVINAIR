# Remove background from a single frame to test
from rembg import remove
from PIL import Image
import os

# Configuration
input_folder = "extracted_frames"
output_folder = "background_removed"
os.makedirs(output_folder, exist_ok=True)

# Test with frame 1 (first frame)
test_frame = "frame_0001.png"
input_path = f"{input_folder}/{test_frame}"
output_path = f"{output_folder}/nobg_{test_frame}"

print(f"Processing single test frame: {test_frame}")
print("This may take a moment while loading the AI model...")

# Load and process
input_image = Image.open(input_path)
print(f"✓ Loaded image: {input_image.size}")

print("Removing background...")
output_image = remove(input_image)

# Save result
output_image.save(output_path)
print(f"✓ Saved to: {output_path}")
print("\nDone! Check the background_removed folder for the result.")
