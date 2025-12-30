# Simple Video Frame Extraction Script
# Extracts frames from video without background removal or upscaling

import cv2
import os

# Configuration
video_path = "Generate_a_premium_1080p_202512291514.mp4"
output_folder = "extracted_frames"

# Create output directory
os.makedirs(output_folder, exist_ok=True)

print(f"Starting frame extraction from {video_path}...")
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error: Could not open video file {video_path}")
    exit(1)

# Get video properties
fps = int(cap.get(cv2.CAP_PROP_FPS))
total_frames_in_video = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Video FPS: {fps}")
print(f"Total frames in video: {total_frames_in_video}")

count = 1
while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame_path = f"{output_folder}/frame_{count:04d}.png"
    cv2.imwrite(frame_path, frame)
    
    if count % 10 == 0:
        print(f"Extracted {count} frames...", end='\r')
    count += 1

cap.release()
total_frames = count - 1

print(f"\n✓ Extraction complete!")
print(f"Total frames extracted: {total_frames}")
print(f"Frames saved in: {output_folder}/")
