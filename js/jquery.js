function print(output, style="") {
    if(style!="") console.log(output, style);
    else console.log(output);
}

function map(val, lb, ub, lv, uv) {
    return lv + (val-lb)*(uv-lv)/(ub-lb);
}

class ElementCollection extends Array {
    on(event, callback) {
        this.forEach(element => {
            element.addEventListener(event, callback);
        });
    }

    next() {
        return this.map(e=>e.nextElementSibling).filter(e=>e!=null);
    }

    prev() {
        return this.map(e=>e.previousElementSibling).filter(e=>e!=null);
    }

    addClass(className) {
        this.forEach(e=>e.classList.add(className));
        return this;
    }
    
    removeClass(className) {
    this.forEach(e=>e.classList.remove(className));
        return this;
    }

    before(element) {
        if(typeof element == "string" || element instanceof String)
        {
            const e = document.createElement("DIV");
            e.innerHTML = element.trim();
            element = e.firstChild;
        }
        this.forEach(e=>e.parentNode.insertBefore(element.cloneNode(true), e));
        return this;
    }

    after(element) {
        if(typeof element == "string" || element instanceof String)
        {
            const e = document.createElement("DIV");
            e.innerHTML = element.trim();
            element = e.firstChild;
        }
        this.forEach(e=>e.parentNode.insertBefore(element.cloneNode(true), e.nextElementSibling));
        return this;
    }

    css(property, value="")
    {
        if(typeof property == "object" || property instanceof Object)
        {
            for(const key in property)
            {
                this.css(key, property[key]);
            }
        }
        else if(value=="")
        {
            return Array.from(this, e=>{return getComputedStyle(e).getPropertyValue(property)});
        }
        else
        {
            this.forEach(element=>element.style.setProperty(property, value));
        }
        return this;
    }
}

function $(selector)
{
    if(typeof selector == "string" || selector instanceof String)
    {
        return new ElementCollection(...document.querySelectorAll(selector));
    } else {
        return new ElementCollection(selector);
    }
}