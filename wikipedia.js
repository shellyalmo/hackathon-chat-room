import wiki from "wikipedia";

const batman = async () => {
  try {
    const page = await wiki.page("Batman");
    console.log(page);
    //Response of type @Page object
    const summary = await page.summary();
    console.log(summary);
    //Response of type @wikiSummary - contains the intro and the main image
  } catch (error) {
    console.log(error);
    //=> Typeof wikiError
  }
};
batman();
export default batman;
