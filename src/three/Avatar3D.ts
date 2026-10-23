import * as THREE from 'three';
import { PALETTE, toonGradient } from './materials';

export class Avatar3D {
  public group: THREE.Group;
  public headGroup: THREE.Group;
  public bodyGroup: THREE.Group;
  private leftArm: THREE.Group;
  private rightArm: THREE.Group;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'avatar-lynn';

    this.headGroup = new THREE.Group();
    this.bodyGroup = new THREE.Group();
    this.leftArm = new THREE.Group();
    this.rightArm = new THREE.Group();

    this.buildCharacter();
  }

  private buildCharacter() {
    // 1. Legs & Shoes
    const shoeMat = new THREE.MeshToonMaterial({ color: 0xf4f1ea, gradientMap: toonGradient });
    const pantsMat = new THREE.MeshToonMaterial({ color: PALETTE.denim, gradientMap: toonGradient });
    const outlineMat = new THREE.MeshBasicMaterial({ color: PALETTE.ink, side: THREE.BackSide });

    // Left Shoe
    const shoeGeo = new THREE.BoxGeometry(0.24, 0.12, 0.36);
    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(-0.2, 0.06, 0.05);
    const leftShoeOutline = new THREE.Mesh(shoeGeo, outlineMat);
    leftShoeOutline.scale.set(1.12, 1.15, 1.1);
    leftShoe.add(leftShoeOutline);
    this.group.add(leftShoe);

    // Right Shoe
    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0.2, 0.06, 0.05);
    const rightShoeOutline = new THREE.Mesh(shoeGeo, outlineMat);
    rightShoeOutline.scale.set(1.12, 1.15, 1.1);
    rightShoe.add(rightShoeOutline);
    this.group.add(rightShoe);

    // Pants (legs)
    const legGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.75, 16);
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.set(-0.2, 0.45, 0);
    const leftLegOutline = new THREE.Mesh(legGeo, outlineMat);
    leftLegOutline.scale.set(1.1, 1.02, 1.1);
    leftLeg.add(leftLegOutline);
    this.group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.position.set(0.2, 0.45, 0);
    const rightLegOutline = new THREE.Mesh(legGeo, outlineMat);
    rightLegOutline.scale.set(1.1, 1.02, 1.1);
    rightLeg.add(rightLegOutline);
    this.group.add(rightLeg);

    // 2. Oversized Red Hoodie (The iconic Bob's Burgers Lynn look)
    const hoodieMat = new THREE.MeshToonMaterial({ color: PALETTE.hoodie, gradientMap: toonGradient });
    const hoodieDarkMat = new THREE.MeshToonMaterial({ color: PALETTE.hoodieDark, gradientMap: toonGradient });

    // Main Torso (Slightly A-line tapered hoodie body)
    const torsoGeo = new THREE.CylinderGeometry(0.42, 0.58, 1.15, 20);
    const torso = new THREE.Mesh(torsoGeo, hoodieMat);
    torso.position.set(0, 1.25, 0);
    const torsoOutline = new THREE.Mesh(torsoGeo, outlineMat);
    torsoOutline.scale.set(1.08, 1.02, 1.08);
    torso.add(torsoOutline);
    this.bodyGroup.add(torso);

    // Kangaroo Pocket
    const pocketGeo = new THREE.BoxGeometry(0.55, 0.35, 0.15);
    const pocket = new THREE.Mesh(pocketGeo, hoodieDarkMat);
    pocket.position.set(0, 1.08, 0.42);
    const pocketOutline = new THREE.Mesh(pocketGeo, outlineMat);
    pocketOutline.scale.set(1.08, 1.08, 1.08);
    pocket.add(pocketOutline);
    this.bodyGroup.add(pocket);

    // White Hoodie Drawstrings
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const stringGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8);
    const leftString = new THREE.Mesh(stringGeo, stringMat);
    leftString.position.set(-0.1, 1.45, 0.36);
    leftString.rotation.z = -0.08;
    this.bodyGroup.add(leftString);

    const rightString = new THREE.Mesh(stringGeo, stringMat);
    rightString.position.set(0.1, 1.45, 0.36);
    rightString.rotation.z = 0.08;
    this.bodyGroup.add(rightString);

    // Oversized Hoodie Sleeves (covering hands!)
    const sleeveGeo = new THREE.CylinderGeometry(0.15, 0.22, 1.0, 16);

    // Left Sleeve
    const leftSleeveMesh = new THREE.Mesh(sleeveGeo, hoodieMat);
    leftSleeveMesh.position.set(0, -0.4, 0);
    const leftSleeveOutline = new THREE.Mesh(sleeveGeo, outlineMat);
    leftSleeveOutline.scale.set(1.1, 1.02, 1.1);
    leftSleeveMesh.add(leftSleeveOutline);

    this.leftArm.position.set(-0.46, 1.6, 0);
    this.leftArm.rotation.z = 0.2;
    this.leftArm.add(leftSleeveMesh);
    this.bodyGroup.add(this.leftArm);

    // Right Sleeve
    const rightSleeveMesh = new THREE.Mesh(sleeveGeo, hoodieMat);
    rightSleeveMesh.position.set(0, -0.4, 0);
    const rightSleeveOutline = new THREE.Mesh(sleeveGeo, outlineMat);
    rightSleeveOutline.scale.set(1.1, 1.02, 1.1);
    rightSleeveMesh.add(rightSleeveOutline);

    this.rightArm.position.set(0.46, 1.6, 0);
    this.rightArm.rotation.z = -0.2;
    this.rightArm.add(rightSleeveMesh);
    this.bodyGroup.add(this.rightArm);

    this.group.add(this.bodyGroup);

    // 3. Head & Face (Bob's Burgers style)
    this.headGroup.position.set(0, 1.95, 0);

    const skinMat = new THREE.MeshToonMaterial({ color: PALETTE.skin, gradientMap: toonGradient });
    const hairMat = new THREE.MeshToonMaterial({ color: PALETTE.hair, gradientMap: toonGradient });

    // Head base (slightly rounded cylindrical oval)
    const headGeo = new THREE.SphereGeometry(0.35, 24, 20);
    headGeo.scale(1.0, 1.15, 0.95);
    const head = new THREE.Mesh(headGeo, skinMat);
    const headOutline = new THREE.Mesh(headGeo, outlineMat);
    headOutline.scale.set(1.08, 1.08, 1.08);
    head.add(headOutline);
    this.headGroup.add(head);

    // Black Hair (Bob's Burgers cut with bangs and side bobs)
    const hairTopGeo = new THREE.SphereGeometry(0.38, 20, 16);
    hairTopGeo.scale(1.05, 1.1, 1.02);
    const hairTop = new THREE.Mesh(hairTopGeo, hairMat);
    hairTop.position.set(0, 0.08, -0.05);
    const hairTopOutline = new THREE.Mesh(hairTopGeo, outlineMat);
    hairTopOutline.scale.set(1.06, 1.06, 1.06);
    hairTop.add(hairTopOutline);
    this.headGroup.add(hairTop);

    // Hair Bangs (front fringe)
    const bangsGeo = new THREE.BoxGeometry(0.56, 0.22, 0.22);
    const bangs = new THREE.Mesh(bangsGeo, hairMat);
    bangs.position.set(0, 0.22, 0.25);
    const bangsOutline = new THREE.Mesh(bangsGeo, outlineMat);
    bangsOutline.scale.set(1.08, 1.08, 1.08);
    bangs.add(bangsOutline);
    this.headGroup.add(bangs);

    // 4. Iconic Round Black Glasses
    const frameGeo = new THREE.TorusGeometry(0.11, 0.022, 12, 24);
    const glassFrameMat = new THREE.MeshBasicMaterial({ color: PALETTE.ink });
    const lensMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });

    // Left Frame & Lens
    const leftFrame = new THREE.Mesh(frameGeo, glassFrameMat);
    leftFrame.position.set(-0.14, 0.05, 0.34);
    const leftLens = new THREE.Mesh(new THREE.CircleGeometry(0.09, 16), lensMat);
    leftLens.position.set(-0.14, 0.05, 0.33);
    this.headGroup.add(leftFrame);
    this.headGroup.add(leftLens);

    // Right Frame & Lens
    const rightFrame = new THREE.Mesh(frameGeo, glassFrameMat);
    rightFrame.position.set(0.14, 0.05, 0.34);
    const rightLens = new THREE.Mesh(new THREE.CircleGeometry(0.09, 16), lensMat);
    rightLens.position.set(0.14, 0.05, 0.33);
    this.headGroup.add(rightFrame);
    this.headGroup.add(rightLens);

    // Glasses Bridge
    const bridgeGeo = new THREE.BoxGeometry(0.08, 0.02, 0.02);
    const bridge = new THREE.Mesh(bridgeGeo, glassFrameMat);
    bridge.position.set(0, 0.05, 0.34);
    this.headGroup.add(bridge);

    // Cartoon Eyes (Behind glasses)
    const eyeMat = new THREE.MeshBasicMaterial({ color: PALETTE.ink });
    const eyeGeo = new THREE.CircleGeometry(0.025, 12);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.14, 0.05, 0.345);
    this.headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.14, 0.05, 0.345);
    this.headGroup.add(rightEye);

    // Cute Smile (Line curve)
    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.08, -0.15, 0.33),
      new THREE.Vector3(0, -0.21, 0.35),
      new THREE.Vector3(0.08, -0.15, 0.33)
    );
    const smilePoints = smileCurve.getPoints(16);
    const smileGeo = new THREE.BufferGeometry().setFromPoints(smilePoints);
    const smileLine = new THREE.Line(smileGeo, new THREE.LineBasicMaterial({ color: PALETTE.ink, linewidth: 3 }));
    this.headGroup.add(smileLine);

    this.group.add(this.headGroup);
  }

  /**
   * Updates idle breathing and mouse cursor tracking.
   */
  public update(time: number, targetLookAt: THREE.Vector2) {
    // Breathing motion (hoodie subtle swell)
    const breath = Math.sin(time * 2.2) * 0.02;
    this.bodyGroup.scale.set(1 + breath * 0.5, 1 + breath, 1 + breath * 0.5);

    // Arms subtle gentle sway
    this.leftArm.rotation.z = 0.2 + Math.sin(time * 2.2 + 0.5) * 0.02;
    this.rightArm.rotation.z = -0.2 - Math.sin(time * 2.2 + 0.5) * 0.02;

    // Head tracks mouse cursor with limits
    const maxLookX = 0.35;
    const maxLookY = 0.25;
    const targetRotY = THREE.MathUtils.clamp(-targetLookAt.x * 0.5, -maxLookX, maxLookX);
    const targetRotX = THREE.MathUtils.clamp(-targetLookAt.y * 0.3, -maxLookY, maxLookY);

    this.headGroup.rotation.y = THREE.MathUtils.lerp(this.headGroup.rotation.y, targetRotY, 0.08);
    this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, targetRotX, 0.08);
  }
}
