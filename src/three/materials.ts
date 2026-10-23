import * as THREE from 'three';

/**
 * Creates a discrete 4-step luminance gradient texture for cartoon/cel shading.
 */
export function createToonGradientMap(): THREE.DataTexture {
  const steps = 4;
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) {
    data[i] = Math.floor((i / (steps - 1)) * 255);
  }
  const texture = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

export const toonGradient = createToonGradientMap();

/**
 * Palette colors matching Lynn Fisher 2018 / Bob's Burgers aesthetic.
 */
export const PALETTE = {
  ink: 0x14303f,          // Outline and deepest line art
  paper: 0xfcf9f5,        // Cream room walls & floor
  paperDark: 0xf0e7db,    // Shadowed paper
  hoodie: 0xe45c4c,       // Lynn's iconic red hoodie
  hoodieDark: 0xc73f2f,
  cheese: 0xffd166,       // Warm golden yellow for lamp & burger
  mint: 0x06d6a0,         // Cactus & plant mint
  denim: 0x118ab2,        // Jeans & blue accents
  wood: 0xdfb489,         // Light birch desk
  woodDark: 0xb58451,
  metal: 0x4a5d6e,        // Filing cabinet slate
  metalLight: 0xa9b7c6,   // Desk legs & handles
  white: 0xffffff,
  skin: 0xf7d1ba,         // Warm cartoon skin
  hair: 0x222222,         // Dark hair
  glass: 0x90e0ef,        // Window glass
  chalkboard: 0x1d3557,   // Deep slate chalkboard
};

/**
 * Creates an ink-outlined cartoon mesh with Bob's Burgers style line work.
 */
export function createCartoonMesh(
  geometry: THREE.BufferGeometry,
  color: number,
  outlineThickness = 0.02
): THREE.Group {
  const group = new THREE.Group();

  // Core Toon Material
  const material = new THREE.MeshToonMaterial({
    color,
    gradientMap: toonGradient,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  // Inverted Hull Outline (Dark ink boundary)
  if (outlineThickness > 0) {
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: PALETTE.ink,
      side: THREE.BackSide,
    });
    const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
    outlineMesh.scale.multiplyScalar(1 + outlineThickness);
    group.add(outlineMesh);
  }

  return group;
}

/**
 * Creates a flat line-art edge overlay for geometric precision.
 */
export function createLineEdges(
  geometry: THREE.BufferGeometry,
  thresholdAngle = 24,
  color = PALETTE.ink
): THREE.LineSegments {
  const edges = new THREE.EdgesGeometry(geometry, thresholdAngle);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color, linewidth: 2 })
  );
  return line;
}
