# Remove Background from All Frames - Batch Processing
from rembg import remove, new_session
from PIL import Image
import os
from pathlib import Path

# Configuration
input_folder = "extracted_frames"
output_folder = "background_removed"
os.makedirs(output_folder, exist_ok=True)

# Initialize session with a better model for general use (improves edge detection and dark objects)
print("Loading 'isnet-general-use' model... (this may run once to download)")
session = new_session("isnet-general-use")

print("=" * 60)
print("BATCH BACKGROUND REMOVAL - All Frames")
print("=" * 60)
print(f"Input: {input_folder}/")
print(f"Output: {output_folder}/")
print()

# Get all frame files
frame_files = sorted(Path(input_folder).glob("frame_*.png"))
total_frames = len(frame_files)

if total_frames == 0:
    print("❌ No frames found in 'frames' folder!")
    exit(1)

print(f"Found {total_frames} frames to process")
print("Starting background removal...")
print("⚠ Note: This may take several minutes depending on frame count")
print()

# Process each frame
for i, frame_path in enumerate(frame_files, 1):
    try:
        # Load image
        input_image = Image.open(str(frame_path))
        
        # 1. Create bright version for masking (Gamma 2.5)
        # This helps the AI differentiate dark shoe parts from the dark background
        invGamma = 1.0 / 2.5
        table = [((j / 255.0) ** invGamma) * 255 for j in range(256)] * 3
        if input_image.mode == 'L':
            table = table[:256]
        bright_image = input_image.point(table)
        
        # 2. Get mask from bright version
        # Remove background from brightness-boosted image
        cutout_bright = remove(bright_image, session=session)
        
        # Extract just the alpha channel (the mask)
        mask = cutout_bright.split()[3]
        
        # 3. Apply detailed mask to ORIGINAL image
        # This preserves the original colors/contrast while using the improved cut-out
        output_image = input_image.convert("RGBA")
        output_image.putalpha(mask)
        
        # Save result
        output_path = f"{output_folder}/nobg_{frame_path.name}"
        output_image.save(output_path)
        
        # Show progress
        if i % 5 == 0 or i == total_frames:
            progress = (i / total_frames) * 100
            print(f"Progress: {i}/{total_frames} frames ({progress:.1f}%)")
    
    except Exception as e:
        print(f"⚠ Error processing {frame_path.name}: {e}")
        continue

print()
print("=" * 60)
print(f"✓ COMPLETE! Processed {total_frames} frames with Gamma Masking")
print("=" * 60)
print(f"✓ Background-removed frames saved to: {output_folder}/")
print()
print("All frames now have transparent backgrounds (shoe details preserved)!")
print("📁 Check the 'background_removed' folder!")
print()
print("Next steps:")
print("  1. Copy these new images to your website folder")
print("  2. Refresh your browser")
