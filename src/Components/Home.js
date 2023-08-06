import { useRecoilState, useRecoilValue } from "recoil";
import { cameraAtom, scannedUrlAtom } from "../Recoil";
import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Scanner from "./Scanner";
import Button from "./Button";
import Upload from "./Upload";

function Home() {

    const [camera, setCamera] = useRecoilState(cameraAtom);
    const scannedUrl = useRecoilValue(scannedUrlAtom);

    useEffect(() => {
        //Redirect to new URL, similar to windlow.location.href
        if(scannedUrl) window.location = scannedUrl;
    }, [scannedUrl]);

    function handleOn() {
        async function getCameraId() {
            try {
                const devices = await Html5Qrcode.getCameras();
                console.log(devices);
                if(devices && devices.length) {
                    setCamera(devices[0].id);
                } else {
                    console.error(`No camera found`);
                }
            } catch(err) {
                console.error(err);
            }
        }

        getCameraId();
    }

    function handleOff() {
        setCamera('');
    }

  return (
    <div className="flex flex-col items-center">
        <span className="m-3 p-3 font-bold text-3xl flex justify-center select-none">
            Scanner App
        </span>
        <Scanner />
        <div className="flex flex-row justify-center items-center">
            {!camera && <Button btnText="Start Scanning" handleClick={handleOn} />}
            {camera && <Button btnText="Cancel Scan" handleClick={handleOff} />}
        </div>
        <span className="my-2 w-[90%] h-[0.5px] bg-black"></span>
        <span className="m-2 p-2 font-bold text-xl flex justify-center">
            Or Upload an Image
        </span>
        <Upload />
    </div>
  )
}

export default Home;