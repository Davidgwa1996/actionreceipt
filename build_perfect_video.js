import * as googleTTS from 'google-tts-api';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const STAGES = [
  {
    id: 1,
    start: 0,
    duration: 30,
    img: 'src/assets/images/msq_deals_page_1786294160392.jpg',
    text: 'Welcome to MarketSquare. When browsing high-value items online, like this XPhone Pro listed for six hundred and fifty pounds, notice the blue Verified with ActionReceipt badge. This badge confirms that the seller identity and account are pre-verified before you interact. Let us click View Listing to examine the item details.'
  },
  {
    id: 2,
    start: 30,
    duration: 30,
    img: 'src/assets/images/msq_product_detail_1786294184450.jpg',
    text: 'On the product detail page, ActionReceipt provides full transparency. You can inspect the verified seller profile, storage capacity, and item condition before sending any money. Everything is clearly documented up front. Now, let us click Verify Purchase to start the protected checkout process.'
  },
  {
    id: 3,
    start: 60,
    duration: 30,
    img: 'src/assets/images/msq_gemini_verifying_1786294207296.jpg',
    text: 'Behind the scenes, Gemini instantly executes a multi-point verification check. It verifies seller identity, matches bank payout records, confirms listing authenticity, reviews product evidence, checks GPS location consistency with location proof, and anchors proof on TruthChain. Notice the top right LocationProof GPS Verified badge, guaranteeing total protection.'
  },
  {
    id: 4,
    start: 90,
    duration: 30,
    img: 'src/assets/images/msq_verified_ready_1786294231657.jpg',
    text: 'Within moments, all security checkpoints pass successfully with full confidence. The purchase is now one hundred percent verified and cleared as safe. With total peace of mind, we can click Pay with ActionReceipt to proceed with the payment.'
  },
  {
    id: 5,
    start: 120,
    duration: 30,
    img: 'src/assets/images/msq_checkout_payment_1786294254625.jpg',
    text: 'You are now on the secure checkout screen. Because purchase verification and payment verification passed, your payment is processed and released instantly at checkout without any escrow holds or delay. Let us click Confirm Payment of six hundred and fifty pounds to complete the purchase.'
  },
  {
    id: 6,
    start: 150,
    duration: 30,
    img: 'src/assets/images/msq_payment_done_1786294277779.jpg',
    text: 'Payment confirmed and instantly released! The four pound fifty protection fee is split between Ops Revenue and Seller Rewards, while the net six hundred and forty-five pounds fifty pence is released instantly to the seller. Your order is officially placed and the pre-payment trust phase is complete. Thank you for choosing ActionReceipt.'
  }
];

