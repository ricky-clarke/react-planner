'use client'
import { useState, useContext } from 'react';

import globalContext from '@/app/_context/global-context';

import { HexColorPicker } from "react-colorful";

import Modal from '../modal/modal.component';
import UpdateMessage from '../update-message/update-message.component';

import { SettingColor } from './settings-form.styles';

const SettingsForm = () => {

const { dispatch } = useContext(globalContext);

    const brandingJSON = localStorage.getItem('planner');
    const branding = JSON.parse(brandingJSON);

    const white = '#ffffff';
    const navy = '#071020'
    const blue = '#10254A'
    const green = 'green'

    const primaryBG = branding?.primary_bg ? branding.primary_bg : navy;
    const primary_font = branding?.primary_font ? branding.primary_font : white;
    const secondaryBG = branding?.secondary_bg ? branding.secondary_bg : blue;
    const secondary_font = branding?.secondary_font ? branding.secondary_font : white;
    const buttonBG = branding?.button_bg ? branding.button_bg : green;
    const button_font = branding?.button_font ? branding.button_font : white;
    const accent_color = branding?.accent_color ? branding.accent_color : blue;

    // primary background
    const [primaryColor, setPrimaryColor] = useState(primaryBG);
    const [showPrimaryColorPicker, showPrimaryColorPickerHandler] = useState(false)
    // Primary font
    const [primaryFontColor, setPrimaryFontColor] = useState(primary_font);
    const [showPrimaryFontColorPicker, showPrimaryFontColorPickerHandler] = useState(false)

    // Secondary background
    const [showSecondaryColorPicker, showSecondaryColorPickerHandler] = useState(false)
    const [secondaryColor, setSecondaryColor] = useState(secondaryBG);
    // Secondary font
    const [showSecondaryFontColorPicker, showSecondaryFontColorPickerHandler] = useState(false)
    const [secondaryFontColor, setSecondaryFontColor] = useState(secondary_font);

    // Button BG
    const [showButtonBGColorPicker, showButtonBGColorPickerHandler] = useState(false)
    const [buttonBGColor, setButtonBGColor] = useState(buttonBG);
    // Button Font colour
    const [showButtonFontColorPicker, showButtonFontColorPickerHandler] = useState(false)
    const [buttonFontColor, setButtonFontColor] = useState(button_font); 
    // Accent color
    const [showAccentColorPicker, showAccentColorPickerHandler] = useState(false)
    const [accentColor, setAccentColor] = useState(accent_color);

    // updated message 
    const [settingsUpdated, settingsUpdatedHandler] = useState(false)

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
        element.style.backgroundColor=buttonBG
        element.style.color=buttonFontColor
    });

    const cardContainer = document.querySelectorAll(".card_container")
    cardContainer.forEach(element => {
        element.style.borderColor=accentColor
    });

  
    // Submit changes
    const applySettings = (e) => {

        e.preventDefault()

        const branding = {
            primary_bg: primaryColor,
            primary_font: primaryFontColor,
            secondary_bg: secondaryColor,
            secondary_font : secondaryFontColor,
            button_bg : buttonBGColor,
            button_font : buttonFontColor,
            accent_color: accentColor 
          };

        localStorage.setItem('planner', JSON.stringify(branding));

        document.body.style.backgroundColor = primaryColor;
        document.body.style.color = primaryFontColor; 

        settingsUpdatedHandler(true)

        setTimeout(() => {
            settingsUpdatedHandler(false)
        }, 3000)

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

        // Reset to default branding colours
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
    
    // Appy styles to input field colour circle
    const style = {
            primary_color: {
                background: primaryColor,
            },
            primary_font_color: {
                background: primaryFontColor,
            },
            secondary_color: {
                background: secondaryColor,
            },
            secondary_font_color: {
                background: secondaryFontColor
            },
            button_bg_color: {
                background: buttonBGColor,
            },
            button_font_color: {
                background: buttonFontColor,
            },
            accent_color: {
                background: accentColor,
            }
    };
    
    return (
        <>
            <Modal>
                <div className='task__container' style={{'color' : 'white'}}>
                    <div className='task__main'>
                        <div>
                            <h2>Settings</h2>
                            <form className="mt-4">

                                <div className='flex gap-6 mb-6 mt-4'>

                                    <div className='flex gap-5 mb-4'>
                                        <button type="button" className="flex gap-3 items-center" onClick={showColourPrimaryPicker}>
                                            <SettingColor style={style.primary_color}></SettingColor>
                                            Primary colour
                                            </button>
                                    </div>

                                        <div className='flex gap-5 mb-4'>
                                            <button className="flex gap-3 items-center" type="button" onClick={showColourPrimaryFontPicker}>
                                                <SettingColor style={style.primary_font_color}></SettingColor>
                                                Primary font colour
                                            </button>
                                        </div>

                                </div>

                                <div className='flex gap-6  mb-6'>

                                    <div className='flex gap-5 mb-4'>
                                        <SettingColor style={style.secondary_color}></SettingColor>
                                        <button type="button" onClick={showColourSecondaryPicker}>Secondary colour</button>
                                    </div>

                                    <div className='flex gap-5 mb-4'>
                                        <SettingColor style={style.secondary_font_color}></SettingColor>
                                        <button type="button" onClick={showColourSecondaryFontPicker}>Secondary font colour</button>
                                    </div>

                                </div>

                                <div className='flex gap-6  mb-6'>

                                    <div className='flex gap-5 mb-4'>
                                        <SettingColor style={style.button_bg_color}></SettingColor>
                                        <button type="button" onClick={showButtonBGPicker}>Button color</button>
                                    </div>

                                    <div className='flex gap-5 mb-4'>
                                        <SettingColor style={style.button_font_color}></SettingColor>
                                        <button type="button" onClick={showButtonFontPicker}>Button font colour</button>
                                    </div>

                                </div>

                                <div className='flex gap-6  mb-6'>

                                    <div className='flex gap-5 mb-4'>
                                        <SettingColor style={style.accent_color}></SettingColor>
                                        <button type="button" onClick={showAccentPicker}>Accent color</button>
                                    </div>

                                    {/* <div className='flex gap-5 mb-4'>
                                        <div style={style.button_font_color}></div>
                                        <button type="button" onClick={showButtonFontPicker}>Button font colour</button>
                                    </div> */}

                                </div>

                            {/* <div className='flex mt-8 gap-5'>
                                <button type="submit"
                                className='btn btn--submit'>Apply settings</button>
                            </div> */}
                            </form>
                        </div>
                    </div>

                    <div className='task__meta'>
                        <div>

                            {showPrimaryColorPicker && 
                                <>     
                                    <h3 className='mb-3'>Primary colour</h3>
                                    <HexColorPicker 
                                        color={primaryColor}
                                        onChange={setPrimaryColor}
                                    />
                                </>
                            }

                            {showPrimaryFontColorPicker && 
                                <>     
                                    <h3 className='mb-3'>Primary font colour</h3>
                                    <HexColorPicker 
                                    color={primaryFontColor}
                                    onChange={setPrimaryFontColor}
                                    />
                                </>
                            }
    
                            {showSecondaryColorPicker && 
                                <>     
                                    <h3 className='mb-3'>Secondary colour</h3>
                                    <HexColorPicker 
                                    color={secondaryColor}
                                    onChange={setSecondaryColor}
                                    />
                                </>
                            }

                            {showSecondaryFontColorPicker && 
                                <>     
                                    <h3 className='mb-3'>Secondary font colour</h3>
                                    <HexColorPicker 
                                    color={secondaryFontColor}
                                    onChange={setSecondaryFontColor}
                                    />
                                </>
                            }

                            {showButtonBGColorPicker && 
                                <>     
                                    <h3 className='mb-3'>Button colour</h3>
                                    <HexColorPicker 
                                    color={buttonBGColor}
                                    onChange={setButtonBGColor}
                                    />
                                </>
                            }

                            {showButtonFontColorPicker && 
                                <>     
                                    <h3 className='mb-3'>Button font colour</h3>
                                    <HexColorPicker 
                                    color={buttonFontColor}
                                    onChange={setButtonFontColor}
                                    />
                                </>
                            }

                            {showAccentColorPicker && 
                                <>
                                    <h3 className='mb-3'>Accent colour</h3>
                                    <HexColorPicker 
                                    color={accentColor}
                                    onChange={setAccentColor}
                                    />
                                </>
                            }

                            <div className='flex gap-4 mt-8'>
                                <button type="submit" onClick={applySettings} className='btn btn--submit'>Apply settings</button>
                                <button type="button" onClick={defaultBranding}>Use default</button>
                            </div>

                        </div>

                        <div className='task__button--danger'>
                            <button className="btn btn--cancel mt-5" onClick={CancelSettings}>Cancel</button>
                        </div>

                    </div>
                    
                </div>
                <div class="overlay overlay--less-opacity" onClick={CancelSettings}></div>
            </Modal>

            {settingsUpdated && 
                <UpdateMessage copy="Settings applied" />
            }
        </>

    )

}

export default SettingsForm