import fetch from 'cross-fetch';//used https://openbase.com/js/cross-fetch  instead "node-fetch"

//1
let url = "https://api.ipify.org/?format=json";

async function printMyIp(url:string): Promise<void> {
    try {
        const res: Response = await fetch(url);
        const json: {ip: string} = await res.json();
        const ip: string = json["ip"];
        console.log(ip);
    } catch (error) {
        console.log(error);
    }
}
// printMyIp(url);

//2
async function getMyIp(url:string): Promise<string> {
    try {
        const res: Response = await fetch(url);
        const json: {ip: string} = await res.json();
        const ip: string = json.ip;
        return ip;
    } catch (error) {
        console.log(error);
    }
    return "";
}
// let result = getMyIp(url);
// setTimeout(() => {
//     console.log(result);
// }, 5000);

url = "https://random-data-api.com/api/name/random_name";

//3.1
async function get3Names1(url:string): Promise<string[]> {
    const name1: Promise<string> = fetch(url).then(res => res.json()).then(json => json.name).catch((error) => console.log(error));
    const name2: Promise<string> = fetch(url).then(res => res.json()).then(json => json.name).catch((error) => console.log(error));
    const name3: Promise<string> = fetch(url).then(res => res.json()).then(json => json.name).catch((error) => console.log(error));

    const names: string[] = await Promise.all([name1, name2, name3]);
    return names;
}
// let result = get3Names1(url);
// setTimeout(() => {
//     console.log(result);
// }, 5000);

//3.2
async function get3Names2(url:string): Promise<string[]> {
    const responses: Promise<Response>[] = [];
    for (let i = 0; i < 3; i++) {
        responses[i] = fetch(url);
    }

    const names: string[] = [];
    for await (const res of responses) {
        const name: string = await res.json()
            .then((json: {name: Promise<string>}) => json.name)
            .catch((error) => {
                console.log(error);
                return "";
            });
        names.push(name);
    }
    return names;
}
// let result = get3Names2(url);
// setTimeout(() => {
//     console.log(result);
// }, 5000);

//3.3
async function get3Names3(url:string): Promise<string[]> {
    const responses: Promise<Response>[] = [];
    for (let i = 0; i < 3; i++) {
        responses[i] = fetch(url);
    }

    const names: string[] = [];
    for(let i = 0; i < 3; i++) {
        let res: Promise<Response> = responses[i];
        res
            .then((res: Response) => res.json())
            .then((json: {name: string}) => names.push(json.name))
            .catch((error) => {
                console.log(error);
            });
    }
    return names;
}
// let result = get3Names3(url);
// setTimeout(() => {
//     console.log(result);
// }, 5000);

url = "https://random-data-api.com/api/users/random_user";

//4.1 without async/await
async function getFemaleUser1(url: string): Promise<{gender: string} | void> {
    function fetchUser(url: string): Promise<Response> {
        return new Promise(function (resolve, reject) {
            let res: Promise<Response> = fetch(url);
            resolve(res);
        })
    }
    /* Works recursively */
    function fetchUsersUntillMeetFemale(): Promise<void | {gender: string}> {
        return fetchUser(url)
            .then((res: Response): Promise<{gender: string}> => {
                let user: Promise<{gender: string}> = res.json();
                return user;
            })
            .then((user: {gender: string}): {gender: string} => {
                if (user.gender === "Female") {
                    console.log(user);
                    return user;                
                }
                throw new Error("Current input user is not Female");
            })
            .catch((err) => {
                fetchUsersUntillMeetFemale();
            })
    }

    return fetchUsersUntillMeetFemale();        
}
// let result41 = getFemaleUser1(url);

//4.2 with async/await
async function getFemaleUser2(url: string): Promise<{gender: string}> {
    let gender: string = "";
    let user: {gender: string} = {gender: ""};
    while(true) {
        try {
            let res: Response = await fetch(url);
            user = await res.json();
            gender = user.gender;   
        } catch (error) {
            console.log(error);
            break;
        }
        if (gender === "Female") {
            console.log(user);
            return user;
        }
    }
    return {gender: ""};
}
// let result42 = getFemaleUser2(url);
// setTimeout(() => {
//     console.log(result42);
// }, 5000);

//5
async function f2(ip: Promise<string>): Promise<void> {
    console.log(ip);
}
async function f1(ip: Promise<string>, callback:(ip: Promise<string>) => void): Promise<void> {
    callback(ip);
}

// let ip = getMyIp("https://api.ipify.org/?format=json");
// f1(ip, f2);//correct ip issue

//6
async function func1(): Promise<string> {
    return await getMyIp("https://api.ipify.org/?format=json");
}
/* Function to launch */
async function func2(callback:(ip: string) => void): Promise<void> {
    const ip: string = await func1();
    callback(ip);
}
function callback(ip: string): void {
    console.log(ip);    
}

// func2(callback);