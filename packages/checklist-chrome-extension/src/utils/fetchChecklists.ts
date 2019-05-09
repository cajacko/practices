import MarkdownIt from "markdown-it";
import { store } from "../store";

export interface IHeadingContent {
  heading: string;
  checklist: string[];
}

const parseChecklistFromContent = (content: string) => {
  // Don't continue for content without checklists
  if (!content.match(/\[[ x]\](.*)/gm)) return null;

  // Parse the content as html, makes it easier to grab beginning and end of list
  const md = new MarkdownIt();
  const html = md.render(content);

  let listItems = html.match(/<li>([\s\S]+?)(?=<\/li>)/gm);

  // No list so return null
  if (!listItems || !listItems.length) return null;

  return listItems.map(listItem => {
    let trimmed = listItem.replace(/\[[ xX]\]/gm, "");
    trimmed = trimmed.replace("<li>", "");
    trimmed = trimmed.replace(/\n/gm, " ");
    trimmed = trimmed.replace(/&lt;!--[\s\S]+?--&gt;/gm, "");

    return trimmed.trim();
  });
};

const splitContentByHeadings = (content: string): IHeadingContent[] => {
  const headings = content.match(/^#+(.*)/gm);
  const contents = content.split(/^#+.*/gm);

  if (!headings) return [];

  return headings
    .map((heading, i) => {
      const content = contents[i + 1];
      const trimmedHeading = heading.replace(/#/gm, "").trim();
      const checklist = parseChecklistFromContent(content) || [];

      return {
        heading: trimmedHeading,
        checklist
      };
    })
    .filter(checklist => !!checklist.checklist.length);
};

const fetchChecklists = () => {
  return fetch(
    "https://raw.githubusercontent.com/cajacko/practices/temp/docs/checklists/README.md"
  )
    .then(res => {
      return res.text();
    })
    .then(response => {
      store.dispatch({
        type: "SET_CHECKLISTS",
        payload: {
          checklists: splitContentByHeadings(response)
        }
      });
    });
};

export default fetchChecklists;
