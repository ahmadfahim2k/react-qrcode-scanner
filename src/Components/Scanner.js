import { useRecoilState, useSetRecoilState } from "recoil";
import { cameraAtom, scannedUrlAtom } from "../Recoil";
import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

function Scanner() {

    const [camera, setCamera] = useRecoilState(cameraAtom);
    const setScannedUrl = useSetRecoilState(scannedUrlAtom);

    useEffect(() => {
        const html5Qrcode = new Html5Qrcode("scanner");
        async function startScanning() {
            try {
                console.log(camera);
                await html5Qrcode.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 200, height: 200 }
                    },
                    (decodedText, decodedResult) => {
                        console.log('decodedText', decodedText);
                        setScannedUrl(decodedText);
                        console.log('decodedResult', decodedResult);
                        setCamera('');
                    })
            } catch (err) {
                //start failed, handle it.
                console.error(err);
            }
        };
        if (camera) startScanning();

        return () => {
            async function stopScanning() {
                try {
                    await html5Qrcode.stop();
                } catch (err) {
                    console.error(err);
                }
            }
            if (camera) stopScanning();
        }
        //eslint-disable-next-line
    }, [camera]);

    return (
        <div id="scanner" className="w-[500px]">

        </div>
    )
}

export default Scanner;