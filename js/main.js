function setup()
{
    // Add signals for all showcases
    document.querySelectorAll(".showcase").forEach(showcase=>{
        let indicator = showcase.nextElementSibling;
        for(let i = 0; i < showcase.childElementCount; ++i)
        {
            let signal = document.createElement("DIV");
            signal.classList.add("signal");
            indicator.appendChild(signal);
        }
    });
    document.querySelectorAll(".showcase").forEach((showcase)=>{
        showcase.addEventListener("scroll", ()=>{
            let firstChild = showcase.children[0];
            let margin = parseFloat(getComputedStyle(firstChild).getPropertyValue("margin-right").replace("px", ""));
            let perc = showcase.scrollLeft / ((showcase.childElementCount-1)*(firstChild.clientWidth+margin)); // 0 - 1
            let each = 1 / (showcase.childElementCount-1); // 33% for 4 elements
            let index1 = parseInt(perc / each);
            let op1 = perc % each;
            let a = showcase.nextElementSibling.children;
            a[index1].style.opacity = map(op1, 0, each, 1, 0.2);
            a[index1+1].style.opacity = map(op1, 0, each, 0.2, 1);
            for(let i = 0; i < showcase.childElementCount; ++i)
            {
                if(i != index1 && i != index1+1) {
                    a[i].style.opacity = 0.2;
                }
            }
        });
    });
}