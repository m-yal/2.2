import fetch from 'cross-fetch';//used https://openbase.com/js/cross-fetch  instead

const url = "https://api.ipify.org/?format=json";


async function getIP(url:string): Promise<string> {
    const res = await fetch(url);
    const data = await res.text();
    console.log(data);
    return data;
}

const ip = getIP(url);