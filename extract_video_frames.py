# Video Frame Extraction and Processing for Smooth Website Scrolling
# This script extracts frames from a video, removes backgrounds, upscales them,
# and prepares them for smooth scrolling animations on websites

# ==== Installation Commands ====
# Run these in your environment:
# pip install opencv-python rembg pillow realesrgan onnxruntime

import cv2
import os
import io
import zipfile
from rembg import remove
from PIL import Image
from realesrgan import RealESRGAN

# ==== Configuration ====
# Set the video path (modify this to your video file)
video_path = "Generate_a_premium_1080p_202512291514.mp4"
output_folder = "extracted_frames"
processed_folder = "processed_upscaled"
zip_filename = "frames_processed.zip"

# Create output directories
os.makedirs(output_folder, exist_ok=True)
os.makedirs(processed_folder, exist_ok=True)

# ==== Step 1: Extract Frames from Video ====
print(f"Starting frame extraction from {video_path}...")
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error: Could not open video file {video_path}")
    exit(1)

count = 1
while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame_path = f"{output_folder}/{count}.png"
    cv2.imwrite(frame_path, frame)
    count += 1

cap.release()
total_frames = count - 1
print(f"✓ Extracted {total_frames} frames to '{output_folder}/' folder.")

# ==== Step 2: Initialize Upscaler ====
print("\nInitializing upscaler...")
try:
    device = "cuda" if cv2.cuda.getCudaEnabledDeviceCount() > 0 else "cpu"
    print(f"Using device: {device}")
    upscaler = RealESRGAN(device, scale=2)
    upscaler.load_weights("RealESRGAN_x2.pth")
    print("✓ Upscaler initialized successfully.")
except Exception as e:
    print(f"Warning: Could not initialize upscaler: {e}")
    print("Skipping upscaling step. Frames will be processed without upscaling.")
    upscaler = None

# ==== Step 3: Process Frames (Remove Background & Upscale) ====
print(f"\nProcessing {total_frames} frames...")
for i in range(1, count):
    frame_path = f"{output_folder}/{i}.png"
    
    print(f"Processing frame {i}/{total_frames}...", end='\r')
    
    try:
        # Remove background
        with open(frame_path, "rb") as inp:
            removed_bg = remove(inp.read())
        img_no_bg = Image.open(io.BytesIO(removed_bg))
        
        # Upscale (if available)
        if upscaler:
            img_upscaled = upscaler.predict(img_no_bg)
            out_path = f"{processed_folder}/{i}.png"
            img_upscaled.save(out_path)
        else:
            # Save without upscaling
            out_path = f"{processed_folder}/{i}.png"
            img_no_bg.save(out_path)
    except Exception as e:
        print(f"\nError processing frame {i}: {e}")
        continue

print(f"\n✓ Frames processed successfully! Output in '{processed_folder}/' folder.")

# ==== Step 4: Create ZIP File ====
print(f"\nCreating ZIP file '{zip_filename}'...")
with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zipf:
    for i in range(1, count):
        file_path = f"{processed_folder}/{i}.png"
        if os.path.exists(file_path):
            zipf.write(file_path, arcname=f"{i}.png")

print(f"✓ ZIP file '{zip_filename}' created successfully!")
print(f"\n=== Processing Complete ===")
print(f"Total frames extracted: {total_frames}")
print(f"Frames saved in: {processed_folder}/")
print(f"ZIP file: {zip_filename}")
