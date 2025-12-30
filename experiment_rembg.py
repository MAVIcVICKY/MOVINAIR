from rembg import remove, new_session
from PIL import Image, ImageOps
import os

# Setup
frame_num = "0090" # Side view frame (approx)
input_path = f"extracted_frames/frame_{frame_num}.png"
if not os.path.exists(input_path):
    # Fallback if 0090 doesn't exist, try finding one
    files = list(Path("extracted_frames").glob("frame_*.png"))
    if files:
        input_path = str(files[len(files)//2])

print(f"Testing on {input_path}")

input_img = Image.open(input_path)


# Gamma correction function
def adjust_gamma(image, gamma=1.0):
    invGamma = 1.0 / gamma
    table = [((i / 255.0) ** invGamma) * 255 for i in range(256)] * 3
    if image.mode == 'L':
        table = table[:256]
    return image.point(table)

# Models/Settings to test
# Format: (Model Name, Use Alpha, Gamma Value)
test_cases = [
    ("isnet-general-use", False, 1.0), # Control (Current best)
    ("isnet-general-use", False, 1.5), # Slight brightening
    ("isnet-general-use", False, 2.0), # Strong brightening
    ("isnet-general-use", False, 3.0), # Very strong brightening
]

start_y = 0

for model_name, use_alpha, gamma in test_cases:
    print(f"Processing: {model_name}, Alpha={use_alpha}, Gamma={gamma}")
    
    # Pre-process
    if gamma != 1.0:
        processed_input = adjust_gamma(input_img, gamma)
        # Verify it looks brighter (save a debug of input)
        processed_input.save(f"debug_frames/input_gamma_{gamma}.png")
    else:
        processed_input = input_img
    
    session = new_session(model_name)
    
    # Process
    try:
        out = remove(processed_input, session=session)
        
        # Save transparent version
        tag = f"g{gamma}"
        out_path = f"debug_frames/{model_name}_{tag}.png"
        out.save(out_path)
        
        # Composite on WHITE background
        white_bg = Image.new("RGBA", out.size, "WHITE")
        comp = Image.alpha_composite(white_bg, out)
        comp_path = f"debug_frames/{model_name}_{tag}_composited.png"
        comp.save(comp_path)
        
        print(f"Saved {out_path}")
        
    except Exception as e:
        print(f"Error: {e}")

print("Done.")
