import puppeteer from "puppeteer";
import fs from "fs";

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

  const sportLinks = await page.$$eval(".div-col ul li a", (links) => links.map((link) => ({ url: link.href, activity: link.textContent })));

  fs.writeFile("sports.json", JSON.stringify(sportLinks), (err) => {
    if (err) {
      throw err;
    }
    console.log("File Saved!");
  });

  await browser.close();
};

listOfSports();

const listOfMusicGenres = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/List_of_music_genres_and_styles");

  const genreLinks = await page.$$eval(".div-col ul li a", (links) => links.map((link) => ({ url: link.href, genre: link.textContent })));

  fs.writeFile("music.json", JSON.stringify(genreLinks), (err) => {
    if (err) {
      throw err;
    }
    console.log("File Saved!");
  });

  await browser.close();
};

listOfMusicGenres();
