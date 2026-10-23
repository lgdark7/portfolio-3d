import { SpatialStation, WebProject, ArtPiece, SkillCategory, ThoughtArticle } from '../types/portfolio';

export const BENHIN_PROFILE = {
  name: 'Benhin',
  handle: '@Benhin3025',
  githubUsername: 'lgdark7',
  githubUrl: 'https://github.com/lgdark7',
  discordUrl: 'https://discord.gg/AWAe8gS7yq',
  gunslolUrl: 'https://guns.lol/lg_dark',
  title: 'Native Android Systems & Multimedia Architect',
  shortTitle: 'Systems & Multimedia Architect',
  quote: 'Never play it safe.. There is nothing in my heart except cold logic, pure execution, and relentless engineering.',
  avatarBio: 'Kali Linux user, low-level Android media architect, and author of Fairy Live and Fairy Music. Obsessed with sub-millisecond audio buffers, zero-bloat Kotlin, and pure RTMP protocol sockets.',
  location: 'Studio Workstation • Kali Linux Environment',
  stats: [
    { label: 'Active Projects', value: '4+' },
    { label: 'Fairy Live Footprint', value: '<15 MB' },
    { label: 'Fairy Music FPS', value: '120 FPS' },
    { label: 'Encoding', value: 'MediaCodec' }
  ]
};

export const SPATIAL_STATIONS: SpatialStation[] = [
  {
    id: 'hub',
    index: 0,
    label: 'Studio Command',
    tagline: 'Benhin (@lgdark7) • Systems & Multimedia Architect',
    badge: '00',
    hotspotLabel: 'Open Profile Command Center',
    color: '#0ea5e9' // Kali sky blue
  },
  {
    id: 'web',
    index: 1,
    label: 'Systems & Repos',
    tagline: 'Fairy Live, Fairy Music & High-Throughput Engines',
    badge: '01',
    hotspotLabel: 'Inspect Workstation Monitor',
    color: '#118AB2'
  },
  {
    id: 'art',
    index: 2,
    label: 'Protocol Lab',
    tagline: 'RTMP / FLV Socket Optics, DSP & Packet Schematics',
    badge: '02',
    hotspotLabel: 'View Architecture Gallery',
    color: '#06D6A0'
  },
  {
    id: 'about',
    index: 3,
    label: 'Technical Arsenal',
    tagline: 'Filing Cabinet: Kotlin, NDK, MediaCodec & Kali Linux',
    badge: '03',
    hotspotLabel: 'Slide Open Filing Drawers',
    color: '#FFD166'
  },
  {
    id: 'thoughts',
    index: 4,
    label: 'Engineering Log',
    tagline: 'Deep Dives on MediaCodec, DSP Ducking & Zero-Bloat',
    badge: '04',
    hotspotLabel: 'Read Chalkboard Case Studies',
    color: '#8b5cf6'
  },
  {
    id: 'archive',
    index: 5,
    label: 'Connect & Terminal',
    tagline: 'Discord Community, Guns.lol, OTA Releases & Guestbook',
    badge: '05',
    hotspotLabel: 'Access Connect Terminal',
    color: '#E45C4C'
  }
];

