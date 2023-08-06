import { useSetRecoilState } from "recoil";
import { scannedUrlAtom } from "../Recoil";
import { Html5Qrcode } from "html5-qrcode";

function Upload() {

    const setScannedUrl = useSetRecoilState(scannedUrlAtom);

    async function handleFileChange(e) {
        const html5Qrcode = new Html5Qrcode("scanner");

        if (e.target.files.length === 0) return; //no file selected

        const imageFile = e.target.files[0];

        try {
            const decodedText = await html5Qrcode.scanFile(imageFile, true);
            console.log(decodedText);
            setScannedUrl(decodedText);
        } catch (err) {
            //handle decoding failure
            console.log(`Error scanning file. Reason: ${err}`);
        }
    };

    return (
        <div className="m-3">
            <label className="p-3 w-fit border-2 border-black hover:bg-slate-200 hover:shadow-lg active:shadow-lg active:bg-slate-600 active:text-white">
                Choose File
                <input
                    id="qr-input-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange} />
            </label>
        </div>
    )
}

export default Upload;