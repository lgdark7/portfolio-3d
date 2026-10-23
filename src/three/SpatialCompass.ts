import * as THREE from 'three';
import { SPATIAL_STATIONS } from '../data/portfolioData';
import { PALETTE, toonGradient, createCartoonMesh } from './materials';

export class SpatialCompass {
  public group: THREE.Group;
  public badgeMeshes: THREE.Group[] = [];
  public interactiveObjects: THREE.Object3D[] = [];
  private ringMesh: THREE.Group;
  private pointerArrow: THREE.Group;
  private targetRotY: number = 0;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'spatial-compass-3d';

    // Positioned in 3D space as a floating spatial artifact
    this.group.position.set(0, 0.45, 3.2);

    // 1. Orbital Ring
    const ringGeo = new THREE.TorusGeometry(1.4, 0.04, 12, 48);
    ringGeo.rotateX(Math.PI / 2);
    this.ringMesh = createCartoonMesh(ringGeo, PALETTE.ink, 0.02);
    this.group.add(this.ringMesh);

    // Subtle inner compass disc
    const discGeo = new THREE.CircleGeometry(1.36, 32);
    discGeo.rotateX(-Math.PI / 2);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    this.group.add(new THREE.Mesh(discGeo, discMat));

    // 2. Central Directional Pointer Arrow
    const arrowGeo = new THREE.ConeGeometry(0.12, 0.45, 4);
    arrowGeo.rotateX(Math.PI / 2);
    this.pointerArrow = createCartoonMesh(arrowGeo, PALETTE.hoodie, 0.03);
    this.pointerArrow.position.set(0, 0.05, 0.2);
    this.group.add(this.pointerArrow);

    // Center Core Gem
    const coreGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16);
    const coreMesh = createCartoonMesh(coreGeo, PALETTE.cheese, 0.03);
    coreMesh.position.set(0, 0.04, 0);
    this.group.add(coreMesh);

    // 3. Dimensional Spatial Station Badges (0 to 5)
    this.buildStationNodes();
  }

  private buildStationNodes() {
    const totalStations = SPATIAL_STATIONS.length;
    const radius = 1.4;

    SPATIAL_STATIONS.forEach((station, i) => {
      const angle = (i / totalStations) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, 0.04, z);
      nodeGroup.name = `compass-node-${station.id}`;

      // Node base cylinder (pill badge)
      const badgeGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.1, 16);
      const colorNum = parseInt(station.color.replace('#', '0x'), 16);
      const badge = createCartoonMesh(badgeGeo, colorNum, 0.02);
      nodeGroup.add(badge);

      // Node label text canvas on top
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = station.color;
      ctx.fillRect(0, 0, 128, 128);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(station.badge, 64, 64);

      const labelTex = new THREE.CanvasTexture(canvas);
      const labelGeo = new THREE.CircleGeometry(0.2, 16);
      labelGeo.rotateX(-Math.PI / 2);
      const labelMesh = new THREE.Mesh(
        labelGeo,
        new THREE.MeshBasicMaterial({ map: labelTex })
      );
      labelMesh.position.set(0, 0.055, 0);
      nodeGroup.add(labelMesh);

      // Interactive hit box for clicking this station directly
      const hitGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.3, 12);
      const hitMesh = new THREE.Mesh(
        hitGeo,
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitMesh.name = `target-station-${station.id}`;
      hitMesh.userData = {
        interactive: true,
        id: `station-${station.index}`,
        stationIndex: station.index,
        label: `Navigate to ${station.label}`
      };
      nodeGroup.add(hitMesh);
      this.interactiveObjects.push(hitMesh);

      this.badgeMeshes.push(nodeGroup);
      this.group.add(nodeGroup);
    });
  }

  /**
   * Updates compass orientation and highlights active station
   */
  public update(currentProgress: number, time: number) {
    // Gentle hovering oscillation
    this.group.position.y = 0.45 + Math.sin(time * 2) * 0.03;

    // Rotate compass to face current station
    const totalStations = SPATIAL_STATIONS.length;
    const targetAngle = -(currentProgress / totalStations) * Math.PI * 2;
    this.targetRotY = THREE.MathUtils.lerp(this.targetRotY, targetAngle, 0.08);
    this.ringMesh.rotation.y = this.targetRotY * 0.4;

    // Pointer arrow smoothly tracks progress
    this.pointerArrow.rotation.y = -targetAngle + Math.PI / 2;

    // Extrude & highlight active badge
    const activeIndex = Math.round(currentProgress) % totalStations;

    this.badgeMeshes.forEach((badge, idx) => {
      const isActive = idx === activeIndex;
      const targetScale = isActive ? 1.35 : 1.0;
      const targetY = isActive ? 0.12 : 0.04;

      badge.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      badge.position.y = THREE.MathUtils.lerp(badge.position.y, targetY, 0.1);

      if (isActive) {
        badge.rotation.y = Math.sin(time * 3) * 0.1;
      } else {
        badge.rotation.y = 0;
      }
    });
  }
}
