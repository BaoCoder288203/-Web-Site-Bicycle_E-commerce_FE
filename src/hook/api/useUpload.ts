import { setMe, setAvatar } from '@/store/slices/user.slice'
import { uploadSingleImage } from "@/services/Upload.service";
import { useDispatch } from 'react-redux';
function useUpload() {
    const dispatch = useDispatch();
    const handleUploadSingleImage = async (image: any) => {
        const response = await uploadSingleImage(image);
        console.log("check response in useUpload: ", response);
        return response.imageUrl;
    }
    return { handleUploadSingleImage };
}

export default useUpload;