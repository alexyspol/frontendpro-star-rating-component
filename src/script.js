document.addEventListener('DOMContentLoaded', function() {
    let starRating = -1;
    let hovering = -1;

    class RatingApp {
        constructor(controller) {
            this.$$star = Array.prototype.slice.call(document.querySelectorAll('.star svg'));
            this.$starContainer = document.querySelector('.star-container');
        }

        start() {
            this.$starContainer.addEventListener('mouseout', this.onMouseOut.bind(this));
            
            this.$$star.forEach(($star, i)=> {
                $star.addEventListener('mouseenter', this.onMouseEnter.bind(this));
                $star.addEventListener('click', this.onClick.bind(this));
            });
        }

        onMouseEnter(e) {
            const valueCurrentlyHovering = parseInt(e.currentTarget.parentElement.querySelector('.star-radio').value);

            this.$$star.forEach($star => {
                const eachStarValue = parseInt($star.parentElement.querySelector('.star-radio').value);

                if(eachStarValue <= valueCurrentlyHovering) {
                    $star.classList.add('is-shining');
                }
                else {
                    $star.classList.remove('is-shining');
                }
            });
        }
        
        onMouseOut(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const targetRect = e.currentTarget.getBoundingClientRect();

            if (
                mouseX < targetRect.left ||
                mouseX > targetRect.right ||
                mouseY < targetRect.top ||
                mouseY > targetRect.bottom
                ) {
                    this.$$star.forEach($star => {
                        $star.classList.remove('is-shining');
                    });
                }
        }

        onClick(e) {
            const starRating = parseInt(e.currentTarget.parentElement.querySelector('.star-radio').value);
            this.$starContainer.dataset.rating = starRating;
        }
    }

    const ratingApp = new RatingApp();
    ratingApp.start();
});
