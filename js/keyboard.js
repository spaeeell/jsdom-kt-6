document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    const lightbox = document.getElementById('overlay');
    const isLightboxOpen = lightbox.classList.contains('show');
    
    if (!isLightboxOpen) {
        if (key === 'ArrowLeft') {
            const leftArrow = document.querySelector('.arrow-left');
            if (leftArrow) leftArrow.click();
            event.preventDefault();
        }
        else if (key === 'ArrowRight') {
            const rightArrow = document.querySelector('.arrow-right');
            if (rightArrow) rightArrow.click();
            event.preventDefault();
        }
    }

        if (key === 'Escape' && isLightboxOpen) {
        const closeBtn = document.getElementById('close-lightbox');
        if (closeBtn) closeBtn.click();
        event.preventDefault();
    }
});
