import puppeteer from "puppeteer";

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.mako.co.il/");

  // await page.screenshot({ path: "example.png", fullPage: true });
  // await page.pdf({ path: "example.pdf", format: "A4" });

  // const html = await page.content();
  // console.log(html);

  // const title = await page.evaluate(() => document.title);
  // console.log(title);

  // const text = await page.evaluate(() => document.body.innerText);
  // console.log(text);

  const links = await page.evaluate(() => Array.from(document.querySelectorAll("a"), (e) => e.href));
  console.log(links);

  await browser.close();
}

// run();

const url = "https://en.wikipedia.org/wiki/Wikipedia:WikiProject_Lists_of_topics";
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(url);

const topics = await page.evaluate(() => {
  const topics = [];
  const button = document.querySelector("#Topic_list_coverage_checklist + button");
  button.click();
  const list = document.querySelector("#Topic_list_coverage_checklist + ul");
  const links = list.querySelectorAll("a");
  links.forEach((link) => {
    const text = link.textContent;
    topics.push(text);
  });
  return topics;
});
console.log(topics);
