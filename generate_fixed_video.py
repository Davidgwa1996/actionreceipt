import os
import subprocess

scenes = [
    ("src/assets/images/msq_deals_page_1786294160392.jpg", "voice_0.mp3", 30),
    ("src/assets/images/msq_product_detail_1786294184450.jpg", "voice_1.mp3", 30),
    ("src/assets/images/msq_gemini_verifying_1786294207296.jpg", "voice_2.mp3", 30),
    ("src/assets/images/msq_verified_ready_1786294231657.jpg", "voice_3.mp3", 30),
    ("src/assets/images/msq_checkout_payment_1786294254625.jpg", "voice_4.mp3", 30),
    ("src/assets/images/msq_payment_done_1786294277779.jpg", "voice_5.mp3", 30),
]

cmd = ["ffmpeg", "-y"]
filter_complex = ""

# Inputs
for i, (img, voice, _) in enumerate(scenes):
    cmd.extend(["-loop", "1", "-framerate", "30", "-t", "30", "-i", img])
    cmd.extend(["-i", voice])

# Filters
for i in range(len(scenes)):
    v_idx = i * 2
    a_idx = i * 2 + 1
    # Scale, pad, and format video
    filter_complex += f"[{v_idx}:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black,setsar=1,format=yuv420p,fps=30[v{i}]; "
    # Pad and trim audio to exactly 30 seconds
    filter_complex += f"[{a_idx}:a]aresample=44100,apad,atrim=0:30[a{i}]; "

# Concat
concat_str = "".join([f"[v{i}][a{i}]" for i in range(len(scenes))])
filter_complex += f"{concat_str}concat=n={len(scenes)}:v=1:a=1[vout][aout]"

cmd.extend(["-filter_complex", filter_complex])
cmd.extend(["-map", "[vout]", "-map", "[aout]"])
cmd.extend([
    "-c:v", "libx264", 
    "-profile:v", "main", 
    "-pix_fmt", "yuv420p",
    "-b:v", "250k", 
    "-maxrate", "300k", 
    "-bufsize", "600k",
    "-c:a", "aac", 
    "-b:a", "128k", 
    "-ar", "44100",
    "-movflags", "+faststart",
    "public/ActionReceipt_3Min_Demo_Video_1080p.mp4"
])

print("Running ffmpeg...")
subprocess.run(cmd, check=True)
print("Done!")
