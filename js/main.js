function print(output, style="")
{
    if(style=="")
    {
        console.log(output);
    }
    else
    {
        console.log(output, style);
    }
}

function map(val, lb, ub, lv, uv)
{
    return lv + (val-lb)*(uv-lv)/(ub-lb);
}

function setup()
{
    print("IN SETUP");
}