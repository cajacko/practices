import MarkdownIt from "markdown-it";
import { store, ISetChecklists } from "../store";

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

    trimmed = trimmed.trim();

    return {
      id: trimmed,
      text: trimmed
    };
  });
};

const getHeadingLevel = (heading: string) => {
  const levelMatch = heading.match(/^#+/);
  return levelMatch && levelMatch[0] ? levelMatch[0].length : 0;
};

const getOrderedMeta = (response: string) => {
  const headings = response.match(/^#+(.*)/gm);
  const contents = response.split(/^#+.*/gm);

  if (!headings) return [];

  let nestedIds: string[] = [];

  const orderedMeta = headings.map((heading, i) => {
    const level = getHeadingLevel(heading);

    const goBackBy =
      nestedIds.length < level ? null : nestedIds.length + 1 - level;

    if (goBackBy) {
      for (let i = 0; i < goBackBy; i++) {
        nestedIds.pop();
      }
    }

    nestedIds.push(heading);

    const content = contents[i + 1];

    return {
      id: nestedIds.join(""),
      heading: heading,
      path: nestedIds.slice(),
      title: heading.replace(/#/gm, ""),
      items: parseChecklistFromContent(content)
    };
  });

  return orderedMeta;
};

const parseChecklists = (content: string): ISetChecklists["payload"] => {
  const orderedMeta = getOrderedMeta(content);

  const checklistsById: ISetChecklists["payload"]["checklistsById"] = orderedMeta.reduce(
    (acc, { id, title, items, heading }, i) => {
      const checklists: string[] = [];

      orderedMeta.forEach((meta, j) => {
        if (i === j) return;

        if (meta.path[meta.path.length - 2] === heading) {
          checklists.push(meta.id);
        }
      });

      return {
        ...acc,
        [id]: {
          id,
          title,
          items,
          checklists
        }
      };
    },
    {}
  );

  return {
    startingChecklists: orderedMeta
      .filter(({ path }) => path.length === 1)
      .map(({ id }) => id),
    checklistsById: checklistsById
  };
};

/**
 * Fetch the checklist data and dispatch the results
 */
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
        payload: parseChecklists(response)
      });
    });
};

export default fetchChecklists;
