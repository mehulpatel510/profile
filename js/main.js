let mycanvas = document.getElementById("mycanvas");
let ctx = mycanvas.getContext("2d");

let loadImage = (src,callback) =>{
    let myimage = document.createElement("img");
    myimage.onload = () => callback(myimage);
    myimage.src = src;
};
let imagePath = (frameNo,animationFolder) => {
    return "./images/"+animationFolder+"/"+ String(frameNo)+".png";
};
let frames = {
    backward : [1,2,3,4,5,6],
    forward : [1,2,3,4,5,6],
    block : [1,2,3,4,5,6,7,8,9],
    idle : [1,2,3,4,5,6,7,8],
    kick : [1,2,3,4,5,6,7], 
    punch : [1,2,3,4,5,6,7]
};
let loadImages = (callback) =>{
    let images ={backward:[],forward:[],block:[],idle:[],kick:[],punch:[]};
    let imageCounter = 0;
    ["backward","forward","block","idle","kick","punch"].forEach( (animation)=>{
        let animationFrames = frames[animation];
        imageCounter += animationFrames.length;
        
        animationFrames.forEach((frameNo)=>{
            let path = imagePath(frameNo,animation);
            loadImage(path,(image) => {
                
                images[animation][imageCounter-1] = image;
                
                imageCounter -= 1;
                if (imageCounter === 0){
                    callback(images);
                }
            });
        });
        
    });
};
let animate = (ctx,images,animation, callback) =>{
    console.log(animation);
    console.log(images[animation]);
    images[animation].forEach((image,index) => {
        setTimeout(()=>{
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        },index*100);
    });
    setTimeout(callback,images[animation].length*100);
    };
loadImages((images) => {
    let queuedAnimation = [];
    let selectedAnimation = 'idle';
    let aux = () =>{
        let selectedAnimation ;
        if(queuedAnimation.length ===0)
            selectedAnimation = 'idle';
        else
            selectedAnimation = queuedAnimation.shift();

        animate(ctx,images,selectedAnimation, aux);
    };
    aux();
    document.getElementById("backward").onclick = () => {
        queuedAnimation.push('backward');
    };
    document.getElementById("forward").onclick = () => {
        queuedAnimation.push('forward');
    };
    document.getElementById("block").onclick = () => {
        queuedAnimation.push('block');
    };
    
    document.getElementById("kick").onclick = () => {
        queuedAnimation.push('kick');
    };
    document.getElementById("punch").onclick = () => {
        queuedAnimation.push('punch');
    };
    document.addEventListener("keyup",(event=>{
        const key = event.key;
        console.log(key);
        if(key === "ArrowLeft")
            queuedAnimation.push('backward');
        else if(key === "ArrowRight")
            queuedAnimation.push('forward');
        else if(key === "ArrowUp")
            queuedAnimation.push('punch');
        else if(key === "ArrowDown")
            queuedAnimation.push('kick');
        else if(key === "Clear")
            queuedAnimation.push('block');
    }));
});
