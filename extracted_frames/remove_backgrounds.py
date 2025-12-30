import os
from pathlib import Path

print("Starting script...")
try:
    from rembg import remove
    from PIL import Image
    print("Imports successful")
except ImportError as e:
    print(f"Import failed: {e}")
    exit(1)

# Configuration
# Script is inside the frames directory
input_folder = "." 
output_folder = "transparent_frames"

# Create output directory
os.makedirs(output_folder, exist_ok=True)

print("=" * 60)
print("MOVINAIR BACKGROUND REMOVAL")
print("=" * 60)
print(f"Input: Current Directory ({os.getcwd()})")
print(f"Output: {output_folder}/")
print()

# Get all frame files
frame_files = sorted(Path(input_folder).glob("frame_*.png"))
total_frames = len(frame_files)

if total_frames == 0:
    print(f"❌ No frames found in current directory!")
    exit(1)

print(f"Found {total_frames} frames to process")
print("Starting background removal...")
print()

# Process each frame
for i, frame_path in enumerate(frame_files, 1):
    try:
        # Load image
        input_image = Image.open(str(frame_path))
        
        # Remove background
        output_image = remove(input_image)
        
        # Save result
        output_filename = f"nobg_{frame_path.name}"
        output_path = os.path.join(output_folder, output_filename)
        output_image.save(output_path)
        
        # Show progress
        if i % 5 == 0 or i == total_frames:
            progress = (i / total_frames) * 100
            print(f"Progress: {i}/{total_frames} frames ({progress:.1f}%) - Saved {output_filename}")
    
    except Exception as e:
        print(f"⚠ Error processing {frame_path.name}: {e}")
        continue

print()
print("=" * 60)
print(f"✓ COMPLETE! Processed {total_frames} frames")
print(f"✓ Frames saved to: {output_folder}/")
print("=" * 60)