export const WEB_PROJECTS: WebProject[] = [
  {
    id: 'fairy-live',
    title: 'FAIRY LIVE',
    category: 'android',
    description: 'Zero-bloat native Android live streaming engine engineered under a strict <15MB APK constraint. Pure-Kotlin RTMP socket engine, MediaProjection & Camera2 pipelines, hardware MediaCodec H.264/AAC encoding, and broadcast-grade audio DSP.',
    impact: 'Ultra-low latency RTMP broadcasting to Twitch, YouTube, and custom RTMP ingest servers with zero third-party framework bloat.',
    tags: ['Kotlin', 'MediaCodec', 'RTMP / FLV Sockets', 'Camera2', 'MediaProjection', 'Audio DSP'],
    demoUrl: 'https://github.com/lgdark7/FairyLive',
    githubUrl: 'https://github.com/lgdark7/FairyLive',
    featured: true,
    accentColor: '#ef4444',
    stats: '< 15MB APK • Sub-100ms Latency',
    previewType: 'interactive'
  },
  {
    id: 'fairy-music',
    title: 'FAIRY MUSIC',
    category: 'multimedia',
    description: 'Open-source, Material Design Android music streaming application. Features real-time synchronized "Play Together" host-client playback, buttery-smooth 120 FPS UI, Apple Music Canvas animated visuals, and multi-source synchronized lyrics and metadata.',
    impact: 'v1.0.8 Live with high-fidelity Media3 / ExoPlayer pipeline, zero-lag playlist virtualization, and decentralized InnerTube integration.',
    tags: ['Kotlin', 'Jetpack Compose', 'ExoPlayer', 'Media3', 'Material 3', 'GPL v3'],
    demoUrl: 'https://github.com/lgdark7/FAIRY-MUSIC',
    githubUrl: 'https://github.com/lgdark7/FAIRY-MUSIC',
    featured: true,
    accentColor: '#38bdf8',
    stats: 'v1.0.8 Live • 120 FPS Fluidity',
    previewType: 'interactive'
  },
  {
    id: 'fairylive-releases',
    title: 'FairyLive OTA Distribution Pipeline',
    category: 'protocols',
    description: 'Public distribution channel, automated version manifests, and decentralized over-the-air update delivery engine for Fairy Live APK releases.',
    impact: 'Automated release packaging, SHA256 integrity verification, and instant OTA patch delivery.',
    tags: ['JSON Manifests', 'OTA Architecture', 'Release Automation', 'GitOps'],
    demoUrl: 'https://github.com/lgdark7/fairylive-releases',
    githubUrl: 'https://github.com/lgdark7/fairylive-releases',
    featured: true,
    accentColor: '#a855f7',
    stats: 'Automated Manifest Delivery',
    previewType: 'terminal'
  },
  {
    id: 'studio-dsp-ducking',
    title: 'Broadcast Audio DSP & Ducking Core',
    category: 'multimedia',
    description: 'Custom native Android AudioRecord processing engine featuring voice-priority DSP, dynamic under-speech fan noise subtraction, sidechain auto-ducking, and adaptive microphone lifecycle locks.',
    impact: 'Crystal-clear speech capture during live mobile gaming streams without background noise.',
    tags: ['AudioRecord', 'DSP Filters', 'Sidechain Ducking', 'Noise Suppression'],
    demoUrl: 'https://github.com/lgdark7/FairyLive',
    githubUrl: 'https://github.com/lgdark7/FairyLive',
    featured: false,
    accentColor: '#06D6A0',
    stats: 'Voice-Priority Sub-10ms Gate',
    previewType: 'code'
  },
  {
    id: 'kali-protocol-optics',
    title: 'Kali Protocol Reverse Engineering & Optics',
    category: 'protocols',
    description: 'Low-level network protocol analysis, RTMP chunk stream framing, FLV packet dissection, and Linux socket optimizations for high-throughput packet delivery.',
    impact: 'Reverse-engineered socket-level packet sequencing for resilient streaming under 40% packet loss.',
    tags: ['Kali Linux', 'Wireshark', 'Socket Programming', 'Network Security', 'Bash'],
    demoUrl: 'https://guns.lol/lg_dark',
    githubUrl: 'https://github.com/lgdark7',
    featured: false,
    accentColor: '#FFD166',
    stats: 'Packet Stream Dissection',
    previewType: 'terminal'
  },
  {
    id: 'cel-shaded-portfolio-3d',
    title: '3D Cel-Shaded Interactive Studio',
    category: 'webgl',
    description: 'This very project! Bringing the Bob\'s Burgers cel-shaded aesthetic into true 3D WebGL with Catmull-Rom spline camera navigation, an interactive 3D spatial orbital compass, and real-time Web Audio API sound synthesis.',
    impact: 'Eliminated static 2D buttons in favor of complete 3D spatial mouse-driven travel.',
    tags: ['Three.js', 'Custom Toon Shaders', 'Web Audio API', 'React 19', 'TypeScript'],
    demoUrl: '#',
    githubUrl: 'https://github.com/lgdark7',
    featured: true,
    accentColor: '#0ea5e9',
    stats: '60 FPS WebGL • 0 Static Navbars',
    previewType: 'visual'
  }
];

