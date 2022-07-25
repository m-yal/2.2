import fetch from 'cross-fetch';//used https://openbase.com/js/cross-fetch  instead

async function getMyIp(url:string) {
    try {
        await fetch(url) //used https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch#%D0%B7%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B8
            .then(data =>  {
                return data.text();
            })
            .then(result => {
                console.log(result);
            });
    } catch (error) {
        console.error(error);
    }
    
}

const url = "https://api.ipify.org/?format=json";
getMyIp(url);