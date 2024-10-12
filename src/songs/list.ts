import LuminousMemory from './100-luminous-memory.mp3';
import Cosmica from './110-cosmica.mp3';
import PrimevalTexture from './120-primeval-texture.mp3';
import OneFR from './130-1fr.mp3';
import Protoflicker from './140-protoflicker.mp3';
import Supernova from './150-supernova.mp3';
import InfinityHeaven from './160-infinity-heaven.mp3';
import ShadesOfLightInATranscendentRealm from './170-shades-of-light-in-a-transcendent-realm.mp3';
import InvertedWorld from './180-inverted-world.mp3';
import Goodtek from './190-goodtek.mp3';
import Overwhelm from './200-overwhelm.mp3';
import GrievousLady from './210-grievous-lady.mp3';
import Heavensdoor from './240-heavensdoor.mp3';
import GloryRoad from './250-glory-road.mp3';

export interface Song {
  id: string;
  bpm: number;
  path: string;
  title: string;
  artist: string;
}
export const list: Song[] = [
  {
    id: 'luminousmemory',
    bpm: 100,
    artist: 'ミツキヨ',
    path: LuminousMemory,
    title: 'Luminous memory',
  },
  {
    id: 'cosmica',
    bpm: 110,
    artist: 'Nhato',
    path: Cosmica,
    title: 'Cosmica',
  },
  {
    id: 'primevaltexture',
    bpm: 120,
    artist: 'くるぶっこちゃん',
    path: PrimevalTexture,
    title: 'Primeval Texture',
  },
  {
    id: 'onefr',
    bpm: 130,
    artist: 'WHITEFISTS',
    path: OneFR,
    title: '1F√',
  },
  {
    id: 'protoflicker',
    bpm: 140,
    artist: 'Silentroom',
    path: Protoflicker,
    title: 'Protoflicker',
  },
  {
    id: 'supernova',
    bpm: 150,
    artist: 'BACO',
    path: Supernova,
    title: 'SUPERNOVA',
  },
  {
    id: 'infinityheaven',
    bpm: 160,
    artist: 'HyuN',
    path: InfinityHeaven,
    title: 'Infinity Heaven',
  },
  {
    id: 'shadesoflightinatranscendentrealm',
    bpm: 170,
    artist: 'ak+q',
    path: ShadesOfLightInATranscendentRealm,
    title: 'Shades of Light in a Transcendent Realm',
  },
  {
    id: 'invertedworld',
    bpm: 180,
    artist: 'ARForest',
    path: InvertedWorld,
    title: 'Inverted World',
  },
  {
    id: 'goodtek',
    bpm: 190,
    artist: 'EBIMAYO',
    path: Goodtek,
    title: 'GOODTEK',
  },
  {
    id: 'overwhelm',
    bpm: 200,
    artist: 'xi',
    path: Overwhelm,
    title: 'Overwhelm',
  },
  {
    id: 'grievouslady',
    bpm: 210,
    artist: 'Team Grimoire vs Laur',
    path: GrievousLady,
    title: 'Grievous Lady',
  },
  {
    id: 'heavensdoor',
    bpm: 240,
    artist: 'LeaF',
    path: Heavensdoor,
    title: 'Heavensdoor',
  },
  {
    id: 'gloryroad',
    bpm: 250,
    artist: 'uma vs. モリモリあつし',
    path: GloryRoad,
    title: 'GLORY：ROAD',
  },
  
];