export const ART_PIECES: ArtPiece[] = [
  {
    id: 'cold-logic-motto',
    title: 'The Cold Logic Creed',
    medium: 'Wall Frame • Developer Philosophy',
    year: '2026',
    description: 'The core engineering tenet guiding Benhin\'s systems development.',
    quote: 'Never play it safe.. There is nothing in my heart except cold logic, pure execution, and relentless engineering.',
    codeHighlights: ['while (true) { execute(); }', 'const bloat = 0;', 'export default pureExecution;'],
    color: '#0ea5e9'
  },
  {
    id: 'rtmp-schematic',
    title: 'Pure-Kotlin RTMP Socket Architecture',
    medium: 'Chalkboard Schematic ($0.00 / Open Source)',
    year: '2026',
    description: 'Zero-overhead socket chunking: Type 0/1/2 headers, AMF0 serialization, and MediaCodec raw byte injection directly into TCP streams.',
    quote: 'Fairy Live Core: Direct Hardware MediaCodec -> TCP Socket Pipeline',
    codeHighlights: ['ChunkStream.send(AMF0.encode(connect))', 'MediaCodec.dequeueOutputBuffer()', 'socket.outputStream.write(flvTag)'],
    color: '#ef4444'
  },
  {
    id: 'kali-dragon-decal',
    title: 'Kali Linux Dragon Decal',
    medium: 'Graphic Metal Enamel Decal on Cabinet',
    year: '2026',
    description: 'The iconic emblem of security research, packet inspection, and low-level Linux mastery.',
    quote: 'The quieter you become, the more you are able to hear.',
    codeHighlights: ['uname -r: 6.x-kali-amd64', 'iptables -A FORWARD -j ACCEPT', 'tcpdump -i wlan0 -nn -s0 -v'],
    color: '#38bdf8'
  },
  {
    id: 'play-together-audio',
    title: 'Fairy Music Synchronized Sync Mesh',
    medium: 'Audio Waveform & Distributed Timing',
    year: '2026',
    description: 'Sub-50ms synchronized host-to-client streaming protocol delivering unified playback across mobile devices.',
    quote: 'High-Fidelity Audio • 120 FPS Fluidity • Instant Play Together',
    codeHighlights: ['ExoPlayer.seekTo(syncedTimestampMs)', 'DynamicBuffer.smoothAdjust(driftDelta)'],
    color: '#10b981'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Native Android & Multimedia',
    description: 'High-performance mobile systems, hardware encoders, and fluid media pipelines.',
    skills: [
      { name: 'Kotlin (Zero-Bloat Idiomatic)', level: 98, icon: 'Code' },
      { name: 'Hardware MediaCodec (H.264 & AAC)', level: 96, icon: 'Cpu' },
      { name: 'MediaProjection & Camera2 APIs', level: 95, icon: 'Camera' },
      { name: 'Jetpack Compose & 120 FPS UI', level: 94, icon: 'Layers' },
      { name: 'Media3 / ExoPlayer Engines', level: 95, icon: 'Music' }
    ]
  },
  {
    name: 'Systems, Protocols & Audio DSP',
    description: 'Socket-level network programming, broadcast DSP, and Linux kernel optimization.',
    skills: [
      { name: 'RTMP / FLV Socket Protocols', level: 96, icon: 'Radio' },
      { name: 'Broadcast Audio DSP & Ducking', level: 92, icon: 'Volume2' },
      { name: 'Kali Linux & System Hardening', level: 94, icon: 'Terminal' },
      { name: 'C++ / Android NDK & JNI', level: 88, icon: 'Binary' },
      { name: 'Network Packet Reverse Engineering', level: 92, icon: 'Shield' }
    ]
  },
  {
    name: 'Build, OTA & Modern Frontend',
    description: 'Production distribution, decentralized manifests, and spatial WebGL graphics.',
    skills: [
      { name: 'Decentralized OTA Version Engines', level: 95, icon: 'CloudDownload' },
      { name: 'Three.js & 3D Spatial Experiences', level: 90, icon: 'Box' },
      { name: 'Gradle & CMake Build Systems', level: 92, icon: 'Wrench' },
      { name: 'Git & Automated CI/CD Pipelines', level: 94, icon: 'GitBranch' }
    ]
  }
];

