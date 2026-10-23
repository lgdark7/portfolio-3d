import * as THREE from 'three';
import { PALETTE, toonGradient, createCartoonMesh, createLineEdges } from './materials';

export class StudioRoom {
  public group: THREE.Group;
  public interactiveObjects: THREE.Object3D[] = [];
  public monitorCanvas: HTMLCanvasElement;
  public monitorTexture: THREE.CanvasTexture;
  public lampLight: THREE.SpotLight;
  public lampBulbMesh: THREE.Mesh;
  public lampHead: THREE.Group;
  public drawers: THREE.Group[] = [];
  public catTail: THREE.Mesh | null = null;
  public steamParticles: THREE.Points | null = null;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'studio-room';

    // Canvas for dynamic monitor screen
    this.monitorCanvas = document.createElement('canvas');
    this.monitorCanvas.width = 512;
    this.monitorCanvas.height = 320;
    this.monitorTexture = new THREE.CanvasTexture(this.monitorCanvas);
    this.drawMonitorScreen('HELLO', 'Lynn Fisher 2018 Studio');

    // Create articulated desk lamp spot light
    this.lampLight = new THREE.SpotLight(0xffd166, 0, 12, Math.PI / 4, 0.4, 1.2);
    this.lampLight.castShadow = true;
    this.lampLight.shadow.mapSize.width = 1024;
    this.lampLight.shadow.mapSize.height = 1024;

    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffe29a });
    this.lampBulbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), bulbMat);
    this.lampHead = new THREE.Group();

    this.buildRoom();
  }

  private buildRoom() {
    this.buildArchitecture();
    this.buildWindowAndBackdrop();
    this.buildWorkstationDesk();
    this.buildFilingCabinet();
    this.buildArtGalleryAndShelves();
    this.buildStudioCat();
    this.buildSteamingCoffeeMug();
  }

  /**
   * 1. Architecture: Floor, Studio Walls, Baseboards, Slanted Ceiling Beam
   */
  private buildArchitecture() {
    const outlineMat = new THREE.MeshBasicMaterial({ color: PALETTE.ink, side: THREE.BackSide });

    // Main Studio Floor (cream parquet / line-art boards)
    const floorGeo = new THREE.BoxGeometry(14, 0.2, 12);
    const floorMat = new THREE.MeshToonMaterial({ color: PALETTE.paper, gradientMap: toonGradient });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -0.1, 0);
    floorMesh.receiveShadow = true;
    this.group.add(floorMesh);

    // Subtle line-art planks on floor
    const floorEdges = createLineEdges(floorGeo, 40, PALETTE.ink);
    floorEdges.position.copy(floorMesh.position);
    this.group.add(floorEdges);

    // Floor Rug (Center Studio Rug under Avatar & Desk)
    const rugGeo = new THREE.BoxGeometry(5.2, 0.02, 4.4);
    const rugMat = new THREE.MeshToonMaterial({ color: 0xf5eee6, gradientMap: toonGradient });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.position.set(0, 0.01, 0.8);
    rug.receiveShadow = true;
    this.group.add(rug);
    this.group.add(createLineEdges(rugGeo, 40, PALETTE.ink));

    // Back Wall
    const backWallGeo = new THREE.BoxGeometry(14, 8, 0.2);
    const wallMat = new THREE.MeshToonMaterial({ color: PALETTE.paper, gradientMap: toonGradient });
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 4, -4);
    backWall.receiveShadow = true;
    this.group.add(backWall);

    // Left Studio Wall
    const leftWallGeo = new THREE.BoxGeometry(0.2, 8, 12);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-7, 4, 2);
    leftWall.receiveShadow = true;
    this.group.add(leftWall);

    // Baseboards along back and left walls
    const baseboardGeo = new THREE.BoxGeometry(14, 0.28, 0.08);
    const baseboardMat = new THREE.MeshToonMaterial({ color: 0xe8dfd3, gradientMap: toonGradient });
    const baseboard = new THREE.Mesh(baseboardGeo, baseboardMat);
    baseboard.position.set(0, 0.14, -3.88);
    this.group.add(baseboard);
    this.group.add(createLineEdges(baseboardGeo, 40, PALETTE.ink));

    // Studio Power Outlet with curving cord
    const outletGeo = new THREE.BoxGeometry(0.18, 0.26, 0.04);
    const outlet = new THREE.Mesh(outletGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    outlet.position.set(-1.2, 0.8, -3.88);
    this.group.add(outlet);
    this.group.add(createLineEdges(outletGeo, 40, PALETTE.ink));

    // Wall cable curve
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.2, 0.7, -3.85),
      new THREE.Vector3(-1.4, 0.3, -3.85),
      new THREE.Vector3(-2.0, 0.05, -3.0),
      new THREE.Vector3(-2.4, 0.05, -1.8)
    ]);
    const cableGeo = new THREE.TubeGeometry(cableCurve, 20, 0.015, 8, false);
    const cableMesh = new THREE.Mesh(cableGeo, new THREE.MeshBasicMaterial({ color: PALETTE.ink }));
    this.group.add(cableMesh);

    // Wastebasket with crumpled paper
    const basketGeo = new THREE.CylinderGeometry(0.28, 0.22, 0.55, 16);
    const basket = createCartoonMesh(basketGeo, 0xffffff, 0.03);
    basket.position.set(-2.0, 0.28, -1.6);
    this.group.add(basket);

    // Slanted top architectural beam
    const beamGeo = new THREE.BoxGeometry(14, 0.35, 0.4);
    const beam = createCartoonMesh(beamGeo, 0xe0d6c8, 0.02);
    beam.position.set(0, 7.8, -3.8);
    this.group.add(beam);
  }

  /**
   * 2. Window with louvers, Cactus Plant, and Outer Sky
   */
  private buildWindowAndBackdrop() {
    const windowGroup = new THREE.Group();
    windowGroup.position.set(-2.4, 4.2, -3.88);

    // Window Frame
    const frameGeo = new THREE.BoxGeometry(3.2, 2.6, 0.12);
    const frame = createCartoonMesh(frameGeo, 0xffffff, 0.02);
    windowGroup.add(frame);

    // Window Glass Inner
    const glassGeo = new THREE.BoxGeometry(2.9, 2.3, 0.05);
    const glassMat = new THREE.MeshBasicMaterial({ color: PALETTE.glass });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(0, 0, -0.02);
    windowGroup.add(glass);

    // Horizontal Louver Blinds (Bob's Burgers style)
    for (let i = 0; i < 7; i++) {
      const louverGeo = new THREE.BoxGeometry(2.8, 0.06, 0.02);
      const louver = new THREE.Mesh(louverGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      louver.position.set(0, 0.9 - i * 0.18, 0.02);
      louver.rotation.x = -0.2;
      windowGroup.add(louver);
      windowGroup.add(createLineEdges(louverGeo, 30, PALETTE.ink));
    }

    // Window Sill
    const sillGeo = new THREE.BoxGeometry(3.5, 0.12, 0.35);
    const sill = createCartoonMesh(sillGeo, 0xffffff, 0.02);
    sill.position.set(0, -1.35, 0.12);
    windowGroup.add(sill);

    // Cactus in Pot on the window sill
    const potGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.28, 12);
    const pot = createCartoonMesh(potGeo, 0xd97736, 0.02);
    pot.position.set(-1.0, -1.18, 0.15);
    windowGroup.add(pot);

    // Saguaro Cactus Body
    const cactusGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 12);
    const cactus = createCartoonMesh(cactusGeo, PALETTE.mint, 0.03);
    cactus.position.set(-1.0, -0.85, 0.15);
    windowGroup.add(cactus);

    // Cactus left arm
    const armGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.22, 8);
    const leftArm = createCartoonMesh(armGeo, PALETTE.mint, 0.03);
    leftArm.position.set(-1.12, -0.82, 0.15);
    leftArm.rotation.z = -0.3;
    windowGroup.add(leftArm);

    this.group.add(windowGroup);
  }

  /**
   * 3. Workstation Desk, PC Monitor with dynamic canvas, Keyboard & Lamp
   */
  private buildWorkstationDesk() {
    const deskGroup = new THREE.Group();
    deskGroup.position.set(-2.2, 0, -1.8);
    deskGroup.name = 'workstation-desk';

    // Desktop Surface (light birch)
    const topGeo = new THREE.BoxGeometry(3.4, 0.1, 1.8);
    const deskTop = createCartoonMesh(topGeo, PALETTE.wood, 0.02);
    deskTop.position.set(0, 1.45, 0);
    deskGroup.add(deskTop);
    deskGroup.add(createLineEdges(topGeo, 40, PALETTE.ink));

    // Under-desk metal frame & angled steel legs
    const legGeo = new THREE.BoxGeometry(0.06, 1.4, 0.06);
    const legMat = PALETTE.ink;

    const legPositions = [
      [-1.5, 0.7, -0.75],
      [1.5, 0.7, -0.75],
      [-1.5, 0.7, 0.75],
      [1.5, 0.7, 0.75],
    ];

    legPositions.forEach(([x, y, z]) => {
      const leg = createCartoonMesh(legGeo, legMat, 0.02);
      leg.position.set(x, y, z);
      deskGroup.add(leg);
    });

    // Cross-support stretchers
    const stretcherGeo = new THREE.BoxGeometry(3.0, 0.04, 0.04);
    const stretcher = createCartoonMesh(stretcherGeo, legMat, 0.02);
    stretcher.position.set(0, 0.3, -0.75);
    deskGroup.add(stretcher);

    // Large Desk Mat / Mousepad
    const matGeo = new THREE.BoxGeometry(2.4, 0.015, 1.1);
    const matMesh = createCartoonMesh(matGeo, 0x243b4a, 0.02);
    matMesh.position.set(0, 1.51, 0.1);
    deskGroup.add(matMesh);

    // Computer Monitor (Rounded Bezel + Screen)
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(-0.2, 1.52, -0.2);
    monitorGroup.name = 'interactive-monitor';

    // Stand base
    const baseGeo = new THREE.CylinderGeometry(0.3, 0.32, 0.03, 16);
    const standBase = createCartoonMesh(baseGeo, PALETTE.metalLight, 0.02);
    standBase.position.set(0, 0.02, 0);
    monitorGroup.add(standBase);

    // Stand neck
    const neckGeo = new THREE.BoxGeometry(0.08, 0.45, 0.06);
    const standNeck = createCartoonMesh(neckGeo, PALETTE.metalLight, 0.02);
    standNeck.position.set(0, 0.25, -0.05);
    standNeck.rotation.x = -0.05;
    monitorGroup.add(standNeck);

    // Bezel Frame
    const bezelGeo = new THREE.BoxGeometry(1.8, 1.15, 0.08);
    const bezel = createCartoonMesh(bezelGeo, 0xffffff, 0.025);
    bezel.position.set(0, 0.72, 0);
    monitorGroup.add(bezel);

    // Interactive Screen Face
    const screenGeo = new THREE.PlaneGeometry(1.65, 1.0);
    const screenMat = new THREE.MeshBasicMaterial({
      map: this.monitorTexture,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.72, 0.045);
    screenMesh.name = 'target-monitor';
    screenMesh.userData = {
      interactive: true,
      id: 'web',
      label: 'Inspect Web Projects'
    };
    monitorGroup.add(screenMesh);
    this.interactiveObjects.push(screenMesh);

    deskGroup.add(monitorGroup);

    // Keyboard (Chiclet style)
    const kbGeo = new THREE.BoxGeometry(0.72, 0.025, 0.25);
    const kb = createCartoonMesh(kbGeo, 0xffffff, 0.02);
    kb.position.set(-0.2, 1.52, 0.32);
    deskGroup.add(kb);

    // Mouse
    const mouseGeo = new THREE.BoxGeometry(0.1, 0.03, 0.16);
    const mouse = createCartoonMesh(mouseGeo, 0xffffff, 0.02);
    mouse.position.set(0.45, 1.52, 0.32);
    deskGroup.add(mouse);

    // 4. Articulated Desk Lamp (Interactive lighting switch!)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(1.1, 1.5, -0.3);
    lampGroup.name = 'interactive-lamp';

    // Lamp Base (Clickable target)
    const lampBaseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.04, 16);
    const lampBase = createCartoonMesh(lampBaseGeo, PALETTE.cheese, 0.025);
    lampBase.position.set(0, 0.02, 0);
    lampGroup.add(lampBase);

    // Push Button on Base
    const switchGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 12);
    const switchMesh = new THREE.Mesh(switchGeo, new THREE.MeshToonMaterial({ color: PALETTE.hoodie, gradientMap: toonGradient }));
    switchMesh.position.set(0, 0.05, 0.08);
    switchMesh.name = 'target-lamp';
    switchMesh.userData = {
      interactive: true,
      id: 'lamp-toggle',
      label: 'Click Desk Lamp (Toggle Lighting)'
    };
    lampGroup.add(switchMesh);
    this.interactiveObjects.push(switchMesh);

    // Also make the whole lamp base interactive
    const lampBaseTarget = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 16), new THREE.MeshBasicMaterial({ visible: false }));
    lampBaseTarget.position.set(0, 0.05, 0);
    lampBaseTarget.name = 'target-lamp-base';
    lampBaseTarget.userData = {
      interactive: true,
      id: 'lamp-toggle',
      label: 'Click Desk Lamp (Toggle Lighting)'
    };
    lampGroup.add(lampBaseTarget);
    this.interactiveObjects.push(lampBaseTarget);

    // Articulated Armature 1
    const arm1Geo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const arm1 = createCartoonMesh(arm1Geo, PALETTE.ink, 0.02);
    arm1.position.set(0, 0.25, 0);
    arm1.rotation.z = -0.25;
    lampGroup.add(arm1);

    // Articulated Armature 2
    const arm2 = createCartoonMesh(arm1Geo, PALETTE.ink, 0.02);
    arm2.position.set(-0.1, 0.62, 0);
    arm2.rotation.z = 0.35;
    lampGroup.add(arm2);

    // Lamp Shade (Cone)
    this.lampHead.position.set(-0.25, 0.78, 0.05);
    this.lampHead.rotation.z = 0.55;
    this.lampHead.rotation.x = 0.2;

    const shadeGeo = new THREE.ConeGeometry(0.18, 0.3, 16, 1, true);
    shadeGeo.rotateX(Math.PI);
    const shadeMesh = createCartoonMesh(shadeGeo, PALETTE.cheese, 0.025);
    this.lampHead.add(shadeMesh);

    // Bulb and Spotlight
    this.lampBulbMesh.position.set(0, -0.05, 0);
    this.lampHead.add(this.lampBulbMesh);

    this.lampLight.position.set(0, 0, 0);
    this.lampLight.target.position.set(-0.8, -1.2, 0.4);
    this.lampHead.add(this.lampLight);
    this.lampHead.add(this.lampLight.target);

    lampGroup.add(this.lampHead);
    deskGroup.add(lampGroup);

    this.group.add(deskGroup);
  }

  /**
   * 4. Filing Cabinet with stickers and slide-out drawers
   */
  private buildFilingCabinet() {
    const cabinetGroup = new THREE.Group();
    cabinetGroup.position.set(2.4, 0, -1.8);
    cabinetGroup.name = 'filing-cabinet';

    // Metal Casing (slate metal)
    const caseGeo = new THREE.BoxGeometry(1.6, 2.4, 1.8);
    const casing = createCartoonMesh(caseGeo, PALETTE.metal, 0.02);
    casing.position.set(0, 1.2, 0);
    cabinetGroup.add(casing);
    cabinetGroup.add(createLineEdges(caseGeo, 30, PALETTE.ink));

    // 4 Sliding Drawers
    const drawerHeight = 0.52;
    for (let i = 0; i < 4; i++) {
      const drawerGroup = new THREE.Group();
      drawerGroup.position.set(0, 0.32 + i * 0.58, 0.02);

      const faceGeo = new THREE.BoxGeometry(1.48, drawerHeight, 0.06);
      const faceMesh = createCartoonMesh(faceGeo, 0x5a7082, 0.02);
      drawerGroup.add(faceMesh);

      // Metal Handle
      const handleGeo = new THREE.BoxGeometry(0.35, 0.04, 0.08);
      const handle = createCartoonMesh(handleGeo, PALETTE.metalLight, 0.02);
      handle.position.set(0, 0, 0.06);
      drawerGroup.add(handle);

      // Index label slot
      const labelGeo = new THREE.BoxGeometry(0.25, 0.12, 0.02);
      const labelMesh = new THREE.Mesh(labelGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      labelMesh.position.set(0, 0.14, 0.04);
      drawerGroup.add(labelMesh);

      this.drawers.push(drawerGroup);
      cabinetGroup.add(drawerGroup);
    }

    // Top Drawer Sticker: "CSS IS AWESOME" badge
    const sticker1 = this.createSticker('CSS IS\nAWESOME', PALETTE.mint, 0.32, 0.22);
    sticker1.position.set(0.35, 0.32 + 3 * 0.58, 0.07);
    cabinetGroup.add(sticker1);

    // Drawer Sticker: JS Heart
    const sticker2 = this.createSticker('♡ JS ♡', PALETTE.cheese, 0.26, 0.16);
    sticker2.position.set(-0.35, 0.32 + 2 * 0.58, 0.07);
    cabinetGroup.add(sticker2);

    // Drawer Sticker: Single Div
    const sticker3 = this.createSticker('<div>', PALETTE.hoodie, 0.24, 0.14);
    sticker3.position.set(0.3, 0.32 + 1 * 0.58, 0.07);
    cabinetGroup.add(sticker3);

    // Interactive Hitbox for the Filing Cabinet
    const hitBoxGeo = new THREE.BoxGeometry(1.8, 2.5, 2.0);
    const hitBox = new THREE.Mesh(hitBoxGeo, new THREE.MeshBasicMaterial({ visible: false }));
    hitBox.position.set(0, 1.25, 0);
    hitBox.name = 'target-cabinet';
    hitBox.userData = {
      interactive: true,
      id: 'about',
      label: 'Open Filing Cabinet (About & Skills)'
    };
    cabinetGroup.add(hitBox);
    this.interactiveObjects.push(hitBox);

    // Cardboard boxes stacked beside the cabinet
    const box1 = createCartoonMesh(new THREE.BoxGeometry(0.9, 0.7, 0.9), 0xc9a87c, 0.02);
    box1.position.set(1.4, 0.35, 0.2);
    box1.rotation.y = 0.2;
    cabinetGroup.add(box1);

    const box2 = createCartoonMesh(new THREE.BoxGeometry(0.7, 0.55, 0.7), 0xbfa075, 0.02);
    box2.position.set(1.35, 0.95, 0.2);
    box2.rotation.y = -0.15;
    cabinetGroup.add(box2);

    this.group.add(cabinetGroup);
  }

  /**
   * Helper to create graphic decals/stickers on furniture
   */
  private createSticker(text: string, bgColor: number, w: number, h: number): THREE.Mesh {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 96;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#' + bgColor.toString(16).padStart(6, '0');
    ctx.fillRect(0, 0, 128, 96);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#14303f';
    ctx.strokeRect(0, 0, 128, 96);

    ctx.fillStyle = '#14303f';
    ctx.font = 'bold 20px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = text.split('\n');
    if (lines.length === 1) {
      ctx.fillText(lines[0], 64, 48);
    } else {
      ctx.fillText(lines[0], 64, 34);
      ctx.fillText(lines[1], 64, 62);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({ map: texture });
    return new THREE.Mesh(geo, mat);
  }

  /**
   * 5. Art Gallery Wall, Quotes & Floating Bookshelves
   */
  private buildArtGalleryAndShelves() {
    const galleryGroup = new THREE.Group();
    galleryGroup.name = 'art-gallery';

    // Hanging Frame 1: Tina Quote ("Strong, sensual woman.")
    const frame1 = this.createFramedArt('strong,\nsensual\nwoman.', 0xffffff, 1.1, 1.4);
    frame1.position.set(1.2, 5.2, -3.85);
    frame1.name = 'target-art-frame1';
    frame1.userData = {
      interactive: true,
      id: 'art',
      label: 'View Art & Creative Lab'
    };
    galleryGroup.add(frame1);
    this.interactiveObjects.push(frame1);

    // Hanging Frame 2: "Vincent Van Goat Cheese Burger $5.95"
    const frame2 = this.createFramedArt('Vincent Van Goat\nCheese BURGER\n\n$5.95', 0xffffff, 1.3, 1.1);
    frame2.position.set(3.0, 5.4, -3.85);
    frame2.name = 'target-art-frame2';
    frame2.userData = {
      interactive: true,
      id: 'thoughts',
      label: 'Read Burger of the Day & Thoughts'
    };
    galleryGroup.add(frame2);
    this.interactiveObjects.push(frame2);

    // Floating Bookshelf 1
    const shelf1Geo = new THREE.BoxGeometry(2.4, 0.08, 0.6);
    const shelf1 = createCartoonMesh(shelf1Geo, PALETTE.wood, 0.02);
    shelf1.position.set(1.8, 3.8, -3.5);
    galleryGroup.add(shelf1);

    // Books on Shelf
    const bookColors = [PALETTE.hoodie, PALETTE.cheese, PALETTE.denim, PALETTE.mint];
    for (let i = 0; i < 6; i++) {
      const bookHeight = 0.35 + (i % 3) * 0.06;
      const book = createCartoonMesh(
        new THREE.BoxGeometry(0.08, bookHeight, 0.38),
        bookColors[i % bookColors.length],
        0.02
      );
      book.position.set(0.9 + i * 0.11, 3.84 + bookHeight / 2, -3.5);
      galleryGroup.add(book);
    }

    // Mini Burger figurine on shelf!
    const burgerFigurine = this.createMiniBurger();
    burgerFigurine.position.set(2.4, 3.95, -3.4);
    galleryGroup.add(burgerFigurine);

    // Mini BB-8 Droid figurine on filing cabinet top
    const bb8 = this.createMiniBB8();
    bb8.position.set(2.8, 2.7, -1.8);
    galleryGroup.add(bb8);

    // Hanging Floor Frame (Cat picture on floor leaning against wall)
    const floorFrame = this.createFramedArt('^._.^', 0xffffff, 1.1, 1.2);
    floorFrame.position.set(-4.5, 0.6, -3.75);
    floorFrame.rotation.x = -0.1;
    galleryGroup.add(floorFrame);

    this.group.add(galleryGroup);
  }

  private createFramedArt(text: string, bgColor: number, w: number, h: number): THREE.Mesh {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#' + bgColor.toString(16).padStart(6, '0');
    ctx.fillRect(0, 0, 256, 320);

    // Clean ink borders
    ctx.strokeStyle = '#14303f';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, 244, 308);

    ctx.fillStyle = '#14303f';
    ctx.font = '500 24px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = text.split('\n');
    const startY = 160 - (lines.length - 1) * 18;
    lines.forEach((line, idx) => {
      ctx.fillText(line, 128, startY + idx * 36);
    });

    const texture = new THREE.CanvasTexture(canvas);
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({ map: texture });
    return new THREE.Mesh(geo, mat);
  }

  private createMiniBurger(): THREE.Group {
    const group = new THREE.Group();
    // Bun
    const topBun = createCartoonMesh(new THREE.SphereGeometry(0.12, 12, 8), 0xf4a261, 0.02);
    topBun.scale.set(1.2, 0.6, 1.2);
    topBun.position.set(0, 0.1, 0);
    group.add(topBun);

    // Lettuce & Cheese
    const filling = createCartoonMesh(new THREE.BoxGeometry(0.28, 0.04, 0.28), PALETTE.mint, 0.02);
    filling.position.set(0, 0.04, 0);
    group.add(filling);

    // Patty
    const patty = createCartoonMesh(new THREE.CylinderGeometry(0.13, 0.13, 0.05, 12), PALETTE.hoodieDark, 0.02);
    patty.position.set(0, 0, 0);
    group.add(patty);

    // Bottom bun
    const bottomBun = createCartoonMesh(new THREE.CylinderGeometry(0.13, 0.11, 0.06, 12), 0xf4a261, 0.02);
    bottomBun.position.set(0, -0.05, 0);
    group.add(bottomBun);

    return group;
  }

  private createMiniBB8(): THREE.Group {
    const group = new THREE.Group();
    // Body sphere
    const body = createCartoonMesh(new THREE.SphereGeometry(0.18, 16, 12), 0xffffff, 0.02);
    body.position.set(0, 0.18, 0);
    group.add(body);

    // Orange bands
    const ring = createCartoonMesh(new THREE.TorusGeometry(0.14, 0.02, 8, 16), 0xf77f00, 0.015);
    ring.position.set(0, 0.18, 0);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    // Head dome
    const head = createCartoonMesh(new THREE.SphereGeometry(0.11, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), 0xffffff, 0.02);
    head.position.set(0, 0.34, 0);
    group.add(head);

    // Eye sensor
    const eye = new THREE.Mesh(new THREE.CircleGeometry(0.025, 12), new THREE.MeshBasicMaterial({ color: PALETTE.ink }));
    eye.position.set(0, 0.38, 0.1);
    group.add(eye);

    return group;
  }

  /**
   * 6. Sleeping Studio Cat
   */
  private buildStudioCat() {
    const catGroup = new THREE.Group();
    catGroup.position.set(-3.6, 0.12, -2.6);
    catGroup.name = 'target-cat';

    // Body (curled up oval)
    const bodyGeo = new THREE.SphereGeometry(0.24, 16, 12);
    bodyGeo.scale(1.3, 0.75, 1.0);
    const catBody = createCartoonMesh(bodyGeo, 0xefb07b, 0.02);
    catGroup.add(catBody);

    // Head
    const headGeo = new THREE.SphereGeometry(0.16, 12, 10);
    const catHead = createCartoonMesh(headGeo, 0xefb07b, 0.02);
    catHead.position.set(0.24, 0.06, 0.12);
    catGroup.add(catHead);

    // Ears
    const earGeo = new THREE.ConeGeometry(0.05, 0.09, 4);
    const ear1 = createCartoonMesh(earGeo, 0xefb07b, 0.02);
    ear1.position.set(0.28, 0.2, 0.16);
    ear1.rotation.z = -0.3;
    catGroup.add(ear1);

    const ear2 = createCartoonMesh(earGeo, 0xefb07b, 0.02);
    ear2.position.set(0.18, 0.2, 0.06);
    ear2.rotation.z = 0.2;
    catGroup.add(ear2);

    // Tail (curled)
    const tailCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.25, 0, 0),
      new THREE.Vector3(-0.45, 0.05, 0.15),
      new THREE.Vector3(-0.35, 0.15, 0.25)
    );
    const tailGeo = new THREE.TubeGeometry(tailCurve, 12, 0.035, 8, false);
    this.catTail = new THREE.Mesh(tailGeo, new THREE.MeshToonMaterial({ color: 0xd9824c, gradientMap: toonGradient }));
    catGroup.add(this.catTail);

    // Interactive Raycast Target for Cat
    const catHitGeo = new THREE.SphereGeometry(0.45, 8, 8);
    const catHit = new THREE.Mesh(catHitGeo, new THREE.MeshBasicMaterial({ visible: false }));
    catHit.name = 'target-cat';
    catHit.userData = {
      interactive: true,
      id: 'cat',
      label: 'Pet the Studio Cat (Purr!)'
    };
    catGroup.add(catHit);
    this.interactiveObjects.push(catHit);

    this.group.add(catGroup);
  }

  /**
   * 7. Steaming Coffee Mug on Desk with Particle Smoke
   */
  private buildSteamingCoffeeMug() {
    const mugGroup = new THREE.Group();
    mugGroup.position.set(-1.1, 1.5, -1.3);

    // Mug body
    const mugGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.18, 16);
    const mug = createCartoonMesh(mugGeo, 0xffffff, 0.02);
    mugGroup.add(mug);

    // Handle
    const handleGeo = new THREE.TorusGeometry(0.05, 0.018, 8, 16, Math.PI);
    const handle = createCartoonMesh(handleGeo, 0xffffff, 0.02);
    handle.position.set(0.09, 0, 0);
    handle.rotation.z = -Math.PI / 2;
    mugGroup.add(handle);

    // Coffee surface
    const coffeeGeo = new THREE.CircleGeometry(0.07, 12);
    coffeeGeo.rotateX(-Math.PI / 2);
    const coffee = new THREE.Mesh(coffeeGeo, new THREE.MeshBasicMaterial({ color: 0x3d2314 }));
    coffee.position.set(0, 0.085, 0);
    mugGroup.add(coffee);

    // Procedural steam particle cloud
    const particleCount = 20;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 0.06;
      positions[i * 3 + 1] = 0.1 + Math.random() * 0.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xcccccc,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
    });
    this.steamParticles = new THREE.Points(pGeo, pMat);
    mugGroup.add(this.steamParticles);

    // Interactive target for Coffee
    const mugHit = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.25, 8), new THREE.MeshBasicMaterial({ visible: false }));
    mugHit.position.set(0, 0.09, 0);
    mugHit.name = 'target-coffee';
    mugHit.userData = {
      interactive: true,
      id: 'coffee',
      label: 'Steaming Pour-Over Coffee'
    };
    mugGroup.add(mugHit);
    this.interactiveObjects.push(mugHit);

    this.group.add(mugGroup);
  }

  /**
   * Dynamic Monitor Canvas Update
   */
  public drawMonitorScreen(headline: string, subline: string) {
    const ctx = this.monitorCanvas.getContext('2d')!;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 320);

    // Window bar
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 512, 40);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(24, 20, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(44, 20, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(64, 20, 6, 0, Math.PI * 2);
    ctx.fill();

    // Main Greeting / Code
    ctx.fillStyle = '#06d6a0';
    ctx.font = 'bold 54px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(headline, 256, 150);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(subline, 256, 200);

    ctx.fillStyle = '#ffd166';
    ctx.font = '16px "Space Mono", monospace';
    ctx.fillText('> Click to open Web Projects drawer', 256, 260);

    this.monitorTexture.needsUpdate = true;
  }

  /**
   * Animation update for Cat tail and Coffee steam
   */
  public update(time: number) {
    // Steam particles rising and looping
    if (this.steamParticles) {
      const pos = this.steamParticles.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i) + 0.003;
        if (y > 0.5) y = 0.1;
        pos.setY(i, y);
        pos.setX(i, pos.getX(i) + Math.sin(time * 3 + i) * 0.0006);
      }
      pos.needsUpdate = true;
    }

    // Cat tail subtle wag
    if (this.catTail) {
      this.catTail.rotation.y = Math.sin(time * 1.5) * 0.15;
    }
  }
}
