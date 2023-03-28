import puppeteer from "puppeteer";
import fs from "fs";

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

// const url = "https://en.wikipedia.org/wiki/Outline_of_food_preparation";
// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// await page.goto(url);

// const topics = await page.evaluate(() => {
//   const topics = [];
//   const headings = document.querySelectorAll("h2");
//   headings.forEach((heading) => {
//     topics.push(heading.textContent);
//   });
//   return topics;
// });
// console.log(topics);

// await browser.close();

const listOfCuisines = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/List_of_cuisines");

  const cuisineLinks = await page.$$eval(".div-col a", (links) => links.map((link) => ({ url: link.href, cuisine: link.textContent })));
  console.log(cuisineLinks);

  fs.writeFile("cuisines.json", JSON.stringify(cuisineLinks), (err) => {
    if (err) {
      throw err;
    }
    console.log("File Saved!");
  });

  await browser.close();
};

listOfCuisines();

const listOfSports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/List_of_sports");

  const sportsLinks = await page.$$eval(".div-col a", (links) => links.map((link) => ({ url: link.href, activity: link.textContent })));

  fs.writeFile("sports.json", JSON.stringify(sportsLinks), (err) => {
    if (err) {
      throw err;
    }
    console.log("File Saved!");
  });

  await browser.close();
};

listOfSports();
