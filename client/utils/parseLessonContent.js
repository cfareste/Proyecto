import Image from "next/image";
import { renderToString } from "react-dom/server";

export default function parseContent (content, styles) {
    let transformedString = replaceClassNames(content, styles);
    transformedString = replaceComponents(transformedString);
    return transformedString;
}

const replaceClassNames = (content, styles) => {
    const regex = /className={([^}]+)}/g;
    const modifiedContent= content.replace(regex, (match, classNames) => {
        const replacedClassNamesArray = classNames.split(' ')
          .map(className => className.split('.')[1])
          .filter(className => className)
          .map(className => styles[className])
          .join(' ');
        return `class='${replacedClassNamesArray}'`;
    });

    return modifiedContent
};

const replaceComponents = (content) => {
    const imageRegex = /<Image([^>]*)\/?>|<\/Image>/g;
    let modifiedHtml = content;

    modifiedHtml = modifiedHtml.replace(imageRegex, (match, attributes) => {
        if(match === '</Image>') return '';
        const replacedComponent = renderToString(<Image {...parseAttributes(attributes)} width={1000} height={700}/>);
        return replacedComponent;
    });

    return modifiedHtml;
}

const parseAttributes = (attributes) => {
    const regex = /(\w+)\s*=\s*['"]([^'"]*)['"]/g;
    const parsedAttributes = {};
    let match;

    while ((match = regex.exec(attributes)) !== null) {
        const [, key, value] = match;
        parsedAttributes[key] = value;
    }
  
    return parsedAttributes;
};