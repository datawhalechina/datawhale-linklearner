import MarkdownIt from 'markdown-it';
import MarkdownItKatex from '@iktakahiro/markdown-it-katex';
import MarkdownItHighlight from 'markdown-it-highlight';

const md = new MarkdownIt({ breaks: true, html: true });
md.use(MarkdownItKatex, { globalGroup: true, enableBareBlocks: true });
md.use(MarkdownItHighlight);

const allIndexOf = (target: string, sourceString: string) => {
  const output = [];
  let currentIndex = sourceString.indexOf(target, 0);
  while (currentIndex >= 0) {
    output.push(currentIndex);
    currentIndex = sourceString.indexOf(target, ++currentIndex);
  }
  return output;
};

const cutString = (soureString: string, cutIndexList: number[]) => {
  const output = [];
  output.push(soureString.slice(0, cutIndexList[0]));
  for (let a = 0; a < cutIndexList.length - 1; a++) {
    const temp = soureString.slice(cutIndexList[a], cutIndexList[a + 1]);
    output.push(temp);
  }
  output.push(soureString.slice(cutIndexList[cutIndexList.length - 1]));
  return output.filter((item) => item.length > 0);
};

// 处理markdownIt生成的html
const handleGeneratedHtml = (html: string, tag: string) => {
  const indexList = allIndexOf(`<${tag}>`, html);
  const cuted = cutString(html, indexList);

  let output = '';
  for (let a = 0; a < cuted.length; a++) {
    const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    let temp = `<div id="${id}">${cuted[a]}`;
    if (a !== 0) {
      temp = `</div>${temp}`;
    }
    output = `${output}${temp}`;
  }
  return output;
};

const getExistTag = (html: string) => {
  const tagList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  for (const tag of tagList) {
    const regExp = new RegExp(`<${tag}(?:(?!<\/${tag}>).|\n)*?<\/${tag}>`, 'gm');
    if (regExp.test(html)) {
      return tag;
    }
  }
  return undefined;
};

export const convertMarkdownToHtml = (markdown: string) => {
  const input = markdown.replace('$ ', '$').replace(' $', '$');
  const html = md.render(input);
  const targetTag = getExistTag(html);
  const output = handleGeneratedHtml(html, targetTag);
  return { html: output, tag: targetTag };
};
