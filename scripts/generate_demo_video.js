import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import * as googleTTS from 'google-tts-api';

const SCENES = [
  {
    id: 1,
    code: '01_MarketSquare_Discovery',
    title: 'Marketplace Listing Discovery & Verified Badge',
    badgeText: 'VERIFIED LISTING DISCOVERY',
    image: 'src/assets/images/msq_deals_page_1786294160392.jpg',
    text: 'Welcome to MarketSquare. When browsing high-value items online, like this XPhone Pro listed for six hundred and fifty pounds, notice the blue Verified with ActionReceipt badge. This badge confirms that the seller identity and account are pre-verified before you interact. Let us click View Listing to examine the item details.'
  },
  {
    id: 2,
    code: '02_Listing_Details',
    title: 'Seller Trust & Product Inspection',
    badgeText: 'ACTIONRECEIPT VERIFIED SELLER',
    image: 'src/assets/images/msq_product_detail_1786294184450.jpg',
    text: 'On the product detail page, ActionReceipt provides full transparency. You can inspect the verified seller profile, storage capacity, and item condition before sending any money. Everything is clearly documented up front. Now, let us click Verify Purchase to start the protected checkout process.'
  },
  {
    id: 3,
    code: '03_Gemini_Verification',
    title: 'Gemini Real-Time Verification & GPS LocationProof',
    badgeText: 'GEMINI VERIFICATION WITH GPS LOCATIONPROOF',
    image: 'src/assets/images/msq_gemini_verifying_1786294207296.jpg',
    text: 'Behind the scenes, Gemini instantly executes a multi-point verification check. It verifies seller identity, matches bank payout records, confirms listing authenticity, reviews product evidence, checks GPS location consistency with LocationProof, and anchors proof on TruthChain. Notice the top-right LocationProof GPS Verified badge, guaranteeing total protection against fake locations and stolen listing scams.'
  },
  {
    id: 4,
    code: '04_Purchase_Verified',
    title: 'Security Clearance & Ready for Payment',
    badgeText: '100% VERIFIED & SECURE',
    image: 'src/assets/images/msq_verified_ready_1786294231657.jpg',
    text: 'Within moments, all security checkpoints pass successfully with full confidence. The purchase is now one hundred percent verified and cleared as safe. With total peace of mind, we can click Pay With ActionReceipt to proceed with the payment.'
  },
  {
    id: 5,
    code: '05_Instant_Payment_Checkout',
    title: 'Instant Verified Payment Checkout',
    badgeText: 'INSTANT VERIFIED CHECKOUT',
    image: 'src/assets/images/msq_checkout_payment_1786294254625.jpg',
    text: 'You are now on the secure checkout screen. Because purchase verification and payment verification passed, your payment is processed and released instantly at checkout without any escrow holds or delay. Let us click Confirm Payment of six hundred and fifty pounds to complete the purchase.'
  },
  {
    id: 6,
    code: '06_Instant_Release_Delivery_Placed',
    title: 'Instant Release & Verified Delivery Placed',
    badgeText: 'INSTANT RELEASE & DELIVERY PLACED',
    image: 'src/assets/images/msq_payment_done_1786294277779.jpg',
    text: 'Payment confirmed and instantly released! The zero point three five pound platform fee routes directly to Ops Treasury while the net six hundred and forty-nine pounds sixty-five pence is released instantly to the seller. Verified order delivery is immediately placed and dispatched with zero payment holds. Thank you for choosing ActionReceipt.'
  }
];

