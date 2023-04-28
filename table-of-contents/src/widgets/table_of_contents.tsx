import {
    usePlugin,
    renderWidget,
    useTracker,
    SelectionType,
    WidgetLocation,
    useRunAsync,
    RemViewer,
    Rem,
    RemId,
} from '@remnote/plugin-sdk';


interface TOCItem {
  id: string;
  remId: RemId;
  level: number;
}

function TableOfContents(){
  const plugin = usePlugin();

  const descendants = useTracker(
    async (reactivePlugin) =>
    {
        const focusedRem = await reactivePlugin.focus.getFocusedRem();
        console.log("Rem: \n");
        console.log(focusedRem);
        return await focusedRem?.getDescendants();
      }
  );

  const headers = useTracker(
    async (reactivePlugin) => {
      let tempHeaders = [];
      if (descendants) {
        // Generate a list of TOC items
        for (let i = 0; i < descendants.length; i++) {
          if (await descendants[i].hasPowerup("r")) {
            const temp_id = await descendants[i].getFontSize() || "p";
            tempHeaders.push({
              id: temp_id,
              remId: descendants[i]._id,
              level: parseInt(temp_id.slice(1)),
            });
          }
        }
      }
      return tempHeaders;
    },
    [descendants]
  );
  
  // Generate HTML for TOC
  console.log("Headers length: \n");
  console.log(headers?.length);
  
  return(
    <div>
      <h1>Table of Contents</h1>
    </div>
  );

  }

renderWidget(TableOfContents);

