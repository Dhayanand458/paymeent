document.addEventListener('DOMContentLoaded', function() {
    let downloadQrBtn = document.getElementById('downloadQrBtn');
    let viewQrBtn = document.getElementById('viewQrBtn');
    let qrCode = document.getElementById('qrCode');
    let timerDuration = 60 * 1000; // 60 seconds

    // Helper function to start timer and redirect after 60 seconds
    function startTimer() {
        let startTime = Date.now();
        localStorage.setItem('timerStart', startTime);

        let timerInterval = setInterval(function() {
            let currentTime = Date.now();
            let timePassed = currentTime - startTime;

            if (timePassed >= timerDuration) {
                clearInterval(timerInterval);
                localStorage.removeItem('timerStart');
                window.location.href = 'payment2.html';
            }
        }, 1000);
    }

    // Check if the timer already started
    if (localStorage.getItem('timerStart')) {
        let startTime = parseInt(localStorage.getItem('timerStart'));
        let currentTime = Date.now();
        let timePassed = currentTime - startTime;

        // If more than 60 seconds have passed, redirect immediately
        if (timePassed >= timerDuration) {
            window.location.href = 'payment2.html';
        } else {
            // Otherwise, continue the timer from where it left off
            setTimeout(function() {
                window.location.href = 'payment2.html';
            }, timerDuration - timePassed);
        }
    }

    // QR code download button click handler
    downloadQrBtn.addEventListener('click', function() {
        let link = document.createElement('a');
        link.href = 'qrcode.jpg';
        link.download = 'qrcode.jpg';
        link.click();
        startTimer();
    });

    // View QR code button click handler
    viewQrBtn.addEventListener('click', function() {
        qrCode.classList.remove('blurred');
        startTimer();
    });
});
