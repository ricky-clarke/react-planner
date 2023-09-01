'use client'
import { useState, useContext } from 'react';

import globalContext from '@/app/_context/global-context';

import { HexColorPicker } from "react-colorful";

import Modal from '../modal/modal.component';

const SettingsForm = () => {

    const { dispatch } = useContext(globalContext);

    const brandingJSON = localStorage.getItem('planner');
    const branding = JSON.parse(brandingJSON);

    // primary background
    const [primaryColor, setPrimaryColor] = useState(branding.primary);
    const [showPrimaryColorPicker, showPrimaryColorPickerHandler] = useState(false)

    // Primary font
    const [primaryFontColor, setPrimaryFontColor] = useState(branding.primary_font);
    const [showPrimaryFontColorPicker, showPrimaryFontColorPickerHandler] = useState(false)

    // Secondary background
    const [showSecondaryColorPicker, showSecondaryColorPickerHandler] = useState(false)
    const [secondaryColor, setSecondaryColor] = useState(branding.secondary);

    // Secondary font
    const [showSecondaryFontColorPicker, showSecondaryFontColorPickerHandler] = useState(false)
    const [secondaryFontColor, setSecondaryFontColor] = useState(branding.secondary_font);

    // Button BG
    const [showButtonBGColorPicker, showButtonBGColorPickerHandler] = useState(false)
    const [buttonBGColor, setButtonBGColor] = useState(branding.button_bg_color);
    // Button Font colour
    const [showButtonFontColorPicker, showButtonFontColorPickerHandler] = useState(false)
    const [buttonFontColor, setButtonFontColor] = useState(branding.button_font_color);

    // Accent color
    const [showAccentColorPicker, showAccentColorPickerHandler] = useState(false)
    const [accentColor, setAccentColor] = useState(branding.accent_color);

    // Live changes
    document.body.style.backgroundColor = primaryColor;
    document.body.style.color = primaryFontColor;

    const secondarColors = document.querySelectorAll(".card")
    secondarColors.forEach(element => {
        element.style.backgroundColor=secondaryColor
        element.style.color=secondaryFontColor
    });

    const ButtonColors = document.querySelectorAll(".btn--submit")
    ButtonColors.forEach(element => {
        element.style.backgroundColor=buttonBGColor
        element.style.color=buttonFontColor
    });

    const cardContainer = document.querySelectorAll(".card_container")
    cardContainer.forEach(element => {
        element.style.borderColor=accentColor
    });

  
    const applySettings = (e) => {

        e.preventDefault()

        const branding = {
            primary: primaryColor,
            primary_font: primaryFontColor,
            secondary: secondaryColor,
            secondary_font : secondaryFontColor,
            button_bg_color : buttonBGColor,
            button_font_color: buttonFontColor,
            accent_color: accentColor
          };

        localStorage.setItem('planner', JSON.stringify(branding));
        document.body.style.backgroundColor = primaryColor;
        document.body.style.color = primaryFontColor;

    }

    const CancelSettings = () => {
        dispatch({type:"SETTINGSOPEN", payload: false });
    }
    
    const showColourPrimaryPicker = () => {
        if (showPrimaryColorPicker === true) {
            showPrimaryColorPickerHandler(false)
        }
        else {
            showPrimaryColorPickerHandler(true)
            showPrimaryFontColorPickerHandler(false)
            showSecondaryColorPickerHandler(false)
            showSecondaryFontColorPickerHandler(false)
            showButtonBGColorPickerHandler(false)
            showButtonFontColorPickerHandler(false)
            showAccentColorPickerHandler(false)
        }
    }
    
    const showColourPrimaryFontPicker = () => {
        if (showPrimaryFontColorPicker === true) {
            showPrimaryFontColorPickerHandler(false)
        }
        else {
            showPrimaryFontColorPickerHandler(true)
            showPrimaryColorPickerHandler(false)
            showSecondaryColorPickerHandler(false)
            showSecondaryFontColorPickerHandler(false)
            showButtonBGColorPickerHandler(false)
            showButtonFontColorPickerHandler(false)
            showAccentColorPickerHandler(false)
        }
    }
    
    const showColourSecondaryPicker = () => {
        if (showSecondaryColorPicker === true) {
            showSecondaryColorPickerHandler(false)
        }
        else {
            showSecondaryColorPickerHandler(true)
            showPrimaryColorPickerHandler(false)
            showPrimaryFontColorPickerHandler(false)
            showSecondaryFontColorPickerHandler(false)
            showButtonBGColorPickerHandler(false)
            showButtonFontColorPickerHandler(false)
            showAccentColorPickerHandler(false)
        }
    }
    
    const showColourSecondaryFontPicker = () => {
        if (showSecondaryFontColorPicker === true) {
            showSecondaryFontColorPickerHandler(false)
        }
        else {
            showSecondaryFontColorPickerHandler(true)
            showPrimaryColorPickerHandler(false)
            showPrimaryFontColorPickerHandler(false)
            showSecondaryColorPickerHandler(false)
            showButtonBGColorPickerHandler(false)
            showButtonFontColorPickerHandler(false)
            showAccentColorPickerHandler(false)
        }
    }

    const showButtonBGPicker = () => {

        if (showButtonBGColorPicker === true) {
            showButtonBGColorPickerHandler(false)
        }
        else {
            showButtonBGColorPickerHandler(true)
            showPrimaryColorPickerHandler(false)
            showPrimaryFontColorPickerHandler(false)
            showSecondaryColorPickerHandler(false)
            showSecondaryFontColorPickerHandler(false)
            showButtonFontColorPickerHandler(false)
            showAccentColorPickerHandler(false)
        }

    }

    const showButtonFontPicker = () => {

        if (showButtonFontColorPicker === true) {
            showButtonFontColorPickerHandler(false)
        }
        else {
            showButtonFontColorPickerHandler(true)
            showPrimaryColorPickerHandler(false)
            showPrimaryFontColorPickerHandler(false)
            showSecondaryColorPickerHandler(false)
            showSecondaryFontColorPickerHandler(false)
            showButtonBGColorPickerHandler(false)
            showAccentColorPickerHandler(false)
        }

    }

    const showAccentPicker = () => {

        if (showAccentColorPicker === true) {
            showAccentColorPickerHandler(false)
        }
        else {
            showAccentColorPickerHandler(true)
            showPrimaryColorPickerHandler(false)
            showPrimaryFontColorPickerHandler(false)
            showSecondaryColorPickerHandler(false)
            showSecondaryFontColorPickerHandler(false)
            showButtonBGColorPickerHandler(false)
            showButtonFontColorPickerHandler(false)
        }

    }
    
    const defaultBranding = () => {
        
        const white = '#ffffff';
        const navy = '#071020'
        const blue = '#10254A'
        const green = 'green'

        document.body.style.backgroundColor = navy;
        document.body.style.color = white;
        setPrimaryColor(navy)
        setPrimaryFontColor(white)
        setSecondaryColor(blue)
        setSecondaryFontColor(white)
        setButtonBGColor(green)
        setButtonFontColor(white)
        setAccentColor(blue)

    }
    
    const style = {
            primary_color: {
                background: primaryColor,
                border:'1px solid #e0e0e0',
                borderRadius:'50%',
                height: '30px',
                width: '30px'
            },
            primary_font_color: {
                background: primaryFontColor,
                border:'1px solid #e0e0e0',
                borderRadius:'50%',
                height: '30px',
                width: '30px'
            },
            secondary_color: {
                background: secondaryColor,
                border:'1px solid #e0e0e0',
                borderRadius:'50%',
                height: '30px',
                width: '30px'
            },
            secondary_font_color: {
                background: secondaryFontColor,
                border:'1px solid #e0e0e0',
                borderRadius:'50%',
                height: '30px',
                width: '30px'
            },
            button_bg_color: {
                background: buttonBGColor,
                border:'1px solid #e0e0e0',
                borderRadius:'50%',
                height: '30px',
                width: '30px'
            },
            button_font_color: {
                background: buttonFontColor,
                border:'1px solid #e0e0e0',
                borderRadius:'50%',
                height: '30px',
                width: '30px'
            },
            accent_color: {
                background: accentColor,
                border:'1px solid #e0e0e0',
                borderRadius:'50%',
                height: '30px',
                width: '30px'
            }
    };
    
    return (
        <Modal>
                    <div className='task__container' style={{'color' : 'white'}}>
                        <div className='task__main'>
                            <div>
                                <h2>Settings</h2>
                                <form className="mt-4" onSubmit={applySettings} >

                                <div className='flex gap-6 justify-between'>

                                    <div className='flex gap-6'>

                                        <div className='flex gap-5 mb-4'>
                                            <button type="button" className="flex gap-3 items-center" onClick={showColourPrimaryPicker}>
                                                <div style={style.primary_color}></div>
                                                Primary colour
                                                </button>
                                        </div>

                                            <div className='flex gap-5 mb-4'>
                                                <button className="flex gap-3 items-center" type="button" onClick={showColourPrimaryFontPicker}>
                                                    <div style={style.primary_font_color}></div>
                                                    Primary font colour
                                                </button>
                                            </div>

                                        </div>

                                        <div className='flex gap-5 mb-4'>
                                            <button type="button" onClick={defaultBranding}>Use default</button>
                                        </div>

                                    </div>

                                {showPrimaryColorPicker && 
                                    <HexColorPicker 
                                    color={primaryColor}
                                   onChange={setPrimaryColor}
                                  />
                                }

                                {showPrimaryFontColorPicker && 
                                    <HexColorPicker 
                                    color={primaryFontColor}
                                    onChange={setPrimaryFontColor}
                                    />
                                 }

                                <br />

                                <div className='flex gap-6'>

                                    <div className='flex gap-5 mb-4'>
                                        <div style={style.secondary_color}></div>
                                        <button type="button" onClick={showColourSecondaryPicker}>Secondary colour</button>
                                    </div>

                                    <div className='flex gap-5 mb-4'>
                                        <div style={style.secondary_font_color}></div>
                                        <button type="button" onClick={showColourSecondaryFontPicker}>Secondary font colour</button>
                                    </div>

                                </div>
                        
                            {showSecondaryColorPicker && 
                                <HexColorPicker 
                                className="mb-4" 
                                color={secondaryColor}
                                onChange={setSecondaryColor} 
                                /> 
                            }

                            {showSecondaryFontColorPicker && 
                                <HexColorPicker  
                                className="mb-4" 
                                color={secondaryFontColor} 
                                onChange={setSecondaryFontColor}
                                /> 
                             }

                                <br />

                                <div className='flex gap-6'>

                                    <div className='flex gap-5 mb-4'>
                                        <div style={style.button_bg_color}></div>
                                        <button type="button" onClick={showButtonBGPicker}>Button background color</button>
                                    </div>

                                    <div className='flex gap-5 mb-4'>
                                        <div style={style.button_font_color}></div>
                                        <button type="button" onClick={showButtonFontPicker}>Button font colour</button>
                                    </div>

                                </div>

                                {showButtonBGColorPicker && 
                                    <HexColorPicker  
                                    className="mb-4" 
                                    color={buttonBGColor} 
                                    onChange={setButtonBGColor}
                                    /> 
                                }

                                {showButtonFontColorPicker && 
                                    <HexColorPicker  
                                    className="mb-4" 
                                    color={buttonFontColor} 
                                    onChange={setButtonFontColor}
                                    /> 
                                }

                                    <br />

                                    <div className='flex gap-6'>

                                        <div className='flex gap-5 mb-4'>
                                            <div style={style.accent_color}></div>
                                            <button type="button" onClick={showAccentPicker}>Accent color</button>
                                        </div>

                                        {/* <div className='flex gap-5 mb-4'>
                                            <div style={style.button_font_color}></div>
                                            <button type="button" onClick={showButtonFontPicker}>Button font colour</button>
                                        </div> */}

                                    </div>

                                    {showAccentColorPicker && 
                                    <HexColorPicker 
                                    color={accentColor}
                                    onChange={setAccentColor}
                                    />
                                 }

                                <div className='flex mt-8 gap-5'>
                                    <button type="submit"
                                    className='btn btn--submit'>Apply settings</button>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div className='task__meta'>
                            <div></div>
                            <div className='task__button--danger'>
                                <button className="btn btn--cancel mt-5" onClick={CancelSettings}>Cancel</button>
                            </div>
                        </div>
                    </div>
                <div class="overlay overlay--less-opacity" onClick={CancelSettings}></div>
            </Modal>

    )

}

export default SettingsForm