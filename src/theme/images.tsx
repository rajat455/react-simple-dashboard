type Background = Record<string, string>;
type Avatart = Record<string, string>;
type Models = Record<string, string>;

interface  DefaultImages{
    backgrounds:Background;
    avatars:Avatart;
    models:Models
}



export const defaultImages :DefaultImages= {
    backgrounds:{
        welcomeBanner1:"https://react-easy-dashboard.netlify.app/images/backgrounds/wcBg1.webp",
        welcomeBanner2:"https://react-easy-dashboard.netlify.app/images/backgrounds/wcBg2.webp",
        slide1:"https://react-easy-dashboard.netlify.app/images/backgrounds/slide1.webp",
        slide2:"https://react-easy-dashboard.netlify.app/images/backgrounds/slide2.webp",
        slide3:"https://react-easy-dashboard.netlify.app/images/backgrounds/slide3.webp",
        deemBg1:"https://react-easy-dashboard.netlify.app/images/backgrounds/deemBg1.webp",
        deemBg2:"https://react-easy-dashboard.netlify.app/images/backgrounds/deemBg2.webp",
    },
    avatars:{
        avatar1:"https://react-easy-dashboard.netlify.app/images/avatar/avatar1.webp"
    },
    models:{
        model1:"https://react-easy-dashboard.netlify.app/images/3dchar/char1.webp",
        model2:"https://react-easy-dashboard.netlify.app/images/3dchar/char2.webp"
    }
}