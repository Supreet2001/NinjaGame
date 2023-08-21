score=-0;
cross=true;

audiom=new Audio('peritune-spook4.mp3');
if(typeof audiom.loop=='boolean')
{
    audiom.loop=true;
}
else{
    audiom.addEventListener('ended',()=>{
        this.crrentTime=0;
        this.play();
    },false)
}
jump=new Audio('jump.wav');
gameovera=new Audio('Game Over.mp3');
audiover=new Audio('Game Over (1).mp3');
const play=setTimeout(()=>{audiom.play()},1000);



document.onkeydown=function(e){
    // console.log(e.keyCode);
    if(e.keyCode==38){
        // console.log("up");
        const ninja=document.querySelector('.ninja');
        ninja.classList.add("animateNinja");
        setTimeout(() => {
            ninja.classList.remove("animateNinja");
        }, 700);
        jump.play();
    }
    else if(e.keyCode==39){
        console.log("right");
        const ninja=document.querySelector('.ninja');
        ninjacurrX=parseInt(window.getComputedStyle(ninja,null).getPropertyValue("left"));
        ninja.style.left=ninjacurrX+130+"px";
        
    }
    else if(e.keyCode==37){
        console.log("left");
        const ninja=document.querySelector('.ninja');
        ninjacurrX=parseInt(window.getComputedStyle(ninja,null).getPropertyValue("left"));
        ninja.style.left=ninjacurrX-130+"px";
        
    }
    else if(e.keyCode==69){
        const bg=document.querySelector('.container');
        bg.classList.toggle("container2");
        const scorebox=document.querySelector('.scorecontainer');
        scorebox.classList.toggle("colorwhite");
        const change=document.querySelector('.change');
        change.classList.toggle("colorwhite");
       
        

    }

}

const updateScore=(score)=>{
    const scorebox=document.querySelector('.scorecontainer');
    scorebox.innerHTML=`Your score : ${score}`;
    console.log("heyy");
    
}

setInterval(() => {
    const ninja=document.querySelector('.ninja');
    const dragon=document.querySelector('.obstacle');
    const gameOver=document.querySelector('.gameover');

    nx=parseInt(window.getComputedStyle(ninja,null).getPropertyValue("left"));
    ny=parseInt(window.getComputedStyle(ninja,null).getPropertyValue("top"));

    ox=parseInt(window.getComputedStyle(dragon,null).getPropertyValue("left"));
    oy=parseInt(window.getComputedStyle(dragon,null).getPropertyValue("top"));
    // console.log(nx,ny,ox,oy);
    
    offSetX=Math.abs(nx-ox);
    offSetY=Math.abs(ny-oy);
    // console.log(offSetX,offSetY);
    if(offSetX<103 && offSetY<42){
        audiom.pause();
        // playing.clearInterval();
        audiover.play();
        // gameOver.play();
        
        dragon.style.left=ox+"px";
        setTimeout(()=>{
            dragon.classList.remove("animateDragon")
        },200)
        const scorebox2=document.querySelector('.scorecontainer');
        scorebox2.style.border="2px solid red";
        scorebox2.style.color="red";
        ninja.classList.add("glow");
        // ninja.classList.add("falldown");
        setTimeout(() => {
            ninja.classList.remove("glow");
            // ninja.classList.remove("falldown");
            gameOver.style.visibility="visible";
            ninja.style.left="50px";
            dragon.style.left="1300px";
            
        }, 1000);
        setTimeout(()=>{
            gameovera.play();
        },1200)
    }
    else if(offSetX<100 && cross==true){
        // scorebox.style.color="red";
        score+=10;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000)
        
    }
    if(ox<0){
        console.log("at the end");
        animdur=parseFloat(window.getComputedStyle(dragon,null).getPropertyValue("animation-duration"));
        // console.log(animdur);
        if(animdur>2.5){
            newdur=animdur-0.01+"s";
        }
       
        dragon.style.animationDuration=newdur;
        console.log(newdur);
    }
}, 10);
function refresh(){
    location.reload(true);
}