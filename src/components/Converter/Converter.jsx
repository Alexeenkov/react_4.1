import React, { useState } from 'react';
import s from './Converter.module.css';

const Converter = () => {
    const [input, setInput] = useState({
        inputValue: '#',
        result: '',
    });

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) {
            return 'Ошибка!';
        }
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);

        return `rgb(${r}, ${g}, ${b})`;
    }

    const handleEnterHex = ({ target }) => {
        const value = target.value;
        if (value.length > 7 || value.length < 1 || value.charAt(0) !== '#') return; // Не позволяем удалять символ решетки и вводить больше 7 символов, а также вводить символы перед решеткой
        setInput(prevInput => {
            return { ...prevInput, inputValue: value } // Записываем введенное значение в состояние инпута
        });
        if (value.length < 7) {
            setInput(prevInput => {
                return { ...prevInput, result: + '' } // Фон делаем белый, поле с результатом очищаем
            });
        }
        if (value.length === 7) {
            const rgbResult = hexToRgb(value); // Вычисляем значение rgb
            setInput(prevInput => {
                return { ...prevInput, result: rgbResult }; // Записываем результат в состояние инпута
            });
        }
    };

    const backgroundValue = input.result !== 'Ошибка!' ? input.result : '#a50d0d';

    return (
        <div className={s.wrapper} style={{background: backgroundValue}}>
            <div>
                <input className={s.input} onChange={handleEnterHex} value={input.inputValue} name='inputValue' type="text"/>
                <div className={s.result}>
                    { input.result || null }
                </div>
            </div>
        </div>
    );
}

export default Converter;