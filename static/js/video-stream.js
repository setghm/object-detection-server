// Check media devices support.
function videoStreamSupport() {
    return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices
}

function mobileVideoConstraints(frontCamera=false) {
    return {
        video: {
            facingMode: frontCamera ? 'user' : 'environment'
        }
    }
}

function desktopVideoConstraints(deviceId) {
    return {
        video: true,
        deviceId: deviceId
    }
}

async function videoDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
	return devices.filter(device => device.kind === 'videoinput')
}

function processVideoStream(video) {
    const image = document.createElement('canvas')
    const ctx = image.getContext('2d')

    const callback = (number, metadata) => {
        // Extract the current video frame.
        image.width = video.videoWidth
        image.height = video.videoHeight
        ctx.drawImage(video, 0, 0, image.width, image.height)

        // When the frame image is extracted, detect the objects in it.
        image.toBlob(detectObjects, 'image/png')
        
        setTimeout(() => {
            // Repeat the process in the next frame.
            video.requestVideoFrameCallback(callback)
        }, 1000);
    }

    video.requestVideoFrameCallback(callback)
}