export const THOUGHT_ARTICLES: ThoughtArticle[] = [
  {
    id: 'case-study-fairy-live',
    title: 'Architecting Fairy Live: Pure-Kotlin RTMP Engine Under 15MB',
    date: 'October 16, 2026',
    readTime: '7 min read',
    summary: 'How I engineered a native Android live streaming engine with zero third-party dependencies, hardware MediaCodec encoding, and sub-100ms latency in a sub-15MB APK footprint.',
    tags: ['Android', 'Kotlin', 'RTMP', 'MediaCodec', 'Systems Architecture'],
    content: `Most modern Android streaming SDKs drag in hundreds of megabytes of bloated C++ binaries, third-party analytics trackers, and heavy wrappers. When building FAIRY LIVE, I established an uncompromising constraint: the entire engine had to remain under 15MB with pure Kotlin execution.

By talking directly to Android's native MediaCodec hardware encoders for H.264 video and AAC audio, we bypass the need for external FFmpeg binaries. Frame buffers from Camera2 and MediaProjection are rendered straight into surface encoders.

For network transport, we built a pure-Kotlin RTMP/FLV socket engine from scratch. It handles RTMP handshake, chunk stream multiplexing, and AMF0 serialization with minimal memory allocations, eliminating GC pauses during 60 FPS live gaming broadcasts.`
  },
  {
    id: 'audio-dsp-sidechain-ducking',
    title: 'Broadcast Audio DSP on Android: Real-Time Sidechain Ducking',
    date: 'October 20, 2026',
    readTime: '6 min read',
    summary: 'Designing voice-priority AudioRecord pipelines, phase cancellation, fan noise subtraction, and automatic microphone ducking on mobile hardware.',
    tags: ['Audio DSP', 'Android NDK', 'Kotlin', 'Acoustics'],
    content: `When a streamer plays a high-octane mobile game, game audio and device fan noise frequently overwhelm the microphone commentary.

In Fairy Live's audio core, we implemented a real-time sidechain auto-ducking pipeline:
1. Microphone PCM stream is monitored for voice formant activity across 300Hz-3.4kHz.
2. When voice presence exceeds the adaptive noise gate threshold, the internal game audio buffer is ducked by -14dB over an 8ms logarithmic attack envelope.
3. During pauses in speech, the audio smoothly ramps back up over a 350ms release curve.

The result is professional broadcast audio quality directly from a mobile device without requiring external mixer hardware.`
  },
  {
    id: 'fairy-music-sync-mesh',
    title: 'Fairy Music & Synchronized "Play Together" Host-Client Mesh',
    date: 'October 22, 2026',
    readTime: '5 min read',
    summary: 'Building a sub-50ms synchronized listening room over WebSockets and ExoPlayer with zero latency drift and 120 FPS fluid animations.',
    tags: ['Media3', 'ExoPlayer', 'Compose', 'Synchronization', 'Music'],
    content: `Music is best experienced together. For FAIRY MUSIC, we wanted friends to listen to the exact same track in synchronized lockstep regardless of network conditions.

Using a lightweight time-synchronization protocol (inspired by NTP), the client calculates round-trip clock skew with the host. If drift exceeds 40ms, the ExoPlayer playback pitch and rate are subtly modulated (0.98x or 1.02x) for a fraction of a second, aligning playback imperceptibly to human ears without audio pops or stutter.`
  },
  {
    id: 'kali-linux-daily-driver',
    title: 'Kali Linux as a Daily Driver: Low-Level Protocols & Systems Engineering',
    date: 'October 23, 2026',
    readTime: '6 min read',
    summary: 'Why daily driving Kali Linux sharpens your understanding of raw sockets, protocol frames, and low-level kernel performance.',
    tags: ['Kali Linux', 'Protocols', 'Security', 'Linux Kernel'],
    content: `Running Kali Linux isn't just about penetration testing tools—it is about having raw, unfiltered visibility into every packet leaving your network interface.

When debugging socket issues in custom streaming protocols, having Wireshark, strace, and raw socket inspection ready at your fingertips allows you to pinpoint dropped TCP acknowledgments, TCP window resizing, and packet fragmentation in seconds.

Building resilient systems requires knowing exactly what happens between your code and the wire.`
  }
];

export const STUDIO_EQUIPMENT = [
  { item: 'Main Rig', desc: 'Custom Workstation PC with Kali Linux & Android Studio Dev Environment' },
  { item: 'Streaming Engine', desc: 'FAIRY LIVE — Pure-Kotlin RTMP Engine (<15MB APK constraint)' },
  { item: 'Music Player', desc: 'FAIRY MUSIC — Material 120 FPS Streaming & Synced Play Together' },
  { item: 'Desk Lamp', desc: 'Articulated 3-Way Architect Spotlight with Day/Sunset/Night Modes' },
  { item: 'Studio Cat', desc: 'Loyal Studio Cat (Pet for purr reaction)' },
  { item: 'Drink', desc: 'Steaming pour-over coffee in Developer Mug' },
  { item: 'Decal', desc: 'Kali Linux Dragon & Zero-Bloat Kotlin Badges on Metal Cabinet' }
];
