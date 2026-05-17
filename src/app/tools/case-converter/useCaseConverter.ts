import { useState, useEffect } from 'react';

const useCaseConverter = () => {
    const [text, setText] = useState('');
    const [selectedCase, setSelectedCase] = useState('uppercase');
    const [copyButtonText, setCopyButtonText] = useState('Copy Text');

    const convertText = () => {
        if (!text) return;

        let convertedText = "";

        switch (selectedCase) {
            case "uppercase":
                convertedText = text.toUpperCase();
                break;
            case "lowercase":
                convertedText = text.toLowerCase();
                break;
            case "titlecase":
                convertedText = text
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase());
                break;
            case "sentencecase":
                convertedText = text
                    .toLowerCase()
                    .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
                break;
            case "capitalizedcase":
                convertedText = text
                    .split(" ")
                    .map(
                        (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    )
                    .join(" ");
                break;
            case "invertcase":
                convertedText = text
                    .split("")
                    .map((char) =>
                        char === char.toUpperCase()
                            ? char.toLowerCase()
                            : char.toUpperCase()
                    )
                    .join("");
                break;
            default:
                convertedText = text;
        }

        setText(convertedText);
    };

    const clearText = () => {
        setText('');
    };

    const copyText = () => {
        navigator.clipboard.writeText(text);
        setCopyButtonText('Copied!');
        setTimeout(() => {
            setCopyButtonText('Copy Text');
        }, 2000);
    };

    useEffect(() => {
        convertText();
    }, [selectedCase]);

    return {
        text,
        setText,
        selectedCase,
        setSelectedCase,
        convertText,
        clearText,
        copyText,
        copyButtonText,
    };
};

export default useCaseConverter;