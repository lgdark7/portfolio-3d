import * as THREE from 'three';
import { LightingMode } from '../types/portfolio';

export interface LightPreset {
  ambientColor: number;
  ambientIntensity: number;
  sunColor: number;
  sunIntensity: number;
  sunPos: [number, number, number];
  lampIntensity: number;
  bulbColor: number;
  screenLightIntensity: number;
  bgColor: number;
  fogNear: number;
  fogFar: number;
}

export const LIGHT_PRESETS: Record<LightingMode, LightPreset> = {
  day: {
    ambientColor: 0xfffcf7,
    ambientIntensity: 1.25,
    sunColor: 0xfff3db,
    sunIntensity: 1.4,
    sunPos: [6, 9, 5],
    lampIntensity: 0.0,
    bulbColor: 0xffffff,
    screenLightIntensity: 0.4,
    bgColor: 0xfcf9f5,
    fogNear: 12,
    fogFar: 26,
  },
  sunset: {
    ambientColor: 0xfde2e4,
    ambientIntensity: 1.0,
    sunColor: 0xff9f1c,
    sunIntensity: 1.8,
    sunPos: [9, 3.5, 3],
    lampIntensity: 0.8,
    bulbColor: 0xffbe0b,
    screenLightIntensity: 0.8,
    bgColor: 0xfceade,
    fogNear: 10,
    fogFar: 24,
  },
  night: {
    ambientColor: 0x0f172a,
    ambientIntensity: 0.45,
    sunColor: 0x38bdf8,
    sunIntensity: 0.5,
    sunPos: [-4, 7, -2],
    lampIntensity: 2.8,
    bulbColor: 0xffbe0b,
    screenLightIntensity: 1.8,
    bgColor: 0x090d16,
    fogNear: 8,
    fogFar: 20,
  }
};

export class LightingSystem {
  public ambientLight: THREE.AmbientLight;
  public sunLight: THREE.DirectionalLight;
  public screenLight: THREE.PointLight;
  private currentMode: LightingMode = 'day';

  constructor(scene: THREE.Scene) {
    const preset = LIGHT_PRESETS.day;

    this.ambientLight = new THREE.AmbientLight(preset.ambientColor, preset.ambientIntensity);
    scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(preset.sunColor, preset.sunIntensity);
    this.sunLight.position.set(...preset.sunPos);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 25;
    this.sunLight.shadow.camera.left = -6;
    this.sunLight.shadow.camera.right = 6;
    this.sunLight.shadow.camera.top = 6;
    this.sunLight.shadow.camera.bottom = -6;
    this.sunLight.shadow.bias = -0.0005;
    scene.add(this.sunLight);

    // Glowing screen light on desk
    this.screenLight = new THREE.PointLight(0x06d6a0, preset.screenLightIntensity, 4);
    this.screenLight.position.set(-2.2, 2.2, -1.6);
    scene.add(this.screenLight);

    // Scene Background and Fog
    scene.background = new THREE.Color(preset.bgColor);
    scene.fog = new THREE.Fog(preset.bgColor, preset.fogNear, preset.fogFar);
  }

  public setMode(mode: LightingMode) {
    this.currentMode = mode;
  }

  public update(scene: THREE.Scene, lampSpotLight: THREE.SpotLight, lampBulb: THREE.Mesh, deltaTime = 0.016) {
    const target = LIGHT_PRESETS[this.currentMode];
    const lerpSpeed = 1.0 - Math.exp(-5.0 * deltaTime);

    // Ambient
    this.ambientLight.color.lerp(new THREE.Color(target.ambientColor), lerpSpeed);
    this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, target.ambientIntensity, lerpSpeed);

    // Sun / Moon
    this.sunLight.color.lerp(new THREE.Color(target.sunColor), lerpSpeed);
    this.sunLight.intensity = THREE.MathUtils.lerp(this.sunLight.intensity, target.sunIntensity, lerpSpeed);
    this.sunLight.position.lerp(new THREE.Vector3(...target.sunPos), lerpSpeed);

    // Lamp
    lampSpotLight.intensity = THREE.MathUtils.lerp(lampSpotLight.intensity, target.lampIntensity, lerpSpeed);
    (lampBulb.material as THREE.MeshBasicMaterial).color.lerp(new THREE.Color(target.bulbColor), lerpSpeed);

    // Screen
    this.screenLight.intensity = THREE.MathUtils.lerp(this.screenLight.intensity, target.screenLightIntensity, lerpSpeed);

    // Background & Fog
    const targetBg = new THREE.Color(target.bgColor);
    (scene.background as THREE.Color).lerp(targetBg, lerpSpeed);
    if (scene.fog) {
      scene.fog.color.lerp(targetBg, lerpSpeed);
    }
  }
}
