const video = document.querySelector('video')

// First, check if the media devices API is supported.
if (videoStreamSupport()) {
	// Now check if the platform is mobile.
	if (isMobile) {
		const mobileCameraToggleButton = document.getElementById('mobile-camera-toggle')
		mobileCameraToggleButton.classList.remove('hidden')

		let frontCamera = false;

		mobileCameraToggleButton.addEventListener('click', () => {
			frontCamera = !frontCamera;
			startVideoStream(mobileVideoConstraints(frontCamera))
		})

		startVideoStream(mobileVideoConstraints(frontCamera))
	} else {
		const desktopCameraChooseDiv = document.querySelector('.desktop-camera-choose')
		const desktopCameraSelect = document.querySelector('.desktop-camera-select')
		const desktopStartButton = document.getElementById('desktop-start-button')
		desktopCameraChooseDiv.classList.remove('hidden')

		platformOnError = () => {
			desktopCameraChooseDiv.classList.add('hidden')
		}

		desktopStartButton.addEventListener('click', () => {
			desktopCameraChooseDiv.classList.add('hidden')
			startVideoStream(desktopVideoConstraints(desktopCameraSelect.value))
		})

		const desktopUpdateCameraSelect = async () => {
			const devices = await videoDevices();
		
			if (devices.length !== 0) {
				let cameraNumber = 1
		
				const options = devices.map(dev => {
					const cameraName = dev.label.length === 0 ? `Camera ${cameraNumber++}` : dev.label
					return `<option value="${dev.deviceId}">${cameraName}</option>`
				})
			
				desktopCameraSelect.innerHTML = options.join('')
			} else {
				displayError('No video devices were found')
			}
		}

		desktopUpdateCameraSelect()
	}
} else {
	displayError('Your browser doesn\'t support this feature')
}

function startVideoStream(constraints) {
	if (video.srcObject) {
		video.srcObject.getTracks().forEach(track => {
			track.stop()
			video.srcObject.removeTrack(track)
		});
	}

	navigator.mediaDevices.getUserMedia(constraints)
	.then(stream => {
		video.srcObject = stream
		video.addEventListener('loadedmetadata', () => resizeDetectionCanvas(video.videoWidth, video.videoHeight))
		processVideoStream(video)
	})
	.catch(e => displayError(e))
}
