const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

async function detectObjects(data) {
    try {
        const response = await fetch('/object-detect', {
            method: 'POST',
            headers: {
                'Content-Type': 'image/png'
            },
            body: data,
        })
        const detectedObjects = await response.json()
        drawDetectedObjects(detectedObjects)
    } catch (e) {
        console.error(e)
    }
}

function drawDetectedObjects(objects) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    console.log('Detected objects: ', objects)

    objects.forEach(object => {
        coords = {
            x1: object.box_points[0],
            y1: object.box_points[1],
            x2: object.box_points[2],
            y2: object.box_points[3],
        }

        ctx.strokeRect(coords.x1, coords.y1, coords.x2 - coords.x1, coords.y2 - coords.y1)
        //ctx.roundRect(coords.x1, coords.y1, coords.x2 - coords.x1, coords.y2 - coords.y1, 4)
    })
}

function resizeDetectionCanvas(width, height) {
    canvas.width = width
    canvas.height = height
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
