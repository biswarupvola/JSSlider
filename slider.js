class slider {

    constructor(objct){
        this.container = document.getElementById(objct.id);
        this.slideNumber = objct.slidesNumber ? objct.slidesNumber : 3;
        this.totalSlidesNumber = [];
        this.currentIndex = 1;
        this.margin = objct.margin ? objct.margin : 2;
        this.slideWidth = ( 100 / this.slideNumber ) - this.margin * 2;
        this.slidingCount = objct.slidingCount ? objct.slidingCount : this.slideNumber;
        this.stackWidth = 0;

        console.log("this.slidingCount"+this.slidingCount);

        this.arrowsLeft =  document.createElement("span");
        this.arrowsRight =  document.createElement("span");
        this.arrowsLeft.setAttribute("class", "left-arrow arrow");
        this.arrowsRight.setAttribute("class", "right-arrow arrow");
        
        this.addStyle(); 
        this.appendArrows();
        this.addEvents();
        this.calculateSlides();
    }
    calculateSlides(){
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
        let diff = (sliderMotionWidth) - slideWidth * this.slidingCount;
        this.stackWidth = sliderMotionWidth - diff;

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
            this.slideNext();
        });
        this.arrowsRight.addEventListener("click", ()=>{
            this.slidePrev();
        });
    }
    slideNext(){
       console.log(this.stackWidth)
       document.getElementById("slide-path").style.transform = 'translateX(-'+this.stackWidth+'px)';
    }
    slidePrev(){
        console.log(this.stackWidth)
        document.getElementById("slide-path").style.transform = 'translateX('+this.stackWidth+'px)';
     }
}