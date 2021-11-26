// const ServerUrl="https://web.sageh.ir";
// const NodeServerUrl="https://node.sageh.ir";

const ServerUrl="http://127.0.0.1:8000";
const NodeServerUrl="http://127.0.0.1:3650";

// const ServerUrl="https://sageh.iran.liara.run";
// const NodeServerUrl="https://sageh-chatapis.iran.liara.run";

const NotFindProductImageUrl="/app.png";
const NotFindUserImageUrl="/user_avatar.png";

const weatherApiKey='7116886f866e9050575dee964b75cd92';
// const weatherApiUrl='https://api.openweathermap.org/data/2.5';
const weatherApiUrl='https://api.openweathermap.org/data/2.5';

const color1='#24D265'; //#d2246a
const colorGreen2='#a5d6a7';
const colorTxt1='#434343';
const colorTxt2='#565656';
const colorTxt3='#929292';
const colorSilver1='#d8d8d8';
const colorSilver2='#bebebe';
const colorRed1='#D22424';
const colorDark1='#222222';
const colorYellow1='#ffe000';




const goProductUrl=(slug)=>{
    return `/product/${slug}`;
}
const goUserProfileUrl=user=>{
    return `/user/${user.id}`;
}

const userName = user => {

    return user.name + ' ' + user.family;
}

export {
    //const
    ServerUrl,
    NodeServerUrl,
    NotFindProductImageUrl,
    NotFindUserImageUrl,

    weatherApiKey,
    weatherApiUrl,


    //colors
    color1,
    colorTxt1,
    colorTxt2,
    colorTxt3,
    colorSilver1,
    colorSilver2,
    colorRed1,
    colorGreen2,
    colorDark1,
    colorYellow1,

    //functions
    userName,
    goProductUrl,
    goUserProfileUrl
}