async function generateDemoVideo() {
  console.log('🚀 Starting Standard Compliant 1080p Demo Video Generation...');

  const tempDir = path.join(process.cwd(), 'temp_video_build');
  const publicDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  // 1. Generate Google TTS audio for each scene
  console.log('🎙️ Generating Voice Narration Audio...');
  const audioList = [];

  for (const scene of SCENES) {
    const rawAudioPath = path.join(tempDir, `tts_scene_${scene.id}_raw.mp3`);
    const paddedAudioPath = path.join(tempDir, `tts_scene_${scene.id}_30s.mp3`);

    const audioResults = googleTTS.getAllAudioUrls(scene.text, {
      lang: 'en',
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    });

    const chunkPaths = [];
    for (let c = 0; c < audioResults.length; c++) {
      const chunkUrl = audioResults[c].url;
      const res = await fetch(chunkUrl);
      const buffer = Buffer.from(await res.arrayBuffer());
      const chunkPath = path.join(tempDir, `scene_${scene.id}_chunk_${c}.mp3`);
      fs.writeFileSync(chunkPath, buffer);
      chunkPaths.push(chunkPath);
    }

    if (chunkPaths.length === 1) {
      fs.copyFileSync(chunkPaths[0], rawAudioPath);
    } else {
      const chunkListFile = path.join(tempDir, `scene_${scene.id}_chunks.txt`);
      fs.writeFileSync(chunkListFile, chunkPaths.map(p => `file '${p}'`).join('\n'));
      execSync(`ffmpeg -y -f concat -safe 0 -i "${chunkListFile}" -c copy "${rawAudioPath}"`, { stdio: 'inherit' });
    }

    // Pad audio to exactly 30 seconds with 44.1kHz stereo standard
    execSync(`ffmpeg -y -i "${rawAudioPath}" -af "apad=whole_dur=30" -ar 44100 -ac 2 -t 30 "${paddedAudioPath}"`, { stdio: 'inherit' });
    audioList.push(paddedAudioPath);
  }

  // Concatenate audio tracks into 180s master narration
  console.log('🎵 Combining Narration Audio Tracks into Master Track...');
  const concatAudioListPath = path.join(tempDir, 'concat_audio.txt');
  fs.writeFileSync(concatAudioListPath, audioList.map(p => `file '${p}'`).join('\n'));

  const masterAudioPath = path.join(tempDir, 'master_narration.mp3');
  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatAudioListPath}" -c copy "${masterAudioPath}"`, { stdio: 'inherit' });

  // 2. Generate pristine 1080p video clips for each 30s scene with setsar=1 (1:1 Square Pixels)
  console.log('🎨 Generating Pristine 1080p 30fps Video Scenes with Standard 1:1 Pixel Aspect Ratio...');
  const videoList = [];

  for (let i = 0; i < SCENES.length; i++) {
    const scene = SCENES[i];
    const rawImgPath = path.resolve(scene.image);
    const sceneVideoPath = path.join(tempDir, `scene_${scene.id}.mp4`);

    // setsar=1 forces 1:1 square pixel aspect ratio so Windows Media Player and QuickTime decode perfectly!
    const filterComplex = [
      `scale=1920:1080:force_original_aspect_ratio=decrease`,
      `pad=1920:1080:(1920-iw)/2:(1080-ih)/2:color=0x020617`,
      `setsar=1`,
      `drawbox=x=0:y=0:w=1920:h=12:color=0x10b981@0.9:t=fill`,
      `drawbox=x=40:y=30:w=640:h=50:color=0x020617@0.85:t=fill`,
      `drawtext=text='STAGE 0${scene.id}\\: ${scene.code}':x=60:y=46:fontsize=22:fontcolor=0x10b981`,
      `drawbox=x=1200:y=30:w=680:h=50:color=0x020617@0.85:t=fill`,
      `drawtext=text='${scene.badgeText}':x=1220:y=46:fontsize=20:fontcolor=0x34d399`,
      `drawbox=x=0:y=1020:w=1920:h=60:color=0x020617@0.9:t=fill`,
      `drawtext=text='ACTIONRECEIPT 3-MIN DEMO • STAGE 0${scene.id} OF 06':x=40:y=1038:fontsize=20:fontcolor=0xffffff`
    ].join(',');

    execSync(
      `ffmpeg -y -loop 1 -i "${rawImgPath}" -vf "${filterComplex}" -c:v libx264 -preset fast -profile:v main -level 4.0 -pix_fmt yuv420p -t 30 -r 30 "${sceneVideoPath}"`,
      { stdio: 'inherit' }
    );

    videoList.push(sceneVideoPath);
  }

  // Concatenate 6 video scenes
  console.log('🎞️ Concatenating 6 Video Scenes into Master 180s Video...');
  const concatVideoListPath = path.join(tempDir, 'concat_video.txt');
  fs.writeFileSync(concatVideoListPath, videoList.map(p => `file '${p}'`).join('\n'));

  const silentVideoPath = path.join(tempDir, 'silent_master_180s.mp4');
  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatVideoListPath}" -c copy "${silentVideoPath}"`, { stdio: 'inherit' });

  // 3. Mux 1080p Video + Audio into fully compliant MP4 and WebM files with +faststart
  console.log('📦 Muxing Final Pristine 1080p MP4 with High-Bitrate AAC and +faststart...');

  const finalMp4Path = path.join(publicDir, 'ActionReceipt_3Min_Demo_Video_1080p.mp4');
  const finalWebmPath = path.join(publicDir, 'ActionReceipt_3Min_Demo_Video_1080p.webm');

  // Generate Ultra-Compatible MP4 (H.264 High/Main + High-Bitrate AAC 256k + movflags +faststart)
  execSync(
    `ffmpeg -y -i "${silentVideoPath}" -i "${masterAudioPath}" -c:v libx264 -preset medium -crf 18 -b:v 3.5M -pix_fmt yuv420p -c:a aac -ar 44100 -ac 2 -b:a 256k -movflags +faststart -shortest "${finalMp4Path}"`,
    { stdio: 'inherit' }
  );

  // Generate WebM (VP9 + Opus with high quality)
  execSync(
    `ffmpeg -y -i "${silentVideoPath}" -i "${masterAudioPath}" -c:v libvpx-vp9 -b:v 3M -c:a libopus -b:a 192k -shortest "${finalWebmPath}"`,
    { stdio: 'inherit' }
  );

  console.log('✅ Demo Video Generation Completed Successfully!');
  console.log(`📁 MP4 Output: ${finalMp4Path}`);
  console.log(`📁 WEBM Output: ${finalWebmPath}`);

  // Cleanup temp files
  fs.rmSync(tempDir, { recursive: true, force: true });
}

generateDemoVideo().catch(err => {
  console.error('❌ Error generating demo video:', err);
  process.exit(1);
});
