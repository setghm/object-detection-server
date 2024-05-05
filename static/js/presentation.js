const cameraError = document.querySelector('.camera-error')

let platformOnError=()=>{}

function displayError(error) {
	if (typeof error !== 'string') {
		switch (error.name) {
			case 'NotAllowedError':
				error = "Permission not allowed"
			case 'NotFoundError':
				error = "Web camera not found"
			default:
                console.error(error)
				error = "Unknown error ocurred"
		}
	}

	cameraError.classList.remove('hidden')
	cameraError.querySelector('.error-description').textContent = error

	platformOnError()
}