async function generateStageAudio(stage) {
  console.log(`[AUDIO] Generating TTS for Stage ${stage.id}...`);
  const audioResults = await googleTTS.getAllAudioBase64(stage.text, {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000,
  });

  const partFiles = [];
  for (let i = 0; i < audioResults.length; i++) {
    const partPath = `/tmp/tts_stage_${stage.id}_part_${i}.mp3`;
    fs.writeFileSync(partPath, Buffer.from(audioResults[i].base64, 'base64'));
    partFiles.push(partPath);
  }

  // Concat parts into rawMp3Path
  const rawMp3Path = `/tmp/tts_stage_${stage.id}.mp3`;
  if (partFiles.length === 1) {
    fs.copyFileSync(partFiles[0], rawMp3Path);
  } else {
    const partList = partFiles.map(f => `file '${f}'`).join('\n');
    const partListPath = `/tmp/parts_stage_${stage.id}.txt`;
    fs.writeFileSync(partListPath, partList);
    execSync(`ffmpeg -y -f concat -safe 0 -i ${partListPath} -c copy ${rawMp3Path}`);
  }

  // Get raw TTS audio duration
  const durOutput = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${rawMp3Path}`).toString().trim();
  const ttsDur = parseFloat(durOutput);
  console.log(`[AUDIO] Stage ${stage.id} raw TTS duration: ${ttsDur.toFixed(2)}s`);

  // Create a 30s padded audio file for stage: clean voice speech with volume boost
  // pad with silence (apad=whole_dur=30) so total duration is exactly 30.0s
  const paddedWavPath = `/tmp/padded_stage_${stage.id}.wav`;
  const ffmpegCmd = `ffmpeg -y -i ${rawMp3Path} -filter_complex "[0:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,volume=1.8,apad=whole_dur=30,atrim=0:30[outa]" -map "[outa]" ${paddedWavPath}`;
  execSync(ffmpegCmd);
  console.log(`[AUDIO] Created padded 30s audio track for Stage ${stage.id}`);
  return paddedWavPath;
}

async function main() {
  console.log('=== STARTING HIGH QUALITY AUDIO/VIDEO GENERATION ===');
  
  const paddedWavFiles = [];
  for (const stage of STAGES) {
    const wav = await generateStageAudio(stage);
    paddedWavFiles.push(wav);
  }

  // Concatenate all 6 audio tracks into master 180s audio file
  const concatListPath = '/tmp/audio_concat.txt';
  const concatLines = paddedWavFiles.map(f => `file '${f}'`).join('\n');
  fs.writeFileSync(concatListPath, concatLines);

  const masterAudioPath = '/tmp/master_audio_180s.wav';
  execSync(`ffmpeg -y -f concat -safe 0 -i ${concatListPath} -c copy ${masterAudioPath}`);
  console.log('[AUDIO] Master 180s audio track generated successfully.');

  // Create video clips for each stage (1080p, 30fps, 30s each)
  const videoClips = [];
  for (const stage of STAGES) {
    const clipPath = `/tmp/video_clip_stage_${stage.id}.mp4`;
    // Scale image to 1920x1080 with high quality and ultrafast encoding
    const cmd = `ffmpeg -y -loop 1 -i ${stage.img} -c:v libx264 -preset ultrafast -tune stillimage -t 30 -pix_fmt yuv420p -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black" -r 30 -b:v 3000k ${clipPath}`;
    execSync(cmd);
    videoClips.push(clipPath);
    console.log(`[VIDEO] Created 1080p 30s video clip for Stage ${stage.id}`);
  }

  // Concatenate video clips
  const vConcatListPath = '/tmp/video_concat.txt';
  const vConcatLines = videoClips.map(f => `file '${f}'`).join('\n');
  fs.writeFileSync(vConcatListPath, vConcatLines);

  const masterVideoPath = '/tmp/master_video_180s.mp4';
  execSync(`ffmpeg -y -f concat -safe 0 -i ${vConcatListPath} -c copy ${masterVideoPath}`);
  console.log('[VIDEO] Master 180s video track concatenated successfully.');

  // Mux video and master audio instantly using copy codec for video
  const finalMp4Path = '/tmp/ActionReceipt_3Min_Demo_Video_1080p.mp4';
  execSync(`ffmpeg -y -i ${masterVideoPath} -i ${masterAudioPath} -c:v copy -c:a aac -b:a 192k -movflags +faststart ${finalMp4Path}`);

  const stat = fs.statSync(finalMp4Path);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
  console.log(`=== SUCCESS! Final video created at ${finalMp4Path} (Size: ${sizeMB} MB) ===`);

  // Copy to public and dist directories
  const targets = [
    'public/ActionReceipt_3Min_Demo_Video_1080p.mp4',
    'public/actionreceipt_3min_demo.mp4',
    'dist/ActionReceipt_3Min_Demo_Video_1080p.mp4',
    'dist/actionreceipt_3min_demo.mp4'
  ];

  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(finalMp4Path, target);
    console.log(`[COPIED] -> ${target}`);
  }
}

main().catch(err => {
  console.error('Fatal error building video:', err);
  process.exit(1);
});
