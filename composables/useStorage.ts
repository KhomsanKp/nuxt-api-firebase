import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

export const useProgress = () => {
    return useState<Number>('progress', () => 0)
}

export const useImageUrl = () => {
    return useState<String>('imageUrl', () => '')
}

export const useFileName = () => {
    return useState<String>('fileName', () => '')
}

export const useResetStorage = () => {
    const progress = useProgress()
    const imageUrl = useImageUrl()
    const fileName = useFileName()

    progress.value = 0
    imageUrl.value = ''
    fileName.value = ''

    console.log(progress.value, imageUrl.value, fileName.value)
    return 'Reset success'
}

export const useUpload = (fileVal: any) => {
    const { $storage } = useNuxtApp()
    const progress = useProgress()
    const imageUrl = useImageUrl()
    const fileName = useFileName()

    const imageName = 'user_' + Date.now().toString();

    const userImageFile = fileVal;
    const userRef = storageRef($storage, `users/${imageName}`)
    const metadata = {
        contentType: 'image/jpeg'
    };

    if (userImageFile !== null) {

        const uploadTask = uploadBytesResumable(userRef, userImageFile, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progressValue + '% done');
                progress.value = Math.round(progressValue);
                fileName.value = imageName;
                // switch (snapshot.state) {
                //     case 'paused':
                //         console.log('Upload is paused');
                //         break;
                //     case 'running':
                //         console.log('Upload is running');
                //         break;
                // }
            },
            (error) => {
                console.log('Upload Fail', error)
            },
            () => {
                console.log('Upload successful')
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    imageUrl.value = url
                })
            }
        )
    }

    return 'Upload success'
}

export const useDelete = async (imageName: String) => {
    const { $storage } = useNuxtApp()

    const userRef = storageRef($storage, `users/${imageName}`)

    await deleteObject(userRef).then(() => {
        console.log('Delete image success')
    }).catch((error) => {
        console.log('Delete image file! => ', error)
    })

    return 'Delete success'
}