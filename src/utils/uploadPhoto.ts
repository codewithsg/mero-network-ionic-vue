import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

export function usePhotoGallery() {
    const photos = ref<UserPhoto[]>([]);
    const PHOTO_STORAGE = 'photos';

    const loadSaved = async () => {
        const photoList = await Preferences.get({ key: PHOTO_STORAGE });
        const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

        // if running on web
        if (!isPlatform('hybrid')) {
            for (const photo of photosInPreferences) {
                const file = await Filesystem.readFile({
                    path: photo.filePath,
                    directory: Directory.Data,
                });
                photo.webViewPath = `data:image/jpeg;base64,${file.data}`;
            }
        }
        photos.value = photosInPreferences;
    }

    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(photo, fileName);
        // console.log('photo:', photo, ' ', fileName)
        // const savedFileImage = {
        //     filePath: fileName,
        //     webViewPath: photo.webPath
        // };
        photos.value = [savedFileImage, ...photos.value];
        // console.log('saved:', savedFileImage);
        return savedFileImage;
    };

    const convertBlobToBase64 = (blob: Blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });

    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
        let base64Data: string;

        //hybrid will detect mobile- ios or Android
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!,
            });
            base64Data = file.data;

        } else {
            //fetch the photo, read as blob, then convert to base64 format
            const response = await fetch(photo.webPath!);
            const blob = response.blob()
            base64Data = (await convertBlobToBase64(await blob)) as string;
        }



        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data
        });

        if (isPlatform('hybrid')) {
            //display the new image by rewritting the 'file://' pat hto HTTP
            //details: https://iconicframework.com/docs/building/webview#file-protocol
            return {
                filePath: savedFile.uri,
                webViewPath: Capacitor.convertFileSrc(savedFile.uri)
            }
        } else {

            return {
                filePath: fileName,
                webViewPath: photo.webPath
            }
        }
    }

    const deletePhoto = async (photo: UserPhoto) => {
        // remove this photo from the photos reference data array
        photos.value = photos.value.filter((p) => p.filePath !== photo.filePath);

        // delete photo file from filesystem
        const filename = photo.filePath.substr(photo.filePath.lastIndexOf('/') + 1);
        await Filesystem.deleteFile({
            path: filename,
            directory: Directory.Data,
        });
    };

    const cachedPhotos = () => {
        Preferences.set({
            key: PHOTO_STORAGE,
            value: JSON.stringify(photos.value)
        });
    };

    onMounted(loadSaved);

    watch(photos, cachedPhotos)

    return {
        takePhoto,
        photos,
        deletePhoto
    }
}



export interface UserPhoto {
    filePath: string;
    webViewPath?: string;
}