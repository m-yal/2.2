import fetch from 'cross-fetch';//used https://openbase.com/js/cross-fetch  instead "node-fetch"
import { json } from 'express';

//1
let url = "https://api.ipify.org/?format=json";

async function printMyIp(url:string): Promise<void> {
    const res: Response = await fetch(url);
    const json: {ip: string} = await res.json();
    const ip: string = json["ip"];
    console.log(ip);
}
// printMyIp(url);

//2
async function getMyIp(url:string): Promise<string> {
    const res: Response = await fetch(url);
    const json: {ip: string} = await res.json();
    const ip: string = json.ip;
    console.log(ip);
    return ip;
}
// getMyIp(url);

url = "https://random-data-api.com/api/name/random_name";

//3.1
async function get3Names1(url:string): Promise<string[]> {
    const name1: Promise<string> = fetch(url).then(res => res.json()).then(json => json.name);
    const name2: Promise<string> = fetch(url).then(res => res.json()).then(json => json.name);
    const name3: Promise<string> = fetch(url).then(res => res.json()).then(json => json.name);

    const names: string[] = await Promise.all([name1, name2, name3]);
    console.log(names);
    return names;
}
// get3Names1(url);

//3.2
async function get3Names2(url:string): Promise<string[]> {
    const responses: Promise<Response>[] = [];
    for (let i = 0; i < 3; i++) {
        responses[i] = fetch(url);
    }

    const names: string[] = [];
    for await (const res of responses) {
        const name: string = await res.json().then((json: {name: Promise<string>}) => json.name);
        names.push(name);
    }
    console.log(names);
    return names;
}
// get3Names2(url);

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
            .then((json: {name: string}) => names.push(json.name));
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
let result41 = getFemaleUser1(url);

//4.2 with async/await
async function getFemaleUser2(url: string): Promise<{gender: string}> {
    while(true) {
        let res: Response = await fetch(url);
        let user: {gender: string} = await res.json();
        let gender: string = user.gender;
        if (gender === "Female") {
            console.log(user);
            return user;
        }
        console.log("iter");
    }
}
// let result42 = getFemaleUser2(url);
// setTimeout(() => {
//     console.log(result42);
// }, 5000);