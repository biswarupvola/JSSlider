class slider {

    constructor(objct){
        this.container = document.getElementById(objct.id);
        this.numberOfSlideToShow = objct.numberOfSlideToShow ? objct.numberOfSlideToShow : 1;
        this.totalSlidesNumber = [];
        this.totalStack = 0;
        this.currentIndex = 0;
        this.margin = objct.margin ? objct.margin : 2;
        this.slideWidth = ( 100 / this.numberOfSlideToShow ) - this.margin * 2;
        this.slidingCount = objct.slidingCount ? objct.slidingCount : this.numberOfSlideToShow;
        this.stackWidth = [0];

        console.log("this.slidingCount"+this.slidingCount);

        this.arrowsLeft =  document.createElement("span");
        this.arrowsRight =  document.createElement("span");
        this.arrowsLeft.setAttribute("class", "left-arrow arrow");
        this.arrowsRight.setAttribute("class", "right-arrow arrow");
        
        this.addStyle(); 
        this.appendArrows();
        this.calculateSlides(
            this.addEvents()
        );
    }
    calculateSlides(eventsCallback){
        let sliderMotionWidth, slideWidth, calculateMargin;
        for (let i = 0; i < this.container.childNodes.length; i++) {
            if(this.container.childNodes[i].classList != undefined ){
                if (this.container.childNodes[i].classList.contains("slide-motion")) {
                    let slidesDom = this.container.childNodes[i].childNodes[1].children;
                    sliderMotionWidth = this.container.childNodes[i].offsetWidth;
                    calculateMargin = (this.margin/100 *sliderMotionWidth) * 2;
                    for (let k = 0; k < slidesDom.length; k++) {
                        this.totalSlidesNumber.push(slidesDom[k]);
                        slidesDom[k].style.width = this.slideWidth+"%";  
                        slidesDom[k].style.margin = this.margin+"%";  
                        slideWidth = slidesDom[k].offsetWidth + calculateMargin;
                    }
                }   
            }  
        }
        let totalStckRnd = Math.round(this.totalSlidesNumber.length / this.slidingCount);
        let totalStckntRnd = this.totalSlidesNumber.length / this.slidingCount;
        this.totalStack = totalStckRnd;
        if(totalStckntRnd > totalStckRnd){
            this.totalStack = totalStckRnd + 1;
        } 
        console.log("this.totalStack",this.totalStack);
        for(let h=0; h< this.totalStack; h++){
            let diff = (sliderMotionWidth) - slideWidth * this.slidingCount;
            if(h > 0){
                this.stackWidth.push( (sliderMotionWidth - diff) * h);
                this.addBullets();
            }
        }
        eventsCallback;
    } 
    addBullets(){
        let dots = document.createElement("span");
        dots.setAttribute("class", "slides-dots");
        this.container.appendChild(dots);
    }
    addStyle(){
       //add width of slide content
       
    }
    appendArrows(){
        this.container.appendChild(this.arrowsLeft);
        this.container.appendChild(this.arrowsRight);
    }
    addEvents(){
        this.arrowsLeft.addEventListener("click", ()=>{
            this.slidePrev();
        });
        this.arrowsRight.addEventListener("click", ()=>{
            this.slideNext();
        });
    }
    slideNext(){
        if(this.stackWidth[this.currentIndex] != undefined && this.currentIndex < this.stackWidth.length-1){
            this.currentIndex ++;
            console.log("next",this.stackWidth[this.currentIndex])
            console.log(this.stackWidth)
            document.getElementById("slide-path").style.transform = 'translateX(-'+this.stackWidth[this.currentIndex]+'px)';
        }
    }
    slidePrev(){
        if( this.stackWidth[this.currentIndex] != undefined && this.currentIndex > 0 ){
            this.currentIndex --;
            console.log("prev",this.stackWidth[this.currentIndex]);
            console.log(this.stackWidth);
            document.getElementById("slide-path").style.transform = 'translateX(-'+this.stackWidth[this.currentIndex]+'px)';
        }
     }
}