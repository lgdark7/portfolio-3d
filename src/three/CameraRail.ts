import * as THREE from 'three';

export interface CameraWaypoint {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

/**
 * 3D Spline Camera Rail connecting the 6 portfolio stations:
 * 0: Studio Hub (Full wide isometric view)
 * 1: Web Engineering (Over-the-shoulder monitor closeup)
 * 2: Art & Lab (Wall gallery frames & shelves)
 * 3: About & Skills (Filing cabinet with decals)
 * 4: Thoughts (Desk reading & chalkboard special)
 * 5: Archive & Connect (Studio lounge & contact pinboard)
 */
export class CameraRail {
  private waypoints: CameraWaypoint[];
  private currentPos: THREE.Vector3;
  private currentTarget: THREE.Vector3;
  private targetPos: THREE.Vector3;
  private targetLookAt: THREE.Vector3;

  constructor() {
    this.waypoints = [
      // 0: Studio Hub (Wide establishing overview)
      {
        position: new THREE.Vector3(0.0, 2.8, 6.8),
        target: new THREE.Vector3(0.0, 1.6, 0.0)
      },
      // 1: Web Engineering (Focus on desktop monitor)
      {
        position: new THREE.Vector3(-2.2, 2.3, 0.6),
        target: new THREE.Vector3(-2.4, 2.2, -1.8)
      },
      // 2: Art & Creative Lab (High pan toward hanging art frames)
      {
        position: new THREE.Vector3(1.8, 4.2, 1.8),
        target: new THREE.Vector3(2.0, 4.6, -3.8)
      },
      // 3: About & Skills (Filing cabinet drawers)
      {
        position: new THREE.Vector3(2.4, 1.9, 0.8),
        target: new THREE.Vector3(2.4, 1.5, -1.8)
      },
      // 4: Thoughts & Notebook (Cozy desk angle)
      {
        position: new THREE.Vector3(-0.8, 2.4, 1.2),
        target: new THREE.Vector3(2.0, 4.2, -3.8)
      },
      // 5: Connect Terminal & Distribution (Focus on bulletin pinboard & distribution channels)
      {
        position: new THREE.Vector3(-3.2, 3.4, 0.4),
        target: new THREE.Vector3(-4.5, 3.6, -3.85)
      }
    ];

    this.currentPos = this.waypoints[0].position.clone();
    this.currentTarget = this.waypoints[0].target.clone();
    this.targetPos = this.waypoints[0].position.clone();
    this.targetLookAt = this.waypoints[0].target.clone();
  }

  /**
   * Sample the spline at continuous progress [0.0, 5.0].
   */
  public update(
    camera: THREE.PerspectiveCamera,
    progress: number,
    mouseOffset: THREE.Vector2,
    deltaTime = 0.016
  ) {
    const clampedProgress = Math.max(0, Math.min(this.waypoints.length - 1, progress));
    const baseIndex = Math.floor(clampedProgress);
    const frac = clampedProgress - baseIndex;
    const nextIndex = Math.min(this.waypoints.length - 1, baseIndex + 1);

    const p0 = this.waypoints[baseIndex].position;
    const p1 = this.waypoints[nextIndex].position;
    const t0 = this.waypoints[baseIndex].target;
    const t1 = this.waypoints[nextIndex].target;

    // Smooth hermite / smoothstep curve
    const smoothFrac = frac * frac * (3 - 2 * frac);

    this.targetPos.lerpVectors(p0, p1, smoothFrac);
    this.targetLookAt.lerpVectors(t0, t1, smoothFrac);

    // Apply subtle pointer parallax
    const parallaxX = mouseOffset.x * 0.35;
    const parallaxY = mouseOffset.y * 0.25;

    this.targetPos.x += parallaxX;
    this.targetPos.y += parallaxY;

    // Critically damped camera smoothing
    const lerpFactor = 1.0 - Math.exp(-6.5 * deltaTime);
    this.currentPos.lerp(this.targetPos, lerpFactor);
    this.currentTarget.lerp(this.targetLookAt, lerpFactor);

    camera.position.copy(this.currentPos);
    camera.lookAt(this.currentTarget);
  }
}
