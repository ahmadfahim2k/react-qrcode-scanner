import { atom } from "recoil";

export const cameraAtom = atom({
    key: 'camera',
    default: ''
});

export const scannedUrlAtom = atom({
    key: 'scannedUrl',
    default: ''
});