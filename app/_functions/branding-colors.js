'use client'
const BrandingColours = (props) => {

    const brandingJSON = localStorage.getItem('planner');
    const branding = JSON.parse(brandingJSON);

    const branding_colors = {
        primary: {
            backgroundColor: branding.primary_by, 
            color: branding?.primary_font,
        },
        secondary: {
            backgroundColor: branding.secondary_bg, 
            color: branding?.secondary_font,
        }
    }

    const test = props.style;


    return  <h1 style={branding_colors.secondary}>{props.style}</h1> 


}

export default BrandingColours